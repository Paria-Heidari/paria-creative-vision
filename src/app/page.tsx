import FeaturedGallery from '@/components/features/home/FeaturedGallery';
import LatestArticles from '@/components/features/home/LatestArticles';
import HomePageHero from '@/components/features/home/HomePageHero';
import { TextBlock } from '@/components/ui/TextBlock';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { getFeaturedPhotos } from '@/lib/api/photos';
import { getMediumArticles } from '@/lib/api/mediumArticles';
import { featuredGalleryInfo, textBlockData } from '@/data/staticData';

const mediumUsername = process.env.MEDIUM_USERNAME as string;

export default async function Home() {
  const [featuredPhotos, articles] = await Promise.all([
    getFeaturedPhotos(),
    getMediumArticles(mediumUsername),
  ]);

  return (
    <>
      <HomePageHero />
      <Container maxWidth="xl">
        <Stack direction="vertical" gap={{ base: 12, md: 24 }}>
          <TextBlock content={textBlockData.content} />
          <FeaturedGallery
            featuredPhotos={featuredPhotos}
            featuredGalleryInfo={featuredGalleryInfo}
          />
          {articles.length > 0 && <LatestArticles articles={articles} />}
        </Stack>
      </Container>
    </>
  );
}
