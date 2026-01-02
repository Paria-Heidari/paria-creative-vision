'use client';

import { useState } from 'react';
import GalleryGrid from '@/components/Gallery/GalleryGrid';
import GalleryFilters from '@/components/Gallery/GalleryFilters';
import { getPhotosByCategory } from '@/data/mockPhotos';

export default function PortfolioPage() {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentSubcategory, setCurrentSubcategory] = useState<string | undefined>();

  const photos = getPhotosByCategory(
    currentCategory === 'all' ? undefined : currentCategory,
    currentSubcategory
  );

  const handleFilterChange = (category?: string, subcategory?: string) => {
    setCurrentCategory(category || 'all');
    setCurrentSubcategory(subcategory);
  };

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
          onFilterChange={handleFilterChange}
          currentCategory={currentCategory}
          currentSubcategory={currentSubcategory}
        />
      </section>

      {/* Gallery Section */}
      <section className="pb-20">
        <GalleryGrid photos={photos} />
      </section>
    </div>
  );
}
