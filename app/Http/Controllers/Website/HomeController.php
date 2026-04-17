<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Client;
use App\Models\GalleryItem;
use App\Models\Product;
use App\Models\Service;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    use InteractsWithMedia;

    public function __invoke(): Response
    {
        $clients = Client::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get(['id', 'name', 'logo', 'url'])
            ->map(fn (Client $client) => [
                'id' => $client->id,
                'name' => $client->name,
                'logo' => $this->toPublicUrl($client->logo),
                'url' => $client->url,
            ]);

        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Service $service) => [
                'id' => $service->id,
                'slug' => $service->slug,
                'title' => $service->title,
                'description' => $service->description,
                'longDescription' => $service->description,
                'image' => $this->toPublicUrl($service->image),
                'gallery' => $this->toPublicUrls($service->gallery ?? []),
                'features' => $service->features ?? [],
            ]);

        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'slug' => $product->slug,
                'name' => $product->name,
                'description' => $product->description,
                'longDescription' => $product->description,
                'price' => $product->price,
                'image' => $this->toPublicUrl($product->image),
                'gallery' => $this->toPublicUrls($product->gallery ?? []),
                'features' => $product->features ?? [],
            ]);

        $galleryItems = GalleryItem::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->take(6)
            ->get(['id', 'title', 'category', 'location', 'image', 'description'])
            ->map(fn (GalleryItem $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'location' => $item->location,
                'image' => $this->toPublicUrl($item->image),
                'description' => $item->description,
            ]);

        $articleItems = Article::query()
            ->where('is_published', true)
            ->with(['articleCategory:id,name', 'user:id,name'])
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->take(3)
            ->get()
            ->map(fn (Article $article) => [
                'id' => $article->id,
                'slug' => $article->slug,
                'title' => $article->title,
                'excerpt' => $article->excerpt,
                'category' => $article->articleCategory?->name ?? $article->category,
                'date' => optional($article->published_at ?? $article->created_at)->format('d M Y'),
                'readTime' => $article->read_time,
                'image' => $this->toPublicUrl($article->image),
                'author' => $article->user?->name ?? $article->author,
            ]);

        $featuredGalleryImage = $galleryItems->isNotEmpty()
            ? ($galleryItems->random()['image'] ?? null)
            : null;

        return Inertia::render('welcome', [
            'clients' => $clients,
            'services' => $services,
            'products' => $products,
            'galleryItems' => $galleryItems,
            'articleItems' => $articleItems,
        ])->withViewData(Seo::make([
                'title' => "Jasa Neon Sign Malang Custom | Orion's Melody",
                'description' => 'Jasa pembuatan neon sign custom di Malang, berkualitas premium dan harga terjangkau.',
                'keywords' => 'neon sign malang, neon box malang, signage malang, jawa timur',
                'image' => $featuredGalleryImage,
                'url' => route('home'),
                'canonical' => route('home'),
            ]));
    }
}
