'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Photo } from '@/types/photo.types';
import { motion } from 'framer-motion';
import GalleryItem from './GalleryItem';
import { Typography } from '@/components/ui/Typography';

// Lightbox is a heavy modal (full-screen overlay + image + navigation).
// Lazy-load it so its JS chunk is only downloaded when the user actually opens a photo.
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });
import GalleryEmptyState from './GalleryEmptyState';

interface GalleryGridProps {
  photos: Photo[];
  featuredBadgeLabel: string;
}

const GalleryGrid = ({ photos, featuredBadgeLabel }: GalleryGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePhotoClick = (photo: Photo) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedPhoto(photo);
      setIsAnimating(false);
    }, 100);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedPhoto(null);
      setIsAnimating(false);
    }, 100);
  };

  if (photos.length === 0) {
    return <GalleryEmptyState />;
  }

  return (
    <section>
      {/* Photo count with animation */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <Typography
          variant="caption"
          as="p"
          className="tracking-wider uppercase"
        >
          <span className="text-accent-gold font-semibold">
            {photos.length}
          </span>{' '}
          {photos.length === 1 ? 'Photo' : 'Photos'}
        </Typography>
      </motion.div>

      {/* Masonry Grid - Improved spacing */}
      <div className="columns-1 space-y-6 sm:columns-2 sm:space-y-6 md:columns-3 lg:columns-4 xl:columns-5">
        {photos.map((photo, index) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            featuredBadgeLabel={featuredBadgeLabel}
            onClick={() => handlePhotoClick(photo)}
            index={index}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && !isAnimating && (
        <Lightbox photo={selectedPhoto} photos={photos} onClose={handleClose} />
      )}
    </section>
  );
};

export default GalleryGrid;
