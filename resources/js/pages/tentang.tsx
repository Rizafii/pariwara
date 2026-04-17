import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BadgeCheck,
    Handshake,
    Lightbulb,
    ShieldCheck,
    Target,
    Users,
} from 'lucide-react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const VALUES = [
    {
        title: 'Kualitas Teruji',
        description: 'Material premium dan proses produksi presisi untuk hasil yang tahan lama.',
        icon: ShieldCheck,
    },
    {
        title: 'Inovasi Visual',
        description: 'Desain adaptif mengikuti karakter brand dan perkembangan tren pasar.',
        icon: Lightbulb,
    },
    {
        title: 'Kolaborasi Aktif',
        description: 'Komunikasi terbuka dari awal konsep hingga proses instalasi selesai.',
        icon: Handshake,
    },
    {
        title: 'Eksekusi Profesional',
        description: 'Tim berpengalaman menjaga standar kerja agar hasil rapi dan aman.',
        icon: BadgeCheck,
    },
];

const STATS = [
    { value: '500+', label: 'Proyek Terselesaikan' },
    { value: '10+', label: 'Tahun Pengalaman' },
    { value: '300+', label: 'Klien Aktif & Repeat' },
    { value: '15+', label: 'Kota Penanganan Proyek' },
];

const CONSULTATION_URL =
    'https://wa.me/628123394055?text=Halo,%20saya%20ingin%20konsultasi%20kebutuhan%20signage%20dan%20branding.';

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <section
                    className="relative overflow-hidden border-y border-border/40 bg-[#0f1524] py-16 text-white sm:py-20"
                    aria-labelledby="about-page-heading"
                >
                    <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                            <div>
                                <Badge className="gap-2 border-white/20 bg-white/10 text-white">
                                    <Users className="h-4 w-4" />
                                    Profil Perusahaan
                                </Badge>
                                <h1 id="about-page-heading" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                    Tentang Kami
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                                    CV. Pariwara Satu Sae adalah mitra visual branding yang berfokus pada
                                    signage, reklame, dan solusi promosi outdoor-indoor untuk bisnis modern.
                                    Kami menggabungkan kreativitas, ketelitian teknis, dan ketepatan eksekusi.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Misi Kami</p>
                                <p className="mt-3 text-sm leading-relaxed text-slate-100 sm:text-base">
                                    Membantu bisnis membangun presence visual yang kuat melalui layanan desain,
                                    produksi, dan instalasi yang berkualitas tinggi serta tepat waktu.
                                </p>
                                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-300">Visi Kami</p>
                                <p className="mt-3 text-sm leading-relaxed text-slate-100 sm:text-base">
                                    Menjadi partner branding visual terpercaya di Indonesia dengan standar kerja
                                    profesional dan inovasi berkelanjutan.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-12 sm:px-6 lg:px-28"
                    aria-labelledby="about-stats-heading"
                >
                    <h2 id="about-stats-heading" className="sr-only">
                        Statistik perusahaan
                    </h2>
                    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-border/60 bg-muted/30 p-5 text-center"
                            >
                                <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                                <dd className="mt-2 text-3xl font-bold text-foreground">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section
                    className="container mx-auto px-4 pt-14 sm:px-6 lg:px-28"
                    aria-labelledby="about-focus-heading"
                >
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl border border-border/60 bg-background p-7 shadow-xs">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <Target className="h-3.5 w-3.5" />
                                Fokus Utama
                            </div>
                            <h2 id="about-focus-heading" className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                                Dari Ide Sampai Terpasang di Lapangan
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Kami tidak hanya membuat produk visual, tetapi membantu menerjemahkan karakter
                                brand Anda ke bentuk signage yang efektif. Mulai dari konsultasi konsep,
                                perhitungan teknis, produksi, hingga pemasangan dengan standar keselamatan.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {VALUES.map((value) => (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-border/60 bg-background p-5 shadow-xs"
                                >
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <value.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-3 text-base font-semibold text-foreground">{value.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-14 sm:px-6 lg:px-28"
                    aria-labelledby="about-cta-heading"
                >
                    <div className="rounded-3xl border border-border/60 bg-muted/30 p-8 sm:p-10">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <Badge className="gap-2">
                                    <Award className="h-4 w-4" />
                                    Mari Berkolaborasi
                                </Badge>
                                <h2 id="about-cta-heading" className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                    Siap mengembangkan identitas visual bisnis Anda?
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    Diskusikan kebutuhan Anda bersama tim kami, dapatkan rekomendasi konsep,
                                    material, dan strategi implementasi yang paling tepat.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                                <Button asChild size="lg">
                                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
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

            <Whatsapp />
        </>
    );
}
