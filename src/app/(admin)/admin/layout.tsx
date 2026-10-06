import AdminSidebar from '@/components/features/admin/AdminSidebar';
import Loading from '@/components/ui/Loading/Loading';
import { getAdminSessionOrRedirect } from '@/lib/auth0/session';
import { Suspense } from 'react';

async function AdminAuthGate({ children }: { children: React.ReactNode }) {
  await getAdminSessionOrRedirect();
  return <>{children}</>;
}
     
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-surface="workspace" className="flex h-screen overflow-hidden bg-surface-muted">
      <Suspense fallback={<div className="w-[220px] shrink-0 bg-chrome" />}>
        <AdminSidebar />
      </Suspense>
      <Suspense fallback={<Loading className="mx-auto" />}>
        <main className="flex-1">
          <AdminAuthGate>{children}</AdminAuthGate>
        </main>
      </Suspense>
    </div>
  );
}
