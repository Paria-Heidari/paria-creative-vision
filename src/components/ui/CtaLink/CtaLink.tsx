'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { Typography } from '@/components/ui/Typography';
import { LinkData } from '@/types/ui.types';

export type CtaLinkVariant = 'trailing' | 'centered' | 'underline';

const labelTypography: Record<CtaLinkVariant, 'paragraphSmall' | 'navLink'> = {
  trailing: 'paragraphSmall',
  centered: 'paragraphSmall',
  underline: 'navLink',
};

export interface CtaLinkProps {
  link: LinkData;
  label: string;
  variant?: CtaLinkVariant;
  className?: string;
  children?: React.ReactNode;
}

const arrowBaseClasses =
  'h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1';

const variantStyles: Record<
  CtaLinkVariant,
  { link: string; label: string; arrow: string }
> = {
  trailing: {
    link: 'hover:text-accent-gold hidden items-end gap-2 font-medium transition-colors md:flex',
    label: 'text-foreground-muted',
    arrow: arrowBaseClasses,
  },
  centered: {
    link: 'hover:text-accent-gold inline-flex items-center justify-center gap-2 font-medium transition-colors',
    label: '',
    arrow: arrowBaseClasses,
  },
  underline: {
    link: 'text-foreground hover:text-accent-gold inline-flex items-center gap-3 border-b border-foreground/30 pb-1 font-medium transition-colors hover:border-accent-gold',
    label: '',
    arrow: 'h-5 w-5 transition-transform group-hover:translate-x-2',
  },
};

export default function CtaLink({
  link,
  label,
  variant,
  className,
  ...linkProps
}: CtaLinkProps) {
  const styles = variant && variantStyles[variant];

  return (
    <Link
      href={link.href}
      aria-label={label}
      className={cn('group', styles?.link, className)}
      {...linkProps}
    >
      <Typography
        variant={labelTypography[variant as CtaLinkVariant]}
        as="span"
        className={styles?.label}
      >
        {link.label}
      </Typography>
      <ArrowRight className={styles?.arrow} aria-hidden />
    </Link>
  );
}
