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

interface ClientItem {
    id: number;
    name: string;
    logo: string;
    url?: string | null;
    sort_order: number;
    is_active: boolean;
}

interface SharedPageProps {
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

interface ClientsPageProps {
    clients: ClientItem[];
}

type ClientFormData = {
    name: string;
    logo: File | null;
    url: string;
    sort_order: string;
    is_active: boolean;
    _method?: 'put';
};

const EMPTY_FORM: ClientFormData = {
    name: '',
    logo: null,
    url: '',
    sort_order: '0',
    is_active: true,
};

export default function ClientsIndex({ clients }: ClientsPageProps) {
    const { flash } = usePage<SharedPageProps>().props;
    const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
    const form = useForm<ClientFormData>(EMPTY_FORM);

    const startCreateMode = () => {
        setEditingClient(null);
        form.reset();
        form.clearErrors();
        form.setData('is_active', true);
        form.setData('sort_order', '0');
    };

    const startEditMode = (client: ClientItem) => {
        setEditingClient(client);
        form.clearErrors();
        form.setData('name', client.name);
        form.setData('logo', null);
        form.setData('url', client.url ?? '');
        form.setData('sort_order', String(client.sort_order ?? 0));
        form.setData('is_active', client.is_active);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingClient) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(
                dashboardRoutes.clients.update.url({ client: editingClient.id }),
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
        form.post(dashboardRoutes.clients.store.url(), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                startCreateMode();
            },
        });
    };

    const handleDelete = (client: ClientItem) => {
        const confirmed = window.confirm(`Hapus klien "${client.name}"?`);

        if (!confirmed) {
            return;
        }

        router.delete(dashboardRoutes.clients.destroy.url({ client: client.id }), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingClient?.id === client.id) {
                    startCreateMode();
                }
            },
        });
    };

    return (
        <>
            <Head title="Kelola Klien" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Kelola Klien"
                    description="Atur logo klien yang ditampilkan pada halaman beranda."
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
                            {editingClient ? 'Edit Klien' : 'Tambah Klien Baru'}
                        </CardTitle>
                        <CardDescription>
                            Isi nama, upload logo klien, dan urutan tampil.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="client-name">Nama Klien</Label>
                                <Input
                                    id="client-name"
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    placeholder="Contoh: PT Maju Bersama"
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="client-logo">Logo Klien</Label>
                                <Input
                                    id="client-logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        form.setData('logo', event.target.files?.[0] ?? null)
                                    }
                                />
                                {editingClient?.logo && (
                                    <a
                                        href={editingClient.logo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Lihat logo saat ini
                                    </a>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {editingClient
                                        ? 'Kosongkan jika tidak mengganti logo.'
                                        : 'Upload file gambar logo (maks 5MB).'}
                                </p>
                                <InputError message={form.errors.logo} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="client-url">URL Website (Opsional)</Label>
                                <Input
                                    id="client-url"
                                    value={form.data.url}
                                    onChange={(event) => form.setData('url', event.target.value)}
                                    placeholder="https://example.com"
                                />
                                <InputError message={form.errors.url} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="client-sort-order">Urutan Tampil</Label>
                                <Input
                                    id="client-sort-order"
                                    type="number"
                                    min={0}
                                    value={form.data.sort_order}
                                    onChange={(event) => form.setData('sort_order', event.target.value)}
                                />
                                <InputError message={form.errors.sort_order} />
                            </div>

                            <div className="flex items-center gap-3 lg:col-span-2">
                                <Checkbox
                                    id="client-active"
                                    checked={form.data.is_active}
                                    onCheckedChange={(checked) => form.setData('is_active', checked === true)}
                                />
                                <Label htmlFor="client-active">Aktif ditampilkan di website</Label>
                            </div>
                            <InputError message={form.errors.is_active} className="lg:col-span-2" />

                            <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
                                <Button type="submit" disabled={form.processing}>
                                    <Plus className="h-4 w-4" />
                                    {editingClient ? 'Simpan Perubahan' : 'Tambah Klien'}
                                </Button>
                                {editingClient && (
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
                        <CardTitle>Daftar Klien</CardTitle>
                        <CardDescription>Total {clients.length} klien tersimpan.</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="py-3 pr-4">Nama</th>
                                    <th className="py-3 pr-4">Logo</th>
                                    <th className="py-3 pr-4">Urutan</th>
                                    <th className="py-3 pr-4">Status</th>
                                    <th className="py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id} className="border-b align-top">
                                        <td className="py-3 pr-4 font-medium">{client.name}</td>
                                        <td className="py-3 pr-4">
                                            <a
                                                href={client.logo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                Lihat Logo
                                            </a>
                                        </td>
                                        <td className="py-3 pr-4">{client.sort_order}</td>
                                        <td className="py-3 pr-4">
                                            <Badge variant={client.is_active ? 'default' : 'outline'}>
                                                {client.is_active ? 'Aktif' : 'Nonaktif'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => startEditMode(client)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(client)}
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

ClientsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Klien',
            href: dashboardRoutes.clients.index(),
        },
    ],
};
