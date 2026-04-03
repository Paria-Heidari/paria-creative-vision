import { AnimatePresence, motion } from 'framer-motion';
import { MediumArticle } from '@/lib/api/mediumArticles';
import ArticleCard from './ArticleCard';
import { Newspaper } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';

interface ArticleGridProps {
  articles: MediumArticle[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  return (
    <AnimatePresence mode="wait">
      {articles.length > 0 ? (
        <motion.div
          key="articles-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article, index) => (
            <ArticleCard key={article.guid} article={article} index={index} />
          ))}
        </motion.div>
      ) : (
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
};

export default ArticleGrid;
