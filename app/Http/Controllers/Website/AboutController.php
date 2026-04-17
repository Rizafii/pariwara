<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('tentang')
            ->withViewData(Seo::make([
                'title' => 'Tentang Kami | CV. PARIWARA SATU SAE',
                'description' => 'Profil CV. Pariwara Satu Sae, mitra signage dan neon sign untuk branding usaha di Malang, Jawa Timur.',
                'keywords' => 'tentang neon sign malang, profil branding usaha malang, signage jawa timur',
                'image' => asset('logo/logo.webp'),
                'url' => route('tentang'),
                'canonical' => route('tentang'),
            ]));
    }
}
