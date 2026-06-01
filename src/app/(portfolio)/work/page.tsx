import { Suspense } from 'react';
import { Container } from '@/components/layout/Container';
import { WorkPageHero } from '@/components/features/work';
import {
  WorkGrid,
  WorkGridSkeleton,
} from '@/components/features/work/WorkGrid';
import { workPageHeroData } from '@/data/workData';

export default function WorkPage() {
  return (
    <>
      <WorkPageHero {...workPageHeroData} />
      <Container maxWidth="xl">
        <Suspense fallback={<WorkGridSkeleton />}>
          <WorkGrid />
        </Suspense>
      </Container>
    </>
  );
}
