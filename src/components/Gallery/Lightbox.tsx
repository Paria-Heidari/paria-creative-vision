'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo.types';
import CloseIcon from '@/components/icons/CloseIcon';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import LocationPinIcon from '@/components/icons/LocationPinIcon';

interface LightboxProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
}

const Lightbox = ({ photo, photos, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    photos.findIndex((p) => p.id === photo.id)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentPhoto = photos[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const imageUrl = currentPhoto.storage_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${currentPhoto.storage_path}`
    : "/images/placeholder.jpg";

  const handlePrevious = useCallback(() => {
    if (hasPrevious) {
      setDirection('right');
      setIsLoading(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [hasPrevious]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      setDirection('left');
      setIsLoading(true);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [hasNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleNext, handlePrevious, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/97 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 bg-accent/20 hover:bg-accent/30 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Close lightbox"
      >
        <CloseIcon className="w-6 h-6 text-accent group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Navigation buttons */}
      {hasPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-6 z-50 w-12 h-12 bg-accent/20 hover:bg-accent/30 rounded-full flex items-center justify-center transition-all duration-300 group"
          aria-label="Previous photo"
        >
          <ChevronLeftIcon className="w-6 h-6 text-accent group-hover:-translate-x-1 transition-transform duration-300" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-6 z-50 w-12 h-12 bg-accent/20 hover:bg-accent/30 rounded-full flex items-center justify-center transition-all duration-300 group"
          aria-label="Next photo"
        >
          <ChevronRightIcon className="w-6 h-6 text-accent group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      )}

      {/* Image counter */}
      <div className="absolute top-6 left-6 z-50 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-accent font-inter text-sm tracking-wider">
          {currentIndex + 1} / {photos.length}
        </span>
      </div>

      {/* Main content container */}
      <div
        className="max-w-7xl max-h-[90vh] mx-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative flex-1 flex items-center justify-center mb-6">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          )}

          {/* Image */}
          <Image
            src={imageUrl}
            alt={currentPhoto.title}
            width={currentPhoto.width}
            height={currentPhoto.height}
            className={`max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-500 ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            } ${direction === 'left' ? 'animate-slideInLeft' : direction === 'right' ? 'animate-slideInRight' : ''}`}
            priority
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Photo info */}
        <div className="text-center bg-accent/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-syne text-accent mb-3 tracking-wide">
            {currentPhoto.title}
          </h2>

          {currentPhoto.location_city && currentPhoto.location_country && (
            <div className="flex items-center justify-center gap-2 mb-3">
              <LocationPinIcon className="w-5 h-5 text-accent/70" />
              <p className="text-accent/80 font-inter">
                {currentPhoto.location_city}, {currentPhoto.location_country}
              </p>
            </div>
          )}

          {currentPhoto.description && (
            <p className="text-accent/70 font-inter text-sm leading-relaxed max-w-xl mx-auto mb-3">
              {currentPhoto.description}
            </p>
          )}

          {/* Tags */}
          {currentPhoto.tags && currentPhoto.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {currentPhoto.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent/20 text-accent/70 rounded-full text-xs font-inter tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lightbox;