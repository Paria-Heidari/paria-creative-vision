import Link from 'next/link';
import { ExternalLink, GitBranch, Globe } from 'lucide-react';
import type { WorkProjectRow } from '@/types/work.types';
import { Typography } from '@/components/ui/Typography';
import { Stack } from '@/components/layout/Stack';

interface WorkItemSidebarProps {
  project: Pick<
    WorkProjectRow,
    'year' | 'role' | 'tags' | 'live_url' | 'github_url'
  >;
}

export default function WorkItemSidebar({ project }: WorkItemSidebarProps) {
  return (
    <aside>
      <div className="divide-border sticky top-28 divide-y">
        {/* Metadata */}
        <div className="pb-6">
          <Stack direction="vertical" gap={6}>
            <Stack direction="vertical" gap={1}>
              <Typography
                variant="caption"
                as="p"
                className="text-foreground-subtle tracking-wider uppercase"
              >
                Year
              </Typography>
              <Typography
                variant="paragraphSmall"
                as="p"
                className="font-medium"
              >
                {project.year}
              </Typography>
            </Stack>
            <Stack direction="vertical" gap={1}>
              <Typography
                variant="caption"
                as="p"
                className="text-foreground-subtle tracking-wider uppercase"
              >
                Role
              </Typography>
              <Typography
                variant="paragraphSmall"
                as="p"
                className="font-medium"
              >
                {project.role}
              </Typography>
            </Stack>
          </Stack>
        </div>

        {/* Stack */}
        <div className="py-6">
          <Stack direction="vertical" gap={3}>
            <Typography
              variant="caption"
              as="p"
              className="text-foreground-subtle tracking-wider uppercase"
            >
              Stack
            </Typography>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent-gold/10 text-accent-gold rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Stack>
        </div>

        {/* Links */}
        <div className="pt-6">
          <Stack direction="vertical" gap={3}>
            <Typography
              variant="caption"
              as="p"
              className="text-foreground-subtle tracking-wider uppercase"
            >
              Links
            </Typography>
            <Stack direction="vertical" gap={2}>
              {project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent-gold inline-flex items-center gap-2 transition-colors"
                >
                  <Globe className="h-4 w-4 shrink-0" />
                  <Typography variant="paragraphSmall" as="span">
                    Live Site
                  </Typography>
                  <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                </Link>
              )}
              {project.github_url && (
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent-gold inline-flex items-center gap-2 transition-colors"
                >
                  <GitBranch className="h-4 w-4 shrink-0" />
                  <Typography variant="paragraphSmall" as="span">
                    GitHub
                  </Typography>
                  <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                </Link>
              )}
            </Stack>
          </Stack>
        </div>
      </div>
    </aside>
  );
}
