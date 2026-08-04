'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminTopBar from './AdminTopBar';
import PhotoGrid from './PhotoGrid';
import type { Photo } from '@/types/photo.types';
import type { Category } from '@/types/photo.types';

interface PhotoManagerProps {
  photos: Photo[];
  categories: Category[];
}

export default function PhotoManager({ photos, categories }: PhotoManagerProps) {
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts' | string>('all');
  const router = useRouter();

  const filtered = photos?.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'published') return p.published;
    if (filter === 'drafts') return !p.published;
    // category name filter
    return p.subcategory?.name === filter || categories.find(c => c.name === filter);
  });

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/photos/${id}`, { method: 'DELETE' });
    if (res.ok) router.refresh(); // re-runs the server component, re-fetches the grid
  };

  const filterChips = [
    { label: 'All', value: 'all' },
    { label: 'Published', value: 'published' },
    { label: 'Drafts', value: 'drafts' },
    ...categories?.map((c) => ({ label: c.name, value: c.name })),
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <AdminTopBar
        title="All Photos"
        subtitle={`${photos.length} photos`}
        action={{ label: 'Upload Photo', href: '/admin/upload' }}
      />

      <div className="flex-1 overflow-y-auto bg-slate-50 p-7">
        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filterChips.map((chip, i) => {
            const isSeparator = i === 3;
            return (
              <span key={chip.value} className="flex items-center gap-2">
                {isSeparator && <span className="h-5 w-px bg-slate-300" />}
                <button
                  type="button"
                  onClick={() => setFilter(chip.value)}
                  className={`font-inter rounded-full px-3.5 py-1 text-[13px] transition-colors ${
                    filter === chip.value
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {chip.label}
                </button>
              </span>
            );
          })}
        </div>

        {/* Grid */}
        <PhotoGrid photos={filtered} onDelete={handleDelete} />
      </div>
    </div>
  );
}