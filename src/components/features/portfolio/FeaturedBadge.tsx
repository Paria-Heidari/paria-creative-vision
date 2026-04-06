import { Typography } from '@/components/ui/Typography';
import { Photo } from '@/types/photo.types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface FeaturedBadgeProps {
  photo: Photo;
  featuredBadgeLabel: string;
}

export default function FeaturedBadge({
  photo,
  featuredBadgeLabel,
}: FeaturedBadgeProps) {
  if (!photo.featured) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-accent-gold/95 absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-sm"
    >
      <Star className="h-3 w-3 fill-white text-white" />
      <Typography
        variant="caption"
        as="p"
        className="font-semibold tracking-wider text-white uppercase"
      >
        {featuredBadgeLabel}
      </Typography>
    </motion.div>
  );
}
