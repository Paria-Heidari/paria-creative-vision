import { formatDate, MediumArticle } from '@/lib/api/mediumArticles';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';

interface ArticleListProps {
  articles: MediumArticle[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul className="mt-10 md:mt-20">
      {articles.map((article, index) => (
        <li key={article.guid}>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group"
          >
            {index > 0 && (
              <Divider
                orientation="horizontal"
                weight="thin"
                className="my-8 md:my-12"
              />
            )}
            <Link href={article.link} target="_blank">
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
        </li>
      ))}
    </ul>
  );
}
