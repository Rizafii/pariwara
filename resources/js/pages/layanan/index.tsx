import { Link } from '@inertiajs/react';
import { ArrowRight, Check, PhoneCall, Sparkles } from 'lucide-react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import SeoHead from '@/components/seo/seo-head';
import type { SeoMeta } from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface ServicesPageProps {
    services: ServiceItem[];
    meta: SeoMeta;
}

const WA_NUMBER = '6285136816957';

function getWhatsAppUrl(message: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ServicesPage({ services, meta }: ServicesPageProps) {
    return (
        <>
            <SeoHead meta={meta} />
            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <section
                    className="relative overflow-hidden border-y border-border/40 bg-muted/30 py-14 sm:py-16"
                    aria-labelledby="services-page-heading"
                >
                    <div className="pointer-events-none absolute -top-28 right-6 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-28 left-4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <Badge className="gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Solusi Lengkap Pariwara
                                </Badge>
                                <h1
                                    id="services-page-heading"
                                    className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                                >
                                    Layanan Signage, Reklame, dan Branding
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    Dari perencanaan hingga instalasi, kami hadir dengan layanan end-to-end
                                    untuk memastikan brand Anda tampil menonjol dan profesional.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-xs">
                                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                        Total Layanan
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-foreground">{services.length}</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-xs">
                                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                        Proyek Selesai
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-foreground">500+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-10 sm:px-6 lg:px-28"
                    aria-labelledby="services-list-heading"
                >
                    <h2 id="services-list-heading" className="sr-only">
                        Daftar layanan
                    </h2>
                    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <li key={service.slug}>
                                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <Link href={`/layanan/${service.slug}`} className="relative block h-56 overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
                                    </Link>

                                    <div className="flex flex-1 flex-col gap-4 p-6">
                                        <h3 className="line-clamp-2 text-xl font-bold text-foreground">{service.title}</h3>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                            {service.description}
                                        </p>

                                        <ul className="grid grid-cols-1 gap-2 pt-1">
                                            {service.features.slice(0, 3).map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-start gap-2 text-xs text-muted-foreground"
                                                >
                                                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                                            <Button asChild variant="outline" size="sm">
                                                <a
                                                    href={getWhatsAppUrl(
                                                        `Halo, saya ingin konsultasi tentang layanan ${service.title}.`,
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <PhoneCall className="h-4 w-4" />
                                                    Konsultasi
                                                </a>
                                            </Button>
                                            <Button asChild size="sm">
                                                <Link href={`/layanan/${service.slug}`}>
                                                    Detail
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
