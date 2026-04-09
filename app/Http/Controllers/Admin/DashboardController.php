<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Client;
use App\Models\GalleryItem;
use App\Models\Product;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'clients' => Client::query()->count(),
                'services' => Service::query()->count(),
                'products' => Product::query()->count(),
                'galleryItems' => GalleryItem::query()->count(),
                'articles' => Article::query()->count(),
            ],
        ]);
    }
}
