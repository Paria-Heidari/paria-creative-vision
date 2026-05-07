import { getFeaturedPhotos } from "@/lib/api/photos";
import FeaturedGallery from "./FeaturedGallery";
import { featuredGalleryInfo } from "@/data/staticData";

export function FeaturedGallerySkeleton() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* SectionHeader: decorative line + title/subtitle left, CTA right */}
      <div className="space-y-8 md:space-y-12">
        <div className="h-[2px] w-full skeleton" />
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-4 md:space-y-6">
            <div className="h-10 w-56 skeleton" />
            <div className="h-5 w-64 skeleton" />
          </div>
          <div className="hidden h-5 w-32 skeleton md:block" />
        </div>
      </div>
      {/* Photo grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[3/4] skeleton" />
        ))}
      </div>
      {/* Mobile-only CTA — mt-8 md:hidden matches real motion.div */}
      <div className="mt-8 text-center md:hidden">
        <div className="mx-auto h-5 w-36 skeleton" />
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
