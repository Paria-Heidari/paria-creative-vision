'use client';

import { MediumArticle, formatDate } from '@/lib/api/mediumArticles';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LatestArticlesProps {
  articles: MediumArticle[];
}

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  // Show only the 3 most recent articles
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="py-24 px-6 sm:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="w-12 h-[2px] bg-accent-gold mx-auto mb-6"></div>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Latest Insights
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            Exploring the intersection of code and creativity. From web development techniques to AI innovations, I share practical insights and reflections on building digital experiences.
          </p>
          <p className="text-foreground-subtle text-base max-w-xl mx-auto">
            Each article is a deep dive into topics that fascinate me—written for developers, and curious minds.
          </p>
        </motion.div>

        {/* Articles List - Typography-Focused */}
        <div className="space-y-0">
          {latestArticles.map((article, index) => {
            const isLast = index === latestArticles.length - 1;

            return (
              <motion.article
                key={article.guid}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <Link
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-12 relative"
                >
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-foreground-subtle mb-4 font-medium tracking-wider uppercase">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.pubDate)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-accent-gold"></span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-syne text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight group-hover:text-accent-gold transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Description - Always visible */}
                  <p className="text-foreground-muted text-base leading-relaxed mb-5 max-w-3xl">
                    {article.description}
                  </p>

                  {/* Categories */}
                  {article.categories && article.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {article.categories.slice(0, 3).map((category, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full font-medium tracking-wide"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Arrow */}
                  <div className="flex items-center gap-2 text-base font-medium text-accent-gold group-hover:gap-3 transition-all duration-300">
                    <span className="tracking-wide">Read Full Article</span>
                    <ArrowRight className="w-5 h-5 transition-transform" />
                  </div>
                </Link>

                {/* Gold Divider Line */}
                {!isLast && (
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent"></div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/pages/articles"
            className="inline-flex items-center gap-3 text-base font-medium text-foreground hover:text-accent-gold transition-colors group border-b border-foreground/20 hover:border-accent-gold pb-1"
          >
            <span className="tracking-wider uppercase">Explore All Articles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;
