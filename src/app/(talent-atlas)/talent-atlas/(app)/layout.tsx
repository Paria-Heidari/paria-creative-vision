import { Suspense } from 'react';
import { TalentAtlasHeader } from '@/components/features/talentAtlas/TalentAtlasHeader';
import { TalentAtlasSidebar } from '@/components/features/talentAtlas/TalentAtlasSidebar';
import { SidebarUserFooter } from '@/components/features/talentAtlas/SidebarUserFooter';

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
        <main className="flex-1 overflow-y-auto bg-white p-8">{children}</main>
      </div>
    </div>
  );
}
