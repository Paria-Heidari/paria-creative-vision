import { AnimatePresence, motion } from 'framer-motion';
import { MediumArticle } from '@/lib/api/mediumArticles';
import ArticleCard from './ArticleCard';
import { Newspaper } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import { Grid, GridItem } from '@/components/layout/Grid';
import { cn } from '@/lib/utils/utils';

interface ArticleGridProps {
  articles: MediumArticle[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  const lastIndex = articles.length - 1;
  const lastIn2Col = articles.length % 2 === 1;
  const lastIn3Col = articles.length % 3 === 1;

  return (
    <AnimatePresence mode="wait">
      {articles.length > 0 && (
        <motion.div
          key="articles-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <Grid
            gap={8}
            className="w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article, index) => {
              const isLast = index === lastIndex;
              return (
                <GridItem
                  key={article.guid}
                  rowSpan={1}
                  colSpan={1}
                  className={cn(
                    isLast &&
                      lastIn2Col &&
                      'sm:col-span-2 sm:flex sm:w-full sm:justify-center',
                    isLast && lastIn3Col && 'lg:col-span-1 lg:col-start-2',
                  )}
                >
                  <ArticleCard article={article} index={index} />
                </GridItem>
              );
            })}
          </Grid>
        </motion.div>
      )}
      {articles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center"
        >
          <Newspaper
            className="text-foreground-muted/30 mx-auto mb-4 h-16 w-16"
            aria-hidden="true"
          />
          <Typography
            variant="h4"
            as="h2"
            className="text-foreground-muted mb-2"
          >
            No articles found
          </Typography>
          <Typography
            variant="paragraph"
            as="p"
            className="text-foreground-muted"
          >
            Try selecting a different category
          </Typography>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
