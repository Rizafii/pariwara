<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Concerns\BuildsSeoMeta;
use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    use BuildsSeoMeta;
    use InteractsWithMedia;

    public function index(): Response
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Service $service) => $this->transformService($service));

        $metaImage = $services->first()['image']
            ?? $this->toPublicUrl(
                GalleryItem::query()->where('is_active', true)->inRandomOrder()->value('image'),
            );

        return Inertia::render('layanan/index', [
            'services' => $services,
            'meta' => $this->buildSeoMeta([
                'title' => 'Layanan Neon Sign & Branding Usaha | Malang',
                'description' => 'Layanan desain, produksi, dan pemasangan neon sign serta signage untuk bisnis di Malang dan Jawa Timur.',
                'keywords' => [
                    'layanan neon sign malang',
                    'jasa signage malang',
                    'branding usaha malang',
                ],
                'image' => $metaImage,
                'url' => route('layanan.index'),
            ]),
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        $otherServices = Service::query()
            ->where('is_active', true)
            ->where('id', '!=', $service->id)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->take(3)
            ->get()
            ->map(fn (Service $item) => $this->transformService($item));

        $serviceGallery = is_array($service->gallery) ? $service->gallery : [];

        $metaImage = $this->toPublicUrl($service->image)
            ?? $this->toPublicUrl($serviceGallery[0] ?? null)
            ?? $this->toPublicUrl(
                GalleryItem::query()->where('is_active', true)->inRandomOrder()->value('image'),
            );

        return Inertia::render('layanan/[slug]', [
            'slug' => $slug,
            'service' => $this->transformService($service),
            'otherServices' => $otherServices,
            'meta' => $this->buildSeoMeta([
                'title' => $service->title.' - Neon Sign Malang',
                'description' => $this->excerptFromHtml($service->description, 160),
                'keywords' => [
                    $service->title,
                    'neon sign malang',
                    'signage malang',
                ],
                'image' => $metaImage,
                'url' => route('layanan.show', ['slug' => $slug]),
            ]),
        ]);
    }

    private function transformService(Service $service): array
    {
        return [
            'id' => $service->id,
            'slug' => $service->slug,
            'title' => $service->title,
            'description' => $service->description,
            'longDescription' => $service->description,
            'image' => $this->toPublicUrl($service->image),
            'gallery' => $this->toPublicUrls($service->gallery ?? []),
            'features' => $service->features ?? [],
        ];
    }
}
