'use client';
import { useState } from 'react';
import { Photo } from '@/types/photo.types';
import { motion } from 'framer-motion';
import GalleryItem from './GalleryItem';
import Lightbox from './Lightbox';
import { ImageOff } from 'lucide-react';

interface GalleryGridProps {
  photos: Photo[];
}

const GalleryGrid = ({ photos }: GalleryGridProps) => {
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
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-24 px-6"
      >
        <div className="w-24 h-24 bg-accent-gold/10 rounded-full flex items-center justify-center mb-6">
          <ImageOff className="w-12 h-12 text-accent-gold/60" />
        </div>
        <h3 className="text-2xl font-syne text-foreground mb-3 tracking-wide">
          No Photos Found
        </h3>
        <p className="text-foreground-muted font-inter text-center max-w-md leading-relaxed">
          Try selecting a different category or browse all photos to see the collection.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Photo count with subtle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="px-6 sm:px-8 mb-8"
      >
        <p className="text-sm font-inter text-foreground-muted tracking-wider uppercase">
          <span className="text-accent-gold font-semibold">{photos.length}</span>{' '}
          {photos.length === 1 ? 'Photo' : 'Photos'}
        </p>
      </motion.div>

      {/* Masonry Grid - Improved spacing */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 px-6 sm:px-8 pb-16">
        {photos.map((photo, index) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            showFeaturedBadge={true}
            onClick={() => handlePhotoClick(photo)}
            index={index}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && !isAnimating && (
        <Lightbox photo={selectedPhoto} photos={photos} onClose={handleClose} />
      )}
    </>
  );
}

export default GalleryGrid;