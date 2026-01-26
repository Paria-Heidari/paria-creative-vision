'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Code, Newspaper } from 'lucide-react';
import { MediumArticle, formatDate, calculateReadTime, filterArticlesByCategory } from '@/lib/api/medium';

interface ArticlesClientProps {
  initialArticles: MediumArticle[];
}

const categories = [
  { id: 'all', label: 'All Articles', icon: Newspaper },
  { id: 'web', label: 'Web Dev', icon: Code },
  { id: 'AI', label: 'AI', icon: Code },
];

// Sample articles for when Medium feed is not available
const sampleArticles: MediumArticle[] = [
  {
    title: 'Building Modern Web Applications with Next.js 15',
    link: '#',
    pubDate: new Date().toISOString(),
    author: 'Paria',
    thumbnail: '/images/article-placeholder.jpg',
    description: 'Exploring the latest features in Next.js 15 and how to leverage them for building performant web applications...',
    categories: ['tech', 'nextjs', 'react'],
    guid: '1'
  },
  {
    title: 'Capturing the Perfect Golden Hour: A Photography Guide',
    link: '#',
    pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Paria',
    thumbnail: '/images/article-placeholder.jpg',
    description: 'Tips and techniques for making the most of the magical golden hour lighting in your landscape photography...',
    categories: ['photography', 'landscape', 'tips'],
    guid: '2'
  },
  {
    title: 'TypeScript Best Practices in 2025',
    link: '#',
    pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Paria',
    thumbnail: '/images/article-placeholder.jpg',
    description: 'A comprehensive guide to writing clean, maintainable TypeScript code with the latest patterns and practices...',
    categories: ['tech', 'typescript', 'programming'],
    guid: '3'
  },
  {
    title: 'Street Photography in European Cities',
    link: '#',
    pubDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Paria',
    thumbnail: '/images/article-placeholder.jpg',
    description: 'Discovering the art of street photography while wandering through the historic streets of Europe...',
    categories: ['photography', 'street', 'travel'],
    guid: '4'
  },
];

export default function ArticlesClient({ initialArticles }: ArticlesClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Use sample articles if no Medium articles are available
  const articles = initialArticles.length > 0 ? initialArticles : sampleArticles;
  const filteredArticles = filterArticlesByCategory(articles, activeCategory);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-12 h-1 bg-accent-gold mx-auto mb-6 rounded-full" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold text-foreground mb-4">
              Articles
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Thoughts on code, web development, and the creative journey
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300
                    ${isActive
                      ? 'bg-accent-gold text-white shadow-lg'
                      : 'bg-white/80 text-foreground border border-foreground/10 hover:border-accent-gold hover:text-accent-gold'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredArticles.map((article, index) => (
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
                <h3 className="text-xl font-syne text-foreground mb-2">No articles found</h3>
                <p className="text-foreground-muted">
                  Try selecting a different category
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Medium CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-foreground-muted mb-4">
              Read more articles on Medium
            </p>
            <Link
              href="https://medium.com/@paria-heidari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground/20 text-foreground rounded-full font-medium hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
            >
              <span>View on Medium</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Article Card Component
function ArticleCard({ article, index }: { article: MediumArticle; index: number }) {
  const readTime = calculateReadTime(article.description);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-contain transition-opacity duration-300 group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-lg font-syne font-bold text-foreground mb-3 line-clamp-2 group-hover:text-accent-gold transition-colors duration-300">
            {article.title}
          </h2>
          <p className="text-sm text-foreground-muted mb-4 line-clamp-2 leading-relaxed">
            {article.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-foreground-subtle">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.pubDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readTime} min read
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
