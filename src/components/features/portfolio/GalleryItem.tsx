"use client";

import Image from "next/image";
import { Photo } from "@/types/photo.types";
import { useState } from "react";
import { motion } from "framer-motion";

import PhotoOverlay from "./PhotoOverlay";
import FeaturedBadge from "./FeaturedBadge";

interface GalleryItemProps {
  photo: Photo;
  featuredBadgeLabel: string;
  onClick: () => void;
  variant?: "masonry" | "grid";
  index?: number;
}

const GalleryItem = ({
  photo,
  featuredBadgeLabel,
  onClick,
  variant = "masonry",
  index = 0,
}: GalleryItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isGrid = variant === "grid";
  const imageUrl = photo.storage_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${photo.storage_path}`
    : "/images/placeholder.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`${
        isGrid ? "h-full" : "break-inside-avoid mb-6"
      } group cursor-pointer`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-xl bg-surface-raised ${
          isGrid ? "h-full flex flex-col" : ""
        }`}
        style={{
          boxShadow: isHovered
            ? "0 20px 40px rgba(0, 0, 0, 0.15)"
            : "0 4px 12px rgba(0, 0, 0, 0.08)",
          transition: "box-shadow 0.4s ease-out",
        }}
      >
        {/* Image Container with Zoom Effect */}
        <div className={`relative overflow-hidden ${isGrid ? "flex-1 min-h-0" : ""}`}>
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={imageUrl}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              className={`w-full transition-opacity duration-500 ${
                isGrid ? "h-full w-full object-cover" : "h-auto"
              } ${isLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>

          {/* Loading Skeleton */}
          {!isLoaded && (
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent to-surface-raised animate-pulse"
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
