<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Concerns\BuildsSeoMeta;
use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    use BuildsSeoMeta;
    use InteractsWithMedia;

    public function index(): Response
    {
        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Product $product) => $this->transformProduct($product));

        $metaImage = $products->first()['image']
            ?? $this->toPublicUrl(
                GalleryItem::query()->where('is_active', true)->inRandomOrder()->value('image'),
            );

        return Inertia::render('produk/index', [
            'products' => $products,
            'meta' => $this->buildSeoMeta([
                'title' => 'Produk Neon Sign & Signage Malang | Orion\'s Melody',
                'description' => 'Katalog produk neon sign, signage, dan media branding usaha untuk area Malang dan Jawa Timur.',
                'keywords' => [
                    'produk neon sign malang',
                    'signage malang',
                    'branding usaha malang',
                ],
                'image' => $metaImage,
                'url' => route('produk.index'),
            ]),
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

        $productGallery = is_array($product->gallery) ? $product->gallery : [];

        $metaImage = $this->toPublicUrl($product->image)
            ?? $this->toPublicUrl($productGallery[0] ?? null)
            ?? $this->toPublicUrl(
                GalleryItem::query()->where('is_active', true)->inRandomOrder()->value('image'),
            );

        return Inertia::render('produk/[slug]', [
            'slug' => $slug,
            'product' => $this->transformProduct($product),
            'otherProducts' => $otherProducts,
            'meta' => $this->buildSeoMeta([
                'title' => $product->name.' - Neon Sign Malang',
                'description' => $this->excerptFromHtml($product->description, 160),
                'keywords' => [
                    $product->name,
                    'neon sign malang',
                    'custom neon',
                ],
                'image' => $metaImage,
                'url' => route('produk.show', ['slug' => $slug]),
            ]),
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
