'use client';

import { Upload, Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/utils';
import { useRouter } from 'next/navigation';
import PhotoMetadataCard from './PhotoMetadataCard';
import type { getAllCategories } from '@/lib/api/photos/photos';

type Category = Awaited<ReturnType<typeof getAllCategories>>[number];

interface UploadFormProps {
  categories: Category[];
}

export default function UploadForm({ categories }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) pickFile(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer?.files[0];
    if (droppedFile) {
      pickFile(droppedFile);
    }
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // Object URLs are memory leaks if not revoked
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData(event.currentTarget);
    formData.append('file', file);

    setIsSubmitting(true);
    setUploadError(null);

    try {
      const res = await fetch('/api/admin/photos', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error ?? 'upload failed');
      }
      router.push('/admin/photos');
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : 'Something went wrong',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-7 lg:flex-row"
    >
      {/* Left — dropzone + hint */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Dropzone */}
        <button
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={handleDrop}
          className={cn(
            'flex min-h-[640px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors',
            isDragging
              ? 'border-sky-400 bg-sky-50'
              : 'border-strong bg-surface hover:border-strong',
          )}
        >
          {/* eslint-disable @next/next/no-img-element */}
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-auto w-full rounded-lg object-cover"
            />
          ) : (
            <>
              <Upload className="h-9 w-9 text-foreground-subtle" />
              <div>
                <p className="font-inter text-[15px] font-medium text-foreground-secondary">
                  Drop your photo here
                </p>
                <p className="font-inter mt-1 text-[13px] text-foreground-subtle">
                  or click to browse from your computer
                </p>
              </div>
              <span className="font-inter rounded border border-border bg-surface-muted px-3 py-1 text-[11px] text-foreground-subtle">
                JPG · PNG · WEBP · up to 20 MB
              </span>
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelect}
        />

        {/* Hint */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-4 py-3">
          <Info className="h-4 w-4 shrink-0 text-sky-500" />
          <p className="font-inter text-[12px] text-foreground-muted">
            The photo will be uploaded to Supabase Storage and appear in your
            portfolio once published.
          </p>
        </div>
      </div>

      {/* Right — metadata card + submit */}
      <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[300px]">
        <PhotoMetadataCard categories={categories} />

        <button
          type="submit"
          disabled={!file || isSubmitting}
          className="font-inter flex w-full items-center justify-center gap-2 rounded-lg bg-action-primary py-2.5 text-[14px] font-semibold text-on-action-primary transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {isSubmitting ? 'Uploading…' : 'Upload & Save'}
        </button>

        {uploadError && (
          <p className="font-inter rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-600">
            {uploadError}
          </p>
        )}
      </div>
    </form>
  );
}
