/**
 * Filter MediumArticle[] using keyword rules from mediumArticleFilterConfig.
 */

import type { MediumArticle } from '@/lib/api/mediumArticles/types';
import { getFilterRule } from '@/lib/api/mediumArticles/mediumArticleFilterConfig';

/**
 * @param categorySlug - e.g. 'web', 'ai', or 'all'
 */

export function filterArticlesByCategory(
  articles: MediumArticle[],
  categorySlug: string,
): MediumArticle[] {
  if (!categorySlug || categorySlug === 'all') {
    return articles;
  }
  const rule = getFilterRule(categorySlug);
  const keywords = rule?.keywords ?? [categorySlug.toLowerCase()];
  const matchInText = rule?.matchInText ?? true;

  const matchesKeyword = (article: MediumArticle, keyword: string) => {
    const keyW = keyword.toLowerCase();
    const inCategory = article.categories.some((catg) =>
      catg.toLowerCase().includes(keyW),
    );
    if (inCategory) return true;
    if (!matchInText) return false;

    const title = article.title.toLowerCase();
    const description = article.description.toLowerCase();

    const hasMatch = title.includes(keyW) || description.includes(keyW);

    return hasMatch;
  };

  return articles.filter((article) =>
    keywords.some((keyword) => matchesKeyword(article, keyword)),
  );
}
