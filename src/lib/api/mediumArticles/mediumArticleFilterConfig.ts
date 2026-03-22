/**
 * Keyword rules for filterArticlesByCategory (slugs match ArticleFilter button ids).
 */

export interface MediumArticleFilterRule {
  keywords: string[];
  matchInText: boolean;
}

export const MEDIUM_ARTICLE_FILTERS: Record<string, MediumArticleFilterRule> = {
  web: {
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

export function getFilterRule(slug: string): MediumArticleFilterRule | undefined {
  return MEDIUM_ARTICLE_FILTERS[slug.toLowerCase()];
}
