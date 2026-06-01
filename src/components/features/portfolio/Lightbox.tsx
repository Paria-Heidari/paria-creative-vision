'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  const touchStartX = useRef<number | null>(null);

  const currentPhoto = photos[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const imageUrl = currentPhoto.storage_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${currentPhoto.storage_path}`
    : '/images/placeholder.jpg';

  const handlePrevious = useCallback(() => {
    if (!hasPrevious) return;
    setIsLoading(true);
    setDirection('right');
    setCurrentIndex((prev) => prev - 1);
  }, [hasPrevious]);

  const handleNext = useCallback(() => {
    if (!hasNext) return;
    setIsLoading(true);
    setDirection('left');
    setCurrentIndex((prev) => prev + 1);
  }, [hasNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (delta > 50) handlePrevious();
      else if (delta < -50) handleNext();
    },
    [handleNext, handlePrevious],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
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
      className="animate-fadeIn bg-surface-strong/70 fixed inset-0 z-50 flex flex-col backdrop-blur-sm sm:items-center sm:justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:absolute sm:inset-x-0 sm:top-0 sm:z-50 sm:px-6 sm:py-5">
        <div className="bg-accent-gold rounded-full px-4 py-2">
          <Typography
            variant="caption"
            as="span"
            className="tracking-wider text-white"
          >
            {currentIndex + 1} / {photos.length}
          </Typography>
        </div>

        <Button
          variant="gold"
          onClick={onClose}
          aria-label="Close lightbox"
          className="h-9 w-9 rounded-full p-0 sm:h-12 sm:w-12"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Image area */}
      <div
        className="relative flex flex-1 items-center justify-center sm:w-full sm:max-w-6xl sm:flex-none sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-accent-gold h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}

        <Image
          src={imageUrl}
          alt={currentPhoto.title}
          width={currentPhoto.width}
          height={currentPhoto.height}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
          className={`h-auto max-h-[58vh] w-full object-contain transition-all duration-500 sm:max-h-[70vh] sm:w-auto sm:rounded-lg sm:shadow-2xl ${
            isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          } ${direction === 'left' ? 'animate-slideInLeft' : direction === 'right' ? 'animate-slideInRight' : ''}`}
          onLoad={() => setIsLoading(false)}
        />

        {/* Desktop-only side arrows */}
        {hasPrevious && (
          <Button
            variant="gold"
            onClick={handlePrevious}
            aria-label="Previous photo"
            className="group absolute left-0 hidden h-12 w-12 items-center justify-center rounded-full transition-all duration-300 sm:flex"
          >
            <ChevronLeft className="h-6 w-6 text-white transition-transform duration-300 group-hover:-translate-x-1" />
          </Button>
        )}

        {hasNext && (
          <Button
            variant="gold"
            onClick={handleNext}
            aria-label="Next photo"
            className="group absolute right-0 hidden h-12 w-12 items-center justify-center rounded-full transition-all duration-300 sm:flex"
          >
            <ChevronRight className="h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        )}
      </div>

      {/* Bottom section */}
      <div
        className="px-4 pt-4 pb-8 sm:pt-5 sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile nav: prev | dot indicators | next */}
        <div className="mb-4 flex items-center justify-between sm:hidden">
          <button
            onClick={handlePrevious}
            aria-label="Previous photo"
            disabled={!hasPrevious}
            className="text-foreground-muted active:bg-foreground/5 flex h-10 w-10 items-center justify-center rounded-full transition-all disabled:opacity-20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {photos.length <= 12 ? (
            <div className="flex items-center gap-1.5">
              {photos.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-accent-gold w-5'
                      : 'bg-foreground/20 w-1.5'
                  }`}
                />
              ))}
            </div>
          ) : (
            <Typography
              variant="caption"
              as="span"
              className="text-foreground-muted"
            >
              {currentIndex + 1} / {photos.length}
            </Typography>
          )}

          <button
            onClick={handleNext}
            aria-label="Next photo"
            disabled={!hasNext}
            className="text-foreground-muted active:bg-foreground/5 flex h-10 w-10 items-center justify-center rounded-full transition-all disabled:opacity-20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Photo info */}
        <div className="bg-surface-raised/90 mx-auto max-w-2xl rounded-lg p-4 text-center backdrop-blur-sm sm:p-6">
          <Typography
            variant="h4"
            as="h2"
            className="text-foreground mb-1 tracking-wide sm:mb-3"
          >
            {currentPhoto.title}
          </Typography>

          {currentPhoto.location_city && currentPhoto.location_country && (
            <div className="mb-1 flex items-center justify-center gap-1.5 sm:mb-3 sm:gap-2">
              <MapPin
                className="text-foreground-muted h-4 w-4 sm:h-5 sm:w-5"
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

          {currentPhoto.tags && currentPhoto.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {currentPhoto.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-inter bg-accent-gold/10 text-accent-gold rounded-full px-3 py-1 text-xs tracking-wider uppercase"
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
