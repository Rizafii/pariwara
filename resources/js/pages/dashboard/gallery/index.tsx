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

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    location?: string | null;
    image: string;
    description?: string | null;
    is_active: boolean;
}

interface SharedPageProps {
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

interface GalleryPageProps {
    items: GalleryItem[];
}

type GalleryFormData = {
    title: string;
    category: string;
    location: string;
    image: File | null;
    description: string;
    is_active: boolean;
    _method?: 'put';
};

const EMPTY_FORM: GalleryFormData = {
    title: '',
    category: 'Umum',
    location: '',
    image: null,
    description: '',
    is_active: true,
};

const TEXTAREA_CLASS =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]';

export default function GalleryIndex({ items }: GalleryPageProps) {
    const { flash } = usePage<SharedPageProps>().props;
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const form = useForm<GalleryFormData>(EMPTY_FORM);

    const startCreateMode = () => {
        setEditingItem(null);
        form.reset();
        form.clearErrors();
        form.setData('category', 'Umum');
        form.setData('is_active', true);
    };

    const startEditMode = (item: GalleryItem) => {
        setEditingItem(item);
        form.clearErrors();
        form.setData('title', item.title);
        form.setData('category', item.category);
        form.setData('location', item.location ?? '');
        form.setData('image', null);
        form.setData('description', item.description ?? '');
        form.setData('is_active', item.is_active);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingItem) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(
                dashboardRoutes.gallery.update.url({ galleryItem: editingItem.id }),
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
        form.post(dashboardRoutes.gallery.store.url(), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                startCreateMode();
            },
        });
    };

    const handleDelete = (item: GalleryItem) => {
        const confirmed = window.confirm(`Hapus item galeri "${item.title}"?`);

        if (!confirmed) {
            return;
        }

        router.delete(dashboardRoutes.gallery.destroy.url({ galleryItem: item.id }), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingItem?.id === item.id) {
                    startCreateMode();
                }
            },
        });
    };

    return (
        <>
            <Head title="Kelola Galeri" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Kelola Galeri"
                    description="Kelola item foto proyek yang tampil di halaman galeri."
                />

                {flash?.success && (
                    <Alert className="border-emerald-200 bg-emerald-50 text-emerald-700">
                        <AlertTitle>Berhasil</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>{editingItem ? 'Edit Item Galeri' : 'Tambah Item Galeri'}</CardTitle>
                        <CardDescription>Lengkapi data proyek dan upload gambar.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="gallery-title">Judul</Label>
                                <Input
                                    id="gallery-title"
                                    value={form.data.title}
                                    onChange={(event) => form.setData('title', event.target.value)}
                                    placeholder="Contoh: Pemasangan Neon Box"
                                />
                                <InputError message={form.errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gallery-category">Kategori</Label>
                                <Input
                                    id="gallery-category"
                                    value={form.data.category}
                                    onChange={(event) => form.setData('category', event.target.value)}
                                    placeholder="Contoh: Signage"
                                />
                                <InputError message={form.errors.category} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gallery-location">Lokasi (Opsional)</Label>
                                <Input
                                    id="gallery-location"
                                    value={form.data.location}
                                    onChange={(event) => form.setData('location', event.target.value)}
                                    placeholder="Jakarta"
                                />
                                <InputError message={form.errors.location} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="gallery-image">Gambar</Label>
                                <Input
                                    id="gallery-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        form.setData('image', event.target.files?.[0] ?? null)
                                    }
                                />
                                {editingItem?.image && (
                                    <a
                                        href={editingItem.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Lihat gambar saat ini
                                    </a>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {editingItem
                                        ? 'Kosongkan jika tidak mengganti gambar.'
                                        : 'Upload gambar proyek (maks 5MB).'}
                                </p>
                                <InputError message={form.errors.image} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="gallery-description">Deskripsi (Opsional)</Label>
                                <textarea
                                    id="gallery-description"
                                    className={TEXTAREA_CLASS}
                                    value={form.data.description}
                                    onChange={(event) => form.setData('description', event.target.value)}
                                    placeholder="Ringkasan proyek"
                                />
                                <InputError message={form.errors.description} />
                            </div>

                            <div className="flex items-center gap-3 lg:col-span-2">
                                <Checkbox
                                    id="gallery-active"
                                    checked={form.data.is_active}
                                    onCheckedChange={(checked) => form.setData('is_active', checked === true)}
                                />
                                <Label htmlFor="gallery-active">Aktif ditampilkan di website</Label>
                            </div>
                            <InputError message={form.errors.is_active} className="lg:col-span-2" />

                            <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
                                <Button type="submit" disabled={form.processing}>
                                    <Plus className="h-4 w-4" />
                                    {editingItem ? 'Simpan Perubahan' : 'Tambah Item'}
                                </Button>
                                {editingItem && (
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
                        <CardTitle>Daftar Item Galeri</CardTitle>
                        <CardDescription>Total {items.length} item tersimpan.</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="py-3 pr-4">Judul</th>
                                    <th className="py-3 pr-4">Kategori</th>
                                    <th className="py-3 pr-4">Lokasi</th>
                                    <th className="py-3 pr-4">Status</th>
                                    <th className="py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b align-top">
                                        <td className="py-3 pr-4 font-medium">{item.title}</td>
                                        <td className="py-3 pr-4">{item.category}</td>
                                        <td className="py-3 pr-4">{item.location ?? '-'}</td>
                                        <td className="py-3 pr-4">
                                            <Badge variant={item.is_active ? 'default' : 'outline'}>
                                                {item.is_active ? 'Aktif' : 'Nonaktif'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => startEditMode(item)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(item)}
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

GalleryIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Galeri',
            href: dashboardRoutes.gallery.index(),
        },
    ],
};
