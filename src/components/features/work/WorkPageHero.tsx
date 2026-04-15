import { Stack } from '@/components/layout/Stack';
import { DecorativeLine } from '@/components/ui/DecorativeLine';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils/utils';

interface WorkPageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export default function WorkPageHero({
  title,
  subtitle,
  description,
  className,
}: WorkPageHeroProps) {
  return (
    <section className={cn(className, 'mb-16 pt-28 md:mb-24 lg:mb-32')}>
      <Stack
        direction="vertical"
        gap={{ base: 4, md: 6 }}
        align="center"
        className="mb-12 text-center"
      >
        <DecorativeLine />
        <Typography
          variant="leadSmall"
          as="p"
          className="text-foreground-subtle tracking-widest uppercase"
        >
          {title}
        </Typography>
        <Typography variant="h2" as="h1" className="font-syne">
          {subtitle}
        </Typography>
        <Typography
          variant="lead"
          as="p"
          className="text-foreground-muted max-w-2xl"
        >
          {description}
        </Typography>
      </Stack>
    </section>
  );
}
