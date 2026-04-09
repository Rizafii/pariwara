<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Client;
use App\Models\GalleryItem;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class WebsiteContentSeeder extends Seeder
{
    /**
     * Seed the application's website content.
     */
    public function run(): void
    {
        $this->seedClients();
        $this->seedServices();
        $this->seedProducts();
        $this->seedGallery();
        $categoryMap = $this->seedArticleCategories();
        $this->seedArticles($categoryMap);
    }

    private function seedClients(): void
    {
        $clients = [
            [
                'name' => 'PT Nusantara Retail',
                'logo' => 'https://placehold.co/320x120/e2e8f0/0f172a?text=Nusantara+Retail',
                'url' => 'https://example.com',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Sae Group',
                'logo' => 'https://placehold.co/320x120/e2e8f0/0f172a?text=Sae+Group',
                'url' => 'https://example.com',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Mandiri Kuliner',
                'logo' => 'https://placehold.co/320x120/e2e8f0/0f172a?text=Mandiri+Kuliner',
                'url' => 'https://example.com',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Bintang Properti',
                'logo' => 'https://placehold.co/320x120/e2e8f0/0f172a?text=Bintang+Properti',
                'url' => 'https://example.com',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($clients as $client) {
            Client::query()->updateOrCreate(
                ['name' => $client['name']],
                $client,
            );
        }
    }

    private function seedServices(): void
    {
        $services = [
            [
                'title' => 'Neon Box Premium',
                'slug' => 'neon-box-premium',
                'description' => 'Produksi neon box custom dengan material tahan cuaca dan pencahayaan maksimal.',
                'long_description' => 'Layanan neon box premium mencakup konsultasi desain, pemilihan material, proses produksi, hingga instalasi di lokasi. Cocok untuk toko, restoran, dan kantor.',
                'image' => 'https://placehold.co/1200x760/0f172a/f8fafc?text=Neon+Box',
                'gallery' => [
                    'https://placehold.co/1200x760/1e293b/f8fafc?text=Neon+Box+1',
                    'https://placehold.co/1200x760/1e293b/f8fafc?text=Neon+Box+2',
                ],
                'features' => [
                    'Material acrylic berkualitas',
                    'Lampu LED hemat energi',
                    'Instalasi aman dan rapi',
                ],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Huruf Timbul',
                'slug' => 'huruf-timbul',
                'description' => 'Pembuatan huruf timbul stainless, galvanis, dan acrylic untuk branding fasad.',
                'long_description' => 'Huruf timbul memberi kesan elegan dan profesional pada identitas visual brand. Dikerjakan presisi dengan berbagai finishing dan opsi lampu.',
                'image' => 'https://placehold.co/1200x760/0f172a/f8fafc?text=Huruf+Timbul',
                'gallery' => [
                    'https://placehold.co/1200x760/334155/f8fafc?text=Huruf+Timbul+1',
                    'https://placehold.co/1200x760/334155/f8fafc?text=Huruf+Timbul+2',
                ],
                'features' => [
                    'Presisi pemotongan tinggi',
                    'Pilihan bahan lengkap',
                    'Finishing premium',
                ],
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Pylon Sign',
                'slug' => 'pylon-sign',
                'description' => 'Solusi papan penanda tinggi untuk area komersial dan kawasan bisnis.',
                'long_description' => 'Pylon sign dirancang untuk visibilitas jarak jauh dengan struktur kuat dan tahan lama. Kami menangani perencanaan struktur sampai instalasi.',
                'image' => 'https://placehold.co/1200x760/0f172a/f8fafc?text=Pylon+Sign',
                'gallery' => [
                    'https://placehold.co/1200x760/475569/f8fafc?text=Pylon+Sign+1',
                    'https://placehold.co/1200x760/475569/f8fafc?text=Pylon+Sign+2',
                ],
                'features' => [
                    'Desain menonjol dari kejauhan',
                    'Struktur kokoh',
                    'Perawatan mudah',
                ],
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::query()->updateOrCreate(
                ['slug' => $service['slug']],
                $service,
            );
        }
    }

    private function seedProducts(): void
    {
        $products = [
            [
                'name' => 'Sign Box Acrylic',
                'slug' => 'sign-box-acrylic',
                'description' => 'Sign box custom untuk branding toko dengan tampilan modern.',
                'long_description' => 'Sign box acrylic dibuat menggunakan bahan berkualitas dengan opsi lampu internal. Cocok untuk identitas visual outdoor dan indoor.',
                'price' => 'Rp 750.000',
                'image' => 'https://placehold.co/1200x760/111827/f8fafc?text=Sign+Box',
                'gallery' => [
                    'https://placehold.co/1200x760/1f2937/f8fafc?text=Sign+Box+1',
                    'https://placehold.co/1200x760/1f2937/f8fafc?text=Sign+Box+2',
                ],
                'features' => [
                    'Desain custom',
                    'Ketahanan tinggi',
                    'Pencahayaan merata',
                ],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Letter Sign Stainless',
                'slug' => 'letter-sign-stainless',
                'description' => 'Huruf timbul stainless untuk fasad kantor dan toko premium.',
                'long_description' => 'Letter sign stainless memberikan kesan elegan dan profesional. Tersedia variasi warna finishing dan pencahayaan opsional.',
                'price' => 'Rp 1.250.000',
                'image' => 'https://placehold.co/1200x760/111827/f8fafc?text=Letter+Sign',
                'gallery' => [
                    'https://placehold.co/1200x760/374151/f8fafc?text=Letter+Sign+1',
                    'https://placehold.co/1200x760/374151/f8fafc?text=Letter+Sign+2',
                ],
                'features' => [
                    'Finishing premium',
                    'Tahan korosi',
                    'Bisa dengan LED backlight',
                ],
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Papan Nama Usaha',
                'slug' => 'papan-nama-usaha',
                'description' => 'Papan nama bisnis siap pasang dengan ukuran fleksibel.',
                'long_description' => 'Produk papan nama usaha tersedia dalam banyak opsi material dan desain sesuai kebutuhan promosi Anda.',
                'price' => 'Rp 450.000',
                'image' => 'https://placehold.co/1200x760/111827/f8fafc?text=Papan+Nama',
                'gallery' => [
                    'https://placehold.co/1200x760/4b5563/f8fafc?text=Papan+Nama+1',
                    'https://placehold.co/1200x760/4b5563/f8fafc?text=Papan+Nama+2',
                ],
                'features' => [
                    'Harga kompetitif',
                    'Desain fleksibel',
                    'Produksi cepat',
                ],
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::query()->updateOrCreate(
                ['slug' => $product['slug']],
                $product,
            );
        }
    }

    private function seedGallery(): void
    {
        $galleryItems = [
            [
                'title' => 'Neon Box Cafe Urban',
                'category' => 'Signage',
                'location' => 'Bandung',
                'image' => 'https://placehold.co/1200x760/0f172a/f8fafc?text=Project+1',
                'description' => 'Instalasi neon box custom untuk fasad cafe di pusat kota.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Huruf Timbul Kantor Pusat',
                'category' => 'Branding',
                'location' => 'Jakarta',
                'image' => 'https://placehold.co/1200x760/1e293b/f8fafc?text=Project+2',
                'description' => 'Huruf timbul stainless dengan backlight untuk kantor pusat.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Pylon Sign Area Komersial',
                'category' => 'Outdoor',
                'location' => 'Surabaya',
                'image' => 'https://placehold.co/1200x760/334155/f8fafc?text=Project+3',
                'description' => 'Pylon sign untuk area bisnis dengan visibilitas tinggi.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Sign Box Gerai Ritel',
                'category' => 'Retail',
                'location' => 'Yogyakarta',
                'image' => 'https://placehold.co/1200x760/475569/f8fafc?text=Project+4',
                'description' => 'Produksi dan pemasangan sign box untuk gerai ritel modern.',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($galleryItems as $item) {
            GalleryItem::query()->updateOrCreate(
                [
                    'title' => $item['title'],
                    'category' => $item['category'],
                ],
                $item,
            );
        }
    }

    /**
     * @return array<string, int>
     */
    private function seedArticleCategories(): array
    {
        $categories = [
            'Edukasi',
            'Branding',
            'Tips Bisnis',
        ];

        $categoryMap = [];

        foreach ($categories as $categoryName) {
            $category = ArticleCategory::query()->updateOrCreate(
                ['slug' => Str::slug($categoryName)],
                ['name' => $categoryName],
            );

            $categoryMap[$categoryName] = $category->id;
        }

        return $categoryMap;
    }

    /**
     * @param  array<string, int>  $categoryMap
     */
    private function seedArticles(array $categoryMap): void
    {
        $author = User::query()->first();

        if (! $author) {
            $author = User::query()->create([
                'name' => 'Tim Pariwara',
                'email' => 'author@pariwara.local',
                'password' => bcrypt('password'),
            ]);
        }

        $articles = [
            [
                'title' => 'Cara Memilih Material Signage yang Tahan Lama',
                'slug' => 'cara-memilih-material-signage-yang-tahan-lama',
                'excerpt' => 'Kenali jenis material signage dan tips memilih yang paling sesuai untuk kebutuhan bisnis Anda.',
                'content' => '<h2>Kenapa Material Signage Penting?</h2><p>Material menentukan ketahanan, estetika, dan biaya perawatan signage Anda.</p><h3>1. Sesuaikan dengan Lokasi</h3><p>Area outdoor membutuhkan material lebih tahan cuaca seperti galvanis atau acrylic tebal.</p><h3>2. Pertimbangkan Perawatan</h3><p>Pilih material yang mudah dibersihkan agar tampilan brand tetap maksimal.</p>',
                'category_name' => 'Edukasi',
                'read_time' => '5 min read',
                'image' => 'https://placehold.co/1200x760/0f172a/f8fafc?text=Artikel+1',
                'published_at' => Carbon::now()->subDays(10),
                'sort_order' => 1,
            ],
            [
                'title' => 'Strategi Branding Visual untuk Toko Ritel',
                'slug' => 'strategi-branding-visual-untuk-toko-ritel',
                'excerpt' => 'Pelajari elemen visual yang membantu toko ritel lebih mudah dikenali pelanggan.',
                'content' => '<h2>Bangun Identitas yang Konsisten</h2><p>Konsistensi visual membantu pelanggan mengenali brand dengan cepat.</p><ul><li>Gunakan warna brand yang jelas</li><li>Pilih jenis huruf yang konsisten</li><li>Pastikan pesan utama mudah dibaca</li></ul>',
                'category_name' => 'Branding',
                'read_time' => '6 min read',
                'image' => 'https://placehold.co/1200x760/1e293b/f8fafc?text=Artikel+2',
                'published_at' => Carbon::now()->subDays(6),
                'sort_order' => 2,
            ],
            [
                'title' => 'Estimasi Biaya Pembuatan Neon Box',
                'slug' => 'estimasi-biaya-pembuatan-neon-box',
                'excerpt' => 'Faktor utama yang mempengaruhi biaya produksi neon box dan cara optimasinya.',
                'content' => '<h2>Komponen Utama Biaya</h2><p>Ukuran, jenis material, dan sistem pencahayaan menjadi penentu utama biaya.</p><p>Lakukan konsultasi awal agar estimasi lebih presisi sesuai kebutuhan bisnis.</p>',
                'category_name' => 'Tips Bisnis',
                'read_time' => '4 min read',
                'image' => 'https://placehold.co/1200x760/334155/f8fafc?text=Artikel+3',
                'published_at' => Carbon::now()->subDays(2),
                'sort_order' => 3,
            ],
        ];

        foreach ($articles as $article) {
            $categoryName = $article['category_name'];

            Article::query()->updateOrCreate(
                ['slug' => $article['slug']],
                [
                    'title' => $article['title'],
                    'excerpt' => $article['excerpt'],
                    'content' => $article['content'],
                    'article_category_id' => $categoryMap[$categoryName] ?? null,
                    'category' => $categoryName,
                    'read_time' => $article['read_time'],
                    'image' => $article['image'],
                    'user_id' => $author->id,
                    'author' => $author->name,
                    'published_at' => $article['published_at'],
                    'is_published' => true,
                    'sort_order' => $article['sort_order'],
                ],
            );
        }
    }
}
