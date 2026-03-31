import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WA_NUMBER = '6281234567890';

const SERVICES = [
    {
        title: 'Pembuatan Neon Sign',
        description:
            'Desain dan produksi neon sign custom untuk interior maupun eksterior bisnis Anda. Tersedia dalam berbagai bentuk, warna, dan ukuran.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Neon+Sign',
    },
    {
        title: 'Pemasangan Reklame',
        description:
            'Layanan pemasangan reklame indoor & outdoor lengkap dengan perizinan. Billboard, baliho, spanduk, dan media promosi lainnya.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Reklame',
    },
    {
        title: 'Desain & Branding',
        description:
            'Jasa desain grafis profesional untuk kebutuhan branding bisnis Anda. Logo, company profile, dan seluruh materi visual identity.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Branding',
    },
    {
        title: 'LED & Videotron',
        description:
            'Instalasi LED display dan videotron berkualitas tinggi untuk kebutuhan advertising digital. Running text, video wall, dan digital signage.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=LED+Videotron',
    },
    {
        title: 'Letter Timbul & Huruf Akrilik',
        description:
            'Pembuatan letter timbul dari bahan stainless, galvanis, akrilik, dan kuningan. Cocok untuk fasad toko, kantor, dan gedung.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Letter+Timbul',
    },
    {
        title: 'Konstruksi & Rangka Reklame',
        description:
            'Jasa konstruksi rangka reklame dan struktur baja untuk kebutuhan signage besar. Termasuk perawatan dan perbaikan berkala.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Konstruksi',
    },
];

function getWhatsAppUrl(message: string) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Services() {
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
                    {SERVICES.map((service) => (
                        <div
                            key={service.title}
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
                                <h3 className="text-xl font-bold text-foreground">
                                    {service.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {service.description}
                                </p>
                                <div className="mt-auto flex gap-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        <Link
                                            href={getWhatsAppUrl(
                                                `Halo, saya ingin konsultasi tentang ${service.title}.`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Konsultasi Gratis
                                        </Link>
                                    </Button>
                                    <Button asChild className="flex-1">
                                        <Link
                                            href={getWhatsAppUrl(
                                                `Halo, saya ingin pesan ${service.title}.`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Pesan Sekarang
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
