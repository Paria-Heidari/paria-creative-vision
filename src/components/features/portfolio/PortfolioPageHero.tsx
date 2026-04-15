import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils/utils';

interface PortfolioPageHeroProps {
  title: string;
  heading: string;
  content: string;
  className?: string;
}

export default function PortfolioPageHero({ title, heading, content, className }: PortfolioPageHeroProps) {
  return (
    <section className={cn(className, 'mb-16 pt-28 md:mb-24 lg:mb-32')}>
      <Stack
        direction="vertical"
        gap={{ base: 4, md: 6 }}
        align="center"
        textAlign="center"
      >
        <Typography
          variant="caption"
          as="p"
          className="text-accent-gold font-medium tracking-[0.3em] uppercase"
        >
          {title}
        </Typography>
        <Typography variant="h2" as="h1" className="tracking-tight">
          {heading}
        </Typography>
        <span className="bg-accent-gold block h-0.5 w-16" />
        <Typography
          variant="paragraph"
          as="p"
          className="text-foreground-muted max-w-xl"
        >
          {content}
        </Typography>
      </Stack>
    </section>
  );
}
