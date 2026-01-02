'use client';

import Link from 'next/link';
import { getFeaturedPhotos } from '@/data/mockPhotos';
import GalleryItem from '@/components/Gallery/GalleryItem';
import { useState } from 'react';
import Lightbox from '@/components/Gallery/Lightbox';

export function FeaturedGallery() {
  const featuredPhotos = getFeaturedPhotos(3); // Get 3 featured photos for compact view
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-syne tracking-wider text-foreground mb-2">
              Featured Collection
            </h2>
            <p className="text-sm font-inter text-foreground/60 tracking-wide uppercase">
              Photography Highlights
            </p>
          </div>
          <Link
            href="/pages/portfolio"
            className="hidden md:inline-flex items-center gap-2 text-sm font-inter text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {featuredPhotos.map((photo) => (
            <div key={photo.id} className="group cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
              <GalleryItem
                photo={photo}
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center md:hidden">
          <Link
            href="/pages/portfolio"
            className="inline-flex items-center gap-2 px-6 py-2 bg-foreground text-accent rounded-full text-sm font-inter tracking-wider hover:bg-foreground/90 transition-all duration-300"
          >
            View Full Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={featuredPhotos}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </section>
  );
}
