'use client';

import { MediumArticle, formatDate } from '@/lib/api/mediumArticles';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { ROUTES } from '@/data/routes';
import { TextBlock } from '@/components/ui/TextBlock';
import { latestArticlesInfo } from '@/data/staticData';
import { Stack } from '@/components/layout/Stack';

interface LatestArticlesProps {
  articles: MediumArticle[];
}

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  // Show only the 3 most recent articles
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="border-foreground/10 border-t pt-10 md:pt-14">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TextBlock
          title={latestArticlesInfo.title}
          content={latestArticlesInfo.content}
        />
      </motion.div>

      {/* Articles List - Typography-Focused */}
      <Stack direction="vertical" gap={0} className="mt-20">
        {latestArticles.map((article, index) => {
          return (
            <motion.article
              key={article.guid}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={cn(
                'group',
                index > 0 &&
                  'border-foreground/10 mt-12 border-t pt-12 md:mt-16 md:pt-16',
              )}
            >
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-6"
              >
                <Stack direction="vertical" gap={{ base: 6, md: 4 }}>
                  {/* Meta Info */}
                  <Stack direction="horizontal" gap={{ base: 2, md: 4 }}>
                    <Typography
                      variant="caption"
                      as="span"
                      className="text-foreground-subtle flex items-center gap-2 tracking-wider uppercase"
                    >
                      <Calendar className="h-4 w-4" aria-hidden />
                      {formatDate(article.pubDate)}
                    </Typography>
                    <span
                      className="bg-accent-gold h-1 w-1 rounded-full"
                      aria-hidden
                    />
                    <Typography
                      variant="caption"
                      as="span"
                      className="text-foreground-subtle flex items-center gap-2 tracking-wider uppercase"
                    >
                      <Clock className="h-4 w-4" aria-hidden />
                      {article.readTime} min read
                    </Typography>
                  </Stack>
                  {/* Title */}
                  <Typography
                    variant="h4"
                    as="h3"
                    className="group-hover:text-accent-gold transition-colors duration-300"
                  >
                    {article.title}
                  </Typography>

                  {/* Description - Always visible */}
                  <Typography
                    variant="paragraph"
                    as="p"
                    className="text-foreground-muted max-w-3xl"
                  >
                    {article.description}
                  </Typography>

                  {/* Categories */}
                  {article.categories && article.categories.length > 0 && (
                    <Stack direction="horizontal" gap={{ base: 2, md: 4 }}>
                      {article.categories.slice(0, 3).map((category, i) => (
                        <Typography
                          key={i}
                          variant="caption"
                          as="span"
                          className="bg-accent-gold/30 text-foreground-subtle rounded-full px-3 py-1 font-semibold tracking-widest"
                        >
                          {category}
                        </Typography>
                      ))}
                    </Stack>
                  )}

                  {/* Read More Arrow */}
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="text-accent-gold flex items-center font-medium transition-all duration-300 group-hover:gap-3"
                  >
                    <Typography
                      variant="paragraph"
                      as="span"
                      className="tracking-wide text-inherit"
                    >
                      Read Full Article
                    </Typography>
                    <ArrowRight
                      className="h-5 w-5 transition-transform"
                      aria-hidden
                    />
                  </Stack>
                </Stack>
              </Link>
            </motion.article>
          );
        })}
      </Stack>
      

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Link
          href={ROUTES.articles}
          className="text-foreground hover:text-accent-gold group border-foreground/30 hover:border-accent-gold inline-flex items-center gap-3 border-b pb-1 font-medium transition-colors"
        >
          <Typography variant="navLink" as="span">
            Explore All Articles
          </Typography>
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-2"
            aria-hidden
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default LatestArticles;
