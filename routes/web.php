<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/layanan/{slug}', function (string $slug) {
    return Inertia::render('layanan/[slug]', [
        'slug' => $slug,
    ]);
})->name('layanan.show');

Route::get('/produk/{slug}', function (string $slug) {
    return Inertia::render('produk/[slug]', [
        'slug' => $slug,
    ]);
})->name('produk.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
