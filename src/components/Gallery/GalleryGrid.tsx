'use client';

import { useState } from 'react';
import { Photo } from '@/types/photo.types';
import GalleryItem from './GalleryItem';
import Lightbox from './Lightbox';

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
          <svg
            className="w-10 h-10 text-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
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
