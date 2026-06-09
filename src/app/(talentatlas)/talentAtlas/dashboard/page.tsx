import { Suspense } from 'react';
import { DashboardContent } from '@/components/features/talentAtlas/dashboardContent';

export default function DashboardPage() {
  return (
    <>
    <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <Suspense fallback={null}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
