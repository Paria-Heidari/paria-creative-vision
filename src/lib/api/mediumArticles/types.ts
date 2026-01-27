/**
 * Article Types
 *
 * Type definitions for Medium articles fetched via RSS.
 */

export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  description: string;
  categories: string[];
  guid: string;
}

export interface RSS2JSONResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: RSS2JSONItem[];
}

export interface RSS2JSONItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}
