import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WA_NUMBER = '6285136816957';

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

function getWhatsAppUrl(message: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Products({ products = [] }: { products?: ProductItem[] }) {
    return (
        <section
            className="bg-muted/30 py-16 sm:py-20"
            aria-labelledby="products-heading"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <Badge>Katalog Produk</Badge>
                        <h2
                            id="products-heading"
                            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                        >
                            Produk Kami
                        </h2>
                    </div>
                    <p className="max-w-md text-muted-foreground md:text-right">
                        Beragam produk signage dan reklame berkualitas dengan
                        harga kompetitif untuk kebutuhan bisnis Anda.
                    </p>
                </div>

                {/* Products Grid */}
                <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <li key={product.slug}>
                            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <Link href={`/produk/${product.slug}`} className="block">
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
                                    <div className="space-y-3 p-5 pb-4">
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
                                    </div>
                                </Link>

                                {/* CTA */}
                                <div className="mt-auto flex gap-3 px-5 pb-5">
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
                                        >
                                            Pesan
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
