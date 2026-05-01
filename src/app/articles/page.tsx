import { getMediumArticles } from '@/lib/api/mediumArticles/index';
import {
  ArticleFilter,
  ArticlePageHero,
  CtaMedium,
} from '@/components/features/articles';
import { Container } from '@/components/layout/Container';
import { articlesPageHeroData } from '@/data/staticData';

const mediumUsername = process.env.MEDIUM_USERNAME as string;

interface ArticlesPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

// Server component that fetches articles
export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const { category } = await searchParams;
  const articles = await getMediumArticles(mediumUsername);

  return (
    <>
      <ArticlePageHero {...articlesPageHeroData} />
      <Container maxWidth="xl">
        <ArticleFilter initialArticles={articles} initialCategory={category} />
        {articles.length > 0 && (
          <CtaMedium
            mediumUsername={mediumUsername}
            className="my-5 md:my-10"
          />
        )}
      </Container>
    </>
  );
}
