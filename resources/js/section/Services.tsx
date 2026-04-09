import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WA_NUMBER = '6281234567890';

interface ServiceItem {
    id: number;
    slug: string;
    title: string;
    description: string;
    longDescription?: string | null;
    image: string;
    gallery: string[];
    features: string[];
}

function getWhatsAppUrl(message: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Services({ services = [] }: { services?: ServiceItem[] }) {
    return (
        <section className="bg-muted/30 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <Badge>Apa Yang Kami Tawarkan</Badge>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Layanan Kami
                        </h2>
                    </div>
                    <p className="max-w-md text-muted-foreground md:text-right">
                        Solusi lengkap untuk kebutuhan reklame, signage, dan
                        advertising bisnis Anda dengan kualitas terbaik.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/layanan/${service.slug}`}
                            className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-4 p-6">
                                <h3
                                    className="truncate text-xl font-bold text-foreground"
                                    title={service.title}
                                >
                                    {service.title}
                                </h3>
                                <p
                                    className="line-clamp-2 text-sm leading-relaxed text-muted-foreground"
                                    title={service.description}
                                >
                                    {service.description}
                                </p>
                                <div
                                    className="mt-auto flex gap-3"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        <a
                                            href={getWhatsAppUrl(
                                                `Halo, saya ingin konsultasi tentang ${service.title}.`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Konsultasi Gratis
                                        </a>
                                    </Button>
                                    <Button asChild className="flex-1">
                                        <a
                                            href={getWhatsAppUrl(
                                                `Halo, saya ingin pesan ${service.title}.`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Pesan Sekarang
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
