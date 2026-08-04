import PhotoManager from '@/components/features/admin/PhotoManager';
import { getAllPhotosAdmin } from '@/lib/api/admin/photos';
import { getAllCategories } from '@/lib/api/photos/photos';

export default async function AdminPhotosPage() {
  const [photos, categories] = await Promise.all([
    getAllPhotosAdmin(),
    getAllCategories(),
  ]);

  return <PhotoManager photos={photos} categories={categories} />;
}
