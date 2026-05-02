import {
  ArticlePageHero,
  ArticleContent,
} from '@/components/features/articles';
import { Container } from '@/components/layout/Container';
import { articlesPageHeroData } from '@/data/staticData';
import { Loading } from '@/components/ui/Loading';
import { Suspense } from 'react';

interface ArticlesPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}
export default function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  return (
    <>
      <ArticlePageHero {...articlesPageHeroData} />
      <Container maxWidth="xl">
        <Suspense fallback={<Loading />}>
          <ArticleContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
