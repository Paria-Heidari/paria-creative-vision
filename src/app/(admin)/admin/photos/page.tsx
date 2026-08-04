import PhotoManager from '@/components/features/admin/PhotoManager';
import { getAllPhotosAdmin } from '@/lib/api/admin/photos';
import { getAllCategories } from '@/lib/api/photos/photos';
import { connection } from 'next/server';

export default async function AdminPhotosPage() {
  await connection();
  const [photos, categories] = await Promise.all([
    getAllPhotosAdmin(),
    getAllCategories(),
  ]);

  return <PhotoManager photos={photos} categories={categories} />;
}
