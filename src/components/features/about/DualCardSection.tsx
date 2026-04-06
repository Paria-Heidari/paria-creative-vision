'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { Code2, Camera } from 'lucide-react';

interface SkillCardProps {
  title: string;
  description: string;
  skillsLabel: string;
  skills: string[];
  icon: React.ReactNode;
  animateFrom: 'left' | 'right';
}

function SkillCard({
  title,
  description,
  skillsLabel,
  skills,
  icon,
  animateFrom,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: animateFrom === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-white p-8 shadow-lg"
    >
      <Stack direction="vertical" gap={{ base: 4, md: 6 }}>
        {icon && (
          <div className="bg-accent-gold/10 flex h-14 w-14 items-center justify-center rounded-xl">
            {icon}
          </div>
        )}
        <Typography variant="h4" as="h3">
          {title}
        </Typography>
        <Typography variant="paragraph" as="p">
          {description}
        </Typography>
        <Typography
          variant="caption"
          as="h4"
          className="font-semibold tracking-wider uppercase"
        >
          {skillsLabel}
        </Typography>
        <Stack direction="horizontal" gap={2} className="flex-wrap">
          {skills.map((skill) => (
            <Typography
              variant="caption"
              as="span"
              key={skill}
              className="bg-accent-gold/10 text-accent-gold rounded-full px-3 py-1.5"
            >
              {skill}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </motion.div>
  );
}

interface DualCardSectionProps {
  title: string;
  subTitle: string;
  developerCard: Omit<SkillCardProps, 'icon' | 'animateFrom'>;
  photographerCard: Omit<SkillCardProps, 'icon' | 'animateFrom'>;
  className?: string;
}

export default function DualCardSection({
  title,
  subTitle,
  developerCard,
  photographerCard,
  className,
}: DualCardSectionProps) {
  return (
    <section className={className}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Stack
            direction="vertical"
            gap={{ base: 4, md: 6 }}
            align="center"
            className="mb-16 text-center"
          >
            <Typography variant="h2" as="h2" className="font-syne">
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              as="p"
              className="text-foreground-muted max-w-2xl"
            >
              {subTitle}
            </Typography>
          </Stack>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <SkillCard
            {...developerCard}
            icon={<Code2 className="text-accent-gold h-7 w-7" />}
            animateFrom="left"
          />
          <SkillCard
            {...photographerCard}
            icon={<Camera className="text-accent-gold h-7 w-7" />}
            animateFrom="right"
          />
        </div>
      </Container>
    </section>
  );
}
