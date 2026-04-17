import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    Clock3,
    MapPin,
    PhoneCall,
    Sparkles,
    Wrench,
} from 'lucide-react';

import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GoogleAdsLandingProps {
    landingUrl: string;
}

const WHATSAPP_URL =
    'https://wa.me/628123394055?text=Halo,%20saya%20ingin%20konsultasi%20jasa%20neon%20sign%20di%20Malang.';
const PHONE_URL = 'tel:+628123394055';
const LAST_UPDATED = '2026-04-17';

const HIGHLIGHTS = [
    {
        title: 'Desain 100% Custom',
        description:
            'Konsep visual disesuaikan dengan karakter brand agar signage lebih mudah diingat pelanggan.',
        icon: Sparkles,
    },
    {
        title: 'Produksi Rapi & Presisi',
        description:
            'Pengerjaan menggunakan material berkualitas untuk hasil neon sign yang terang, aman, dan tahan lama.',
        icon: Wrench,
    },
    {
        title: 'Instalasi Profesional',
        description:
            'Tim teknis berpengalaman memastikan pemasangan kuat, rapi, dan sesuai standar keselamatan.',
        icon: BadgeCheck,
    },
    {
        title: 'Estimasi Cepat',
        description:
            'Kebutuhan ukuran, bahan, dan budget bisa dipetakan cepat lewat konsultasi WhatsApp.',
        icon: Clock3,
    },
];

const WORKFLOW = [
    {
        title: 'Brief Kebutuhan',
        description: 'Ceritakan jenis usaha, lokasi pemasangan, ukuran, dan target gaya visual.',
    },
    {
        title: 'Konsep & Estimasi',
        description: 'Tim menyiapkan rekomendasi desain, material, dan estimasi biaya secara transparan.',
    },
    {
        title: 'Produksi',
        description: 'Proses produksi dilakukan setelah desain disetujui, dengan quality check berlapis.',
    },
    {
        title: 'Pemasangan',
        description: 'Instalasi dilakukan oleh teknisi berpengalaman agar signage siap pakai dengan aman.',
    },
];

const SERVICE_CATALOG = [
    {
        title: 'Neon Sign Custom',
        target: 'Cafe, retail, studio, dan booth event',
        image: '/storage/services/images/zJDjG1tPUGW0QxTtN2UyslbNq4g2l9qpdMRsX19a.jpg',
        points: [
            'Desain lettering atau logo custom',
            'Pilihan warna lampu mengikuti brand',
            'Tersedia opsi indoor maupun outdoor',
        ],
    },
    {
        title: 'Signage Fasad Usaha',
        target: 'Ruko, kantor, klinik, dan showroom',
        image: '/storage/services/gallery/Gfz3zhkCRFUlys66aGJ73IBYnbS3bxBQY1KtOUxB.jpg',
        points: [
            'Visual storefront lebih premium',
            'Material awet dan finishing rapi',
            'Instalasi teknis dilakukan tim profesional',
        ],
    },
    {
        title: 'Paket Branding Cabang',
        target: 'Brand yang sedang ekspansi lokasi',
        image: '/storage/services/gallery/UPdTrXiRCnswnXLOAsQ4GFppzehdF734gVsaYvYU.jpg',
        points: [
            'Standarisasi tampilan antar cabang',
            'Pendampingan desain sampai pemasangan',
            'Timeline kerja terstruktur dan terukur',
        ],
    },
];

const PRODUCT_CATALOG = [
    {
        title: 'Neon Flex Lettering',
        target: 'Pilihan favorit untuk indoor display',
        image: '/storage/products/images/mnjoXi2H46fLUjpaUyHFrXGwrZlgsrumLtsWmjq1.jpg',
        points: [
            'Cahaya lebih rata dan modern',
            'Hemat energi',
            'Cocok untuk konten visual brand',
        ],
    },
    {
        title: 'Huruf Timbul Acrylic',
        target: 'Untuk branding fasad yang elegan',
        image: '/storage/products/gallery/8aSl2yhJxK8AlLe1c8Zz1jEV4mkQeNpIpxPCcfnW.png',
        points: [
            'Tampilan clean dan profesional',
            'Bisa kombinasi LED backlight',
            'Fleksibel untuk berbagai ukuran',
        ],
    },
    {
        title: 'Pylon/Sign Tower Mini',
        target: 'Untuk area bisnis dengan visibilitas tinggi',
        image: '/storage/products/gallery/8v42DgYhABjEceLPHmzLJIdThrcaLWHLL7g3HSDL.png',
        points: [
            'Mudah terlihat dari jarak jauh',
            'Konstruksi kuat dan stabil',
            'Bisa custom identitas brand',
        ],
    },
];

