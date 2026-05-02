import FeaturedGallery from '@/components/features/home/FeaturedGallery';
import LatestArticles from '@/components/features/home/LatestArticles';
import HomePageHero from '@/components/features/home/HomePageHero';
import { TextBlock } from '@/components/ui/TextBlock';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { getFeaturedPhotos } from '@/lib/api/photos';
import { getMediumArticles } from '@/lib/api/mediumArticles';
import { SelectedWorkSection } from '@/components/features/work';
import { selectedWorkSectionData } from '@/data/workData';
import { featuredGalleryInfo, textBlockData } from '@/data/staticData';
import { homePageHeroData } from '@/data/staticData';
import { Suspense } from 'react';
import { Loading } from '@/components/ui/Loading';

const mediumUsername = process.env.MEDIUM_USERNAME as string;

const FeaturedGallerySection = async () => {
  const featuredPhotos = await getFeaturedPhotos();
  return (
    <FeaturedGallery
      featuredPhotos={featuredPhotos}
      featuredGalleryInfo={featuredGalleryInfo}
    />
  );
};

const LatestArticlesSection = async () => {
  const articles = await getMediumArticles(mediumUsername);
  return <LatestArticles articles={articles} />;
};

export default async function Home() {
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
          <Suspense fallback={<Loading />}>
            <FeaturedGallerySection />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <LatestArticlesSection />
          </Suspense>
        </Stack>
      </Container>
    </>
  );
}
