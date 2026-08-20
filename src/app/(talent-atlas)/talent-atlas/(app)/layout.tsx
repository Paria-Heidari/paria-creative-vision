import { Suspense } from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { TalentAtlasHeader } from '@/components/features/talentAtlas/TalentAtlasHeader';
import { TalentAtlasSidebar } from '@/components/features/talentAtlas/TalentAtlasSidebar';
import { SidebarUserFooter } from '@/components/features/talentAtlas/SidebarUserFooter';
import QueryProvider from '@/components/providers/QueryProvider';
import { RealtimeSync } from '@/components/features/talentAtlas/RealtimeSync';
import { getSessionOrRedirect } from '@/lib/auth0/session';
import { auth0 } from '@/lib/auth0/auth0';
import Loading from '@/components/ui/Loading/Loading';
import { Role } from '@/lib/auth0/roles';

// Fetches session inside Suspense so the layout stays sync and non-blocking
async function SidebarWithRoles() {
  const session = await auth0.getSession();
  const roles = ((session?.user as { roles?: Role[] })?.roles ?? []) as Role[];
  return (
    <TalentAtlasSidebar
      roles={roles}
      footer={
        <Suspense fallback={<Loading />}>
          <SidebarUserFooter />
        </Suspense>
      }
    />
  );
}

// Redirects unauthenticated users — lives inside Suspense so it streams
async function AuthGate({ children }: { children: React.ReactNode }) {
  await getSessionOrRedirect();
  return <>{children}</>;
}

export default function TalentAtlasAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* one connection for the entire app, multiple consumers */}
        <RealtimeSync />
        <TalentAtlasHeader />
        <div className="flex flex-1 overflow-hidden">
          <Suspense fallback={<Loading />}>
            <SidebarWithRoles />
          </Suspense>
          <Auth0Provider>
            <main className="flex-1 overflow-y-auto bg-white p-8">
              <Suspense fallback={<Loading />}>
                <AuthGate>{children}</AuthGate>
              </Suspense>
            </main>
          </Auth0Provider>
        </div>
      </div>
    </QueryProvider>
  );
}
