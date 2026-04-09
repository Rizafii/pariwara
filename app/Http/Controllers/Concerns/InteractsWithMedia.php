<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

trait InteractsWithMedia
{
    protected function storeUploadedImage(?UploadedFile $file, string $directory): ?string
    {
        if (! $file) {
            return null;
        }

        return $file->store($directory, 'public');
    }

    /**
     * @param  array<int, UploadedFile>  $files
     * @return array<int, string>
     */
    protected function storeUploadedImages(array $files, string $directory): array
    {
        return collect($files)
            ->filter(fn (mixed $file): bool => $file instanceof UploadedFile)
            ->map(fn (UploadedFile $file): string => $file->store($directory, 'public'))
            ->values()
            ->all();
    }

    protected function toPublicUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        $normalizedPath = str_replace('\\', '/', $path);

        if (filter_var($normalizedPath, FILTER_VALIDATE_URL) || Str::startsWith($normalizedPath, '//')) {
            $urlPath = parse_url($normalizedPath, PHP_URL_PATH);

            if (is_string($urlPath) && Str::startsWith($urlPath, '/storage/')) {
                return $urlPath;
            }

            return $path;
        }

        if (Str::startsWith($normalizedPath, '/storage/')) {
            return $normalizedPath;
        }

        if (Str::startsWith($normalizedPath, 'storage/')) {
            return '/'.$normalizedPath;
        }

        return '/storage/'.ltrim($normalizedPath, '/');
    }

    /**
     * @param  array<int, string>  $paths
     * @return array<int, string>
     */
    protected function toPublicUrls(array $paths): array
    {
        return collect($paths)
            ->map(fn (string $path): ?string => $this->toPublicUrl($path))
            ->filter()
            ->values()
            ->all();
    }

    protected function deleteStoredFile(?string $path): void
    {
        if (! $path) {
            return;
        }

        $normalizedPath = str_replace('\\', '/', $path);

        if (Str::startsWith($normalizedPath, ['http://', 'https://', '//', 'data:'])) {
            return;
        }

        if (Str::startsWith($normalizedPath, '/storage/')) {
            $normalizedPath = Str::after($normalizedPath, '/storage/');
        } elseif (Str::startsWith($normalizedPath, 'storage/')) {
            $normalizedPath = Str::after($normalizedPath, 'storage/');
        }

        \Illuminate\Support\Facades\Storage::disk('public')->delete(ltrim($normalizedPath, '/'));
    }

    /**
     * @param  array<int, string>  $paths
     */
    protected function deleteStoredFiles(array $paths): void
    {
        foreach ($paths as $path) {
            $this->deleteStoredFile($path);
        }
    }
}
