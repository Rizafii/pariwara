import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import { useState } from 'react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ProductItem {
    id: number;
    slug: string;
    name: string;
    description: string;
    longDescription?: string | null;
    price: string;
    image: string;
    gallery: string[];
    features: string[];
}

const WA_NUMBER = '6285136816957';

function getWhatsAppUrl(message: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface ProductDetailProps {
    product: ProductItem | null;
    otherProducts: ProductItem[];
}

export default function ProductDetail({ product, otherProducts }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!product) {
        return (
            <>
                <Head title="Produk Tidak Ditemukan" />
                <Navbar />
                <main className="flex min-h-screen items-center justify-center px-4">
                    <section className="text-center">
                        <h1 className="text-4xl font-bold text-foreground">404</h1>
                        <p className="mt-2 text-muted-foreground">Produk tidak ditemukan.</p>
                        <Button asChild className="mt-6">
                            <Link href="/">Kembali ke Beranda</Link>
                        </Button>
                    </section>
                </main>
            </>
        );
    }

    const galleryImages = product.gallery.length > 0 ? product.gallery : [product.image];

    return (
        <>
            <Head title={product.name} />
            <Navbar />

            <main className="bg-background pt-32 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/"
                            className="transition-colors hover:text-foreground"
                        >
                            Beranda
                        </Link>
                        <span>/</span>
                        <Link
                            href="/produk"
                            className="transition-colors hover:text-foreground"
                        >
                            Produk
                        </Link>
                        <span>/</span>
                        <span className="text-foreground" aria-current="page">{product.name}</span>
                    </nav>

                    {/* Hero Section */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div
                                className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl border border-border/50"
                                onClick={() => setLightboxOpen(true)}
                            >
                                <img
                                    src={galleryImages[selectedImage]}
                                    alt={`${product.name} - Gambar ${selectedImage + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
                                <div className="absolute right-4 bottom-4 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    Klik untuk perbesar
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <ul className="grid grid-cols-4 gap-3">
                                {galleryImages.map((img, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-4/3 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                                                selectedImage === index
                                                    ? 'border-primary shadow-md'
                                                    : 'border-border/50 opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col gap-6">
                            <div>
                                <Badge>Produk</Badge>
                                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Price */}
                            <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-4">
                                <p className="text-sm text-muted-foreground">
                                    Mulai dari
                                </p>
                                <p className="text-3xl font-bold text-primary">
                                    {product.price}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    *Harga dapat bervariasi sesuai ukuran dan
                                    spesifikasi
                                </p>
                            </div>

                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {product.longDescription ?? product.description}
                            </p>

                            {/* Features */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-foreground">
                                    Spesifikasi & Keunggulan
                                </h3>
                                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {product.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-3 text-sm text-muted-foreground"
                                        >
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Check className="h-3.5 w-3.5" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex w-full flex-col gap-3 sm:flex-row">
                                <Button asChild size="lg" className="w-full">
                                    <a
                                        href={getWhatsAppUrl(
                                            `Halo, saya ingin konsultasi tentang produk ${product.name}.`,
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Phone className="mr-2 h-5 w-5" />
                                        Konsultasi Gratis
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                >
                                    <a
                                        href={getWhatsAppUrl(
                                            `Halo, saya ingin pesan produk ${product.name}.`,
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Pesan Sekarang
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Other Products */}
                    {otherProducts.length > 0 && (
                        <section className="mt-20" aria-labelledby="other-products-heading">
                            <div className="flex items-center justify-between">
                                <h2 id="other-products-heading" className="text-2xl font-bold text-foreground">
                                    Produk Lainnya
                                </h2>
                                <Button asChild variant="ghost">
                                    <Link href="/produk">
                                        Lihat Semua
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {otherProducts.map((p) => (
                                    <li key={p.slug}>
                                        <article className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                            <Link href={`/produk/${p.slug}`}>
                                                <div className="relative h-40 overflow-hidden">
                                                    <img
                                                        src={p.image}
                                                        alt={p.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="truncate text-base font-bold text-foreground">
                                                        {p.name}
                                                    </h3>
                                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                        {p.description}
                                                    </p>
                                                    <p className="mt-3 text-lg font-bold text-primary">
                                                        {p.price}
                                                    </p>
                                                </div>
                                            </Link>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </main>

            {/* Lightbox */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent className="max-w-4xl border-none bg-black/95 p-2">
                    <div className="relative flex items-center justify-center">
                        <button
                            onClick={() =>
                                setSelectedImage(
                                    (prev) =>
                                        (prev - 1 + galleryImages.length) %
                                        galleryImages.length,
                                )
                            }
                            className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                        <img
                            src={galleryImages[selectedImage]}
                            alt={`${product.name} - Gambar ${selectedImage + 1}`}
                            className="max-h-[80vh] w-full rounded-lg object-contain"
                        />
                        <button
                            onClick={() =>
                                setSelectedImage(
                                    (prev) =>
                                        (prev + 1) % galleryImages.length,
                                )
                            }
                            className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        >
                            <ArrowRight className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-2 flex justify-center gap-2">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`h-2 w-2 rounded-full transition-all ${
                                    selectedImage === index
                                        ? 'w-6 bg-white'
                                        : 'bg-white/40 hover:bg-white/60'
                                }`}
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <Whatsapp />
        </>
    );
}
