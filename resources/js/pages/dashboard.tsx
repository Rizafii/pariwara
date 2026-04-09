import { Head, Link } from '@inertiajs/react';
import {
    Images,
    Newspaper,
    Package,
    Sparkles,
    Users2,
    Wrench,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';
import dashboardRoutes from '@/routes/dashboard';

interface DashboardPageProps {
    stats: {
        clients: number;
        services: number;
        products: number;
        galleryItems: number;
        articles: number;
    };
}

const managementLinks = [
    {
        title: 'Klien',
        description: 'Kelola logo dan daftar klien.',
        href: dashboardRoutes.clients.index(),
        icon: Users2,
    },
    {
        title: 'Layanan',
        description: 'Atur layanan unggulan perusahaan.',
        href: dashboardRoutes.services.index(),
        icon: Wrench,
    },
    {
        title: 'Produk',
        description: 'Perbarui katalog produk terbaru.',
        href: dashboardRoutes.products.index(),
        icon: Package,
    },
    {
        title: 'Galeri',
        description: 'Tambahkan dokumentasi proyek terbaru.',
        href: dashboardRoutes.gallery.index(),
        icon: Images,
    },
    {
        title: 'Artikel',
        description: 'Tulis artikel dengan editor rich text.',
        href: dashboardRoutes.articles.index(),
        icon: Newspaper,
    },
];

export default function Dashboard({ stats }: DashboardPageProps) {
    const statCards = [
        { title: 'Klien', value: stats.clients },
        { title: 'Layanan', value: stats.services },
        { title: 'Produk', value: stats.products },
        { title: 'Item Galeri', value: stats.galleryItems },
        { title: 'Artikel', value: stats.articles },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="space-y-6 p-4">
                <Card className="border-primary/20 bg-linear-to-r from-primary/5 via-background to-background">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Badge className="gap-2">
                                <Sparkles className="h-4 w-4" />
                                CMS Pariwara
                            </Badge>
                        </div>
                        <CardTitle className="text-2xl">Ringkasan Konten Website</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Kelola layanan, produk, galeri, artikel, dan daftar klien melalui menu di bawah.
                        </p>
                    </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {statCards.map((item) => (
                        <Card key={item.title}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-muted-foreground">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold tracking-tight">{item.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {managementLinks.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group rounded-xl border bg-card p-5 transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        </Link>
                    ))}
                </div>
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                    Gunakan menu sidebar untuk berpindah antar modul CMS secara cepat.
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
