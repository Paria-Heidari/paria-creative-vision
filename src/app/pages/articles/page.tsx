import { getMediumArticles } from '@/lib/api/medium';
import ArticlesClient from './ArticlesClient';

// Server component that fetches articles
export default async function Articles() {
  const articles = await getMediumArticles('paria-heidari');

  return <ArticlesClient initialArticles={articles} />;
}
