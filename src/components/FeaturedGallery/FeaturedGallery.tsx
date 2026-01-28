'use client';
import Link from 'next/link';
import GalleryItem from '@/components/Gallery/GalleryItem';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Lightbox from '@/components/Gallery/Lightbox';
import { ArrowRight } from 'lucide-react';
import { Photo } from '@/types/photo.types';

interface FeaturedGalleryProps {
  featuredPhotos: Photo[];
}

const FeaturedGallery = ({ featuredPhotos }: FeaturedGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 px-6 sm:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Decorative accent line - left aligned */}
          <div className="w-12 h-[2px] bg-accent-gold mb-6" />

          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-syne text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
                Featured Collection
              </h2>
              <p className="text-foreground-muted text-base">
                Curated photography highlights
              </p>
            </div>

            {/* View All Link - desktop */}
            <Link
              href="/pages/portfolio"
              className="hidden md:flex items-center gap-2 text-base font-medium text-foreground hover:text-accent-gold transition-colors group"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Gallery Grid with staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {featuredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="aspect-[3/4]"
            >
              <GalleryItem
                photo={photo}
                onClick={() => setSelectedPhoto(photo)}
                showFeaturedBadge={false}
                variant="grid"
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link - mobile only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center md:hidden"
        >
          <Link
            href="/pages/portfolio"
            className="inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-accent-gold transition-colors group"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
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
};

export default FeaturedGallery;