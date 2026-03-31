import { Badge } from '@/components/ui/badge';

const CLIENT_BRANDS = [
    {
        name: 'Brand 1',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+1',
    },
    {
        name: 'Brand 2',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+2',
    },
    {
        name: 'Brand 3',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+3',
    },
    {
        name: 'Brand 4',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+4',
    },
    {
        name: 'Brand 5',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+5',
    },
    {
        name: 'Brand 6',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+6',
    },
    {
        name: 'Brand 7',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+7',
    },
    {
        name: 'Brand 8',
        logo: 'https://placehold.co/180x80/e2e8f0/64748b?text=Brand+8',
    },
];

export default function Clients() {
    return (
        <section className="bg-background py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                {/* Header */}
                <div className="text-center">
                    <Badge>Dipercaya Oleh</Badge>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Brand & Klien Kami
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        Berbagai brand ternama telah mempercayakan kebutuhan
                        reklame dan signage mereka kepada kami.
                    </p>
                </div>

                {/* Logo Grid */}
                <div className="mt-12 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4">
                    {CLIENT_BRANDS.map((brand) => (
                        <div
                            key={brand.name}
                            className="flex items-center justify-center rounded-xl border border-border/50 bg-muted/30 p-6 grayscale transition-all duration-300 hover:bg-muted/60 hover:grayscale-0"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-10 w-auto max-w-35 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
