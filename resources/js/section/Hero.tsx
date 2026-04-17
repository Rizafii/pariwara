import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const HERO_STATS = [
    { value: '500+', label: 'Proyek Selesai' },
    { value: '10+', label: 'Tahun Pengalaman' },
    { value: '300+', label: 'Klien Puas' },
];

export default function Hero() {
    return (
        <section
            className="relative min-h-screen overflow-hidden bg-[#0f1117]"
            aria-labelledby="hero-heading"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                {/* SVG Pattern Texture */}
                <svg
                    className="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="hero-grid"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 60 0 L 0 0 0 60"
                                fill="none"
                                stroke="oklch(89.338% 0.18638 101.126 / 0.06)"
                                strokeWidth="1"
                            />
                        </pattern>
                        <pattern
                            id="hero-dots"
                            width="30"
                            height="30"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle
                                cx="2"
                                cy="2"
                                r="1"
                                fill="oklch(89.338% 0.18638 101.126 / 0.1)"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                    <rect width="100%" height="100%" fill="url(#hero-dots)" />
                </svg>

                {/* Radial Glow Accents */}
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-primary/8 blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto flex min-h-screen items-center px-4 pt-16 sm:px-6 lg:px-28">
                <div className="flex w-full items-center justify-between gap-12">
                    {/* Left Column */}
                    <div className="max-w-2xl space-y-6">
                        {/* Heading */}
                        <div className="">
                            <h1
                                id="hero-heading"
                                className="text-4xl font-bold tracking-tight text-white sm:text-5xl sm:leading-16 lg:text-6xl lg:leading-18"
                            >
                                Wujudkan{' '}
                                <span className="text-primary">
                                    Identitas Brand
                                </span>{' '}
                                Anda dengan Signage Premium
                            </h1>
                            <p className="mt-2 text-lg leading-relaxed text-gray-300 sm:text-xl">
                                Kami menghadirkan solusi reklame, neon sign, dan
                                advertising berkualitas tinggi untuk membantu
                                bisnis Anda tampil menonjol dan profesional.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary px-8 text-base font-semibold text-foreground transition-all hover:bg-primary/80"
                            >
                                <a
                                    href="https://wa.me/628123394055"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Konsultasi Gratis
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-white/20 bg-white/5 px-8 text-base text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
                            >
                                <Link href="/layanan">Lihat Layanan</Link>
                            </Button>
                        </div>

                        {/* Stats */}
                        <dl className="flex flex-wrap gap-8 sm:gap-12">
                            {HERO_STATS.map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <dt className="text-sm text-gray-400">
                                        {stat.label}
                                    </dt>
                                    <dd className="text-3xl font-bold text-primary">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Right Column - Hero Image */}

                    {/* Hero Image */}
                    <img
                        src="/images/hero-model.png"
                        alt="Tim Profesional Pariwara"
                        className="relative z-10 hidden h-125 w-auto max-w-lg rounded-tl-[200px] rounded-br-[200px] object-contain lg:flex"
                    />
                </div>
            </div>
        </section>
    );
}
