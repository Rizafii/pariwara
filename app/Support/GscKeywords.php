<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

class GscKeywords
{
    /**
     * Parse the Kueri.csv file and cache the results.
     *
     * @return array<int, array{query: string, clicks: int, impressions: int, ctr: string, position: float}>
     */
    public static function getCsvData(): array
    {
        $csvPath = public_path('Kueri.csv');

        if (!File::exists($csvPath)) {
            return [];
        }

        // Cache the parsed CSV data based on the file modification time
        $mtime = File::lastModified($csvPath);
        $cacheKey = 'gsc_keywords_data_' . $mtime;

        return Cache::rememberForever($cacheKey, function () use ($csvPath) {
            $data = [];
            if (($handle = fopen($csvPath, 'r')) !== false) {
                // Read header
                $header = fgetcsv($handle, 1000, ',');
                
                // GSC CSV might have UTF-8 BOM, let's clean the header
                if ($header && isset($header[0])) {
                    $header[0] = preg_replace('/[\x{FEFF}\x{FFFE}]/u', '', $header[0]);
                }

                while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                    if (count($row) < 5) {
                        continue;
                    }
                    
                    $query = trim($row[0]);
                    if ($query === '' || strtolower($query) === 'kueri teratas') {
                        continue;
                    }

                    // Impresions: remove dot/comma grouping if any (e.g. 1.200 or 1,200) depending on CSV format
                    $clicks = (int) str_replace([',', '.'], '', $row[1]);
                    $impressions = (int) str_replace([',', '.'], '', $row[2]);

                    $data[] = [
                        'query' => $query,
                        'clicks' => $clicks,
                        'impressions' => $impressions,
                        'ctr' => trim($row[3]),
                        'position' => (float) str_replace(',', '.', $row[4]),
                    ];
                }
                fclose($handle);
            }

            // Sort by impressions descending
            usort($data, function ($a, $b) {
                return $b['impressions'] <=> $a['impressions'];
            });

            return $data;
        });
    }

    /**
     * Enrich the existing keywords string with relevant search terms from GSC CSV.
     *
     * @param string $existingKeywordsString
     * @param int $limitPerTag Maximum number of keywords to append per topic
     * @return string
     */
    public static function enrich(string $existingKeywordsString, int $limitPerTag = 5): string
    {
        $csvKeywords = self::getCsvData();
        if (empty($csvKeywords)) {
            return $existingKeywordsString;
        }

        if (trim($existingKeywordsString) === '') {
            // If empty, append the top general keywords from CSV
            $topKeywords = array_slice($csvKeywords, 0, 10);
            return implode(', ', array_column($topKeywords, 'query'));
        }

        // Split existing keywords
        $existingTags = array_map('trim', explode(',', $existingKeywordsString));
        $existingTags = array_filter($existingTags);

        // Core topic words to match queries (topic/product words)
        $topicWords = [
            'neon', 'box', 'flex', 'sign', 'neonsign', 'huruf', 'timbul', 
            'akrilik', 'acrylic', 'papan', 'nama', 'reklame', 'signage', 
            'advertising', 'branding', 'letter', 'plang', 'las'
        ];

        $enrichedKeywords = $existingTags;
        $addedKeywords = [];

        // Normalize existing tags for matching
        $normalizedTags = array_map('strtolower', $existingTags);

        foreach ($existingTags as $tag) {
            $tagLower = strtolower($tag);
            
            // Extract the words in this tag that are topic words
            $tagTopicWords = [];
            foreach ($topicWords as $word) {
                if (str_contains($tagLower, $word)) {
                    $tagTopicWords[] = $word;
                }
            }

            if (empty($tagTopicWords)) {
                continue;
            }

            // Find matching queries in GSC CSV
            $matches = [];
            foreach ($csvKeywords as $item) {
                $queryLower = strtolower($item['query']);
                
                // If query is already in existing keywords, skip
                if (in_array($queryLower, $normalizedTags) || in_array($queryLower, $addedKeywords)) {
                    continue;
                }

                // Check if the query contains all or at least one of the topic words found in the tag
                $matchesWord = false;
                foreach ($tagTopicWords as $word) {
                    if (str_contains($queryLower, $word)) {
                        $matchesWord = true;
                        break;
                    }
                }

                if ($matchesWord) {
                    $matches[] = $item;
                }
            }

            // Sort matches by impressions descending (already done, but just in case)
            $slicedMatches = array_slice($matches, 0, $limitPerTag);
            foreach ($slicedMatches as $match) {
                $enrichedKeywords[] = $match['query'];
                $addedKeywords[] = strtolower($match['query']);
            }
        }

        // De-duplicate keeping original order
        $finalKeywords = [];
        $seen = [];
        foreach ($enrichedKeywords as $kw) {
            $kwLower = strtolower($kw);
            if (!isset($seen[$kwLower])) {
                $seen[$kwLower] = true;
                $finalKeywords[] = $kw;
            }
        }

        return implode(', ', $finalKeywords);
    }
}
