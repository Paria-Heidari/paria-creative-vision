import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import {
  getWorkProjectBySlug,
  getAllWorkProjectSlugs,
} from '@/lib/api/workProjects/workProjects';
import { routes as ROUTES } from '@/lib/routes/routes';
import {
  KeyDecisionsSection,
  SitePreviewSection,
  WorkDeepDiveSection,
  WorkItemPageHero,
  WorkItemSidebar,
} from '@/components/features/work/workItemPage';
import BackNavigationLink from '@/components/ui/BackNavigationLink/BackNavigationLink';
import { DecorativeLine } from '@/components/ui/DecorativeLine';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllWorkProjectSlugs();
  return projects.map(({ slug }) => ({ slug }));
}

const SectionLabel = ({ children }: { children: string }) => (
  <Stack direction="horizontal" gap={1} items="center">
    <Typography
      variant="paragraphSmall"
      as="span"
      className="text-accent-gold font-bold tracking-widest uppercase"
    >
      {children}
    </Typography>
    <DecorativeLine className="h-[2px] w-[89%] rounded-none" />
  </Stack>
);

async function WorkItemContent({ slug }: { slug: string }) {
  const project = await getWorkProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <section className="pt-28 pb-16 md:pb-20">
        <Container maxWidth="2xl">
          <Stack direction="vertical" gap={{ base: 10, md: 12 }}>
            <BackNavigationLink
              href={ROUTES.work}
              label="All Work"
              className={'text-foreground-muted hover:text-accent-gold'}
            />
            <WorkItemPageHero
              title={project.title}
              description={project.description}
              year={project.year}
              coverImage={project.cover_image}
            />
          </Stack>
        </Container>
      </section>

      <Container maxWidth="xl" className="py-16 md:py-20">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-24">
          <div className="lg:col-span-2">
            <Stack direction="vertical" gap={{ base: 12, md: 12 }}>
              <Stack direction="vertical" gap={{ base: 6, md: 12 }}>
                <SectionLabel>The Problem</SectionLabel>
                <blockquote className="border-l-accent-gold bg-surface-muted rounded-r-lg border-l-2 py-4 pr-4 pl-6">
                  <Typography
                    variant="paragraph"
                    as="p"
                    className="text-foreground-muted leading-relaxed italic"
                  >
                    {project.problem}
                  </Typography>
                </blockquote>
              </Stack>

              <Stack direction="vertical" gap={{ base: 8, md: 12 }}>
                <SectionLabel>Key Decisions</SectionLabel>
                {project.decisions.map((decision, index) => (
                  <KeyDecisionsSection
                    key={index}
                    title={decision.title}
                    description={decision.description}
                    index={index}
                  />
                ))}
              </Stack>

              {project.outcome && (
                <Stack direction="vertical" gap={{ base: 6, md: 12 }}>
                  <SectionLabel>Outcome</SectionLabel>
                  <Typography
                    variant="paragraph"
                    as="p"
                    className="text-foreground-muted leading-relaxed"
                  >
                    {project.outcome}
                  </Typography>
                </Stack>
              )}

              {project.articles.length > 0 && (
                <Stack direction="vertical" gap={{ base: 6, md: 12 }}>
                  <SectionLabel>Read Deeper</SectionLabel>
                  <Stack direction="vertical" gap={3}>
                    <WorkDeepDiveSection articles={project.articles} />
                  </Stack>
                </Stack>
              )}

              {project.preview_image && (
                <>
                  <SectionLabel>Website Preview</SectionLabel>
                  <SitePreviewSection
                    title={project.title}
                    previewImage={project.preview_image}
                  />
                </>
              )}
            </Stack>
          </div>
          <WorkItemSidebar project={project} />
        </div>
      </Container>
    </>
  );
}

export default async function WorkItemPage({ params }: WorkPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={null}>
      <WorkItemContent slug={slug} />
    </Suspense>
  );
}
