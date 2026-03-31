import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WA_NUMBER = '6281234567890';

export const PRODUCTS = [
    {
        slug: 'neon-sign-custom',
        name: 'Neon Sign Custom',
        description:
            'Neon sign dengan desain custom sesuai kebutuhan branding Anda. Bahan berkualitas, tahan lama, dan hemat energi.',
        longDescription:
            'Neon sign custom kami dibuat menggunakan teknologi LED neon flex terbaru yang hemat energi dan tahan lama. Setiap desain dikerjakan dengan presisi tinggi untuk menghasilkan pencahayaan merata dan warna yang vibrant. Tersedia dalam berbagai bentuk, ukuran, dan warna sesuai kebutuhan branding bisnis Anda. Cocok untuk dekorasi interior restoran, kafe, studio, maupun signage eksterior.',
        price: 'Rp 500.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Neon+Sign',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+4',
        ],
        features: [
            'LED neon flex hemat energi',
            'Custom desain & warna',
            'Tahan air (IP65)',
            'Garansi 1 tahun',
        ],
    },
    {
        slug: 'letter-timbul-stainless',
        name: 'Letter Timbul Stainless',
        description:
            'Huruf timbul berbahan stainless steel dengan finishing premium. Cocok untuk fasad gedung dan kantor.',
        longDescription:
            'Letter timbul stainless steel dengan finishing mirror, hairline, atau gold sesuai pilihan. Dibuat dengan teknik laser cutting presisi tinggi untuk hasil yang rapi dan detail. Material tahan karat dan tahan cuaca, cocok untuk penggunaan outdoor jangka panjang. Ideal untuk fasad gedung, lobby kantor, hotel, dan tempat usaha.',
        price: 'Rp 300.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Letter+Stainless',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Stainless+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Stainless+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Stainless+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Stainless+4',
        ],
        features: [
            'Stainless steel premium',
            'Finishing mirror/hairline/gold',
            'Laser cutting presisi',
            'Tahan karat & cuaca',
        ],
    },
    {
        slug: 'letter-timbul-akrilik',
        name: 'Letter Timbul Akrilik',
        description:
            'Huruf timbul akrilik dengan pilihan warna beragam dan bisa dilengkapi lampu LED backlight.',
        longDescription:
            'Letter timbul akrilik tersedia dalam berbagai ketebalan dan warna. Bisa dilengkapi dengan lampu LED backlight atau frontlight untuk efek pencahayaan yang menawan. Material akrilik berkualitas tinggi dengan daya tahan baik. Solusi ekonomis namun tetap tampil profesional untuk signage toko, kafe, dan tempat usaha.',
        price: 'Rp 150.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Letter+Akrilik',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Akrilik+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Akrilik+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Akrilik+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Akrilik+4',
        ],
        features: [
            'Pilihan warna beragam',
            'LED backlight/frontlight',
            'Harga ekonomis',
            'Ringan & mudah dipasang',
        ],
    },
    {
        slug: 'billboard-baliho',
        name: 'Billboard & Baliho',
        description:
            'Papan reklame ukuran besar untuk iklan outdoor. Tersedia berbagai ukuran dan bahan berkualitas tinggi.',
        longDescription:
            'Billboard dan baliho berkualitas tinggi untuk kebutuhan iklan outdoor skala besar. Tersedia dalam berbagai ukuran standar maupun custom. Menggunakan bahan flexi, vinyl, atau aluminium composite panel yang tahan cuaca. Dilengkapi dengan rangka baja kokoh dan sistem pencahayaan untuk visibilitas malam hari.',
        price: 'Rp 2.000.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Billboard',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Billboard+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Billboard+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Billboard+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Billboard+4',
        ],
        features: [
            'Ukuran custom tersedia',
            'Material tahan cuaca',
            'Rangka baja kokoh',
            'Pencahayaan malam hari',
        ],
    },
    {
        slug: 'running-text-led',
        name: 'Running Text LED',
        description:
            'Display running text LED untuk informasi promosi yang dinamis. Bisa diatur via remote atau aplikasi.',
        longDescription:
            'Running text LED display untuk menampilkan informasi promosi secara dinamis dan menarik. Tersedia dalam berbagai ukuran dan warna (single color, dual color, full color). Mudah diatur dan diupdate kontennya melalui remote control, USB, atau aplikasi smartphone. Hemat energi dan tahan lama dengan garansi komponen.',
        price: 'Rp 1.500.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Running+Text',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Running+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Running+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Running+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Running+4',
        ],
        features: [
            'Single/dual/full color',
            'Kontrol via remote & apps',
            'Hemat energi',
            'Garansi komponen',
        ],
    },
    {
        slug: 'neon-box',
        name: 'Neon Box',
        description:
            'Box sign dengan pencahayaan dalam yang merata. Ideal untuk toko, apotek, minimarket, dan usaha lainnya.',
        longDescription:
            'Neon box dengan pencahayaan LED dalam yang merata dan terang. Dibuat dari bahan akrilik dan aluminium frame yang kokoh dan tahan lama. Desain bisa satu sisi atau dua sisi sesuai kebutuhan. Ideal untuk signage toko, apotek, minimarket, restoran, dan berbagai jenis usaha lainnya.',
        price: 'Rp 800.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Neon+Box',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Box+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Box+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Box+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Box+4',
        ],
        features: [
            'LED hemat energi',
            'Satu sisi / dua sisi',
            'Akrilik & aluminium frame',
            'Custom ukuran',
        ],
    },
    {
        slug: 'papan-nama-toko',
        name: 'Papan Nama Toko',
        description:
            'Papan nama toko custom dengan berbagai material: akrilik, galvanis, dan aluminium composite panel.',
        longDescription:
            'Papan nama toko custom berkualitas dengan pilihan material akrilik, galvanis, aluminium composite panel (ACP), atau kombinasi. Desain bisa disertai logo, tulisan timbul, dan pencahayaan LED. Tersedia dalam berbagai ukuran dan bentuk sesuai kebutuhan dan karakter bisnis Anda.',
        price: 'Rp 250.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Papan+Nama',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Papan+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Papan+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Papan+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Papan+4',
        ],
        features: [
            'Akrilik, galvanis, ACP',
            'Custom desain & ukuran',
            'Logo & tulisan timbul',
            'Pencahayaan LED',
        ],
    },
    {
        slug: 'videotron-led-display',
        name: 'Videotron / LED Display',
        description:
            'LED display resolusi tinggi untuk iklan digital indoor maupun outdoor. Full color, tahan cuaca.',
        longDescription:
            'Videotron dan LED display resolusi tinggi untuk kebutuhan iklan digital indoor maupun outdoor. Panel LED full color dengan kecerahan tinggi yang tetap terlihat jelas di bawah sinar matahari. Dilengkapi sistem kontrol canggih untuk mengatur konten secara real-time. Tahan cuaca dan hemat energi dengan masa pakai panjang.',
        price: 'Rp 5.000.000',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Videotron',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Videotron+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Videotron+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Videotron+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Videotron+4',
        ],
        features: [
            'Full color resolusi tinggi',
            'Indoor & outdoor',
            'Kontrol real-time',
            'Tahan cuaca & hemat energi',
        ],
    },
];

