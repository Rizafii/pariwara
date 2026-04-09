<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryItemController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $items = GalleryItem::query()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (GalleryItem $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'location' => $item->location,
                'image' => $this->toPublicUrl($item->image),
                'description' => $item->description,
                'is_active' => $item->is_active,
            ]);

        return Inertia::render('dashboard/gallery/index', [
            'items' => $items,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'image', 'max:5120'],
            'description' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        GalleryItem::query()->create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'location' => $validated['location'] ?? null,
            'image' => $this->storeUploadedImage($request->file('image'), 'gallery/items'),
            'description' => $validated['description'] ?? null,
            'sort_order' => $this->nextSortOrder(),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Galeri berhasil ditambahkan.');
    }

    public function update(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:5120'],
            'description' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $imagePath = $galleryItem->image;

        if ($request->hasFile('image')) {
            $this->deleteStoredFile($galleryItem->image);
            $imagePath = $this->storeUploadedImage($request->file('image'), 'gallery/items');
        }

        $galleryItem->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'location' => $validated['location'] ?? null,
            'image' => $imagePath,
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? false,
        ]);

        return back()->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        $this->deleteStoredFile($galleryItem->image);
        $galleryItem->delete();

        return back()->with('success', 'Galeri berhasil dihapus.');
    }

    private function nextSortOrder(): int
    {
        return ((int) GalleryItem::query()->max('sort_order')) + 1;
    }
}
