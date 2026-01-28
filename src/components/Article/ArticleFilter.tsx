'use client';

import { Brain, Code, Newspaper } from "lucide-react";
import Button from "../Button/Button";
import { motion } from 'framer-motion';
import { useState } from "react";
import { filterArticlesByCategory, MediumArticle } from "@/lib/api/mediumArticles";
import ArticleGrid from "./ArticleGrid";
import CtaMedium from "./CtaMedium";

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
    }
]

interface ArticleFilterProps {
    initialArticles: MediumArticle[];
    mediumUsername: string;
}

const ArticleFilter = ({ initialArticles, mediumUsername }: ArticleFilterProps) => {

    const [activeCategory, setActiveCategory] = useState('all');

    const filteredArticles = filterArticlesByCategory(initialArticles, activeCategory);

  return (
    <section className="pb-20 px-6 sm:px-8">
    <div className="max-w-6xl mx-auto">
    <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-20"
          >
    { categories.map(( category ) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;

        return (
        <Button
          key={category.id}
          variant={isActive ? "gold" : "secondary"}
          size="sm"
          onClick={() => setActiveCategory(category.id)}
          className={!isActive ? "bg-white/80 border-foreground/10 hover:border-accent-gold hover:text-accent-gold hover:bg-white/90" : ""}
        >
          <Icon className="w-4 h-4" />
          {category.label}
        </Button>
    );
    })}
    </motion.div>
    <ArticleGrid articles={filteredArticles} />
    <CtaMedium mediumUsername={mediumUsername} />
    </div>
    </section>
    );
};

export default ArticleFilter;
