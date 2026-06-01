import { getAllWorkProjects } from '@/lib/api/workProjects/workProjects';
import { routes as ROUTES } from '@/lib/routes/routes';
import SelectedWork from './SelectedWork';

export function SelectedWorkSkeleton() {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="skeleton h-[2px] w-full" />
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-4 md:space-y-6">
          <div className="skeleton h-10 w-48" />
          <div className="skeleton h-5 w-56" />
        </div>
        <div className="skeleton hidden h-5 w-32 md:block" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="skeleton h-64 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export const SelectedWorkSection = async () => {
  const projects = await getAllWorkProjects();
  const cards = projects.map((project) => ({
    ...project,
    href: `${ROUTES.work}/${project.slug}`,
  }));

  return <SelectedWork cards={cards} />;
};
