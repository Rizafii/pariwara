<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        @php
            $seoTitle = $title ?? config('app.name');
            $seoDescription = $description ?? 'Default description';
            $seoImage = $image ?? asset('logo/logo.webp');
            $seoUrl = $url ?? url()->current();
            $seoCanonical = $canonical ?? $seoUrl;
            $seoOgType = $og_type ?? 'website';
            $seoKeywords = $keywords ?? '';
            $seoRobots = $robots ?? '';
            $seoLocale = str_replace('-', '_', app()->getLocale());
            $seoLogo = asset('logo/logo.webp');
            $seoStructuredData = [
                '@context' => 'https://schema.org',
                '@graph' => [
                    [
                        '@type' => 'Organization',
                        '@id' => url('/').'#organization',
                        'name' => config('app.name'),
                        'url' => url('/'),
                        'logo' => [
                            '@type' => 'ImageObject',
                            'url' => $seoLogo,
                        ],
                        'image' => $seoImage,
                    ],
                    [
                        '@type' => 'WebSite',
                        '@id' => url('/').'#website',
                        'url' => url('/'),
                        'name' => config('app.name'),
                        'inLanguage' => $seoLocale,
                        'publisher' => [
                            '@id' => url('/').'#organization',
                        ],
                    ],
                    [
                        '@type' => 'WebPage',
                        '@id' => $seoCanonical.'#webpage',
                        'url' => $seoCanonical,
                        'name' => $seoTitle,
                        'description' => $seoDescription,
                        'inLanguage' => $seoLocale,
                        'isPartOf' => [
                            '@id' => url('/').'#website',
                        ],
                        'primaryImageOfPage' => [
                            '@type' => 'ImageObject',
                            'url' => $seoImage,
                        ],
                    ],
                ],
            ];
        @endphp

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $seoTitle }}</title>

        <meta name="description" content="{{ $seoDescription }}">
        <meta name="keywords" content="{{ $seoKeywords }}">
        @if ($seoRobots !== '')
        <meta name="robots" content="{{ $seoRobots }}">
        <meta name="googlebot" content="{{ $seoRobots }}">
        @endif

        <meta property="og:title" content="{{ $seoTitle }}">
        <meta property="og:description" content="{{ $seoDescription }}">
        <meta property="og:image" content="{{ $seoImage }}">
        <meta property="og:image:secure_url" content="{{ $seoImage }}">
        <meta property="og:image:alt" content="{{ $seoTitle }}">
        <meta property="og:url" content="{{ $seoUrl }}">
        <meta property="og:type" content="{{ $seoOgType }}">
        <meta property="og:site_name" content="{{ config('app.name') }}">
        <meta property="og:locale" content="{{ $seoLocale }}">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $seoTitle }}">
        <meta name="twitter:description" content="{{ $seoDescription }}">
        <meta name="twitter:image" content="{{ $seoImage }}">
        <meta name="twitter:image:alt" content="{{ $seoTitle }}">

        <link rel="canonical" href="{{ $seoCanonical }}">
        <script type="application/ld+json">@json($seoStructuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)</script>

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
</style>

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head />
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
