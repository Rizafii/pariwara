<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\InteractsWithMedia;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    use InteractsWithMedia;

    public function index(): Response
    {
        $articles = Article::query()
            ->with(['articleCategory:id,name', 'user:id,name'])
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Article $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'content' => $article->content,
                'category_id' => $article->article_category_id,
                'category' => $article->articleCategory?->name ?? $article->category,
                'read_time' => $article->read_time,
                'image' => $this->toPublicUrl($article->image),
                'author' => $article->user?->name ?? $article->author ?? 'Tim Pariwara',
                'published_at' => optional($article->published_at ?? $article->created_at)->toIso8601String(),
                'is_published' => true,
            ]);

        $categories = ArticleCategory::query()
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn (ArticleCategory $category) => [
                'id' => $category->id,
                'name' => $category->name,
            ]);

        return Inertia::render('dashboard/articles/index', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'article_category_id' => ['nullable', 'integer', 'exists:article_categories,id', 'required_without:new_category_name'],
            'new_category_name' => ['nullable', 'string', 'max:255', 'required_without:article_category_id'],
            'read_time' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $user = $request->user();
        $category = $this->resolveCategory(
            isset($validated['article_category_id']) ? (int) $validated['article_category_id'] : null,
            $validated['new_category_name'] ?? null,
        );

        Article::query()->create([
            'title' => $validated['title'],
            'slug' => $this->resolveSlug($validated['title']),
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'article_category_id' => $category->id,
            'category' => $category->name,
            'read_time' => $validated['read_time'] ?? null,
            'image' => $this->storeUploadedImage($request->file('image'), 'articles/images'),
            'user_id' => $user?->id,
            'author' => $user?->name ?? 'Tim Pariwara',
            'published_at' => now(),
            'is_published' => true,
        ]);

        return back()->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'article_category_id' => ['nullable', 'integer', 'exists:article_categories,id', 'required_without:new_category_name'],
            'new_category_name' => ['nullable', 'string', 'max:255', 'required_without:article_category_id'],
            'read_time' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        $imagePath = $article->image;

        if ($request->hasFile('image')) {
            $this->deleteStoredFile($article->image);
            $imagePath = $this->storeUploadedImage($request->file('image'), 'articles/images');
        }

        $user = $request->user();
        $category = $this->resolveCategory(
            isset($validated['article_category_id']) ? (int) $validated['article_category_id'] : null,
            $validated['new_category_name'] ?? null,
        );
        $resolvedUserId = $article->user_id ?? $user?->id;
        $resolvedAuthor = $article->user?->name ?? $user?->name ?? $article->author ?? 'Tim Pariwara';

        $article->update([
            'title' => $validated['title'],
            'slug' => $this->resolveSlug($validated['title'], $article),
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'article_category_id' => $category->id,
            'category' => $category->name,
            'read_time' => $validated['read_time'] ?? null,
            'image' => $imagePath,
            'user_id' => $resolvedUserId,
            'author' => $resolvedAuthor,
            'published_at' => $article->published_at ?? now(),
            'is_published' => true,
        ]);

        return back()->with('success', 'Artikel berhasil diperbarui.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $path = $this->storeUploadedImage($request->file('image'), 'articles/content');

        return response()->json([
            'url' => $this->toPublicUrl($path),
        ]);
    }

    public function destroy(Article $article): RedirectResponse
    {
        $this->deleteStoredFile($article->image);
        $article->delete();

        return back()->with('success', 'Artikel berhasil dihapus.');
    }

    private function resolveSlug(string $title, ?Article $ignore = null): string
    {
        $baseSlug = Str::slug($title);
        $baseSlug = $baseSlug !== '' ? $baseSlug : 'artikel';
        $slug = $baseSlug;
        $suffix = 1;

        while ($this->slugExists($slug, $ignore)) {
            $suffix++;
            $slug = $baseSlug.'-'.$suffix;
        }

        return $slug;
    }

    private function slugExists(string $slug, ?Article $ignore = null): bool
    {
        return Article::query()
            ->where('slug', $slug)
            ->when($ignore, fn ($query) => $query->whereKeyNot($ignore->id))
            ->exists();
    }

    private function resolveCategory(?int $categoryId, ?string $newCategoryName): ArticleCategory
    {
        $normalizedCategoryName = Str::of((string) $newCategoryName)->squish()->toString();

        if ($normalizedCategoryName !== '') {
            $existingCategory = ArticleCategory::query()
                ->whereRaw('LOWER(name) = ?', [Str::lower($normalizedCategoryName)])
                ->first();

            if ($existingCategory) {
                return $existingCategory;
            }

            return ArticleCategory::query()->create([
                'name' => $normalizedCategoryName,
                'slug' => $this->resolveCategorySlug($normalizedCategoryName),
            ]);
        }

        if ($categoryId === null) {
            throw ValidationException::withMessages([
                'article_category_id' => 'Pilih kategori atau isi kategori baru.',
            ]);
        }

        return ArticleCategory::query()->findOrFail($categoryId);
    }

    private function resolveCategorySlug(string $categoryName): string
    {
        $baseSlug = Str::slug($categoryName);
        $baseSlug = $baseSlug !== '' ? $baseSlug : 'kategori';
        $slug = $baseSlug;
        $suffix = 1;

        while (ArticleCategory::query()->where('slug', $slug)->exists()) {
            $suffix++;
            $slug = $baseSlug.'-'.$suffix;
        }

        return $slug;
    }
}
