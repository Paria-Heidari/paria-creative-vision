'use client';

import Image from 'next/image';
import { Photo } from '@/types/photo.types';
import { useState } from 'react';

interface GalleryItemProps {
  photo: Photo;
  onClick: () => void;
}

export default function GalleryItem({ photo, onClick }: GalleryItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="break-inside-avoid mb-4 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-xl transition-all duration-500 bg-component-beige">
        {/* Image with Next.js optimization */}
        <div className="relative">
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            width={photo.metadata.width}
            height={photo.metadata.height}
            className={`w-full h-auto transition-all duration-700 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-105`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />

          {/* Loading placeholder */}
          {!isLoaded && (
            <div
              className="absolute inset-0 bg-accent animate-pulse"
              style={{ aspectRatio: photo.metadata.aspectRatio }}
            />
          )}
        </div>

        {/* Overlay on hover - elegant fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-lg font-syne text-accent mb-1 tracking-wide">
              {photo.title}
            </h3>
            {photo.location.city && (
              <p className="text-sm font-inter text-accent/90 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {photo.location.city}, {photo.location.country}
              </p>
            )}
            {photo.description && (
              <p className="text-xs font-inter text-accent/80 mt-2 line-clamp-2">
                {photo.description}
              </p>
            )}
          </div>
        </div>

        {/* Featured badge */}
        {photo.featured && (
          <div className="absolute top-4 right-4 bg-accent-hover/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-inter text-foreground font-medium tracking-wider">
              FEATURED
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
