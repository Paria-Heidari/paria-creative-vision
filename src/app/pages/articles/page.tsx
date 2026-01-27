import { getMediumArticles } from '@/lib/api/medium';
import ArticlesClient from './ArticlesClient';

const mediumUsername = process.env.MEDIUM_USERNAME as string;

// Server component that fetches articles
export default async function Articles() {
  const articles = await getMediumArticles(mediumUsername);

  return <ArticlesClient initialArticles={articles} />;
}
