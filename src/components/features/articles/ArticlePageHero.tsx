'use client';

import { motion } from 'framer-motion';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { articlesPageHeroInfo } from '@/data/staticData';

const ArticlePageHero = () => {
    return (
        <section className="pt-28 b-12">
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
                <div className="bg-accent-gold h-1 w-12 rounded-full" />
                <Typography
                  variant="leadSmall"
                  as="p"
                  className="text-foreground-subtle tracking-widest uppercase"
                >
                  {articlesPageHeroInfo.title}
                </Typography>
                <Typography variant="h2" as="h1" className="font-syne">
                  {articlesPageHeroInfo.heading}
                </Typography>
                <Typography
                  variant="lead"
                  as="p"
                  className="text-foreground-muted max-w-2xl"
                >
                  {articlesPageHeroInfo.content}
                </Typography>
              </Stack>
            </motion.div>
        </section>
    );
};

export default ArticlePageHero;