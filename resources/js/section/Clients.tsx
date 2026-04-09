import { Badge } from '@/components/ui/badge';

interface ClientItem {
    id: number;
    name: string;
    logo: string;
    url?: string | null;
}

export default function Clients({ clients = [] }: { clients?: ClientItem[] }) {
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
                    {clients.map((brand) => (
                        <div
                            key={brand.id}
                            className="flex items-center justify-center transition-all duration-300 "
                        >
                            {brand.url ? (
                                <a
                                    href={brand.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="h-10 w-auto max-w-35 object-contain"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-10 w-auto max-w-35 object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
