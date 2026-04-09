import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard as dashboardHome } from '@/routes';
import dashboardRoutes from '@/routes/dashboard';

interface ServiceItem {
    id: number;
    title: string;
    slug: string;
    description: string;
    image?: string | null;
    gallery?: string[] | null;
    features?: string[] | null;
    is_active: boolean;
}

interface SharedPageProps {
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

interface ServicesPageProps {
    services: ServiceItem[];
}

type ServiceFormData = {
    title: string;
    description: string;
    images: File[];
    features_input: string;
    is_active: boolean;
    _method?: 'put';
};

const EMPTY_FORM: ServiceFormData = {
    title: '',
    description: '',
    images: [],
    features_input: '',
    is_active: true,
};

const TEXTAREA_CLASS =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]';

export default function ServicesIndex({ services }: ServicesPageProps) {
    const { flash } = usePage<SharedPageProps>().props;
    const [editingService, setEditingService] = useState<ServiceItem | null>(null);
    const form = useForm<ServiceFormData>(EMPTY_FORM);

    const startCreateMode = () => {
        setEditingService(null);
        form.reset();
        form.clearErrors();
        form.setData('is_active', true);
    };

    const startEditMode = (service: ServiceItem) => {
        setEditingService(service);
        form.clearErrors();
        form.setData('title', service.title);
        form.setData('description', service.description);
        form.setData('images', []);
        form.setData('features_input', (service.features ?? []).join('\n'));
        form.setData('is_active', service.is_active);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingService) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(
                dashboardRoutes.services.update.url({ service: editingService.id }),
                {
                    preserveScroll: true,
                    forceFormData: true,
                    onSuccess: () => {
                        startCreateMode();
                    },
                    onFinish: () => {
                        form.transform((data) => data);
                    },
                },
            );

            return;
        }

        form.transform((data) => data);
        form.post(dashboardRoutes.services.store.url(), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                startCreateMode();
            },
        });
    };

    const handleDelete = (service: ServiceItem) => {
        const confirmed = window.confirm(`Hapus layanan "${service.title}"?`);

        if (!confirmed) {
            return;
        }

        router.delete(dashboardRoutes.services.destroy.url({ service: service.id }), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingService?.id === service.id) {
                    startCreateMode();
                }
            },
        });
    };

    return (
        <>
            <Head title="Kelola Layanan" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Kelola Layanan"
                    description="Kelola data layanan yang tampil di halaman layanan dan beranda."
                />

                {flash?.success && (
                    <Alert className="border-emerald-200 bg-emerald-50 text-emerald-700">
                        <AlertTitle>Berhasil</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'}
                        </CardTitle>
                        <CardDescription>
                            Upload beberapa gambar sekaligus, gambar pertama akan dipakai sebagai gambar utama layanan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="service-title">Judul Layanan</Label>
                                <Input
                                    id="service-title"
                                    value={form.data.title}
                                    onChange={(event) => form.setData('title', event.target.value)}
                                    placeholder="Contoh: Neon Box"
                                />
                                <InputError message={form.errors.title} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="service-description">Deskripsi</Label>
                                <textarea
                                    id="service-description"
                                    className={TEXTAREA_CLASS}
                                    value={form.data.description}
                                    onChange={(event) => form.setData('description', event.target.value)}
                                    placeholder="Deskripsi layanan"
                                />
                                <InputError message={form.errors.description} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="service-images">Galeri Gambar</Label>
                                <Input
                                    id="service-images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(event) =>
                                        form.setData('images', Array.from(event.target.files ?? []))
                                    }
                                />
                                {editingService && (
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        {editingService.image && (
                                            <a
                                                href={editingService.image}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                Lihat gambar utama saat ini
                                            </a>
                                        )}
                                        <p>
                                            {editingService.gallery?.length ?? 0} gambar galeri tersimpan.
                                            Upload file baru untuk mengganti semua gambar.
                                        </p>
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {editingService
                                        ? 'Kosongkan jika tidak mengganti gambar.'
                                        : 'Minimal upload 1 gambar (maks 5MB per file).'}
                                </p>
                                <InputError message={form.errors.images} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="service-features">Fitur (Satu Baris Satu Item)</Label>
                                <textarea
                                    id="service-features"
                                    className={TEXTAREA_CLASS}
                                    value={form.data.features_input}
                                    onChange={(event) => form.setData('features_input', event.target.value)}
                                    placeholder={'Material premium\nPemasangan cepat'}
                                />
                                <InputError message={form.errors.features_input} />
                            </div>

                            <div className="flex items-center gap-3 lg:col-span-2">
                                <Checkbox
                                    id="service-active"
                                    checked={form.data.is_active}
                                    onCheckedChange={(checked) => form.setData('is_active', checked === true)}
                                />
                                <Label htmlFor="service-active">Aktif ditampilkan di website</Label>
                            </div>
                            <InputError message={form.errors.is_active} className="lg:col-span-2" />

                            <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
                                <Button type="submit" disabled={form.processing}>
                                    <Plus className="h-4 w-4" />
                                    {editingService ? 'Simpan Perubahan' : 'Tambah Layanan'}
                                </Button>
                                {editingService && (
                                    <Button type="button" variant="outline" onClick={startCreateMode}>
                                        Batal Edit
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Layanan</CardTitle>
                        <CardDescription>Total {services.length} layanan tersimpan.</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-[680px] text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="py-3 pr-4">Judul</th>
                                    <th className="py-3 pr-4">Slug</th>
                                    <th className="py-3 pr-4">Status</th>
                                    <th className="py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service.id} className="border-b align-top">
                                        <td className="py-3 pr-4 font-medium">{service.title}</td>
                                        <td className="py-3 pr-4">{service.slug}</td>
                                        <td className="py-3 pr-4">
                                            <Badge variant={service.is_active ? 'default' : 'outline'}>
                                                {service.is_active ? 'Aktif' : 'Nonaktif'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => startEditMode(service)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(service)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Hapus
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ServicesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Layanan',
            href: dashboardRoutes.services.index(),
        },
    ],
};
