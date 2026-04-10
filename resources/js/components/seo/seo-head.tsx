import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export interface SeoMeta {
    title: string;
    description: string;
    keywords: string;
    image: string;
    url: string;
    canonical?: string;
    type?: string;
}

interface SeoHeadProps {
    meta?: Partial<SeoMeta>;
    children?: ReactNode;
}

const DEFAULT_META: SeoMeta = {
    title: "Jasa Neon Sign Malang Custom | Orion's Melody",
    description:
        'Jasa pembuatan neon sign custom di Malang, berkualitas premium dan harga terjangkau.',
    keywords:
        'neon sign malang, neon box malang, signage malang, branding usaha malang, jawa timur',
    image: '/logo/logo.webp',
    url: '/',
    canonical: '/',
    type: 'website',
};

function toAbsoluteUrl(value: string): string {
    if (value.startsWith('http://') || value.startsWith('https://')) {
        return value;
    }

    if (value.startsWith('//')) {
        return `https:${value}`;
    }

    if (typeof window !== 'undefined') {
        return new URL(value, window.location.origin).toString();
    }

    return value;
}

function normalizeMeta(meta?: Partial<SeoMeta>): SeoMeta {
    const title = (meta?.title ?? DEFAULT_META.title).trim();
    const description = (meta?.description ?? DEFAULT_META.description).trim();
    const keywords = (meta?.keywords ?? DEFAULT_META.keywords).trim();

    const url = toAbsoluteUrl(meta?.url ?? DEFAULT_META.url);
    const canonical = toAbsoluteUrl(meta?.canonical ?? url);
    const image = toAbsoluteUrl(meta?.image ?? DEFAULT_META.image);

    return {
        title,
        description,
        keywords,
        url,
        canonical,
        image,
        type: meta?.type ?? DEFAULT_META.type,
    };
}

export default function SeoHead({ meta, children }: SeoHeadProps) {
    const normalizedMeta = normalizeMeta(meta);

    return (
        <Head title={normalizedMeta.title}>
            {children}

            <meta name="description" content={normalizedMeta.description} />
            <meta name="keywords" content={normalizedMeta.keywords} />

            <meta property="og:type" content={normalizedMeta.type ?? 'website'} />
            <meta property="og:title" content={normalizedMeta.title} />
            <meta property="og:description" content={normalizedMeta.description} />
            <meta property="og:image" content={normalizedMeta.image} />
            <meta property="og:url" content={normalizedMeta.url} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={normalizedMeta.title} />
            <meta name="twitter:description" content={normalizedMeta.description} />
            <meta name="twitter:image" content={normalizedMeta.image} />

            <link rel="canonical" href={normalizedMeta.canonical ?? normalizedMeta.url} />
        </Head>
    );
}
