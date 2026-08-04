import { notFound } from 'next/navigation';
import { getPhotoByIdAdmin } from '@/lib/api/admin/photos';
import { getAllCategories } from '@/lib/api/photos/photos';
import EditPhotoForm from '@/components/features/admin/EditPhotoForm';
import AdminTopBar from '@/components/features/admin/AdminTopBar';

interface EditPhotoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPhotoPage({ params }: EditPhotoPageProps) {
  const { id } = await params;

  const [photo, categories] = await Promise.all([
    getPhotoByIdAdmin(id),
    getAllCategories(),
  ]);

  if (!photo) notFound();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <AdminTopBar
        title="Edit Photo"
        subtitle={photo.title ?? undefined}
        action={{ label: '← Back', href: '/admin/photos' }}
      />
      <div className="flex-1 overflow-y-auto bg-slate-50 p-7">
        <EditPhotoForm photo={photo} categories={categories} />
      </div>
    </div>
  );
}