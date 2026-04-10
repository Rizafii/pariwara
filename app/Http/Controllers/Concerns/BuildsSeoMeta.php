<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Support\Str;

trait BuildsSeoMeta
{
    /**
     * @param  array{
     *     title?: string,
     *     description?: string,
     *     keywords?: string|array<int, string>,
     *     image?: string|null,
     *     url?: string|null,
     *     canonical?: string|null,
     *     type?: string|null
     * }  $meta
     * @return array{
     *     title: string,
     *     description: string,
     *     keywords: string,
     *     image: string,
     *     url: string,
     *     canonical: string,
     *     type: string
     * }
     */
    protected function buildSeoMeta(array $meta): array
    {
        $title = trim((string) ($meta['title'] ?? "Jasa Neon Sign Malang Custom | Orion's Melody"));
        $description = $this->normalizeDescription(
            (string) ($meta['description'] ?? 'Jasa pembuatan neon sign custom di Malang, berkualitas premium dan harga terjangkau.'),
        );

        $keywords = $this->appendLocalKeywords($this->normalizeKeywords($meta['keywords'] ?? []));

        $url = $this->toAbsoluteUrl($meta['url'] ?? null) ?? rtrim((string) config('app.url'), '/');
        $canonical = $this->toAbsoluteUrl($meta['canonical'] ?? $url) ?? $url;

        return [
            'title' => $title,
            'description' => $description,
            'keywords' => implode(', ', $keywords),
            'image' => $this->resolveMetaImage($meta['image'] ?? null),
            'url' => $url,
            'canonical' => $canonical,
            'type' => (string) ($meta['type'] ?? 'website'),
        ];
    }

    protected function excerptFromHtml(?string $content, int $maxLength = 150): string
    {
        $plainText = trim((string) preg_replace('/\s+/u', ' ', strip_tags((string) $content)));

        if ($plainText === '') {
            return '';
        }

        return Str::limit($plainText, $maxLength, '...');
    }

    private function normalizeDescription(string $description, int $maxLength = 160): string
    {
        $plainText = trim((string) preg_replace('/\s+/u', ' ', strip_tags($description)));

        if ($plainText === '') {
            return '';
        }

        return Str::limit($plainText, $maxLength, '...');
    }

    /**
     * @param  string|array<int, string>  $keywords
     * @return array<int, string>
     */
    private function normalizeKeywords(string|array $keywords): array
    {
        $normalized = is_string($keywords)
            ? collect(explode(',', $keywords))
            : collect($keywords);

        return $normalized
            ->map(fn (mixed $keyword): string => trim((string) $keyword))
            ->filter()
            ->unique(fn (string $keyword): string => Str::lower($keyword))
            ->values()
            ->all();
    }

    /**
     * @param  array<int, string>  $keywords
     * @return array<int, string>
     */
    private function appendLocalKeywords(array $keywords): array
    {
        $localKeywords = [
            'neon sign malang',
            'neon box malang',
            'signage malang',
            'branding usaha malang',
            'jawa timur',
        ];

        return collect(array_merge($keywords, $localKeywords))
            ->map(fn (string $keyword): string => trim($keyword))
            ->filter()
            ->unique(fn (string $keyword): string => Str::lower($keyword))
            ->values()
            ->all();
    }

    private function resolveMetaImage(?string $image): string
    {
        $defaultImage = '/logo/logo.webp';

        return $this->toAbsoluteUrl($image)
            ?? $this->toAbsoluteUrl($defaultImage)
            ?? rtrim((string) config('app.url'), '/').$defaultImage;
    }

    private function toAbsoluteUrl(?string $value): ?string
    {
        if (! is_string($value) || trim($value) === '') {
            return null;
        }

        $value = trim($value);

        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }

        if (Str::startsWith($value, '//')) {
            $scheme = parse_url((string) config('app.url'), PHP_URL_SCHEME) ?: 'https';

            return $scheme.':'.$value;
        }

        return url('/'.ltrim($value, '/'));
    }
}