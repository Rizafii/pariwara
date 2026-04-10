import { Link } from '@inertiajs/react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CONSULTATION_URL =
    'https://wa.me/6285136816957?text=Halo,%20saya%20ingin%20konsultasi%20untuk%20kebutuhan%20branding%20dan%20signage%20bisnis%20saya.';

export default function FinalCta() {
    return (
        <section
            className="relative overflow-hidden bg-[#0d1220] py-20"
            aria-labelledby="final-cta-heading"
        >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-[110px]" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-sm sm:p-10 lg:p-12">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <Badge className="gap-2 border-white/20 bg-white/10 text-white">
                                <Sparkles className="h-4 w-4" />
                                Siap Naik Kelas
                            </Badge>
                            <h2
                                id="final-cta-heading"
                                className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                            >
                                Mari wujudkan signage yang bikin brand Anda langsung dikenali.
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                                Tim kami siap mendampingi dari strategi visual, desain, produksi, hingga instalasi
                                di lapangan. Konsultasi awal gratis tanpa komitmen.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                            <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary/90">
                                <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                                    <PhoneCall className="h-4 w-4" />
                                    Konsultasi Sekarang
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                            >
                                <Link href="/gallery">
                                    Lihat Portofolio
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}