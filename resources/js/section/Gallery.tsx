import { Link } from '@inertiajs/react';
import { ArrowRight, Camera } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    location?: string | null;
    image: string;
    description?: string | null;
}

export default function Gallery({ items = [] }: { items?: GalleryItem[] }) {
    return (
        <section id="gallery" className="relative overflow-hidden bg-[#101522] py-16 sm:py-20">
            <div className="pointer-events-none absolute -top-28 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
            <div className="pointer-events-none absolute -right-28 bottom-4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <Badge className="gap-2 border-white/20 bg-white/10 text-white">
                            <Camera className="h-4 w-4" />
                            Sorotan Proyek
                        </Badge>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Gallery Pekerjaan Kami
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-right">
                        Beberapa dokumentasi pemasangan signage, reklame, dan media visual yang sudah kami
                        kerjakan untuk berbagai sektor bisnis.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <Link
                            key={item.id}
                            href="/gallery"
                            className="group relative block overflow-hidden rounded-2xl border border-white/10"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
                            </div>

                            <div className="absolute top-4 left-4 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                                {item.category}
                            </div>

                            <div className="absolute right-0 bottom-0 left-0 p-5">
                                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                <p className="mt-1 text-xs text-white/80">{item.location ?? 'Lokasi proyek'}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary/90">
                        <Link href="/gallery">
                            Lihat Semua Gallery
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
