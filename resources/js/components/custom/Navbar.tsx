import { Link } from '@inertiajs/react';
import { Menu, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const NAV_LINKS = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Kontak', href: '/kontak' },
];

const NAV_CTA = {
    label: 'Hubungi Kami',
    href: '/kontak',
};

interface NavbarProps {
    transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!transparent) return;

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
                            src="/logo/logo.jpeg"
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
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle className="text-left text-xl select-none">
                                    Menu Utama
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-4 flex flex-col gap-4">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-base font-medium text-foreground transition-colors hover:text-primary"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Button asChild className="mt-4 w-full">
                                    <Link href={NAV_CTA.href}>
                                        {NAV_CTA.label}
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
