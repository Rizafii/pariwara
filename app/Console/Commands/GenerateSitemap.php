<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Product;
use App\Models\Service;
use DateTimeInterface;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate sitemap.xml from website routes and published content';

    public function handle(): int
    {
        $baseUrl = rtrim((string) config('app.url', url('/')), '/');

        $urls = [
            $this->makeUrlEntry($baseUrl.'/', now(), 'daily', '1.0'),
            $this->makeUrlEntry($this->absolutePathUrl($baseUrl, '/artikel'), now(), 'daily', '0.9'),
            $this->makeUrlEntry($this->absolutePathUrl($baseUrl, '/produk'), now(), 'daily', '0.9'),
            $this->makeUrlEntry($this->absolutePathUrl($baseUrl, '/layanan'), now(), 'weekly', '0.8'),
            $this->makeUrlEntry($this->absolutePathUrl($baseUrl, '/gallery'), now(), 'weekly', '0.8'),
            $this->makeUrlEntry($this->absolutePathUrl($baseUrl, '/tentang'), now(), 'monthly', '0.6'),
        ];

        Article::query()
            ->where('is_published', true)
            ->whereNotNull('slug')
            ->get(['slug', 'updated_at', 'published_at'])
            ->each(function (Article $article) use (&$urls, $baseUrl): void {
                if (! $article->slug) {
                    return;
                }

                $urls[] = $this->makeUrlEntry(
                    $this->absolutePathUrl($baseUrl, '/artikel/'.$article->slug),
                    $article->updated_at ?? $article->published_at,
                    'weekly',
                    '0.7',
                );
            });

        Product::query()
            ->where('is_active', true)
            ->whereNotNull('slug')
            ->get(['slug', 'updated_at'])
            ->each(function (Product $product) use (&$urls, $baseUrl): void {
                if (! $product->slug) {
                    return;
                }

                $urls[] = $this->makeUrlEntry(
                    $this->absolutePathUrl($baseUrl, '/produk/'.$product->slug),
                    $product->updated_at,
                    'weekly',
                    '0.8',
                );
            });

        Service::query()
            ->where('is_active', true)
            ->whereNotNull('slug')
            ->get(['slug', 'updated_at'])
            ->each(function (Service $service) use (&$urls, $baseUrl): void {
                if (! $service->slug) {
                    return;
                }

                $urls[] = $this->makeUrlEntry(
                    $this->absolutePathUrl($baseUrl, '/layanan/'.$service->slug),
                    $service->updated_at,
                    'weekly',
                    '0.7',
                );
            });

        $uniqueUrls = collect($urls)
            ->unique('loc')
            ->values()
            ->all();

        File::put(public_path('sitemap.xml'), $this->buildSitemapXml($uniqueUrls));

        $this->info('Sitemap generated successfully: '.public_path('sitemap.xml'));
        $this->line('Total URL entries: '.count($uniqueUrls));

        return self::SUCCESS;
    }

    /**
     * @return array{loc: string, lastmod: string, changefreq: string, priority: string}
     */
    private function makeUrlEntry(
        string $loc,
        ?DateTimeInterface $lastModified,
        string $changeFrequency,
        string $priority,
    ): array {
        return [
            'loc' => $loc,
            'lastmod' => $this->toAtomString($lastModified),
            'changefreq' => $changeFrequency,
            'priority' => $priority,
        ];
    }

    private function absolutePathUrl(string $baseUrl, string $path): string
    {
        return $baseUrl.'/'.ltrim($path, '/');
    }

    private function toAtomString(?DateTimeInterface $dateTime): string
    {
        return ($dateTime ?? now())->format(DATE_ATOM);
    }

    /**
     * @param  array<int, array{loc: string, lastmod: string, changefreq: string, priority: string}>  $urls
     */
    private function buildSitemapXml(array $urls): string
    {
        $lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ];

        foreach ($urls as $url) {
            $lines[] = '  <url>';
            $lines[] = '    <loc>'.$this->escapeXml($url['loc']).'</loc>';
            $lines[] = '    <lastmod>'.$this->escapeXml($url['lastmod']).'</lastmod>';
            $lines[] = '    <changefreq>'.$this->escapeXml($url['changefreq']).'</changefreq>';
            $lines[] = '    <priority>'.$this->escapeXml($url['priority']).'</priority>';
            $lines[] = '  </url>';
        }

        $lines[] = '</urlset>';

        return implode(PHP_EOL, $lines).PHP_EOL;
    }

    private function escapeXml(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_COMPAT, 'UTF-8');
    }
}
