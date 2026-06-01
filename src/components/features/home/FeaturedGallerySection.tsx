import { getFeaturedPhotos } from '@/lib/api/photos/photos';
import FeaturedGallery from './FeaturedGallery';
import { featuredGalleryInfo } from '@/data/staticData';

export function FeaturedGallerySkeleton() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* SectionHeader: decorative line + title/subtitle left, CTA right */}
      <div className="space-y-8 md:space-y-12">
        <div className="skeleton h-[2px] w-full" />
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-4 md:space-y-6">
            <div className="skeleton h-10 w-56" />
            <div className="skeleton h-5 w-64" />
          </div>
          <div className="skeleton hidden h-5 w-32 md:block" />
        </div>
      </div>
      {/* Photo grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton aspect-[3/4]" />
        ))}
      </div>
      {/* Mobile-only CTA — mt-8 md:hidden matches real motion.div */}
      <div className="mt-8 text-center md:hidden">
        <div className="skeleton mx-auto h-5 w-36" />
      </div>
    </div>
  );
}

export const FeaturedGallerySection = async () => {
  const featuredPhotos = await getFeaturedPhotos();
  return (
    <FeaturedGallery
      featuredPhotos={featuredPhotos}
      featuredGalleryInfo={featuredGalleryInfo}
    />
  );
};
