<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Concerns\BuildsSeoMeta;
use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    use BuildsSeoMeta;
    use InteractsWithMedia;

    public function index(): Response
    {
        $items = GalleryItem::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get(['id', 'title', 'category', 'location', 'image', 'description'])
            ->map(fn (GalleryItem $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'location' => $item->location,
                'image' => $this->toPublicUrl($item->image),
                'description' => $item->description,
            ]);

        return Inertia::render('gallery', [
            'items' => $items,
            'meta' => $this->buildSeoMeta([
                'title' => 'Galeri Proyek Neon Sign Malang | Orion\'s Melody',
                'description' => 'Portofolio proyek neon sign, neon box, dan signage untuk bisnis di Malang dan Jawa Timur.',
                'keywords' => [
                    'galeri neon sign malang',
                    'portofolio signage malang',
                    'branding usaha jawa timur',
                ],
                'image' => $items->first()['image'] ?? null,
                'url' => route('gallery'),
            ]),
        ]);
    }
}
