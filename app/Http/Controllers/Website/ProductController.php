<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Product $product) => $this->transformProduct($product));

        return Inertia::render('produk/index', [
            'products' => $products,
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        $otherProducts = Product::query()
            ->where('is_active', true)
            ->where('id', '!=', $product->id)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->take(4)
            ->get()
            ->map(fn (Product $item) => $this->transformProduct($item));

        return Inertia::render('produk/[slug]', [
            'slug' => $slug,
            'product' => $this->transformProduct($product),
            'otherProducts' => $otherProducts,
        ]);
    }

    private function transformProduct(Product $product): array
    {
        return [
            'id' => $product->id,
            'slug' => $product->slug,
            'name' => $product->name,
            'description' => $product->description,
            'longDescription' => $product->description,
            'price' => $product->price,
            'image' => $this->toPublicUrl($product->image),
            'gallery' => $this->toPublicUrls($product->gallery ?? []),
            'features' => $product->features ?? [],
        ];
    }
}
