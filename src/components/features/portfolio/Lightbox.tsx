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
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto.title}
      className="fixed inset-0 z-50 bg-surface-strong/70 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
    >
      {/* Close button */}

      <Button variant="gold" onClick={onClose} aria-label="Close lightbox" className="absolute top-6 right-6 z-50 w-12 h-12 bg-accent-gold hover:bg-accent-gold-hover rounded-full flex items-center justify-center transition-all duration-300 group">
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </Button>

      {/* Navigation buttons */}
      {hasPrevious && (
        <Button variant="gold" onClick={handlePrevious} aria-label="Previous photo" className="absolute left-6 z-50 w-12 h-12 bg-accent-gold hover:bg-accent-gold-hover rounded-full flex items-center justify-center transition-all duration-300 group">
          <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" />
        </Button>
      )}

      {hasNext && (
        <Button variant="gold" onClick={handleNext} aria-label="Next photo" className="absolute right-6 z-50 w-12 h-12 bg-accent-gold hover:bg-accent-gold-hover rounded-full flex items-center justify-center transition-all duration-300 group">
          <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      )}

      {/* Image counter */}
      <div className="absolute top-6 left-6 z-50 bg-accent-gold backdrop-blur-sm px-4 py-2 rounded-full">
        <Typography variant="caption" as="span" className="text-white tracking-wider">
          {currentIndex + 1} / {photos.length}
        </Typography>
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
              <div className="w-12 h-12 border-4 border-accent-gold border-t-accent-gold rounded-full animate-spin" />
            </div>
          )}

          {/* Image */}
          <Image
            src={imageUrl}
            alt={currentPhoto.title}
            width={currentPhoto.width}
            height={currentPhoto.height}
            className={`max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-500 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              } ${direction === 'left' ? 'animate-slideInLeft' : direction === 'right' ? 'animate-slideInRight' : ''}`}
            priority
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Photo info */}
        <div className="text-center bg-surface-raised/90 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
          <Typography variant="h4" as="h2" className="text-foreground mb-3 tracking-wide">
            {currentPhoto.title}
          </Typography>

          {currentPhoto.location_city && currentPhoto.location_country && (
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-foreground-muted" aria-hidden="true" />
              <Typography variant="paragraphSmall" as="span" className="text-foreground-muted">
                {currentPhoto.location_city}, {currentPhoto.location_country}
              </Typography>
            </div>
          )}

          {currentPhoto.description && (
            <Typography variant="paragraphSmall" as="p" className="text-foreground-muted">
              {currentPhoto.description}
            </Typography>
          )}

          {/* Tags */}
          {currentPhoto.tags && currentPhoto.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {currentPhoto.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-xs font-inter tracking-wider uppercase"
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