function getWhatsAppUrl(message: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Products() {
    return (
        <section className="bg-muted/30 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <Badge>Katalog Produk</Badge>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Produk Kami
                        </h2>
                    </div>
                    <p className="max-w-md text-muted-foreground md:text-right">
                        Beragam produk signage dan reklame berkualitas dengan
                        harga kompetitif untuk kebutuhan bisnis Anda.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {PRODUCTS.map((product) => (
                        <Link
                            key={product.slug}
                            href={`/produk/${product.slug}`}
                            className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-3 p-5">
                                <h3
                                    className="truncate text-lg font-bold text-foreground"
                                    title={product.name}
                                >
                                    {product.name}
                                </h3>
                                <p
                                    className="line-clamp-2 text-sm leading-relaxed text-muted-foreground"
                                    title={product.description}
                                >
                                    {product.description}
                                </p>

                                {/* Price */}
                                <div className="mt-1">
                                    <p className="text-xs text-muted-foreground">
                                        Mulai dari
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        {product.price}
                                    </p>
                                </div>

                                {/* CTA */}
                                <div
                                    className="mt-2 flex gap-3"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <a
                                            href={getWhatsAppUrl(
                                                `Halo, saya ingin konsultasi tentang produk ${product.name}.`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Konsultasi
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <a
                                            href={getWhatsAppUrl(
                                                `Halo, saya ingin pesan produk ${product.name}.`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Pesan
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
