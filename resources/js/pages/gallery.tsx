import { Link } from '@inertiajs/react';
import { ArrowRight, Images, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    location?: string | null;
    image: string;
    description?: string | null;
}

interface GalleryPageProps {
    items: GalleryItem[];
}

export default function GalleryPage({ items }: GalleryPageProps) {
    const [activeFilter, setActiveFilter] = useState('Semua');
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

    const galleryFilters = useMemo(
        () => ['Semua', ...new Set(items.map((item) => item.category))],
        [items],
    );

    const selectedIndex = useMemo(
        () => items.findIndex((item) => item.id === selectedImageId),
        [selectedImageId, items],
    );

    const filteredGallery = useMemo(() => {
        if (activeFilter === 'Semua') {
            return items;
        }

        return items.filter((item) => item.category === activeFilter);
    }, [activeFilter, items]);

    const selectedItem = selectedIndex >= 0 ? items[selectedIndex] : null;

    return (
        <>
            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <section
                    className="relative overflow-hidden border-y border-border/40 bg-muted/30 py-14 sm:py-16"
                    aria-labelledby="gallery-page-heading"
                >
                    <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                            <div>
                                <Badge className="gap-2">
                                    <Images className="h-4 w-4" />
                                    Portofolio Proyek
                                </Badge>
                                <h1
                                    id="gallery-page-heading"
                                    className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-tight"
                                >
                                    Gallery Hasil Produksi & Pemasangan
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    Dokumentasi proyek nyata dari tim kami untuk berbagai kebutuhan signage,
                                    reklame, branding, hingga LED display.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-xs">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Total Proyek
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-foreground">500+</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-xs">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Kota Jangkauan
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-foreground">15+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-12 sm:px-6 lg:px-28"
                    aria-labelledby="gallery-list-heading"
                >
                    <h2 id="gallery-list-heading" className="sr-only">
                        Daftar proyek galeri
                    </h2>

                    <nav className="flex flex-wrap gap-3" aria-label="Filter kategori galeri">
                        {galleryFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                aria-pressed={activeFilter === filter}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    activeFilter === filter
                                        ? 'border-primary bg-primary text-foreground shadow-sm'
                                        : 'border-border/80 bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </nav>

                    <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredGallery.map((item) => (
                            <li key={item.id}>
                                <article className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <button
                                        className="relative block h-60 w-full cursor-zoom-in overflow-hidden"
                                        onClick={() => setSelectedImageId(item.id)}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                                        <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                                            Klik untuk lihat
                                        </span>
                                    </button>

                                    <div className="space-y-3 p-5">
                                        <div className="flex items-center justify-between gap-3">
                                            <Badge variant="outline">{item.category}</Badge>
                                            <span className="text-xs text-muted-foreground">{item.location ?? '-'}</span>
                                        </div>
                                        <h3 className="line-clamp-1 text-lg font-bold text-foreground">{item.title}</h3>
                                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                </section>

                <section
                    className="container mx-auto px-4 pt-16 sm:px-6 lg:px-28"
                    aria-labelledby="gallery-cta-heading"
                >
                    <div className="rounded-3xl border border-border/60 bg-muted/30 p-8 sm:p-10">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <Badge className="gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Siap Mulai Proyek Anda?
                                </Badge>
                                <h2
                                    id="gallery-cta-heading"
                                    className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                                >
                                    Ceritakan kebutuhan signage bisnis Anda kepada tim kami.
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    Kami bantu dari tahap konsep, desain visual, produksi, hingga pemasangan.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                                <Button asChild size="lg">
                                    <a href="https://wa.me/628123394055" target="_blank" rel="noopener noreferrer">
                                        Konsultasi Gratis
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/layanan">Lihat Layanan</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Dialog open={selectedImageId !== null} onOpenChange={(open) => !open && setSelectedImageId(null)}>
                <DialogContent className="max-w-5xl border-none bg-black/95 p-3">
                    {selectedItem && (
                        <div className="space-y-4">
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.title}
                                className="max-h-[75vh] w-full rounded-xl object-contain"
                            />
                            <div className="flex flex-col gap-2 px-2 text-white sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.15em] text-white/65">
                                        {selectedItem.category} • {selectedItem.location ?? '-'}
                                    </p>
                                    <p className="mt-1 text-base font-semibold">{selectedItem.title}</p>
                                </div>
                                <p className="max-w-2xl text-sm text-white/75">{selectedItem.description ?? '-'}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Whatsapp />
        </>
    );
}
