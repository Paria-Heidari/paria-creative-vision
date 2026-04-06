import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { portfolioHeroInfo } from '@/data/staticData';

export default function PortfolioHero() {
  return (
    <section className="pt-28 pb-12">
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
          {portfolioHeroInfo.title}
        </Typography>
        <Typography variant="h2" as="h1" className="tracking-tight">
          {portfolioHeroInfo.heading}
        </Typography>
        <span className="bg-accent-gold block h-0.5 w-16" />
        <Typography
          variant="paragraph"
          as="p"
          className="text-foreground-muted max-w-xl"
        >
          {portfolioHeroInfo.content}
        </Typography>
      </Stack>
    </section>
  );
}
