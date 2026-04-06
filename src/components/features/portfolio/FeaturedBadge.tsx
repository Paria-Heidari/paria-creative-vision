import { Typography } from '@/components/ui/Typography';
import { Photo } from '@/types/photo.types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';


interface FeaturedBadgeProps {
    photo: Photo;
    featuredBadgeLabel: string;
}

export default function FeaturedBadge({ photo, featuredBadgeLabel }: FeaturedBadgeProps) {
  if (!photo.featured) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="absolute top-3 right-3 bg-accent-gold/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
    >
      <Star className="w-3 h-3 text-white fill-white" />
      <Typography variant="caption" as="p" className="text-white font-semibold tracking-wider uppercase">
        {featuredBadgeLabel}
      </Typography>
    </motion.div>
  )
}
