import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, Clock3, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Article = {
    id: number;
    slug: string;
    title: string;
    excerpt?: string | null;
    category?: string | null;
    date?: string | null;
    readTime?: string | null;
    image?: string | null;
    author?: string | null;
};

interface ArtikelPageProps {
    articles: Article[];
}

export default function ArtikelPage({ articles }: ArtikelPageProps) {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');

    const articleCategories = useMemo(
        () => ['Semua', ...new Set(articles.map((article) => article.category ?? 'Artikel'))],
        [articles],
    );

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const inCategory =
                activeCategory === 'Semua' ||
                (article.category ?? 'Artikel') === activeCategory;

            const normalizedQuery = query.trim().toLowerCase();
            const inSearch =
                normalizedQuery.length === 0 ||
                article.title.toLowerCase().includes(normalizedQuery) ||
                (article.excerpt ?? '').toLowerCase().includes(normalizedQuery) ||
                (article.author ?? '').toLowerCase().includes(normalizedQuery);

            return inCategory && inSearch;
        });
    }, [activeCategory, query, articles]);

    const featuredArticle = filteredArticles[0] ?? null;
    const otherArticles = filteredArticles.slice(1);

    return (
        <>
            <Head title="Artikel" />
            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <section className="relative overflow-hidden border-y border-border/40 bg-muted/30 py-14 sm:py-16">
                    <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/12 blur-[120px]" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                        <Badge className="gap-2">
                            <BookOpen className="h-4 w-4" />
                            Insight & Edukasi Visual Branding
                        </Badge>
                        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Artikel Seputar Signage, Reklame, dan Strategi Brand Presence
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Kumpulan panduan dan tips praktis dari tim kami untuk membantu bisnis Anda tampil
                            menonjol di ruang publik.
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-4 pt-10 sm:px-6 lg:px-28">
                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border/60 bg-background p-4 shadow-xs md:grid-cols-[1fr_auto] md:items-center md:p-5">
                        <div className="relative">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Cari artikel (judul, topik, penulis)..."
                                className="h-11 pl-10"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 md:justify-end">
                            {articleCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                        activeCategory === category
                                            ? 'border-primary bg-primary text-foreground'
                                            : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 pt-10 sm:px-6 lg:px-28">
                    {featuredArticle ? (
                        <article className="group overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm">
                            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                                <Link href={`/artikel/${featuredArticle.slug}`} className="relative block h-full min-h-72 overflow-hidden">
                                    <img
                                        src={featuredArticle.image ?? 'https://placehold.co/1200x760/111d2f/f8fafc?text=Artikel'}
                                        alt={featuredArticle.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                                    <div className="absolute right-4 bottom-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                                        Artikel Unggulan
                                    </div>
                                </Link>

                                <div className="flex flex-col justify-between p-6 sm:p-8">
                                    <div>
                                        <Badge variant="outline">{featuredArticle.category ?? 'Artikel'}</Badge>
                                        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                            {featuredArticle.title}
                                        </h2>
                                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                            {featuredArticle.excerpt}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                                            <span>{featuredArticle.date ?? '-'}</span>
                                            <span className="inline-flex items-center gap-1">
                                                <Clock3 className="h-4 w-4" />
                                                {featuredArticle.readTime ?? '-'}
                                            </span>
                                            <span>{featuredArticle.author ?? '-'}</span>
                                        </div>
                                        <Button asChild>
                                            <Link href={`/artikel/${featuredArticle.slug}`}>
                                                Baca Artikel
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                            <p className="text-lg font-semibold text-foreground">Artikel tidak ditemukan</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Coba ubah kata kunci pencarian atau pilih kategori lain.
                            </p>
                        </div>
                    )}

                    {otherArticles.length > 0 && (
                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {otherArticles.map((article) => (
                                <article
                                    key={article.slug}
                                    className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <Link href={`/artikel/${article.slug}`} className="relative block h-56 overflow-hidden">
                                        <img
                                            src={article.image ?? 'https://placehold.co/1200x760/111d2f/f8fafc?text=Artikel'}
                                            alt={article.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                                    </Link>

                                    <div className="space-y-4 p-5">
                                        <div className="flex items-center justify-between gap-2">
                                            <Badge variant="outline">{article.category ?? 'Artikel'}</Badge>
                                            <span className="text-xs text-muted-foreground">{article.readTime ?? '-'}</span>
                                        </div>

                                        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground">
                                            {article.title}
                                        </h3>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                                            <span>{article.date ?? '-'}</span>
                                            <span>{article.author ?? '-'}</span>
                                        </div>

                                        <Button asChild variant="ghost" className="w-full justify-between">
                                            <Link href={`/artikel/${article.slug}`}>
                                                Lanjut Baca
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Whatsapp />
        </>
    );
}
