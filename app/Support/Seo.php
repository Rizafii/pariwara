<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Seo
{
    private const DEFAULT_DESCRIPTION = 'Default description';

    private const DEFAULT_IMAGE = 'logo/logo.webp';

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, string>
     */
    public static function make(array $data = []): array
    {
        $defaultTitle = (string) config('app.name');
        $defaultDescription = self::DEFAULT_DESCRIPTION;
        $defaultImage = asset(self::DEFAULT_IMAGE);

        $title = self::sanitize((string) ($data['title'] ?? $defaultTitle));
        $description = self::sanitize((string) ($data['description'] ?? $defaultDescription));

        $url = self::normalizeUrl($data['url'] ?? url()->current());

        return [
            'title' => $title !== '' ? $title : $defaultTitle,
            'description' => $description !== '' ? $description : $defaultDescription,
            'image' => self::normalizeImage($data['image'] ?? $defaultImage),
            'url' => $url,
            'canonical' => self::normalizeUrl($data['canonical'] ?? $url),
            'keywords' => self::sanitize((string) ($data['keywords'] ?? '')),
            'og_type' => self::sanitize((string) ($data['og_type'] ?? 'website')) ?: 'website',
        ];
    }

    public static function excerpt(?string $content, int $maxLength = 160): string
    {
        $plainText = self::sanitize((string) $content);

        if ($plainText === '') {
            return '';
        }

        return Str::limit($plainText, $maxLength, '...');
    }

    private static function normalizeImage(mixed $image): string
    {
        if (! is_string($image) || trim($image) === '') {
            return asset(self::DEFAULT_IMAGE);
        }

        return self::normalizeUrl($image, true);
    }

    private static function normalizeUrl(mixed $value, bool $preferAsset = false): string
    {
        if (! is_string($value) || trim($value) === '') {
            return url('/');
        }

        $value = trim($value);

        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }

        if (Str::startsWith($value, '//')) {
            $scheme = parse_url((string) config('app.url'), PHP_URL_SCHEME) ?: request()->getScheme();

            return $scheme.':'.$value;
        }

        if (Str::startsWith($value, '/storage/')) {
            return url(Storage::url(ltrim(Str::after($value, '/storage/'), '/')));
        }

        if (Str::startsWith($value, 'storage/')) {
            return url(Storage::url(ltrim(Str::after($value, 'storage/'), '/')));
        }

        if (Str::startsWith($value, '/')) {
            return url($value);
        }

        return $preferAsset ? asset($value) : url('/'.ltrim($value, '/'));
    }

    private static function sanitize(string $value): string
    {
        return trim((string) preg_replace('/\s+/u', ' ', strip_tags($value)));
    }
}
