import { getMediumArticles } from '@/lib/api/mediumArticles';
import ArticleFilter from './ArticleFilter';
import CtaMedium from './CtaMedium';
const mediumUsername = process.env.MEDIUM_USERNAME as string;

interface ArticleContentProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ArticleContent({
  searchParams,
}: ArticleContentProps) {
  const { category = 'all' } = await searchParams;
  const articles = await getMediumArticles(mediumUsername);
  return (
    <>
      <ArticleFilter initialArticles={articles} initialCategory={category} />
      {articles.length > 0 && (
        <CtaMedium mediumUsername={mediumUsername} className="my-5 md:my-10" />
      )}
    </>
  );
}
