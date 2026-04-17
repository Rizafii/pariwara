<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\GalleryItem;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $articles = Article::query()
            ->where('is_published', true)
            ->with(['articleCategory:id,name', 'user:id,name'])
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Article $article) => $this->transformArticle($article, false));

        $metaImage = $articles->first()['image']
            ?? $this->toPublicUrl(
                GalleryItem::query()->where('is_active', true)->inRandomOrder()->value('image'),
            );

        return Inertia::render('artikel', [
            'articles' => $articles,
        ])->withViewData(Seo::make([
                'title' => 'Artikel Neon Sign & Branding Usaha | Malang',
                'description' => 'Tips dan inspirasi neon sign untuk bisnis di Malang.',
                'keywords' => 'artikel neon sign malang, branding usaha malang',
                'image' => $metaImage,
                'url' => route('artikel.index'),
                'canonical' => route('artikel.index'),
            ]));
    }

    public function show(string $slug): Response
    {
        $article = Article::query()
            ->where('is_published', true)
            ->with(['articleCategory:id,name', 'user:id,name'])
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedArticles = Article::query()
            ->where('is_published', true)
            ->where('id', '!=', $article->id)
            ->with(['articleCategory:id,name', 'user:id,name'])
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->take(3)
            ->get()
            ->map(fn (Article $item) => $this->transformArticle($item, false));

        $description = Seo::excerpt($article->content, 150);

        if ($description === '') {
            $description = Seo::excerpt($article->excerpt, 150);
        }

        $metaImage = $this->toPublicUrl($article->image)
            ?? $this->toPublicUrl(
                GalleryItem::query()->where('is_active', true)->inRandomOrder()->value('image'),
            );

        return Inertia::render('artikel/[slug]', [
            'slug' => $slug,
            'article' => $this->transformArticle($article, true),
            'relatedArticles' => $relatedArticles,
        ])->withViewData(Seo::make([
                'title' => $article->title.' | CV. PARIWARA SATU SAE',
                'description' => $description,
                'keywords' => $article->title.', neon sign malang, jawa timur',
                'image' => $metaImage,
                'url' => route('artikel.show', ['slug' => $slug]),
                'canonical' => route('artikel.show', ['slug' => $slug]),
                'og_type' => 'article',
            ]));
    }

    private function transformArticle(Article $article, bool $includeContent): array
    {
        return [
            'id' => $article->id,
            'slug' => $article->slug,
            'title' => $article->title,
            'excerpt' => $article->excerpt,
            'content' => $includeContent ? $article->content : null,
            'category' => $article->articleCategory?->name ?? $article->category,
            'date' => optional($article->published_at ?? $article->created_at)->format('d M Y'),
            'readTime' => $article->read_time,
            'image' => $this->toPublicUrl($article->image),
            'author' => $article->user?->name ?? $article->author,
        ];
    }
}
