import GalleryGrid from '@/components/features/portfolio/GalleryGrid';
import GalleryFilters from '@/components/features/portfolio/GalleryFilters';
import {
  getAllPhotos,
  getPhotosByCategory,
  getPhotosBySubcategory,
  getAllCategories,
} from '@/lib/api/photos';
import { Container } from '@/components/layout/Container';
import { PortfolioPageHero } from '@/components/features/portfolio';
import { featuredGalleryInfo } from '@/data/staticData';
import { portfolioPageHeroData } from '@/data/staticData';
import { Suspense } from 'react';
import { Loading } from '@/components/ui/Loading';

interface PortfolioPageProps {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
}

const GalleryGridSection = async ({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
}) => {
  const { category: categorySlug, subcategory: subcategorySlug } =
    await searchParams;

  const categories = await getAllCategories();
  let photos;
  if (subcategorySlug) {
    photos = await getPhotosBySubcategory(subcategorySlug);
  } else if (categorySlug && categorySlug !== 'all') {
    photos = await getPhotosByCategory(categorySlug);
  } else {
    photos = await getAllPhotos();
  }

  return (
    <>
      <GalleryFilters
        currentCategory={categorySlug}
        currentSubcategory={subcategorySlug}
        categories={categories}
      />
      <GalleryGrid
        photos={photos}
        featuredBadgeLabel={featuredGalleryInfo.featuredBadgeLabel}
      />
    </>
  );
};

export default function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  return (
    <>
      <PortfolioPageHero {...portfolioPageHeroData} />
      <Container maxWidth="2xl">
        <Suspense fallback={<Loading />}>
          <GalleryGridSection searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
