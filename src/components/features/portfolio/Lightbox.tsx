'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo.types';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

interface LightboxProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
}

const Lightbox = ({ photo, photos, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    photos.findIndex((p) => p.id === photo.id),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentPhoto = photos[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const imageUrl = currentPhoto.storage_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${currentPhoto.storage_path}`
    : '/images/placeholder.jpg';

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
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto.title}
      className="bg-surface-strong/70 animate-fadeIn fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      {/* Close button */}

      <Button
        variant="gold"
        onClick={onClose}
        aria-label="Close lightbox"
        className="bg-accent-gold hover:bg-accent-gold-hover group absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
      >
        <X className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-90" />
      </Button>

      {/* Navigation buttons */}
      {hasPrevious && (
        <Button
          variant="gold"
          onClick={handlePrevious}
          aria-label="Previous photo"
          className="bg-accent-gold hover:bg-accent-gold-hover group absolute left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white transition-transform duration-300 group-hover:-translate-x-1" />
        </Button>
      )}

      {hasNext && (
        <Button
          variant="gold"
          onClick={handleNext}
          aria-label="Next photo"
          className="bg-accent-gold hover:bg-accent-gold-hover group absolute right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      )}

      {/* Image counter */}
      <div className="bg-accent-gold absolute top-6 left-6 z-50 rounded-full px-4 py-2 backdrop-blur-sm">
        <Typography
          variant="caption"
          as="span"
          className="tracking-wider text-white"
        >
          {currentIndex + 1} / {photos.length}
        </Typography>
      </div>

      {/* Main content container */}
      <div
        className="mx-6 flex max-h-[90vh] max-w-7xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative mb-6 flex flex-1 items-center justify-center">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-accent-gold border-t-accent-gold h-12 w-12 animate-spin rounded-full border-4" />
            </div>
          )}

          {/* Image */}
          <Image
            src={imageUrl}
            alt={currentPhoto.title}
            width={currentPhoto.width}
            height={currentPhoto.height}
            className={`h-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-all duration-500 ${
              isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            } ${direction === 'left' ? 'animate-slideInLeft' : direction === 'right' ? 'animate-slideInRight' : ''}`}
            priority
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Photo info */}
        <div className="bg-surface-raised/90 mx-auto max-w-2xl rounded-lg p-6 text-center backdrop-blur-sm">
          <Typography
            variant="h4"
            as="h2"
            className="text-foreground mb-3 tracking-wide"
          >
            {currentPhoto.title}
          </Typography>

          {currentPhoto.location_city && currentPhoto.location_country && (
            <div className="mb-3 flex items-center justify-center gap-2">
              <MapPin
                className="text-foreground-muted h-5 w-5"
                aria-hidden="true"
              />
              <Typography
                variant="paragraphSmall"
                as="span"
                className="text-foreground-muted"
              >
                {currentPhoto.location_city}, {currentPhoto.location_country}
              </Typography>
            </div>
          )}

          {currentPhoto.description && (
            <Typography
              variant="paragraphSmall"
              as="p"
              className="text-foreground-muted"
            >
              {currentPhoto.description}
            </Typography>
          )}

          {/* Tags */}
          {currentPhoto.tags && currentPhoto.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {currentPhoto.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent-gold/10 text-accent-gold font-inter rounded-full px-3 py-1 text-xs tracking-wider uppercase"
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
};

export default Lightbox;
