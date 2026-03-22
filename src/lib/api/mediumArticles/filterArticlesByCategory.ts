/**
 * Filter MediumArticle[] using keyword rules from mediumArticleFilterConfig.
 */

import type { MediumArticle } from './types';
import { getFilterRule } from './mediumArticleFilterConfig';

/**
 * @param categorySlug - e.g. 'web', 'ai', or 'all'
 */
export function filterArticlesByCategory(
  articles: MediumArticle[],
  categorySlug: string
): MediumArticle[] {
  if (!categorySlug || categorySlug === 'all') {
    return articles;
  }

  const rule = getFilterRule(categorySlug);
  const keywords = rule?.keywords ?? [categorySlug.toLowerCase()];
  const matchInText = rule?.matchInText ?? true;

  return articles.filter((article) =>
    keywords.some((keyword) => {
      const keywordLower = keyword.toLowerCase();

      const matchesCategory = article.categories.some((cat) =>
        cat.toLowerCase().includes(keywordLower)
      );

      if (matchesCategory) return true;

      if (matchInText) {
        const matchesTitle = article.title.toLowerCase().includes(keywordLower);
        const matchesDescription = article.description.toLowerCase().includes(keywordLower);
        return matchesTitle || matchesDescription;
      }

      return false;
    })
  );
}
