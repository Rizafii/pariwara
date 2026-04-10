<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        @php
            $defaultSeoTitle = "Jasa Neon Sign Malang | CV. PARIWARA SATU SAE";
            $defaultSeoDescription = 'Jasa pembuatan neon sign custom di Malang, berkualitas premium dan harga terjangkau.';
            $defaultSeoKeywords = 'neon sign malang, neon box malang, signage malang, branding usaha malang, jawa timur';
            $defaultSeoUrl = rtrim(config('app.url', request()->getSchemeAndHttpHost()), '/');
            $defaultSeoImage = $defaultSeoUrl.'/logo/logo.webp';
        @endphp

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

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
        <x-inertia::head>
            <title>{{ $defaultSeoTitle }}</title>
            <meta name="description" content="{{ $defaultSeoDescription }}">
            <meta name="keywords" content="{{ $defaultSeoKeywords }}">

            <meta property="og:type" content="website">
            <meta property="og:title" content="{{ $defaultSeoTitle }}">
            <meta property="og:description" content="{{ $defaultSeoDescription }}">
            <meta property="og:image" content="{{ $defaultSeoImage }}">
            <meta property="og:url" content="{{ $defaultSeoUrl }}">
            <link rel="canonical" href="{{ $defaultSeoUrl }}">

            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="{{ $defaultSeoTitle }}">
            <meta name="twitter:description" content="{{ $defaultSeoDescription }}">
            <meta name="twitter:image" content="{{ $defaultSeoImage }}">
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
