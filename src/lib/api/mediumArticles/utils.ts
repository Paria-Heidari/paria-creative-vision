/**
 * Article Utilities
 *
 * Helper functions for processing Medium articles.
 */

/**
 * Extract first image from HTML content
 * Used as fallback when article has no thumbnail
 */
export function extractImageFromContent(content: string): string {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : '/images/article-placeholder.jpg';
}

/**
 * Clean HTML tags and entities from description
 * Returns plain text limited to ~150 characters
 */
export function cleanDescription(html: string): string {
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();

  return text.length > 150 ? text.substring(0, 150) + '...' : text;
}

/**
 * Calculate estimated read time from content
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

/**
 * Format date string to readable format
 * e.g., "January 15, 2024"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date to relative time
 * e.g., "2 days ago", "3 weeks ago"
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}