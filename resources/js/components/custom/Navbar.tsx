import { Link } from '@inertiajs/react';
import { Menu, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Produk', href: '/produk' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Artikel', href: '/artikel' },
];

const NAV_CTA = {
    label: 'Hubungi Kami',
    href: 'https://wa.me/6285136816957',
};

interface NavbarProps {
    transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!transparent) {
            return;
        }

        const handleScroll = () => setScrolled(window.scrollY > 50);

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [transparent]);

    const isTransparent = transparent && !scrolled;

    return (
        <nav
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                isTransparent ? 'bg-transparent' : 'bg-background shadow-xs',
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-28">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <img
                            src="/logo/logo.webp"
                            alt="Logo Pariwara"
                            className="h-12 w-auto rounded-sm"
                        />
                        <div
                            className={cn(
                                'flex flex-col items-start',
                                isTransparent
                                    ? 'text-background'
                                    : 'text-foreground',
                            )}
                        >
                            <p className="text-sm font-bold">
                                CV. PARIWARA SATU SAE
                            </p>
                            <p className="text-xs font-medium tracking-wide">
                                Malang, Jawa Timur
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:gap-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'text-sm font-medium transition-colors',
                                isTransparent
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-foreground/60 hover:text-foreground',
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex md:items-center">
                    <Button asChild>
                        <Link href={NAV_CTA.href}>
                            <Phone />
                            {NAV_CTA.label}
                        </Link>
                    </Button>
                </div>

                {/* Mobile Nav */}
                <div className="flex items-center md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    isTransparent &&
                                        'text-white hover:bg-white/10 hover:text-white',
                                )}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Menu Toggle</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[86vw] max-w-sm gap-0 p-0"
                        >
                            <SheetHeader className="border-b border-border/70 px-5 pt-6 pb-4">
                                <SheetTitle className="text-left text-xl select-none">
                                    Menu Utama
                                </SheetTitle>
                                <p className="text-muted-foreground mt-1 text-xs">
                                    CV. Pariwara Satu Sae
                                </p>
                            </SheetHeader>
                            <div className="flex h-full flex-col px-4 pb-5">
                                <nav className="mt-4 space-y-1.5">
                                    {NAV_LINKS.map((link) => (
                                        <SheetClose asChild key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="hover:bg-muted/70 hover:text-foreground block rounded-xl px-4 py-3 text-[15px] font-medium text-foreground/80 transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>

                                <div className="mt-5 border-t border-border/70 pt-5">
                                    <SheetClose asChild>
                                        <Button asChild className="h-11 w-full">
                                            <Link href={NAV_CTA.href}>
                                                <Phone className="h-4 w-4" />
                                                {NAV_CTA.label}
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                    <p className="text-muted-foreground mt-3 px-1 text-xs leading-relaxed">
                                        Konsultasi gratis untuk kebutuhan signage dan
                                        branding bisnis Anda.
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
