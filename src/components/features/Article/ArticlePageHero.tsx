'use client';

import { motion } from 'framer-motion';

const ArticlePageHero = () => {
    return (
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
        </div>
      </section>

    );
};

export default ArticlePageHero;