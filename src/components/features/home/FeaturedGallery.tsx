'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GalleryItem from '@/components/features/portfolio/GalleryItem';
import Lightbox from '@/components/features/portfolio/Lightbox';
import { ArrowRight } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import { Photo } from '@/types/photo.types';
import { ROUTES } from '@/data/routes';
import { Stack } from '@/components/layout/Stack';
import { Grid, GridItem } from '@/components/layout/Grid';
import { featuredGalleryInfo } from '@/data/staticData';

interface FeaturedGalleryProps {
  featuredPhotos: Photo[];
}

const FeaturedGallery = ({ featuredPhotos }: FeaturedGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Stack direction="vertical" gap={{ base: 8, md: 12 }}>
          <div className="bg-accent-gold h-[2px] w-12" />
          <Stack
            direction="horizontal"
            gap={{ base: 3, md: 4 }}
            justify="between"
            items="end"
          >
            <Stack direction="vertical" gap={{ base: 4, md: 6 }}>
              <Typography variant="h2" as="h2">
                {featuredGalleryInfo.title}
              </Typography>
              <Typography
                variant="lead"
                as="p"
                className="text-foreground-muted"
              >
                {featuredGalleryInfo.subTitle}
              </Typography>
            </Stack>
            <Link
              href={ROUTES.portfolio}
              className="hover:text-accent-gold group hidden items-end gap-2 text-lg font-medium transition-colors md:flex"
            >
              <Typography
                variant="paragraphSmall"
                as="span"
                className="text-foreground-muted"
              >
                {featuredGalleryInfo.viewAllLink}
              </Typography>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Stack>
          <Grid gap={6} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPhotos.map((photo, index) => (
              <GridItem key={photo.id}>
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="aspect-[3/4]"
                >
                  <GalleryItem
                    photo={photo}
                    onClick={() => setSelectedPhoto(photo)}
                    showFeaturedBadge={false}
                    variant="grid"
                    index={index}
                  />
                </motion.div>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-center md:hidden"
      >
        <Link
          href={ROUTES.portfolio}
          className="text-foreground hover:text-accent-gold group inline-flex items-center gap-2 text-lg font-medium transition-colors"
        >
          <Typography variant="paragraphSmall">
            {featuredGalleryInfo.viewAllLink}
          </Typography>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Lightbox */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={featuredPhotos}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </section>
  );
};

export default FeaturedGallery;
