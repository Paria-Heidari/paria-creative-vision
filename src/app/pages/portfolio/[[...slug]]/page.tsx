import GalleryGrid from '@/components/features/portfolio/GalleryGrid';
import GalleryFilters from '@/components/features/portfolio/GalleryFilters';
import {
  getAllPhotos,
  getPhotosByCategory,
  getPhotosBySubcategory,
  getAllCategories
} from '@/lib/api/photos';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';

interface PortfolioPageProps {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await searchParams;

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent-gold/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <Container maxWidth="xl">
          <div className="flex flex-col items-center text-center gap-6 animate-fadeIn">
            <Typography variant="caption" as="p" className="tracking-[0.3em] uppercase text-accent-gold font-medium">
              Visual Stories by Paria
            </Typography>
            <Typography variant="h1" as="h1" className="font-syne tracking-tight">
              Photography Portfolio
            </Typography>
            <span className="block w-16 h-0.5 bg-accent-gold rounded-full" />
            <Typography variant="paragraph" as="p" className="text-foreground-muted max-w-xl">
              A curated collection of moments captured across landscapes, cities, and fleeting light.
            </Typography>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-foreground/10">
        <GalleryFilters
          currentCategory={categorySlug}
          currentSubcategory={subcategorySlug}
          categories={categories}
        />
      </section>

      {/* Gallery Section */}
      <section className="pb-24">
        <GalleryGrid photos={photos} />
      </section>
    </div>
  );
}
