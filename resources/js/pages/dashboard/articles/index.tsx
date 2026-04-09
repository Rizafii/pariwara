import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import QuillEditor from '@/components/editor/quill-editor';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard as dashboardHome } from '@/routes';
import dashboardRoutes from '@/routes/dashboard';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    category_id?: number | null;
    category?: string | null;
    read_time?: string | null;
    image?: string | null;
    author?: string | null;
    published_at?: string | null;
}

interface CategoryOption {
    id: number;
    name: string;
}

interface SharedPageProps {
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

interface ArticlesPageProps {
    articles: ArticleItem[];
    categories: CategoryOption[];
}

type ArticleFormData = {
    title: string;
    excerpt: string;
    content: string;
    article_category_id: string;
    new_category_name: string;
    read_time: string;
    image: File | null;
    _method?: 'put';
};

const TEXTAREA_CLASS =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]';

const SELECT_CLASS =
    'border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]';

function formatPublishedDate(value?: string | null): string {
    if (!value) {
        return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '-';
    }

    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function ArticlesIndex({ articles, categories }: ArticlesPageProps) {
    const { flash } = usePage<SharedPageProps>().props;
    const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
    const defaultCategoryId = categories[0] ? String(categories[0].id) : '';

    const form = useForm<ArticleFormData>({
        title: '',
        excerpt: '',
        content: '',
        article_category_id: defaultCategoryId,
        new_category_name: '',
        read_time: '',
        image: null,
    });

    const startCreateMode = () => {
        setEditingArticle(null);
        form.reset();
        form.clearErrors();
        form.setData('article_category_id', defaultCategoryId);
        form.setData('new_category_name', '');
    };

    const startEditMode = (article: ArticleItem) => {
        setEditingArticle(article);
        form.clearErrors();

        const matchedCategoryId =
            article.category_id ??
            categories.find((category) => category.name === article.category)?.id ??
            null;

        form.setData('title', article.title);
        form.setData('excerpt', article.excerpt ?? '');
        form.setData('content', article.content ?? '');
        form.setData(
            'article_category_id',
            matchedCategoryId ? String(matchedCategoryId) : defaultCategoryId,
        );
        form.setData('new_category_name', '');
        form.setData('read_time', article.read_time ?? '');
        form.setData('image', null);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingArticle) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(
                dashboardRoutes.articles.update.url({ article: editingArticle.id }),
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
        form.post(dashboardRoutes.articles.store.url(), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                startCreateMode();
            },
        });
    };

    const handleDelete = (article: ArticleItem) => {
        const confirmed = window.confirm(`Hapus artikel "${article.title}"?`);

        if (!confirmed) {
            return;
        }

        router.delete(dashboardRoutes.articles.destroy.url({ article: article.id }), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingArticle?.id === article.id) {
                    startCreateMode();
                }
            },
        });
    };

    return (
        <>
            <Head title="Kelola Artikel" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Kelola Artikel"
                    description="Artikel akan langsung terpublikasi setelah disimpan."
                />

                {flash?.success && (
                    <Alert className="border-emerald-200 bg-emerald-50 text-emerald-700">
                        <AlertTitle>Berhasil</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {categories.length === 0 && (
                    <Alert>
                        <AlertTitle>Kategori belum tersedia</AlertTitle>
                        <AlertDescription>
                            Anda tetap bisa membuat artikel dengan mengisi kolom kategori baru di form.
                        </AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}
                        </CardTitle>
                        <CardDescription>
                            Gunakan editor untuk menulis konten, termasuk upload gambar langsung dari toolbar editor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="article-title">Judul Artikel</Label>
                                <Input
                                    id="article-title"
                                    value={form.data.title}
                                    onChange={(event) => form.setData('title', event.target.value)}
                                    placeholder="Contoh: Tips Memilih Material Signage"
                                />
                                <InputError message={form.errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="article-category">Kategori</Label>
                                <select
                                    id="article-category"
                                    className={SELECT_CLASS}
                                    value={form.data.article_category_id}
                                    disabled={form.data.new_category_name.trim().length > 0}
                                    onChange={(event) =>
                                        form.setData('article_category_id', event.target.value)
                                    }
                                >
                                    {categories.length === 0 ? (
                                        <option value="">Belum ada kategori tersimpan</option>
                                    ) : (
                                        categories.map((category) => (
                                            <option key={category.id} value={String(category.id)}>
                                                {category.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                                <p className="text-xs text-muted-foreground">
                                    Pilih kategori yang sudah ada, atau isi kategori baru di bawah.
                                </p>
                                <InputError message={form.errors.article_category_id} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="article-read-time">Estimasi Baca</Label>
                                <Input
                                    id="article-read-time"
                                    value={form.data.read_time}
                                    onChange={(event) => form.setData('read_time', event.target.value)}
                                    placeholder="5 min read"
                                />
                                <InputError message={form.errors.read_time} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="article-new-category">Tambah Kategori Baru (Opsional)</Label>
                                <Input
                                    id="article-new-category"
                                    value={form.data.new_category_name}
                                    onChange={(event) =>
                                        form.setData('new_category_name', event.target.value)
                                    }
                                    placeholder="Contoh: Strategi Branding"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Jika diisi, kategori baru akan otomatis dibuat dan digunakan untuk artikel ini.
                                </p>
                                <InputError message={form.errors.new_category_name} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="article-image">Gambar Artikel</Label>
                                <Input
                                    id="article-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        form.setData('image', event.target.files?.[0] ?? null)
                                    }
                                />
                                {editingArticle?.image && (
                                    <a
                                        href={editingArticle.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Lihat gambar saat ini
                                    </a>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {editingArticle
                                        ? 'Kosongkan jika tidak mengganti gambar artikel.'
                                        : 'Wajib upload gambar artikel (maks 5MB).'}
                                </p>
                                <InputError message={form.errors.image} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="article-excerpt">Excerpt (Ringkasan)</Label>
                                <textarea
                                    id="article-excerpt"
                                    className={TEXTAREA_CLASS}
                                    value={form.data.excerpt}
                                    onChange={(event) => form.setData('excerpt', event.target.value)}
                                    placeholder="Ringkasan singkat artikel"
                                />
                                <InputError message={form.errors.excerpt} />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <Label>Konten Artikel</Label>
                                <QuillEditor
                                    value={form.data.content}
                                    onChange={(value) => form.setData('content', value)}
                                    placeholder="Tulis konten artikel di sini..."
                                    imageUploadUrl="/dashboard/articles/upload-image"
                                />
                                <InputError message={form.errors.content} />
                            </div>

                            <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    <Plus className="h-4 w-4" />
                                    {editingArticle ? 'Simpan Perubahan' : 'Tambah Artikel'}
                                </Button>
                                {editingArticle && (
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
                        <CardTitle>Daftar Artikel</CardTitle>
                        <CardDescription>Total {articles.length} artikel tersimpan.</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-[860px] text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="py-3 pr-4">Judul</th>
                                    <th className="py-3 pr-4">Kategori</th>
                                    <th className="py-3 pr-4">Penulis</th>
                                    <th className="py-3 pr-4">Publikasi</th>
                                    <th className="py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article) => (
                                    <tr key={article.id} className="border-b align-top">
                                        <td className="py-3 pr-4 font-medium">{article.title}</td>
                                        <td className="py-3 pr-4">{article.category ?? '-'}</td>
                                        <td className="py-3 pr-4">{article.author ?? '-'}</td>
                                        <td className="py-3 pr-4">{formatPublishedDate(article.published_at)}</td>
                                        <td className="py-3 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Button asChild type="button" variant="ghost" size="sm">
                                                    <a
                                                        href={`/artikel/${article.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Lihat
                                                    </a>
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => startEditMode(article)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(article)}
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

ArticlesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Artikel',
            href: dashboardRoutes.articles.index(),
        },
    ],
};
