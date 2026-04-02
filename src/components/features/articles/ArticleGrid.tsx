import { AnimatePresence, motion } from 'framer-motion';
import { MediumArticle } from '@/lib/api/mediumArticles';
import ArticleCard from './ArticleCard';
import { Newspaper } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';

interface ArticleGridProps {
    articles: MediumArticle[];
}

const ArticleGrid = ({articles}:ArticleGridProps) => {
  return (
     <AnimatePresence mode="wait">
        {articles.length > 0 ? (
            <motion.div
              key="articles-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {articles.map((article, index) => (
                    <ArticleCard key={article.guid} article={article} index={index} />
                ))}
            </motion.div>
) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
        <Newspaper className="w-16 h-16 text-foreground-muted/30 mx-auto mb-4" />
        <Typography variant="h3" as="h3" className="text-foreground-muted">No articles found</Typography>
        <Typography variant="lead" as="p" className="text-foreground-muted">
          Try selecting a different category
        </Typography>
    </motion.div>
    
)}
    </AnimatePresence>
);
};

export default ArticleGrid;
