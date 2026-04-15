import { notFound } from 'next/navigation';
import {
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { workProjects } from '@/data/workData';
import { routes as ROUTES } from '@/lib/routes/routes';
import { KeyDecisionsSection, SitePreviewSection, WorkDeepDiveSection, WorkItemPageHero, WorkItemSidebar } from '@/components/features/work/workItemPage';
import BackNavigationLink from '@/components/ui/BackNavigationLink/BackNavigationLink';
import { DecorativeLine } from '@/components/ui/DecorativeLine';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return workProjects.map((project) => ({ slug: project.slug }));
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

export default async function WorkItemPage({ params }: PageProps) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  const { workDeepDive } = project;
  const hasLinks =
    'links' in project && (project.links.live || project.links.github);

  return (
    <>
      {/* Hero */}
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
              coverImage={project.coverImage}
            />
          </Stack>
        </Container>
      </section>

      <Container maxWidth="xl" className="py-16 md:py-20">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-24">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Stack direction="vertical" gap={{ base: 12, md: 12 }}>
              {/* Problem */}
              <Stack direction="vertical" gap={{ base: 6, md: 12 }} >
                <SectionLabel>The Problem</SectionLabel>
                <blockquote className="border-l-accent-gold bg-surface-muted rounded-r-lg border-l-2 py-4 pr-4 pl-6">
                  <Typography
                    variant="paragraph"
                    as="p"
                    className="text-foreground-muted leading-relaxed italic"
                  >
                    {workDeepDive.problem}
                  </Typography>
                </blockquote>
              </Stack>

              {/* Key decisions */}
              <Stack direction="vertical" gap={{ base: 8, md: 12 }}>
                <SectionLabel>Key Decisions</SectionLabel>
                {workDeepDive.decisions.map((decision, index) => (
                  <KeyDecisionsSection key={index} title={decision.title} description={decision.description} index={index} />
                ))} 
              </Stack>

              {/* Outcome */}
              <Stack direction="vertical" gap={{ base: 6, md: 12 }}>
                <SectionLabel>Outcome</SectionLabel>
                <Typography
                  variant="paragraph"
                  as="p"
                  className="text-foreground-muted leading-relaxed"
                >
                  {workDeepDive.outcome}
                </Typography>
              </Stack>
              {/* Articles */}
              {workDeepDive.articles.length > 0 && (
                <>
                  <Stack direction="vertical" gap={{ base: 6, md: 12 }}>
                    <SectionLabel>Read Deeper</SectionLabel>
                    <Stack direction="vertical" gap={3}>
                      <WorkDeepDiveSection articles={workDeepDive.articles} />
                    </Stack>
                  </Stack>
                </>
              )}

              {/* Site Preview */}
              {'previewImage' in project && project.previewImage && (
                <>
                <SectionLabel>Website Preview</SectionLabel>
                <SitePreviewSection title={project.title} previewImage={project.previewImage} />
                </>
              )}
            </Stack>
          </div>
          <WorkItemSidebar project={project} hasLinks={Boolean(hasLinks)} />
        </div>
      </Container>
    </>
  );
}
