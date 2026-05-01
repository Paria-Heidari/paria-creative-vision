'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  initialCategory?: string;
}

const ArticleFilter = ({
  initialArticles,
  initialCategory,
}: ArticleFilterProps) => {
  const [activeCategory, setActiveCategory] = useState(
    initialCategory || 'all',
  );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filteredArticles = filterArticlesByCategory(
    initialArticles,
    activeCategory,
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);

    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <section className="px-6 pb-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-20 grid w-full max-w-2xl grid-cols-1 gap-3 sm:mx-auto sm:grid-cols-3"
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
                startIcon={<Icon className="h-4 w-4 shrink-0" />}
                onClick={() => handleCategoryChange(category.id)}
                className={
                  !isActive
                    ? 'border-foreground/10 hover:border-accent-gold hover:text-accent-gold w-full bg-white/80 hover:bg-white/90'
                    : 'w-full'
                }
              />
            );
          })}
        </motion.div>
        <ArticleGrid articles={filteredArticles} />
      </div>
    </section>
  );
};

export default ArticleFilter;
