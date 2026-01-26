"use client";

import Image from "next/image";
import { Photo } from "@/types/photo.types";
import { useState } from "react";
import { motion } from "framer-motion";
import LocationPinIcon from "@/components/icons/LocationPinIcon";
import { Star } from "lucide-react";

interface GalleryItemProps {
  photo: Photo;
  showFeaturedBadge: boolean;
  onClick: () => void;
  variant?: "masonry" | "grid";
  index?: number;
}

const GalleryItem = ({
  photo,
  showFeaturedBadge,
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
        className={`relative overflow-hidden rounded-xl bg-component-beige ${
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
              className="absolute inset-0 bg-gradient-to-br from-accent to-component-beige animate-pulse"
              style={{ aspectRatio: photo.aspect_ratio }}
            />
          )}
        </div>

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5"
        >
          <div
            
          
          >
            <h3 className="text-lg font-syne text-white font-semibold mb-2 tracking-wide">
              {photo.title}
            </h3>
            {photo.location_city && (
              <p className="text-sm font-inter text-white/80 flex items-center gap-2 mb-2">
                <LocationPinIcon className="w-4 h-4 text-accent-gold" />
                {photo.location_city}, {photo.location_country}
              </p>
            )}
            {photo.description && (
              <p className="text-xs font-inter text-white/70 line-clamp-2 leading-relaxed">
                {photo.description}
              </p>
            )}
          </div>
        </div>

        {/* Featured Badge - Elegant Gold Pill */}
        {photo.featured && showFeaturedBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-3 right-3 bg-accent-gold/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
          >
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-[10px] font-inter text-white font-semibold tracking-wider uppercase">
              Featured
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GalleryItem;
