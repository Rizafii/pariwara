import 'quill/dist/quill.snow.css';

import type Quill from 'quill';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
    imageUploadUrl?: string;
}

function normalizeHtml(html: string) {
    return html === '<p><br></p>' ? '' : html;
}

function getXsrfTokenFromCookie(): string | null {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        if (cookie.startsWith('XSRF-TOKEN=')) {
            return decodeURIComponent(cookie.slice('XSRF-TOKEN='.length));
        }
    }

    return null;
}

export default function QuillEditor({
    value,
    onChange,
    placeholder = 'Tulis konten...',
    className,
    readOnly = false,
    imageUploadUrl,
}: QuillEditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const onChangeRef = useRef(onChange);
    const valueRef = useRef(value);
    const imageUploadUrlRef = useRef(imageUploadUrl);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    useEffect(() => {
        imageUploadUrlRef.current = imageUploadUrl;
    }, [imageUploadUrl]);

    useEffect(() => {
        let isMounted = true;
        let cleanupHandler: (() => void) | null = null;

        const initEditor = async () => {
            if (!containerRef.current || quillRef.current) {
                return;
            }

            const { default: Quill } = await import('quill');

            if (!isMounted || !containerRef.current) {
                return;
            }

            const toolbarOptions: Array<Array<string | { [key: string]: unknown }>> = [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: [] }],
                ['blockquote', 'code-block'],
                imageUploadUrlRef.current
                    ? ['link', 'image', 'clean']
                    : ['link', 'clean'],
            ];

            const quill = new Quill(containerRef.current, {
                theme: 'snow',
                placeholder,
                modules: {
                    toolbar: toolbarOptions,
                },
            });

            const uploadImage = async (file: File): Promise<string | null> => {
                const uploadUrl = imageUploadUrlRef.current;

                if (!uploadUrl) {
                    return null;
                }

                const formData = new FormData();
                formData.append('image', file);

                const xsrfToken = getXsrfTokenFromCookie();

                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
                    },
                });

                if (!response.ok) {
                    return null;
                }

                const payload = (await response.json()) as { url?: string };

                return payload.url ?? null;
            };

            const toolbar = quill.getModule('toolbar') as {
                addHandler: (name: string, handler: () => void) => void;
            } | null;

            if (toolbar && imageUploadUrlRef.current) {
                toolbar.addHandler('image', () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';

                    input.onchange = async () => {
                        const file = input.files?.[0];

                        if (!file) {
                            return;
                        }

                        try {
                            const imageUrl = await uploadImage(file);

                            if (!imageUrl) {
                                return;
                            }

                            const range = quill.getSelection(true);
                            const index = range?.index ?? quill.getLength();

                            quill.insertEmbed(index, 'image', imageUrl, 'user');
                            quill.setSelection(index + 1, 0);
                        } catch (error) {
                            console.error('Failed to upload editor image', error);
                        }
                    };

                    input.click();
                });
            }

            const handleTextChange = () => {
                onChangeRef.current(normalizeHtml(quill.root.innerHTML));
            };

            quill.on('text-change', handleTextChange);
            quill.clipboard.dangerouslyPasteHTML(valueRef.current || '');
            quillRef.current = quill;
            cleanupHandler = () => {
                quill.off('text-change', handleTextChange);
            };
        };

        void initEditor();

        return () => {
            isMounted = false;

            if (cleanupHandler) {
                cleanupHandler();
            }

            quillRef.current = null;
        };
    }, [placeholder]);

    useEffect(() => {
        const quill = quillRef.current;

        if (!quill) {
            return;
        }

        quill.enable(!readOnly);
    }, [readOnly]);

    useEffect(() => {
        const quill = quillRef.current;

        if (!quill) {
            return;
        }

        const current = normalizeHtml(quill.root.innerHTML);
        const next = normalizeHtml(value || '');

        if (current === next) {
            return;
        }

        const selection = quill.getSelection();
        quill.clipboard.dangerouslyPasteHTML(next);

        if (selection) {
            quill.setSelection(selection);
        }
    }, [value]);

    return (
        <div className={cn('cms-quill overflow-hidden rounded-md border border-input bg-background', className)}>
            <div ref={containerRef} className="min-h-[260px]" />
        </div>
    );
}
