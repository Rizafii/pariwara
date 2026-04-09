<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $services = Service::query()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Service $service) => [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'description' => $service->description,
                'image' => $this->toPublicUrl($service->image),
                'gallery' => $this->toPublicUrls($service->gallery ?? []),
                'features' => $service->features ?? [],
                'is_active' => $service->is_active,
            ]);

        return Inertia::render('dashboard/services/index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'max:5120'],
            'features_input' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $imagePaths = $this->storeUploadedImages($request->file('images', []), 'services/gallery');

        Service::query()->create([
            'title' => $validated['title'],
            'slug' => $this->resolveSlug($validated['title']),
            'description' => $validated['description'],
            'image' => $imagePaths[0],
            'gallery' => $imagePaths,
            'features' => $this->splitLines($validated['features_input'] ?? null),
            'sort_order' => $this->nextSortOrder(),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'images' => ['nullable', 'array', 'min:1'],
            'images.*' => ['image', 'max:5120'],
            'features_input' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $galleryPaths = $service->gallery ?? [];
        $imagePath = $service->image;

        if ($request->hasFile('images')) {
            $this->deleteStoredFile($service->image);
            $this->deleteStoredFiles($galleryPaths);
            $galleryPaths = $this->storeUploadedImages($request->file('images', []), 'services/gallery');
            $imagePath = $galleryPaths[0] ?? $imagePath;
        }

        $service->update([
            'title' => $validated['title'],
            'slug' => $this->resolveSlug($validated['title'], $service),
            'description' => $validated['description'],
            'image' => $imagePath,
            'gallery' => $galleryPaths,
            'features' => $this->splitLines($validated['features_input'] ?? null),
            'is_active' => $validated['is_active'] ?? false,
        ]);

        return back()->with('success', 'Layanan berhasil diperbarui.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $this->deleteStoredFile($service->image);
        $this->deleteStoredFiles($service->gallery ?? []);
        $service->delete();

        return back()->with('success', 'Layanan berhasil dihapus.');
    }

    private function resolveSlug(string $title, ?Service $ignore = null): string
    {
        $baseSlug = Str::slug($title);
        $baseSlug = $baseSlug !== '' ? $baseSlug : 'layanan';
        $slug = $baseSlug;
        $suffix = 1;

        while ($this->slugExists($slug, $ignore)) {
            $suffix++;
            $slug = $baseSlug.'-'.$suffix;
        }

        return $slug;
    }

    private function nextSortOrder(): int
    {
        return ((int) Service::query()->max('sort_order')) + 1;
    }

    private function slugExists(string $slug, ?Service $ignore = null): bool
    {
        return Service::query()
            ->where('slug', $slug)
            ->when($ignore, fn ($query) => $query->whereKeyNot($ignore->id))
            ->exists();
    }

    /**
     * @return array<int, string>
     */
    private function splitLines(?string $value): array
    {
        return collect(preg_split('/\r\n|\r|\n/', (string) $value) ?: [])
            ->map(fn (string $line) => trim($line))
            ->filter()
            ->values()
            ->all();
    }
}
