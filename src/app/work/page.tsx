import { Container } from '@/components/layout/Container';
import { WorkCard, WorkPageHero } from '@/components/features/work';
import { Grid, GridItem } from '@/components/layout/Grid';
import { routes as ROUTES } from '@/lib/routes/routes';
import { workPageHeroData, workProjects } from '@/data/workData';


export default function WorkPage() {
  return (
    <>
      <WorkPageHero {...workPageHeroData} />
      <Container maxWidth="xl" className="pb-24 md:pb-32">
        <Grid gap={8} className="grid-cols-1 md:grid-cols-2">
          {workProjects.map((project, index) => (
            <GridItem key={project.slug} colSpan={1}>
            <WorkCard
              key={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              tags={[...project.tags]}
              status={project.status}
              href={`${ROUTES.work}/${project.slug}`}
              animateFrom={index % 2 === 0 ? 'left' : 'right'}
            />
            </GridItem>
          ))}
          </Grid>

      </Container>
    </>
  );
}
