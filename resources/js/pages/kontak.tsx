import { ArrowRight, Building2, Mail, MapPin, Phone } from 'lucide-react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WA_URL =
    'https://wa.me/628123394055?text=Halo,%20saya%20ingin%20konsultasi%20kebutuhan%20signage%20dan%20branding.';

export default function ContactPage() {
    return (
        <>
            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <section className="relative overflow-hidden border-y border-border/40 bg-muted/30 py-14 sm:py-16" aria-labelledby="contact-page-heading">
                    <div className="pointer-events-none absolute -top-20 right-8 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                        <Badge className="gap-2">
                            <Building2 className="h-4 w-4" />
                            Hubungi Tim Pariwara
                        </Badge>
                        <h1 id="contact-page-heading" className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Konsultasi Kebutuhan Signage dan Branding Anda
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Tim kami siap membantu mulai dari kebutuhan desain, estimasi biaya, hingga rencana produksi
                            dan pemasangan.
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-4 pt-10 sm:px-6 lg:px-28" aria-labelledby="contact-info-heading">
                    <h2 id="contact-info-heading" className="sr-only">
                        Informasi kontak
                    </h2>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <article className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-foreground">Kontak Utama</h3>
                            <ul className="mt-5 space-y-4">
                                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>+62 812-3394-055</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>hello@pariwarasatusae.com</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>Malang, Jawa Timur</span>
                                </li>
                            </ul>
                        </article>

                        <article className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-foreground">Jam Operasional</h3>
                            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                <dt>Senin - Jumat</dt>
                                <dd>08:00 - 17:00</dd>
                                <dt>Sabtu</dt>
                                <dd>08:00 - 14:00</dd>
                                <dt>Minggu</dt>
                                <dd>Tutup</dd>
                            </dl>

                            <Button asChild size="lg" className="mt-6 w-full">
                                <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                                    Chat via WhatsApp
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                        </article>
                    </div>
                </section>
            </main>

            <Whatsapp />
        </>
    );
}
