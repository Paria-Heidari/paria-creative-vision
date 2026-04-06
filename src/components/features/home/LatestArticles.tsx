'use client';

import { MediumArticle } from '@/lib/api/mediumArticles';
import { motion } from 'framer-motion';
import { TextBlock } from '@/components/ui/TextBlock';
import { latestArticlesInfo } from '@/data/staticData';
import { Divider } from '@/components/ui/Divider';
import { ArticleList } from '@/components/features/articles';
import { CtaLink } from '@/components/ui/CtaLink';

interface LatestArticlesProps {
  articles: MediumArticle[];
}

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  // Show only the 3 most recent articles
  const latestArticles = articles.slice(0, 3);
  return (
    <section className="space-y-10">
      <Divider orientation="horizontal" weight="medium" />
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
      <ArticleList articles={latestArticles} />

      {/* View All Art */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-14 text-center md:mt-20"
      >
        <CtaLink {...latestArticlesInfo.ctaLink} variant="underline" />
      </motion.div>
    </section>
  );
};

export default LatestArticles;
