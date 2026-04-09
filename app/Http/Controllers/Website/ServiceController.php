<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Service $service) => $this->transformService($service));

        return Inertia::render('layanan/index', [
            'services' => $services,
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

        return Inertia::render('layanan/[slug]', [
            'slug' => $slug,
            'service' => $this->transformService($service),
            'otherServices' => $otherServices,
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
