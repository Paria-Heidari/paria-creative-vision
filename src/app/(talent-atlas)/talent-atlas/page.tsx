import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { routes as ROUTE } from '@/lib/routes/routes';

export const metadata: Metadata = {
  title: 'TalentAtlas',
  description:
    'A hiring and talent dashboard for mission driven organizations to track campaigns, manage pipelines, and grow their teams.',
};

const features = [
  {
    title: 'Track campaigns',
    description:
      'Monitor hiring campaigns from launch to close, with progress at a glance.',
  },
  {
    title: 'Manage your pipeline',
    description:
      'Move candidates through your hiring stages without losing context.',
  },
  {
    title: 'Grow your team',
    description:
      'Keep a clear record of members, roles, and chapters across your NGO.',
  },
];

export default function TalentAtlasLandingPage() {
  const loginHref = `/auth/login?returnTo=${process.env.APP_BASE_URL}${ROUTE.talentAtlasDashboard}`;

  return (
    <main className="min-h-screen bg-background">
      <Container maxWidth="lg">
        <Stack direction="vertical" gap={16} className="py-24 md:py-32">
          <Stack direction="vertical" gap={6} className="max-w-3xl">
            <span className="font-[family-name:var(--font-family-syne)] text-xs font-bold tracking-[0.3em] text-accent-gold uppercase">
              TalentAtlas
            </span>
            <Typography variant="h1" as="h1">
              A hiring and talent dashboard for mission driven organizations.
            </Typography>
            <Typography variant="lead" className="text-foreground-muted">
              Track campaigns, manage your hiring pipeline, and keep your
              team organised — all in one place.
            </Typography>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                href={loginHref}
                variant="gold"
                size="lg"
                endIcon={<ArrowRight size={18} />}
              >
                Sign in
              </Button>
            </div>
          </Stack>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <Typography variant="h5" as="h2">
                  {feature.title}
                </Typography>
                <Typography
                  variant="paragraphSmall"
                  className="mt-2 text-foreground-muted"
                >
                  {feature.description}
                </Typography>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </main>
  );
}
