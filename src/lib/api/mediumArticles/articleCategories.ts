/**
 * Article Category Configuration
 *
 * Defines categories for filtering Medium articles.
 * Each category has keywords that are matched against article tags, titles, and descriptions.
 */

export interface ArticleCategoryConfig {
  name: string;
  slug: string;
  keywords: string[];
  matchInText: boolean; // Also search in title/description?
}

export const ARTICLE_CATEGORIES: Record<string, ArticleCategoryConfig> = {
  web: {
    name: 'Web Development',
    slug: 'web',
    keywords: [
      'programming',
      'software architecture',
      'frontend',
      'micro frontends',
      'backend',
      'fullstack',
      'tech',
      'typescript',
      'javascript',
      'react',
      'react microfrontends',
      'nextjs',
      'azure',
      'nodejs',
      'express',
      'mongodb',
      'postgresql',
      'supabase',
      'tailwindcss',
      'google cloud',
      'cloud',
      'web development',
    ],
    matchInText: true,
  },
  ai: {
    name: 'AI',
    slug: 'ai',
    keywords: [
      'ai',
      'gemini',
      'claude',
      'llm',
      'agency',
      'grok',
      'openai',
      'machine learning',
      'artificial intelligence',
      'chatgpt',
      'deep learning',
      'neural network',
    ],
    matchInText: false,
  },
};

// Get all category slugs
export const CATEGORY_SLUGS = Object.keys(ARTICLE_CATEGORIES) as Array<
  keyof typeof ARTICLE_CATEGORIES
>;

// Get category config by slug
export function getCategoryConfig(slug: string): ArticleCategoryConfig | undefined {
  return ARTICLE_CATEGORIES[slug.toLowerCase()];
}

// Get all categories as array
export function getAllArticleCategories(): ArticleCategoryConfig[] {
  return Object.values(ARTICLE_CATEGORIES);
}
