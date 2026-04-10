import { Link } from '@inertiajs/react';
import { ArrowRight, BadgeDollarSign, Check, PhoneCall } from 'lucide-react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import SeoHead from '@/components/seo/seo-head';
import type { SeoMeta } from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface ProductsPageProps {
    products: ProductItem[];
    meta: SeoMeta;
}

const WA_NUMBER = '6285136816957';

function getWhatsAppUrl(message: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ProductsPage({ products, meta }: ProductsPageProps) {
    return (
        <>
            <SeoHead meta={meta} />
            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <section
                    className="relative overflow-hidden border-y border-border/40 bg-muted/30 py-14 sm:py-16"
                    aria-labelledby="products-page-heading"
                >
                    <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />
                    <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <Badge className="gap-2">
                                    <BadgeDollarSign className="h-4 w-4" />
                                    Katalog Produk Pariwara
                                </Badge>
                                <h1
                                    id="products-page-heading"
                                    className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                                >
                                    Produk Reklame & Signage Siap Produksi
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    Pilihan produk lengkap dengan material berkualitas, finishing rapi, dan harga
                                    kompetitif untuk kebutuhan promosi bisnis Anda.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-xs">
                                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                        Total Produk
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-foreground">{products.length}</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-xs">
                                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                        Harga Mulai
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-foreground">Rp 150rb</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-10 sm:px-6 lg:px-28"
                    aria-labelledby="products-list-heading"
                >
                    <h2 id="products-list-heading" className="sr-only">
                        Daftar produk
                    </h2>
                    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <li key={product.slug}>
                                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <Link href={`/produk/${product.slug}`} className="relative block h-48 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
                                    </Link>

                                    <div className="flex flex-1 flex-col gap-3 p-5">
                                        <h3 className="line-clamp-2 text-lg font-bold text-foreground">{product.name}</h3>
                                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                            {product.description}
                                        </p>

                                        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                                            <p className="text-xs text-muted-foreground">Mulai dari</p>
                                            <p className="text-xl font-bold text-primary">{product.price}</p>
                                        </div>

                                        <ul className="space-y-2 pt-1">
                                            {product.features.slice(0, 2).map((feature) => (
                                                <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto grid grid-cols-1 gap-3 pt-2">
                                            <Button asChild variant="outline" size="sm">
                                                <a
                                                    href={getWhatsAppUrl(
                                                        `Halo, saya ingin konsultasi tentang produk ${product.name}.`,
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <PhoneCall className="h-4 w-4" />
                                                    Konsultasi
                                                </a>
                                            </Button>
                                            <Button asChild size="sm">
                                                <Link href={`/produk/${product.slug}`}>
                                                    Lihat Detail
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <Whatsapp />
        </>
    );
}
