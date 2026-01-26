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
          className="flex items-end justify-between mb-12"
        >
          <div>
            {/* Decorative accent line */}
            <div className="w-12 h-1 bg-accent-gold mb-4 rounded-full" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold tracking-wide text-foreground mb-3">
              Featured Collection
            </h2>
            <p className="text-sm font-inter text-foreground-muted tracking-[0.2em] uppercase">
              Curated Photography Highlights
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/pages/portfolio"
              className="hidden md:inline-flex items-center gap-3 text-base font-medium text-foreground hover:text-accent-gold transition-colors duration-300 group"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
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

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center md:hidden"
        >
          <Link
            href="/pages/portfolio"
            className="inline-flex items-center gap-3 px-8 py-3 bg-accent-gold text-white rounded-full text-sm font-medium tracking-wider uppercase hover:bg-accent-gold-hover transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
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