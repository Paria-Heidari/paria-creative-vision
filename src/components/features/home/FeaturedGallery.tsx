'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Photo } from '@/types/photo.types';
import { LinkData } from '@/types/ui.types';
import { Stack } from '@/components/layout/Stack';
import { Grid, GridItem } from '@/components/layout/Grid';
import { CtaLink } from '@/components/ui/CtaLink';
import GalleryItem from '@/components/features/portfolio/GalleryItem';
import Lightbox from '@/components/features/portfolio/Lightbox';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface GalleryInfoProps {
  title: string;
  subTitle: string;
  featuredBadgeLabel: string;
  ctaLink: LinkData;
}

interface FeaturedGalleryProps {
  featuredGalleryInfo: GalleryInfoProps;
  featuredPhotos: Photo[];
  className?: string;
}

const FeaturedGallery = ({
  featuredPhotos,
  featuredGalleryInfo,
}: FeaturedGalleryProps) => {
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
          <SectionHeader
            title={featuredGalleryInfo.title}
            subTitle={featuredGalleryInfo.subTitle}
            ctaLink={featuredGalleryInfo.ctaLink}
          />
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
                    featuredBadgeLabel={featuredGalleryInfo.featuredBadgeLabel}
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
        <CtaLink {...featuredGalleryInfo.ctaLink} variant="centered" />
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
