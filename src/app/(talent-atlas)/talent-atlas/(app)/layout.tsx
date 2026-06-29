import { Suspense } from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { TalentAtlasHeader } from '@/components/features/talentAtlas/TalentAtlasHeader';
import { TalentAtlasSidebar } from '@/components/features/talentAtlas/TalentAtlasSidebar';
import { SidebarUserFooter } from '@/components/features/talentAtlas/SidebarUserFooter';
import QueryProvider from '@/components/providers/QueryProvider';
import { RealtimeProvider } from '@/components/providers/talentAtlas/RealtimeProvider';

export default function TalentAtlasAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <RealtimeProvider />  {/* renders null, opens WS, feeds RxJS → TanStack cache */}
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
              {children}
            </main>
          </Auth0Provider>
        </div>
      </div>
    </QueryProvider>
  );
}
