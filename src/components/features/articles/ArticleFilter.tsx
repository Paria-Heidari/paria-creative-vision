'use client';

import { Brain, Code, Newspaper } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  filterArticlesByCategory,
  MediumArticle,
} from '@/lib/api/mediumArticles';
import ArticleGrid from './ArticleGrid';

const categories = [
  {
    id: 'all',
    label: 'All Articles',
    icon: Newspaper,
  },
  {
    id: 'web',
    label: 'Web Dev',
    icon: Code,
  },
  {
    id: 'ai',
    label: 'AI',
    icon: Brain,
  },
];

interface ArticleFilterProps {
  initialArticles: MediumArticle[];
}

const ArticleFilter = ({
  initialArticles,
}: ArticleFilterProps) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = filterArticlesByCategory(
    initialArticles,
    activeCategory,
  );

  return (
    <section className="px-6 pb-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-20 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <Button
                key={category.id}
                variant={isActive ? 'gold' : 'secondary'}
                size="sm"
                btnText={category.label}
                btnTextVariant="paragraphSmall"
                startIcon={<Icon className="h-4 w-4" />}
                onClick={() => setActiveCategory(category.id)}
                className={
                  !isActive
                    ? 'border-foreground/10 hover:border-accent-gold hover:text-accent-gold bg-white/80 hover:bg-white/90'
                    : ''
                }
              >
                {category.label}
              </Button>
            );
          })}
        </motion.div>
        <ArticleGrid articles={filteredArticles} />
      </div>
    </section>
  );
};

export default ArticleFilter;
