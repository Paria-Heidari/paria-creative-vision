'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/utils';

export interface CtaAction {
  href: string;
  label: string;
  external?: boolean;
}

export interface CtaSectionProps {
  title: string;
  description: string;
  actions: CtaAction[];
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const stackAlignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
} as const;
const textAlignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export default function CtaSection({
  title,
  description,
  actions,
  align = 'center',
  className,
}: CtaSectionProps) {
  return (
    <section className={className}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Stack
            direction="vertical"
            gap={{ base: 6, md: 8 }}
            align={stackAlignMap[align]}
          >
            <Typography variant="h2" as="h2" className={textAlignMap[align]}>
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              as="p"
              className={cn(
                'text-foreground-muted max-w-2xl',
                textAlignMap[align],
              )}
            >
              {description}
            </Typography>
            <Stack direction="horizontal" gap={4}>
              {actions.map(({ href, label, external, ...buttonProps }) => (
                <Button
                  key={href}
                  href={href}
                  external={external}
                  btnText={label}
                  btnTextVariant="paragraphSmall"
                  size="md"
                  rounded="full"
                  {...buttonProps}
                />
              ))}
            </Stack>
          </Stack>
        </motion.div>
      </Container>
    </section>
  );
}
