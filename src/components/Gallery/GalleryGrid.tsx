'use client';

import { useState } from 'react';
import { Photo } from '@/types/photo.types';
import GalleryItem from './GalleryItem';
import Lightbox from './Lightbox';
import ImageIcon from '@/components/icons/ImageIcon';

interface GalleryGridProps {
  photos: Photo[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
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
      <div className="flex flex-col items-center justify-center py-24 px-6">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6">
          <ImageIcon className="w-10 h-10 text-foreground/40" />
        </div>
        <h3 className="text-2xl font-syne text-foreground mb-2 tracking-wide">
          No Photos Found
        </h3>
        <p className="text-foreground/60 font-inter text-center max-w-md">
          Try selecting a different category or browse all photos to see the collection.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Photo count */}
      <div className="px-6 mb-8">
        <p className="text-sm font-inter text-foreground/60 tracking-wider uppercase">
          {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'}
        </p>
      </div>

      {/* Masonry Grid - CSS Columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-6 pb-12">
        {photos.map((photo) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            onClick={() => handlePhotoClick(photo)}
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
