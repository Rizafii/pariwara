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

interface ProductItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
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

interface ProductsPageProps {
    products: ProductItem[];
}

type ProductFormData = {
    name: string;
    description: string;
    price: string;
    images: File[];
    features_input: string;
    is_active: boolean;
    _method?: 'put';
};

const EMPTY_FORM: ProductFormData = {
    name: '',
    description: '',
    price: '',
    images: [],
    features_input: '',
    is_active: true,
};

const TEXTAREA_CLASS =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]';

function formatRupiahInput(value: string): string {
    const digits = value.replace(/\D/g, '');

    if (digits.length === 0) {
        return '';
    }

    return `Rp ${Number(digits).toLocaleString('id-ID')}`;
}

export default function ProductsIndex({ products }: ProductsPageProps) {
    const { flash } = usePage<SharedPageProps>().props;
    const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
    const form = useForm<ProductFormData>(EMPTY_FORM);

    const startCreateMode = () => {
        setEditingProduct(null);
        form.reset();
        form.clearErrors();
        form.setData('is_active', true);
    };

    const startEditMode = (product: ProductItem) => {
        setEditingProduct(product);
        form.clearErrors();
        form.setData('name', product.name);
        form.setData('description', product.description);
        form.setData('price', product.price);
        form.setData('images', []);
        form.setData('features_input', (product.features ?? []).join('\n'));
        form.setData('is_active', product.is_active);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingProduct) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(
                dashboardRoutes.products.update.url({ product: editingProduct.id }),
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
        form.post(dashboardRoutes.products.store.url(), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                startCreateMode();
            },
        });
    };

    const handleDelete = (product: ProductItem) => {
        const confirmed = window.confirm(`Hapus produk "${product.name}"?`);

        if (!confirmed) {
            return;
        }

        router.delete(dashboardRoutes.products.destroy.url({ product: product.id }), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingProduct?.id === product.id) {
                    startCreateMode();
                }
            },
        });
    };

    return (
        <>
            <Head title="Kelola Produk" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Kelola Produk"
                    description="Kelola katalog produk yang tampil di website."
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
                            {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                        </CardTitle>
                        <CardDescription>
                            Upload beberapa gambar sekaligus, gambar pertama akan dipakai sebagai gambar utama produk.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="product-name">Nama Produk</Label>
                                <Input
                                    id="product-name"
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    placeholder="Contoh: Sign Box"
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="product-price">Harga</Label>
                                <Input
                                    id="product-price"
                                    value={form.data.price}
                                    onChange={(event) =>
                                        form.setData('price', formatRupiahInput(event.target.value))
                                    }
                                    placeholder="Rp 0"
                                />
                                <InputError message={form.errors.price} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="product-description">Deskripsi</Label>
                                <textarea
                                    id="product-description"
                                    className={TEXTAREA_CLASS}
                                    value={form.data.description}
                                    onChange={(event) => form.setData('description', event.target.value)}
                                    placeholder="Deskripsi produk"
                                />
                                <InputError message={form.errors.description} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="product-images">Galeri Gambar</Label>
                                <Input
                                    id="product-images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(event) =>
                                        form.setData('images', Array.from(event.target.files ?? []))
                                    }
                                />
                                {editingProduct && (
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        {editingProduct.image && (
                                            <a
                                                href={editingProduct.image}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                Lihat gambar utama saat ini
                                            </a>
                                        )}
                                        <p>
                                            {editingProduct.gallery?.length ?? 0} gambar galeri tersimpan.
                                            Upload file baru untuk mengganti semua gambar.
                                        </p>
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {editingProduct
                                        ? 'Kosongkan jika tidak mengganti gambar.'
                                        : 'Minimal upload 1 gambar (maks 5MB per file).'}
                                </p>
                                <InputError message={form.errors.images} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="product-features">Fitur (Satu Baris Satu Item)</Label>
                                <textarea
                                    id="product-features"
                                    className={TEXTAREA_CLASS}
                                    value={form.data.features_input}
                                    onChange={(event) => form.setData('features_input', event.target.value)}
                                    placeholder={'Bahan premium\nFinishing rapi'}
                                />
                                <InputError message={form.errors.features_input} />
                            </div>

                            <div className="flex items-center gap-3 lg:col-span-2">
                                <Checkbox
                                    id="product-active"
                                    checked={form.data.is_active}
                                    onCheckedChange={(checked) => form.setData('is_active', checked === true)}
                                />
                                <Label htmlFor="product-active">Aktif ditampilkan di website</Label>
                            </div>
                            <InputError message={form.errors.is_active} className="lg:col-span-2" />

                            <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
                                <Button type="submit" disabled={form.processing}>
                                    <Plus className="h-4 w-4" />
                                    {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                                </Button>
                                {editingProduct && (
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
                        <CardTitle>Daftar Produk</CardTitle>
                        <CardDescription>Total {products.length} produk tersimpan.</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="py-3 pr-4">Nama</th>
                                    <th className="py-3 pr-4">Harga</th>
                                    <th className="py-3 pr-4">Slug</th>
                                    <th className="py-3 pr-4">Status</th>
                                    <th className="py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b align-top">
                                        <td className="py-3 pr-4 font-medium">{product.name}</td>
                                        <td className="py-3 pr-4">{product.price}</td>
                                        <td className="py-3 pr-4">{product.slug}</td>
                                        <td className="py-3 pr-4">
                                            <Badge variant={product.is_active ? 'default' : 'outline'}>
                                                {product.is_active ? 'Aktif' : 'Nonaktif'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => startEditMode(product)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(product)}
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

ProductsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Produk',
            href: dashboardRoutes.products.index(),
        },
    ],
};
