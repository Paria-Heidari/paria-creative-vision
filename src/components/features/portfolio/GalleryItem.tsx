'use client';

import Image from 'next/image';
import { Photo } from '@/types/photo.types';
import { useState } from 'react';
import { motion } from 'framer-motion';

import PhotoOverlay from './PhotoOverlay';
import FeaturedBadge from './FeaturedBadge';

interface GalleryItemProps {
  photo: Photo;
  featuredBadgeLabel: string;
  onClick: () => void;
  variant?: 'masonry' | 'grid';
  index?: number;
  priority?: boolean;
}

const GalleryItem = ({
  photo,
  featuredBadgeLabel,
  variant = 'masonry',
  index = 0,
  priority = false,
  onClick,
}: GalleryItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isGrid = variant === 'grid';
  const imageUrl = photo.storage_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${photo.storage_path}`
    : '/images/placeholder.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`${
        isGrid ? 'h-full' : 'mb-6 break-inside-avoid'
      } group cursor-pointer`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`bg-surface-raised relative overflow-hidden rounded-xl ${
          isGrid ? 'flex h-full flex-col' : ''
        }`}
        style={{
          boxShadow: isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.15)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'box-shadow 0.4s ease-out',
        }}
      >
        {/* Image Container with Zoom Effect */}
        <div
          className={`relative overflow-hidden ${isGrid ? 'min-h-0 flex-1' : ''}`}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full w-full"
          >
            <Image
              src={imageUrl}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              priority={priority}
              className={`w-full transition-opacity duration-500 ${
                isGrid ? 'h-full w-full object-cover' : 'h-auto'
              } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>

          {/* Loading Skeleton */}
          {!isLoaded && (
            <div
              className="from-accent to-surface-raised absolute inset-0 animate-pulse bg-gradient-to-br"
              style={{ aspectRatio: photo.aspect_ratio }}
            />
          )}
        </div>
        {/* Photo Overlay */}
        <PhotoOverlay photo={photo} />
        {/* Featured Badge */}
        <FeaturedBadge photo={photo} featuredBadgeLabel={featuredBadgeLabel} />
      </motion.div>
    </motion.div>
  );
};

export default GalleryItem;
