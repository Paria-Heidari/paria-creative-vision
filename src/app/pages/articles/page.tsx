import { getMediumArticles } from '@/lib/api/mediumArticles/index';
import { ArticleFilter, ArticlePageHero } from '@/components/Article';

const mediumUsername = process.env.MEDIUM_USERNAME as string;

// Server component that fetches articles
export default async function Articles() {
  const articles = await getMediumArticles(mediumUsername);

  return (
  <main className="min-h-screen bg-background">
    <ArticlePageHero />
    <ArticleFilter initialArticles={articles} mediumUsername={mediumUsername} />
  </main>
  );

}
