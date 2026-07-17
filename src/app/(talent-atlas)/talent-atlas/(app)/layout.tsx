import { Suspense } from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { TalentAtlasHeader } from '@/components/features/talentAtlas/TalentAtlasHeader';
import { TalentAtlasSidebar } from '@/components/features/talentAtlas/TalentAtlasSidebar';
import { SidebarUserFooter } from '@/components/features/talentAtlas/SidebarUserFooter';
import QueryProvider from '@/components/providers/QueryProvider';
import { RealtimeProvider } from '@/components/providers/talentAtlas/RealtimeProvider';
import { getSessionOrRedirect } from '@/lib/auth0/session';
import Loading from '@/components/ui/Loading/Loading';

//Server component guard - Giving Next.js a Suspense boundary to stream around instead of blocking the whole layout.
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
    // QueryProvider is a wrapper - providing a shared query client for the app.
    <QueryProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Its only job is to call useRealtimeSync() once at the top of the tree */}
        <RealtimeProvider />
        {/* renders null, opens WS, feeds RxJS → TanStack cache */}
        <TalentAtlasHeader />
        <div className="flex flex-1 overflow-hidden">
          <TalentAtlasSidebar
            footer={
              <Suspense fallback={null}>
                <SidebarUserFooter />
              </Suspense>
            }
          />
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
