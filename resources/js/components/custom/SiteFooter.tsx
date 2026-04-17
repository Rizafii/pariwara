import { Link } from '@inertiajs/react';
import { Mail, MapPin, MessageCircleMore, Phone } from 'lucide-react';

const FOOTER_NAV = [
    { label: 'Beranda', href: '/' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Produk', href: '/produk' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Tentang Kami', href: '/tentang' },
];

const FEATURED_SERVICES = [
    {
        label: 'Neon Sign Custom',
        href: '/layanan/pembuatan-neon-sign',
    },
    {
        label: 'Pemasangan Reklame',
        href: '/layanan/pemasangan-reklame',
    },
    {
        label: 'LED & Videotron',
        href: '/layanan/led-videotron',
    },
    {
        label: 'Letter Timbul',
        href: '/layanan/letter-timbul-huruf-akrilik',
    },
];

const year = new Date().getFullYear();

export default function SiteFooter() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#080c16] text-slate-100">
            <div className="pointer-events-none absolute -top-24 left-16 h-64 w-64 rounded-full bg-primary/15 blur-[110px]" />
            <div className="pointer-events-none absolute right-10 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[110px]" />

            <div className="container relative z-10 mx-auto px-4 py-14 sm:px-6 lg:px-28">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3">
                            <img src="/logo/logo.webp" alt="Logo Pariwara" className="h-11 w-auto rounded" />
                            <div>
                                <p className="text-sm font-semibold">CV. PARIWARA SATU SAE</p>
                                <p className="text-xs text-slate-300">Malang, Jawa Timur</p>
                            </div>
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-slate-300">
                            Solusi signage, reklame, dan visual branding untuk membantu bisnis tampil lebih
                            menonjol dan profesional.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/90">Navigasi</h3>
                        <ul className="mt-4 space-y-2">
                            {FOOTER_NAV.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-300 transition-colors hover:text-primary"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
                            Layanan Unggulan
                        </h3>
                        <ul className="mt-4 space-y-2">
                            {FEATURED_SERVICES.map((service) => (
                                <li key={service.label}>
                                    <Link
                                        href={service.href}
                                        className="text-sm text-slate-300 transition-colors hover:text-primary"
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/90">Kontak</h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                                <a href='https://maps.app.goo.gl/zLfPqEhTLyH64DT96'
                                    target="_blank"
                                    rel="noopener noreferrer">Malang, Jawa Timur</a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                                <a href="tel:+628123394055" className="transition-colors hover:text-primary">
                                    +62 851-3681-6957
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                                <a
                                    href="mailto:support@neonsignmalang.com"
                                    className="transition-colors hover:text-primary"
                                >
                                     infoneonsign@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MessageCircleMore className="mt-0.5 h-4 w-4 text-primary" />
                                <a
                                    href="https://wa.me/628123394055"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors hover:text-primary"
                                >
                                    Chat WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                    <p>Copyright {year} CV. Pariwara Satu Sae. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/gallery" className="transition-colors hover:text-primary">
                            Portofolio
                        </Link>
                        <Link href="/artikel" className="transition-colors hover:text-primary">
                            Insight
                        </Link>
                        <a
                            href="https://wa.me/628123394055"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-primary"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}