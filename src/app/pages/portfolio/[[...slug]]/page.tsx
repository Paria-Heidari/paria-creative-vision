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

interface PortfolioPageProps {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
}

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } =
    await searchParams;

  // Fetch all categories with nested subcategories (for filter buttons)
  const categories = await getAllCategories();

  // Fetch photos based on filters
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
      <PortfolioPageHero />
      <Container maxWidth="2xl">
        <GalleryFilters
          currentCategory={categorySlug}
          currentSubcategory={subcategorySlug}
          categories={categories}
        />
        <GalleryGrid
          photos={photos}
          featuredBadgeLabel={featuredGalleryInfo.featuredBadgeLabel}
        />
      </Container>
    </>
  );
}
