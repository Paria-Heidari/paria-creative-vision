import { Stack } from '@/components/layout/Stack'
import React from 'react'
import { DecorativeLine } from '../DecorativeLine'
import { Typography } from '../Typography'
import { LinkData } from '@/types/ui.types';
import { CtaLink } from '../CtaLink';

interface SectionHeaderProps {
    title: string;
    subTitle?: string;
    ctaLink: LinkData;
}

export default function SectionHeader({ title, subTitle, ctaLink }: SectionHeaderProps) {
  return (
     <Stack direction="vertical" gap={{ base: 8, md: 12 }}>
          <DecorativeLine className="h-[2px] rounded-none" />
          <Stack
            direction="horizontal"
            gap={{ base: 3, md: 4 }}
            justify="between"
            items="end"
          >
            <Stack direction="vertical" gap={{ base: 4, md: 6 }}>
              <Typography variant="h2" as="h2">
                {title}
              </Typography>
              <Typography
                variant="lead"
                as="p"
                className="text-foreground-muted"
              >
                {subTitle}
              </Typography>
            </Stack>
            <CtaLink href={ctaLink.href} label={ctaLink.label} variant="trailing" />
          </Stack>
         
        </Stack>
  )
}