'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';

const ArticlePageHero = () => {
    return (
        <section className="pt-24 pb-12">
          <Container maxWidth="xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Stack direction="vertical" gap={4} align="center" className="text-center mb-12">
                <div className="w-12 h-1 bg-accent-gold rounded-full" />
                <Typography variant="h1" as="h1" className="font-syne">
                  Articles
                </Typography>
                <Typography variant="paragraph" as="p" className="text-foreground-muted max-w-2xl">
                  Thoughts on code, web development, and the creative journey
                </Typography>
              </Stack>
            </motion.div>
          </Container>
        </section>
    );
};

export default ArticlePageHero;