import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WA_NUMBER = '6281234567890';

export const SERVICES = [
    {
        slug: 'pembuatan-neon-sign',
        title: 'Pembuatan Neon Sign',
        description:
            'Desain dan produksi neon sign custom untuk interior maupun eksterior bisnis Anda. Tersedia dalam berbagai bentuk, warna, dan ukuran.',
        longDescription:
            'Kami menyediakan layanan desain dan produksi neon sign custom berkualitas tinggi untuk kebutuhan bisnis Anda. Mulai dari neon sign klasik dengan gas neon hingga LED neon flex modern yang hemat energi dan tahan lama. Setiap neon sign dibuat dengan presisi tinggi oleh tenaga ahli berpengalaman, menghasilkan pencahayaan yang merata dan warna yang vibrant. Cocok untuk interior restoran, kafe, toko, maupun eksterior gedung dan fasad bangunan.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Neon+Sign',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Neon+Sign+4',
        ],
        features: [
            'Custom desain sesuai permintaan',
            'LED neon flex hemat energi',
            'Tahan air & cuaca (outdoor)',
            'Garansi 1 tahun',
        ],
    },
    {
        slug: 'pemasangan-reklame',
        title: 'Pemasangan Reklame',
        description:
            'Layanan pemasangan reklame indoor & outdoor lengkap dengan perizinan. Billboard, baliho, spanduk, dan media promosi lainnya.',
        longDescription:
            'Layanan pemasangan reklame profesional untuk kebutuhan promosi bisnis Anda. Kami menangani seluruh proses dari survei lokasi, desain, perizinan, hingga pemasangan. Tersedia berbagai jenis media reklame seperti billboard, baliho, spanduk, banner, dan neon box. Tim instalasi berpengalaman kami memastikan pemasangan yang aman, rapi, dan sesuai dengan regulasi pemerintah daerah.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Reklame',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Reklame+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Reklame+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Reklame+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Reklame+4',
        ],
        features: [
            'Pengurusan izin reklame',
            'Survey lokasi gratis',
            'Pemasangan oleh tim profesional',
            'Maintenance berkala',
        ],
    },
    {
        slug: 'desain-branding',
        title: 'Desain & Branding',
        description:
            'Jasa desain grafis profesional untuk kebutuhan branding bisnis Anda. Logo, company profile, dan seluruh materi visual identity.',
        longDescription:
            'Layanan desain grafis dan branding lengkap untuk membangun identitas visual bisnis Anda. Tim desainer kami berpengalaman dalam membuat logo, company profile, packaging, kartu nama, brosur, dan seluruh materi visual identity. Kami memastikan setiap desain konsisten, profesional, dan mencerminkan nilai brand Anda dengan tepat.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Branding',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Branding+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Branding+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Branding+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Branding+4',
        ],
        features: [
            'Desain logo & brand identity',
            'Company profile profesional',
            'Revisi hingga puas',
            'File siap cetak (AI, PDF, PNG)',
        ],
    },
    {
        slug: 'led-videotron',
        title: 'LED & Videotron',
        description:
            'Instalasi LED display dan videotron berkualitas tinggi untuk kebutuhan advertising digital. Running text, video wall, dan digital signage.',
        longDescription:
            'Solusi LED display dan videotron untuk kebutuhan advertising digital modern. Kami menyediakan dan menginstal berbagai jenis LED display mulai dari running text, video wall indoor, hingga videotron outdoor resolusi tinggi. Semua produk menggunakan panel LED berkualitas tinggi dengan kecerahan dan warna yang optimal, dilengkapi dengan sistem kontrol yang mudah digunakan.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=LED+Videotron',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=LED+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=LED+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=LED+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=LED+4',
        ],
        features: [
            'Full color resolusi tinggi',
            'Indoor & outdoor tersedia',
            'Kontrol via remote/aplikasi',
            'Garansi panel & driver',
        ],
    },
    {
        slug: 'letter-timbul-huruf-akrilik',
        title: 'Letter Timbul & Huruf Akrilik',
        description:
            'Pembuatan letter timbul dari bahan stainless, galvanis, akrilik, dan kuningan. Cocok untuk fasad toko, kantor, dan gedung.',
        longDescription:
            'Pembuatan letter timbul dan huruf akrilik berkualitas dengan berbagai pilihan material. Tersedia dalam bahan stainless steel, galvanis, akrilik, dan kuningan dengan finishing halus dan presisi. Bisa dilengkapi dengan lampu LED backlight atau frontlight untuk tampilan yang lebih menarik saat malam hari. Cocok untuk fasad toko, lobby kantor, gedung pemerintahan, dan hotel.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Letter+Timbul',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Letter+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Letter+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Letter+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Letter+4',
        ],
        features: [
            'Stainless, galvanis, akrilik, kuningan',
            'LED backlight/frontlight',
            'Finishing premium',
            'Tahan cuaca ekstrem',
        ],
    },
    {
        slug: 'konstruksi-rangka-reklame',
        title: 'Konstruksi & Rangka Reklame',
        description:
            'Jasa konstruksi rangka reklame dan struktur baja untuk kebutuhan signage besar. Termasuk perawatan dan perbaikan berkala.',
        longDescription:
            'Jasa konstruksi rangka reklame dan struktur baja profesional untuk kebutuhan signage berskala besar. Kami menangani perencanaan, fabrikasi, dan pemasangan rangka billboard, tiang reklame, dan struktur pendukung signage lainnya. Menggunakan material baja berkualitas dengan standar keamanan tinggi, dilengkapi dengan layanan perawatan dan inspeksi berkala untuk memastikan keamanan dan daya tahan jangka panjang.',
        image: 'https://placehold.co/600x400/1a1a2e/e2e8f0?text=Konstruksi',
        gallery: [
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Konstruksi+1',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Konstruksi+2',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Konstruksi+3',
            'https://placehold.co/800x600/1a1a2e/e2e8f0?text=Konstruksi+4',
        ],
        features: [
            'Baja berkualitas tinggi',
            'Standar keamanan SNI',
            'Maintenance & inspeksi berkala',
            'Garansi struktur 5 tahun',
        ],
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
