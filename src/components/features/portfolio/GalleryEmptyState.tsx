import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import { Stack } from '@/components/layout/Stack';

export default function GalleryEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Stack
        direction="vertical"
        gap={{ base: 6, md: 8 }}
        align="center"
        justify="center"
      >
        <div className="bg-accent-gold/10 flex h-24 w-24 items-center justify-center rounded-full">
          <ImageOff className="text-accent-gold/60 h-12 w-12" />
        </div>
        <Typography variant="h4" as="h2">
          No Photos Found
        </Typography>
        <Typography
          variant="paragraph"
          as="p"
          className="text-foreground-muted max-w-md text-center"
        >
          Try selecting a different category or browse all photos to see the
          collection.
        </Typography>
      </Stack>
    </motion.div>
  );
}
