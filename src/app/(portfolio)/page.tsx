import type { Metadata } from 'next';
import { Suspense } from 'react';
import HomePageHero from '@/components/features/home/HomePageHero';
import { TextBlock } from '@/components/ui/TextBlock';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { SelectedWorkSection } from '@/components/features/work';
import { selectedWorkSectionData } from '@/data/workData';
import {
  textBlockData,
  homePageHeroData,
  metadataInfo,
} from '@/data/staticData';
import {
  FeaturedGallerySection,
  FeaturedGallerySkeleton,
} from '@/components/features/home/FeaturedGallerySection';
import {
  LatestArticlesSection,
  LatestArticlesSkeleton,
} from '@/components/features/home/LatestArticlesSection';

export const metadata: Metadata = {
  title: metadataInfo.title,
  description: metadataInfo.description,
  openGraph: metadataInfo.openGraph,
};

export default function Home() {
  return (
    <>
      <HomePageHero {...homePageHeroData} />
      <Container maxWidth="xl">
        <Stack direction="vertical" gap={{ base: 12, md: 24 }}>
          <TextBlock content={textBlockData.content} />
          <SelectedWorkSection
            info={selectedWorkSectionData.info}
            cards={selectedWorkSectionData.cards}
          />
          <div className="min-h-[640px]">
            <Suspense fallback={<FeaturedGallerySkeleton />}>
              <FeaturedGallerySection />
            </Suspense>
          </div>
          <div className="min-h-[640px]">
            <Suspense fallback={<LatestArticlesSkeleton />}>
              <LatestArticlesSection />
            </Suspense>
          </div>
        </Stack>
      </Container>
    </>
  );
}
