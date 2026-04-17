<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('kontak')
            ->withViewData(Seo::make([
                'title' => 'Kontak Kami | CV. PARIWARA SATU SAE',
                'description' => 'Hubungi CV. Pariwara Satu Sae untuk konsultasi kebutuhan neon sign, signage, dan branding usaha Anda.',
                'keywords' => 'kontak neon sign malang, jasa signage malang, konsultasi branding usaha',
                'image' => asset('logo/logo.webp'),
                'url' => route('kontak'),
                'canonical' => route('kontak'),
            ]));
    }
}
