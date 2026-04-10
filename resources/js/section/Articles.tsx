import { Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ArticleItem {
    id: number;
    slug: string;
    title: string;
    excerpt?: string | null;
    category?: string | null;
    date?: string | null;
    readTime?: string | null;
    image?: string | null;
}

export default function Articles({ articles = [] }: { articles?: ArticleItem[] }) {
    const [featuredArticle, ...otherArticles] = articles;

    if (!featuredArticle) {
        return null;
    }

    return (
        <section
            id="artikel"
            className="bg-background py-16 sm:py-20"
            aria-labelledby="articles-heading"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <Badge className="gap-2">
                            <BookOpen className="h-4 w-4" />
                            Wawasan Branding Visual
                        </Badge>
                        <h2
                            id="articles-heading"
                            className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                        >
                            Artikel Terbaru
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-right">
                        Insight praktis seputar signage, reklame, dan strategi visual agar brand bisnis Anda
                        lebih menonjol di lapangan.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <article className="group overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm">
                        <Link
                            href={`/artikel/${featuredArticle.slug}`}
                            className="relative block h-72 overflow-hidden sm:h-96"
                        >
                            <img
                                src={featuredArticle.image ?? 'https://placehold.co/1200x760/111d2f/f8fafc?text=Artikel'}
                                alt={featuredArticle.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                            <span className="absolute right-4 bottom-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                                Artikel Unggulan
                            </span>
                        </Link>

                        <div className="space-y-4 p-6 sm:p-8">
                            <Badge variant="outline">{featuredArticle.category ?? 'Artikel'}</Badge>
                            <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                                {featuredArticle.title}
                            </h3>
                            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                {featuredArticle.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground sm:text-sm">
                                <time>{featuredArticle.date ?? '-'}</time>
                                <span className="inline-flex items-center gap-1">
                                    <Clock3 className="h-4 w-4" />
                                    {featuredArticle.readTime ?? '-'}
                                </span>
                            </div>
                        </div>
                    </article>

                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
                        {otherArticles.map((article) => (
                            <li key={article.slug}>
                                <article className="group overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <Link href={`/artikel/${article.slug}`} className="block h-52 overflow-hidden">
                                        <img
                                            src={article.image ?? 'https://placehold.co/1200x760/111d2f/f8fafc?text=Artikel'}
                                            alt={article.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>
                                    <div className="space-y-3 p-5">
                                        <Badge variant="outline">{article.category ?? 'Artikel'}</Badge>
                                        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground">
                                            {article.title}
                                        </h3>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                                            <time>{article.date ?? '-'}</time>
                                            <span>{article.readTime ?? '-'}</span>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/artikel">
                            Lihat Semua Artikel
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
