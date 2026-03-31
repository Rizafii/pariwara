import {
    ClipboardList,
    FileCheck,
    Hammer,
    MessageCircle,
    Package,
    Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const STEPS = [
    {
        step: '01',
        title: 'Konsultasi',
        description:
            'Diskusikan kebutuhan reklame dan signage Anda bersama tim kami secara gratis.',
        icon: MessageCircle,
    },
    {
        step: '02',
        title: 'Survey & Pengukuran',
        description:
            'Tim kami melakukan survey lokasi dan pengukuran untuk memastikan hasil yang presisi.',
        icon: ClipboardList,
    },
    {
        step: '03',
        title: 'Desain & Persetujuan',
        description:
            'Kami buatkan desain sesuai permintaan, lalu Anda review hingga disetujui.',
        icon: FileCheck,
    },
    {
        step: '04',
        title: 'Produksi',
        description:
            'Proses produksi menggunakan material berkualitas dengan tenaga ahli berpengalaman.',
        icon: Hammer,
    },
    {
        step: '05',
        title: 'Pengiriman',
        description:
            'Produk dikemas dengan aman dan dikirim tepat waktu ke lokasi Anda.',
        icon: Truck,
    },
    {
        step: '06',
        title: 'Pemasangan',
        description:
            'Tim instalasi profesional kami memastikan pemasangan rapi, aman, dan sesuai standar.',
        icon: Package,
    },
];

export default function Workflow() {
    return (
        <section className="bg-background py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                {/* Header */}
                <div className="text-center">
                    <Badge>Proses Kerja Kami</Badge>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Flow Pengerjaan
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        Dari konsultasi hingga pemasangan, kami pastikan setiap
                        tahap berjalan profesional dan transparan.
                    </p>
                </div>

                {/* Steps */}
                <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {STEPS.map((item, index) => (
                        <div
                            key={item.step}
                            className="group relative rounded-2xl border border-border/50 bg-muted/20 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                        >
                            {/* Step Number */}
                            <span className="absolute top-6 right-6 text-5xl font-extrabold text-muted-foreground/10 transition-colors group-hover:text-primary/15">
                                {item.step}
                            </span>

                            {/* Icon */}
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-foreground">
                                <item.icon className="h-7 w-7" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-foreground">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>

                            {/* Connector line (not on last in row) */}
                            {index < STEPS.length - 1 && (
                                <div className="absolute top-1/2 -right-4 hidden h-px w-8 bg-border lg:block" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
