<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class GoogleAdsLandingController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('landing/google-ads', [
            'landingUrl' => route('landing.google-ads'),
        ])->withViewData(Seo::make([
            'title' => 'Jasa Neon Sign Malang Custom | Konsultasi Gratis - CV. PARIWARA SATU SAE',
            'description' => 'Jasa neon sign, huruf timbul, dan signage toko di Malang. Desain custom, produksi rapi, instalasi aman, konsultasi gratis via WhatsApp.',
            'keywords' => 'jasa neon sign malang, pembuatan neon sign malang, signage toko malang, huruf timbul malang',
            'image' => asset('logo/logo.webp'),
            'url' => route('landing.google-ads'),
            'canonical' => route('landing.google-ads'),
        ]));
    }
}