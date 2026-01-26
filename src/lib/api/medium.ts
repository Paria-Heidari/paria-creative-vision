// Medium RSS feed integration
// Using RSS2JSON service to convert Medium RSS to JSON

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

interface RSS2JSONResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    categories: string[];
  }[];
}

// Extract first image from HTML content if no thumbnail
function extractImageFromContent(content: string): string {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : '/images/article-placeholder.jpg';
}

// Clean HTML from description
function cleanDescription(html: string): string {
  // Remove HTML tags and decode entities
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();

  // Limit to ~150 characters
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
}

// Calculate read time from content
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Fetch articles from Medium RSS feed
export async function getMediumArticles(username: string): Promise<MediumArticle[]> {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Medium articles');
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
      guid: item.guid
    }));
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}

// Get articles by category (client-side filtering)
export function filterArticlesByCategory(
  articles: MediumArticle[],
  category: string
): MediumArticle[] {
  if (category === 'all') return articles;

  const categoryLower = category.toLowerCase();
  const keywordMap: Record<string, { keywords: string[]; matchInText: boolean }> = {
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
      matchInText: true
    },
    ai: {
      keywords: ['ai', 'gemini', 'claude', 'llm', 'agency', 'grok', 'openai'],
      matchInText: false
    }
  };
  const categoryConfig = keywordMap[categoryLower];
  const keywords = (categoryConfig?.keywords ?? [categoryLower]).map(
    (keyword) => keyword.toLowerCase()
  );

  return articles.filter((article) =>
    keywords.some((keyword) =>
      article.categories.some((cat) =>
        cat.toLowerCase().includes(keyword)
      ) ||
      (categoryConfig?.matchInText ?? true) &&
        (article.title.toLowerCase().includes(keyword) ||
          article.description.toLowerCase().includes(keyword))
    )
  );
}