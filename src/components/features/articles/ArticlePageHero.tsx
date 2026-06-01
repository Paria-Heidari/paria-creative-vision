'use client';

import { motion } from 'framer-motion';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { DecorativeLine } from '@/components/ui/DecorativeLine';
import { cn } from '@/lib/utils/utils';

export interface ArticlePageHeroProps {
  title: string;
  heading: string;
  content: string;
  className?: string;
}

const ArticlePageHero = ({
  title,
  heading,
  content,
  className,
}: ArticlePageHeroProps) => {
  return (
    <section className={cn(className, 'mb-16 pt-28 md:mb-24 lg:mb-32')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack
          direction="vertical"
          gap={{ base: 4, md: 6 }}
          align="center"
          className="mb-12 text-center"
        >
          <DecorativeLine />
          <Typography
            variant="leadSmall"
            as="p"
            className="text-foreground-subtle tracking-widest uppercase"
          >
            {title}
          </Typography>
          <Typography variant="h2" as="h1" className="font-syne">
            {heading}
          </Typography>
          <Typography
            variant="lead"
            as="p"
            className="text-foreground-muted max-w-2xl"
          >
            {content}
          </Typography>
        </Stack>
      </motion.div>
    </section>
  );
};

export default ArticlePageHero;
