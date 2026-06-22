import { Suspense } from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { TalentAtlasHeader } from '@/components/features/talentAtlas/TalentAtlasHeader';
import { TalentAtlasSidebar } from '@/components/features/talentAtlas/TalentAtlasSidebar';
import { SidebarUserFooter } from '@/components/features/talentAtlas/SidebarUserFooter';
import QueryProvider from '@/components/providers/QueryProvider';

export default function TalentAtlasAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
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
          <QueryProvider>
            <main className="flex-1 overflow-y-auto bg-white p-8">
              {children}
            </main>
          </QueryProvider>
        </Auth0Provider>
      </div>
    </div>
  );
}
