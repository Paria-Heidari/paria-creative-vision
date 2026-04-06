import { motion } from 'framer-motion';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { DecorativeLine } from '@/components/ui/DecorativeLine';

interface AboutPageHeroInfo {
  title: string;
  heading: string;
  content?: string;
}

interface AboutPageHeroProps {
  info: AboutPageHeroInfo;
}

export default function AboutPageHero({ info }: AboutPageHeroProps) {
  return (
    <section className="mb-16 pt-28 md:mb-24 lg:mb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack direction="vertical" gap={{ base: 4, md: 6 }} align="center">
          <DecorativeLine />
          <Typography variant="h1" as="h1" className="font-syne">
            {info.title}
          </Typography>
          <Typography variant="lead" as="p" className="text-foreground-muted">
            {info.heading}
          </Typography>
          <Typography
            variant="paragraph"
            as="p"
            className="text-foreground-muted max-w-2xl"
          >
            {info.content}
          </Typography>
        </Stack>
      </motion.div>
    </section>
  );
}