const FAQS = [
    {
        question: 'Apakah bisa request desain sesuai identitas brand?',
        answer:
            'Bisa. Tim kami menyesuaikan bentuk, warna, dan nuansa pencahayaan dengan guideline visual brand Anda.',
    },
    {
        question: 'Berapa lama proses produksi neon sign?',
        answer:
            'Estimasi rata-rata 5-14 hari kerja, tergantung kompleksitas desain, ukuran, dan antrean produksi.',
    },
    {
        question: 'Apakah melayani survei dan pemasangan di luar Malang?',
        answer:
            'Ya, kami melayani area Malang Raya dan kota sekitarnya dengan penyesuaian jadwal serta biaya operasional.',
    },
    {
        question: 'Bagaimana cara mendapatkan penawaran harga?',
        answer:
            'Kirim detail kebutuhan melalui WhatsApp. Kami akan bantu hitung estimasi dan rekomendasi material paling sesuai budget.',
    },
];

export default function GoogleAdsLandingPage({ landingUrl }: GoogleAdsLandingProps) {
    const homeUrl = new URL('/', landingUrl).toString();
    const logoUrl = new URL('/logo/logo.webp', landingUrl).toString();

    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                name: 'CV. PARIWARA SATU SAE',
                description:
                    'Jasa neon sign dan signage custom di Malang untuk kebutuhan branding toko, cafe, kantor, dan bisnis lokal.',
                areaServed: ['Malang', 'Batu', 'Kepanjen', 'Jawa Timur'],
                telephone: '+62 812-3394-055',
                image: logoUrl,
                url: landingUrl,
                sameAs: ['https://wa.me/628123394055'],
            },
            {
                '@type': 'Service',
                name: 'Jasa Neon Sign Malang',
                serviceType: 'Produksi dan instalasi neon sign custom',
                areaServed: 'Malang',
                provider: {
                    '@type': 'LocalBusiness',
                    name: 'CV. PARIWARA SATU SAE',
                },
                offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/InStock',
                    url: landingUrl,
                },
            },
            {
                '@type': 'FAQPage',
                mainEntity: FAQS.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer,
                    },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Beranda',
                        item: homeUrl,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Jasa Neon Sign Malang',
                        item: landingUrl,
                    },
                ],
            },
        ],
    };

    return (
        <>
            <Head>
                <meta
                    name="robots"
                    content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                />
                <meta property="og:locale" content="id_ID" />
                <meta name="author" content="CV. PARIWARA SATU SAE" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <Navbar />

            <main className="bg-background pt-28 pb-16">
                <nav aria-label="Breadcrumb" className="container mx-auto px-4 pb-5 sm:px-6 lg:px-28">
                    <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <li>
                            <Link href="/" className="transition-colors hover:text-foreground">
                                Beranda
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page" className="font-medium text-foreground">
                            Jasa Neon Sign Malang
                        </li>
                    </ol>
                </nav>

                <section
                    className="relative overflow-hidden border-y border-border/40 bg-[#0a1628] py-14 text-white sm:py-20"
                    aria-labelledby="google-ads-hero-heading"
                >
                    <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]" />
                    <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-[120px]" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-28">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <Badge className="border-white/25 bg-white/10 text-white">
                                    Landing Iklan Google Ads Search
                                </Badge>
                                <h1
                                    id="google-ads-hero-heading"
                                    className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                                >
                                    Jasa Neon Sign Malang Custom untuk Toko, Cafe, dan Kantor
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                                    Tingkatkan visibilitas bisnis Anda dengan signage yang tepat sasaran. Kami bantu dari
                                    konsep desain, produksi, sampai instalasi dengan hasil yang rapi dan profesional.
                                </p>

                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <Button asChild size="lg" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                            Konsultasi Gratis Sekarang
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                                    >
                                        <a href={PHONE_URL}>
                                            <PhoneCall className="h-4 w-4" />
                                            Hubungi Tim Kami
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <aside className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                                <h2 className="text-sm font-semibold tracking-[0.16em] text-slate-200 uppercase">
                                    Fokus Halaman Ini
                                </h2>
                                <ul className="mt-4 space-y-3">
                                    <li className="flex gap-2 text-sm text-slate-100">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                                        Penawaran layanan utama yang paling dicari di Google Search.
                                    </li>
                                    <li className="flex gap-2 text-sm text-slate-100">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                                        Struktur konten ringkas untuk pengunjung yang ingin keputusan cepat.
                                    </li>
                                    <li className="flex gap-2 text-sm text-slate-100">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                                        CTA jelas untuk meningkatkan konversi dari traffic iklan.
                                    </li>
                                </ul>

                                <div className="mt-6 rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-xs text-slate-200">
                                    <p>
                                        Update konten terakhir:{' '}
                                        <time dateTime={LAST_UPDATED} className="font-semibold text-white">
                                            17 April 2026
                                        </time>
                                    </p>
                                    <p className="mt-1 inline-flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />
                                        Melayani Malang Raya dan area sekitarnya.
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-12 sm:px-6 lg:px-28"
                    aria-labelledby="google-ads-highlights-heading"
                >
                    <h2 id="google-ads-highlights-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Kenapa Banyak Bisnis Memilih Kami
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Halaman ini dirancang untuk membantu Anda menilai kecocokan layanan dengan cepat, tanpa harus
                        membaca informasi yang terlalu panjang.
                    </p>

                    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {HIGHLIGHTS.map((item) => (
                            <li key={item.title}>
                                <article className="h-full rounded-2xl border border-border/60 bg-background p-5 shadow-xs">
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-3 text-base font-semibold text-foreground">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                </article>
                            </li>
                        ))}
                    </ul>
                </section>

                <section
                    className="container mx-auto px-4 pt-14 sm:px-6 lg:px-28"
                    aria-labelledby="google-ads-workflow-heading"
                >
                    <div className="rounded-3xl border border-border/60 bg-muted/30 p-7 sm:p-9">
                        <h2 id="google-ads-workflow-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Alur Kerja yang Jelas dari Awal Sampai Terpasang
                        </h2>
                        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {WORKFLOW.map((step, index) => (
                                <li key={step.title}>
                                    <article className="rounded-2xl border border-border/60 bg-background p-5">
                                        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                                            Step {index + 1}
                                        </p>
                                        <h3 className="mt-2 text-base font-semibold text-foreground">{step.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </article>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-14 sm:px-6 lg:px-28"
                    aria-labelledby="google-ads-catalog-heading"
                >
                    <h2 id="google-ads-catalog-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Katalog Layanan dan Produk Pilihan
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Biar lebih kebayang hasil akhirnya, ini beberapa contoh layanan dan produk favorit yang sering
                        dipilih klien kami.
                    </p>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-foreground">Katalog Layanan</h3>
                        <ul className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
                            {SERVICE_CATALOG.map((service) => (
                                <li key={service.title}>
                                    <article className="h-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            loading="lazy"
                                            className="h-44 w-full object-cover"
                                        />
                                        <div className="p-5">
                                            <h4 className="text-lg font-semibold text-foreground">{service.title}</h4>
                                            <p className="mt-1 text-sm text-muted-foreground">{service.target}</p>
                                            <ul className="mt-4 space-y-2">
                                                {service.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                                    >
                                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xl font-semibold text-foreground">Katalog Produk</h3>
                        <ul className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
                            {PRODUCT_CATALOG.map((product) => (
                                <li key={product.title}>
                                    <article className="h-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            loading="lazy"
                                            className="h-44 w-full object-cover"
                                        />
                                        <div className="p-5">
                                            <h4 className="text-lg font-semibold text-foreground">{product.title}</h4>
                                            <p className="mt-1 text-sm text-muted-foreground">{product.target}</p>
                                            <ul className="mt-4 space-y-2">
                                                {product.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                                    >
                                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section
                    className="container mx-auto px-4 pt-14 sm:px-6 lg:px-28"
                    aria-labelledby="google-ads-faq-heading"
                >
                    <h2 id="google-ads-faq-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <dl className="mt-6 space-y-4">
                        {FAQS.map((faq) => (
                            <div key={faq.question} className="rounded-2xl border border-border/60 bg-background p-5">
                                <dt className="text-base font-semibold text-foreground">{faq.question}</dt>
                                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section
                    className="container mx-auto px-4 pt-14 sm:px-6 lg:px-28"
                    aria-labelledby="google-ads-cta-heading"
                >
                    <div className="rounded-3xl border border-border/60 bg-[#08142a] px-7 py-9 text-slate-100 sm:px-10 sm:py-11">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <h2 id="google-ads-cta-heading" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    Siap Naik Kelas dengan Signage yang Lebih Menjual?
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                                    Kirim kebutuhan Anda hari ini, dapatkan arahan desain dan estimasi awal agar proses
                                    branding berjalan lebih cepat.
                                </p>
                                <p className="mt-4 text-sm text-slate-200">
                                    Butuh referensi hasil kerja? Lihat juga{' '}
                                    <Link href="/gallery" className="font-semibold text-amber-300 hover:text-amber-200">
                                        portofolio project kami
                                    </Link>
                                    .
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                                <Button asChild size="lg" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                        Chat WhatsApp
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button asChild size="lg"  className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                                    <Link href="/layanan">Lihat Semua Layanan</Link>
                                </Button>
                                <Button asChild size="lg"  className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                                    <Link href="/kontak">Halaman Kontak</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Whatsapp />
        </>
    );
}