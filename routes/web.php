<?php

use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\ClientController as AdminClientController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\GalleryItemController as AdminGalleryItemController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Website\ArticleController;
use App\Http\Controllers\Website\AboutController;
use App\Http\Controllers\Website\ContactController;
use App\Http\Controllers\Website\GalleryController;
use App\Http\Controllers\Website\GoogleAdsLandingController;
use App\Http\Controllers\Website\HomeController;
use App\Http\Controllers\Website\ProductController;
use App\Http\Controllers\Website\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

Route::get('/artikel', [ArticleController::class, 'index'])->name('artikel.index');

Route::get('/layanan', [ServiceController::class, 'index'])->name('layanan.index');

Route::get('/produk', [ProductController::class, 'index'])->name('produk.index');

Route::get('/tentang', AboutController::class)->name('tentang');
Route::get('/kontak', ContactController::class)->name('kontak');
Route::get('/jasa-neon-sign-malang', GoogleAdsLandingController::class)->name('landing.google-ads');

Route::redirect('/tentang-kami', '/tentang', 301);

Route::get('/artikel/{slug}', [ArticleController::class, 'show'])->name('artikel.show');

Route::get('/layanan/{slug}', [ServiceController::class, 'show'])->name('layanan.show');

Route::get('/produk/{slug}', [ProductController::class, 'show'])->name('produk.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('clients', [AdminClientController::class, 'index'])->name('clients.index');
        Route::post('clients', [AdminClientController::class, 'store'])->name('clients.store');
        Route::put('clients/{client}', [AdminClientController::class, 'update'])->name('clients.update');
        Route::delete('clients/{client}', [AdminClientController::class, 'destroy'])->name('clients.destroy');

        Route::get('services', [AdminServiceController::class, 'index'])->name('services.index');
        Route::post('services', [AdminServiceController::class, 'store'])->name('services.store');
        Route::put('services/{service}', [AdminServiceController::class, 'update'])->name('services.update');
        Route::delete('services/{service}', [AdminServiceController::class, 'destroy'])->name('services.destroy');

        Route::get('products', [AdminProductController::class, 'index'])->name('products.index');
        Route::post('products', [AdminProductController::class, 'store'])->name('products.store');
        Route::put('products/{product}', [AdminProductController::class, 'update'])->name('products.update');
        Route::delete('products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');

        Route::get('gallery', [AdminGalleryItemController::class, 'index'])->name('gallery.index');
        Route::post('gallery', [AdminGalleryItemController::class, 'store'])->name('gallery.store');
        Route::put('gallery/{galleryItem}', [AdminGalleryItemController::class, 'update'])->name('gallery.update');
        Route::delete('gallery/{galleryItem}', [AdminGalleryItemController::class, 'destroy'])->name('gallery.destroy');

        Route::get('articles', [AdminArticleController::class, 'index'])->name('articles.index');
        Route::post('articles', [AdminArticleController::class, 'store'])->name('articles.store');
        Route::post('articles/upload-image', [AdminArticleController::class, 'uploadImage'])
            ->name('articles.upload-image');
        Route::put('articles/{article}', [AdminArticleController::class, 'update'])->name('articles.update');
        Route::delete('articles/{article}', [AdminArticleController::class, 'destroy'])->name('articles.destroy');
    });
});

require __DIR__.'/settings.php';
