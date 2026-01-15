import { GalleryGrid } from '@/components/Gallery';
import { GalleryFilters } from '@/components/Gallery';
import {
  getAllPhotos,
  getPhotosByCategory,
  getPhotosBySubcategory,
  getAllCategories
} from '@/lib/api/photos';

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
      <section className="py-20 px-6 text-center border-b border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-syne tracking-wider text-foreground mb-6 animate-fadeIn">
            Photography Portfolio
          </h1>
          <p className="text-xl md:text-2xl font-inter text-foreground/70 leading-relaxed">
            Visual stories from around the world.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12">
        <GalleryFilters
          currentCategory={categorySlug}
          currentSubcategory={subcategorySlug}
          categories={categories}
        />
      </section>

      {/* Gallery Section */}
      <section className="pb-20">
        <GalleryGrid photos={photos} />
      </section>
    </div>
  );
}
