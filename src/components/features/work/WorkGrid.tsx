import { getAllWorkProjects } from '@/lib/api/workProjects/workProjects';
import { routes as ROUTES } from '@/lib/routes/routes';
import WorkCard from './WorkCard';
import { Grid, GridItem } from '@/components/layout/Grid';

export function WorkGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-64 rounded-lg" />
      ))}
    </div>
  );
}

export const WorkGrid = async () => {
  const projects = await getAllWorkProjects();

  return (
    <Grid gap={8} className="grid-cols-1 md:grid-cols-2">
      {projects.map((project, index) => (
        <GridItem key={project.slug} colSpan={1}>
          <WorkCard
            {...project}
            tags={project.tags ?? []}
            href={`${ROUTES.work}/${project.slug}`}
            animateFrom={index % 2 === 0 ? 'left' : 'right'}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
