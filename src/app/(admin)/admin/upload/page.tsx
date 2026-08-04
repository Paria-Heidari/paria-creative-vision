import AdminTopBar from '@/components/features/admin/AdminTopBar';
import UploadForm from '@/components/features/admin/UploadForm';
import { getAllCategories } from '@/lib/api/photos/photos';
import { connection } from 'next/server';

export default async function AdminUploadPage() {
  await connection();
  const categories = await getAllCategories();


  return (
    <div className="flex h-full flex-col overflow-hidden">
      <AdminTopBar
        title="Upload Photo"
        subtitle="Add a new photo to the portfolio"
      />
      <div className="flex-1 overflow-y-auto p-7">
        <UploadForm categories={categories}/>
      </div>
    </div>
  );
}