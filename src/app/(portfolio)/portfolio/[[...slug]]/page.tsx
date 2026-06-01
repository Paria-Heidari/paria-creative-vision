import GalleryGrid from '@/components/features/portfolio/GalleryGrid';
import GalleryFilters from '@/components/features/portfolio/GalleryFilters';
import {
  getAllPhotos,
  getPhotosByCategory,
  getPhotosBySubcategory,
  getAllCategories,
  getAllCategoriesStatic,
} from '@/lib/api/photos/photos';
import { Container } from '@/components/layout/Container';
import { PortfolioPageHero } from '@/components/features/portfolio';
import { featuredGalleryInfo } from '@/data/staticData';
import { portfolioPageHeroData } from '@/data/staticData';
import { routes as ROUTES } from '@/lib/routes/routes';
import { Suspense } from 'react';
import { Loading } from '@/components/ui/Loading';

interface PortfolioPageProps {
  params: Promise<{
    slug: string[];
  }>;
}
// Generate static paths for all categories and subcategories at build time
export async function generateStaticParams() {
  const categories = await getAllCategoriesStatic();

  const paths: { slug: string[] }[] = [{ slug: [] }];

  for (const category of categories ?? []) {
    paths.push({ slug: [category.slug] });
    for (const sub of category.subcategories ?? []) {
      paths.push({ slug: [category.slug, sub.slug] });
    }
  }

  return paths;
}

// Make Server Component Partial Pre-Rendered by using cacheComponents in next.config.ts
const GalleryGridSection = async ({ params }: PortfolioPageProps) => {
  const slugArray = (await params)?.slug ?? [];
  const categorySlug = slugArray[0];
  const subcategorySlug = slugArray[1];
  const basePath = ROUTES.portfolio;

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
        basePath={basePath}
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

export default function PortfolioPage({ params }: PortfolioPageProps) {
  return (
    <>
      <PortfolioPageHero {...portfolioPageHeroData} />
      <Container maxWidth="2xl">
        <Suspense fallback={<Loading />}>
          <GalleryGridSection params={params} />
        </Suspense>
      </Container>
    </>
  );
}
