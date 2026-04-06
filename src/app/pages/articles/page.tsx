import { getMediumArticles } from '@/lib/api/mediumArticles/index';
import { ArticleFilter, ArticlePageHero, CtaMedium } from '@/components/features/articles';
import { Container } from '@/components/layout/Container';

const mediumUsername = process.env.MEDIUM_USERNAME as string;

// Server component that fetches articles
export default async function Articles() {
  const articles = await getMediumArticles(mediumUsername);

  return (
    <>
      <ArticlePageHero />
      <Container maxWidth="xl">
        <ArticleFilter initialArticles={articles} />
        {articles.length > 0 && <CtaMedium mediumUsername={mediumUsername} className="my-5 md:my-10"/>}
      </Container>
    </>
  );
}
