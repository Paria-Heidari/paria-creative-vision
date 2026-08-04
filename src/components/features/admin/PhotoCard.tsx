'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/utils';
import type { Photo } from '@/types/photo.types';

interface PhotoCardProps {
  photo: Photo;
  onDelete?: (id: string) => void;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function PhotoCard({ photo, onDelete }: PhotoCardProps) {
  const [confirming, setConfirming] = useState(false);

  const imageUrl = photo.storage_path
    ? `${supabaseUrl}/storage/v1/object/public/${photo.storage_path}`
    : null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full bg-slate-100">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={photo.title ?? ''}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg className="h-8 w-8 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-inter truncate text-[13px] font-medium text-slate-800">
          {photo.title}
        </p>
        <p className="font-inter mt-0.5 truncate text-[12px] text-slate-400">
          {photo.subcategory?.name ?? '—'}
        </p>

        {/* Footer */}
        <div className="mt-3">
          {confirming ? (
            <div className="flex items-center justify-between gap-2">
              <p className="font-inter text-[11px] text-slate-500">Delete?</p>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="font-inter rounded px-2 py-1 text-[11px] text-slate-500 transition-colors hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirming(false);
                    onDelete?.(photo.id);
                  }}
                  className="font-inter rounded bg-red-500 px-2 py-1 text-[11px] font-medium text-white transition-colors hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'font-inter rounded px-2 py-0.5 text-[11px] font-medium',
                  photo.published
                    ? 'bg-green-50 text-green-600'
                    : 'bg-slate-100 text-slate-500',
                )}
              >
                {photo.published ? 'Published' : 'Draft'}
              </span>

              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/photos/${photo.id}/edit`}
                  className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="rounded p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}