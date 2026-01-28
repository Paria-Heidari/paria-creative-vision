/**
 * Articles API
 *
 * Functions for fetching and filtering Medium articles via RSS.
 */

import type { MediumArticle, RSS2JSONResponse } from './types';
import { extractImageFromContent, cleanDescription } from './utils';
import { getCategoryConfig, ARTICLE_CATEGORIES } from '@/lib/api/mediumArticles/articleCategories';

// Re-export types and utils for convenience
export type { MediumArticle } from './types';
export {
  calculateReadTime,
  formatDate,
  formatRelativeDate,
  cleanDescription,
} from './utils';

/**
 * Fetch articles from Medium RSS feed
 *
 * @param username - Medium username (without @)
 * @returns Array of articles
 */
export async function getMediumArticles(username: string): Promise<MediumArticle[]> {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium articles: ${response.status}`);
    }

    const data: RSS2JSONResponse = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS feed parsing failed');
    }

    return data.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item.author,
      thumbnail: item.thumbnail || extractImageFromContent(item.content),
      description: cleanDescription(item.description),
      categories: item.categories || [],
      guid: item.guid,
    }));
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}

/**
 * Filter articles by category
 *
 * Uses keyword matching against article tags, titles, and descriptions.
 * Category configuration is defined in lib/config/articleCategories.ts
 *
 * @param articles - Array of articles to filter
 * @param categorySlug - Category slug (e.g., 'web', 'ai') or 'all'
 * @returns Filtered array of articles
 */
export function filterArticlesByCategory(
  articles: MediumArticle[],
  categorySlug: string
): MediumArticle[] {
  // Return all articles if no category or 'all'
  if (!categorySlug || categorySlug === 'all') {
    return articles;
  }

  const categoryConfig = getCategoryConfig(categorySlug);

  // If category not found, use slug as single keyword
  const keywords = categoryConfig?.keywords ?? [categorySlug.toLowerCase()];
  const matchInText = categoryConfig?.matchInText ?? true;

  return articles.filter((article) =>
    keywords.some((keyword) => {
      const keywordLower = keyword.toLowerCase();

      // Check article categories/tags
      const matchesCategory = article.categories.some((cat) =>
        cat.toLowerCase().includes(keywordLower)
      );

      if (matchesCategory) return true;

      // Check title and description if enabled
      if (matchInText) {
        const matchesTitle = article.title.toLowerCase().includes(keywordLower);
        const matchesDescription = article.description.toLowerCase().includes(keywordLower);
        return matchesTitle || matchesDescription;
      }

      return false;
    })
  );
}

/**
 * Get articles with optional category filtering
 *
 * Convenience function that combines fetching and filtering.
 *
 * @param username - Medium username
 * @param categorySlug - Optional category filter
 * @returns Filtered array of articles
 */
export async function getArticles(
  username: string,
  categorySlug?: string
): Promise<MediumArticle[]> {
  const articles = await getMediumArticles(username);

  if (categorySlug && categorySlug !== 'all') {
    return filterArticlesByCategory(articles, categorySlug);
  }

  return articles;
}

/**
 * Get available article categories
 *
 * Returns category configs for building filter UI.
 */
export function getArticleCategories() {
  return Object.values(ARTICLE_CATEGORIES);
}
