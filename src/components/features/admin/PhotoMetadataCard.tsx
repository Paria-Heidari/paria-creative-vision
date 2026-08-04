'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/utils';
import type { getAllCategories } from '@/lib/api/photos/photos';

type Category = Awaited<ReturnType<typeof getAllCategories>>[number];

interface PhotoMetadataCardProps {
  categories: Category[];
  initialValues?: {
    title?: string | null;
    description?: string | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
    locationCity?: string | null;
    locationCountry?: string | null;
    displayOrder?: number | null;
    published?: boolean;
  };
}

const inputClass =
  'font-inter rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white';

export default function PhotoMetadataCard({ categories, initialValues }: PhotoMetadataCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialValues?.categoryId ?? '',
  );
  const [published, setPublished] = useState(initialValues?.published ?? true);

  const subcategories =
    categories.find((c) => c.id === selectedCategory)?.subcategories ?? [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="font-inter mb-4 text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
        Photo Details
      </p>

      {/* Title */}
      <div className="mb-3 flex flex-col gap-1.5">
        <label className="font-inter text-[12px] font-medium text-slate-600">Title</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={initialValues?.title ?? ''}
          placeholder="e.g. Lofoten Sunrise"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div className="mb-3 flex flex-col gap-1.5">
        <label className="font-inter text-[12px] font-medium text-slate-600">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={initialValues?.description ?? ''}
          placeholder="Optional — short description of the photo"
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {/* Category + Subcategory */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-inter text-[12px] font-medium text-slate-600">Category</label>
          <select
            name="category_id"
            defaultValue={initialValues?.categoryId ?? ''}
            className={inputClass}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-inter text-[12px] font-medium text-slate-600">Subcategory</label>
          <select
            name="subcategory_id"
            defaultValue={initialValues?.subcategoryId ?? ''}
            className={inputClass}
          >
            <option value="">Select…</option>
            {subcategories.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* City + Country */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-inter text-[12px] font-medium text-slate-600">City</label>
          <input
            name="location_city"
            type="text"
            defaultValue={initialValues?.locationCity ?? ''}
            placeholder="e.g. Henningsvær"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-inter text-[12px] font-medium text-slate-600">Country</label>
          <input
            name="location_country"
            type="text"
            defaultValue={initialValues?.locationCountry ?? ''}
            placeholder="e.g. Norway"
            className={inputClass}
          />
        </div>
      </div>

      {/* Display order */}
      <div className="mb-4 flex flex-col gap-1.5">
        <label className="font-inter text-[12px] font-medium text-slate-600">Display order</label>
        <input
          name="display_order"
          type="number"
          defaultValue={initialValues?.displayOrder ?? 1}
          min={1}
          className={inputClass}
        />
      </div>

      <div className="mb-4 h-px bg-slate-100" />

      {/* Publish toggle + hidden input so FormData captures it */}
      <div className="flex items-center justify-between">
        <span className="font-inter text-[13px] font-medium text-slate-700">
          {initialValues?.published !== undefined ? 'Published' : 'Publish immediately'}
        </span>
        <div
          onClick={() => setPublished((p) => !p)}
          className={cn(
            'relative h-4 w-8 cursor-pointer rounded-full transition-colors',
            published ? 'bg-[#0F172A]' : 'bg-slate-300',
          )}
        >
          <span
            className={cn(
              'absolute top-0 left-0 h-4 w-4 rounded-full bg-white shadow transition-transform',
              published ? 'translate-x-4' : 'translate-x-0',
            )}
          />
        </div>
      </div>

      {/* Hidden input — FormData picks this up so parents don't need to inject it */}
      <input type="hidden" name="published" value={String(published)} />
    </div>
  );
}