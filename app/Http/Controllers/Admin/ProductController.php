<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $products = Product::query()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'image' => $this->toPublicUrl($product->image),
                'gallery' => $this->toPublicUrls($product->gallery ?? []),
                'features' => $product->features ?? [],
                'is_active' => $product->is_active,
            ]);

        return Inertia::render('dashboard/products/index', [
            'products' => $products,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'string', 'max:255'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'max:5120'],
            'features_input' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $imagePaths = $this->storeUploadedImages($request->file('images', []), 'products/gallery');

        Product::query()->create([
            'name' => $validated['name'],
            'slug' => $this->resolveSlug($validated['name']),
            'description' => $validated['description'],
            'price' => $this->formatRupiah($validated['price']),
            'image' => $imagePaths[0],
            'gallery' => $imagePaths,
            'features' => $this->splitLines($validated['features_input'] ?? null),
            'sort_order' => $this->nextSortOrder(),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Produk berhasil ditambahkan.');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'string', 'max:255'],
            'images' => ['nullable', 'array', 'min:1'],
            'images.*' => ['image', 'max:5120'],
            'features_input' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $galleryPaths = $product->gallery ?? [];
        $imagePath = $product->image;

        if ($request->hasFile('images')) {
            $this->deleteStoredFile($product->image);
            $this->deleteStoredFiles($galleryPaths);
            $galleryPaths = $this->storeUploadedImages($request->file('images', []), 'products/gallery');
            $imagePath = $galleryPaths[0] ?? $imagePath;
        }

        $product->update([
            'name' => $validated['name'],
            'slug' => $this->resolveSlug($validated['name'], $product),
            'description' => $validated['description'],
            'price' => $this->formatRupiah($validated['price']),
            'image' => $imagePath,
            'gallery' => $galleryPaths,
            'features' => $this->splitLines($validated['features_input'] ?? null),
            'is_active' => $validated['is_active'] ?? false,
        ]);

        return back()->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->deleteStoredFile($product->image);
        $this->deleteStoredFiles($product->gallery ?? []);
        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus.');
    }

    private function resolveSlug(string $name, ?Product $ignore = null): string
    {
        $baseSlug = Str::slug($name);
        $baseSlug = $baseSlug !== '' ? $baseSlug : 'produk';
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
        return ((int) Product::query()->max('sort_order')) + 1;
    }

    private function slugExists(string $slug, ?Product $ignore = null): bool
    {
        return Product::query()
            ->where('slug', $slug)
            ->when($ignore, fn ($query) => $query->whereKeyNot($ignore->id))
            ->exists();
    }

    private function formatRupiah(string $rawPrice): string
    {
        $digits = preg_replace('/\D+/', '', $rawPrice) ?? '';

        if ($digits === '') {
            return 'Rp 0';
        }

        return 'Rp '.number_format((int) $digits, 0, ',', '.');
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
