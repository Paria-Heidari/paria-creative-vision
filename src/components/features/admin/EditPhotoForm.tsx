'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { getAllCategories } from '@/lib/api/photos/photos';
import type { getPhotoByIdAdmin } from '@/lib/api/admin/photos';
import PhotoMetadataCard from './PhotoMetadataCard';

type Photo = NonNullable<Awaited<ReturnType<typeof getPhotoByIdAdmin>>>;
type Category = Awaited<ReturnType<typeof getAllCategories>>[number];

interface EditPhotoFormProps {
  photo: Photo;
  categories: Category[];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

export default function EditPhotoForm({ photo, categories }: EditPhotoFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageUrl = photo.storage_path
    ? `${supabaseUrl}/storage/v1/object/public/${photo.storage_path}`
    : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/photos/${photo.id}`, {
        method: 'PATCH',
        body: new FormData(e.currentTarget),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg ?? 'Update failed');
      }

      router.push('/admin/photos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:flex-row">
      {/* Left — current photo preview */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={photo.title ?? ''}
              className="w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[300px] items-center justify-center bg-slate-100">
              <p className="font-inter text-[13px] text-slate-400">No image</p>
            </div>
          )}
        </div>
        <p className="font-inter text-[12px] text-slate-400">
          Image replacement is not supported — upload a new photo to swap the image.
        </p>
      </div>

      {/* Right — metadata card + submit */}
      <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[300px]">
        <PhotoMetadataCard
          categories={categories}
          initialValues={{
            title: photo.title,
            description: photo.description,
            categoryId: photo.subcategory?.category_id,
            subcategoryId: photo.subcategory_id,
            locationCity: photo.location_city,
            locationCountry: photo.location_country,
            displayOrder: photo.display_order,
            published: photo.published ?? false,
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-inter flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F172A] py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? 'Saving…' : 'Save Changes'}
        </button>

        {error && (
          <p className="font-inter rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-600">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}