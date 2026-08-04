import AdminSidebar from '@/components/features/admin/AdminSidebar';
import Loading from '@/components/ui/Loading/Loading';
import { getAdminSessionOrRedirect } from '@/lib/auth0/session';
import { connection } from 'next/server';
import { Suspense } from 'react';

async function AdminAuthGate({ children }: { children: React.ReactNode }) {
  await connection(); // auth reads cookies — must run per-request, never prerendered
  await getAdminSessionOrRedirect();
  return <>{children}</>;
}
     
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen  overflow-hidden bg-slate-50 ">
        <AdminSidebar />
      <Suspense fallback={<Loading className="mx-auto" />}>
        <main className="flex-1"> 
          <AdminAuthGate>{children}</AdminAuthGate>
        </main>
      </Suspense>
    </div>
  );
}
