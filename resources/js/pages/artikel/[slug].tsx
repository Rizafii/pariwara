import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Clock3, Share2 } from 'lucide-react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ArtikelDetailProps {
    slug: string;
    article: {
        id: number;
        slug: string;
        title: string;
        excerpt?: string | null;
        content?: string | null;
        category?: string | null;
        date?: string | null;
        readTime?: string | null;
        image?: string | null;
        author?: string | null;
    } | null;
    relatedArticles: Array<{
        id: number;
        slug: string;
        title: string;
        excerpt?: string | null;
        category?: string | null;
        image?: string | null;
    }>;
}

export default function ArtikelDetailPage({ article, relatedArticles }: ArtikelDetailProps) {

    if (!article) {
        return (
            <>
                <Head title="Artikel Tidak Ditemukan" />
                <Navbar />
                <main className="flex min-h-screen items-center justify-center px-4">
                    <div className="max-w-lg rounded-2xl border border-border/70 p-8 text-center">
                        <h1 className="text-3xl font-bold text-foreground">404</h1>
                        <p className="mt-3 text-muted-foreground">
                            Artikel yang Anda cari tidak tersedia atau sudah dipindahkan.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/artikel">Kembali ke Artikel</Link>
                        </Button>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Head title={article.title} />
            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <section className="border-b border-border/60 bg-muted/30 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                        <Link
                            href="/artikel"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke daftar artikel
                        </Link>

                        <div className="mt-6 max-w-4xl">
                            <Badge variant="outline">{article.category}</Badge>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                {article.title}
                            </h1>

                            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                                <span>{article.date ?? '-'}</span>
                                <span className="inline-flex items-center gap-1">
                                    <Clock3 className="h-4 w-4" />
                                    {article.readTime ?? '-'}
                                </span>
                                <span>{article.author ?? '-'}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 pt-10 sm:px-6 lg:px-28">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
                        <article className="overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm">
                            <img
                                src={article.image ?? 'https://placehold.co/1200x760/111d2f/f8fafc?text=Artikel'}
                                alt={article.title}
                                className="h-auto max-h-[520px] w-full object-cover"
                            />

                            <div className="space-y-6 p-6 sm:p-8 lg:p-10">
                                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    {article.excerpt}
                                </p>

                                {article.content ? (
                                    <div
                                        className="prose prose-neutral max-w-none text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                ) : (
                                    <p className="text-base leading-relaxed text-muted-foreground">
                                        Konten artikel belum tersedia.
                                    </p>
                                )}
                            </div>
                        </article>

                        <aside className="space-y-6 lg:sticky lg:top-28">
                            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-xs">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Bagikan Artikel
                                </p>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    Simpan atau bagikan insight ini ke tim Anda sebagai referensi proyek berikutnya.
                                </p>
                                <Button asChild variant="outline" className="mt-4 w-full">
                                    <a href="https://wa.me/6285136816957" target="_blank" rel="noopener noreferrer">
                                        <Share2 className="h-4 w-4" />
                                        Bagikan via WhatsApp
                                    </a>
                                </Button>
                            </div>

                            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-xs">
                                <p className="text-base font-semibold text-foreground">Butuh Konsultasi Proyek?</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Tim kami siap bantu merekomendasikan desain dan material yang paling cocok.
                                </p>
                                <Button asChild className="mt-4 w-full">
                                    <a href="https://wa.me/6285136816957" target="_blank" rel="noopener noreferrer">
                                        Konsultasi Gratis
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </aside>
                    </div>
                </section>

                {relatedArticles.length > 0 && (
                    <section className="container mx-auto px-4 pt-14 sm:px-6 lg:px-28">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Artikel Terkait</h2>
                            <Button asChild variant="ghost">
                                <Link href="/artikel">
                                    Lihat Semua
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedArticles.map((item) => (
                                <article
                                    key={item.slug}
                                    className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <Link href={`/artikel/${item.slug}`} className="block h-48 overflow-hidden">
                                        <img
                                            src={item.image ?? 'https://placehold.co/1200x760/111d2f/f8fafc?text=Artikel'}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>
                                    <div className="space-y-3 p-5">
                                        <Badge variant="outline">{item.category ?? 'Artikel'}</Badge>
                                        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground">
                                            {item.title}
                                        </h3>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {item.excerpt}
                                        </p>
                                        <Button asChild variant="ghost" className="w-full justify-between">
                                            <Link href={`/artikel/${item.slug}`}>
                                                Baca Selengkapnya
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Whatsapp />
        </>
    );
}
