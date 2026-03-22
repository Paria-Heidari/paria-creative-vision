/**
 * Fetch Medium user feed via RSS (through rss2json) and map to MediumArticle.
 */

import type { MediumArticle, RSS2JSONResponse } from './types';
import { extractImageFromContent, cleanDescription, calculateReadTime } from './utils';

/**
 * @param username - Medium username (without @)
 */
export async function getMediumArticles(username: string): Promise<MediumArticle[]> {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium articles: ${response.status}`);
    }

    const mediumArticles: RSS2JSONResponse = await response.json();

    if (mediumArticles.status !== 'ok') {
      throw new Error('RSS feed parsing failed');
    }

    return mediumArticles.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item.author,
      thumbnail: item.thumbnail || extractImageFromContent(item.content),
      description: cleanDescription(item.description),
      categories: item.categories || [],
      guid: item.guid,
      readTime: calculateReadTime(item.content),
    }));
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}
