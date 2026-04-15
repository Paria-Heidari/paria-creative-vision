'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {Circle, Clock, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils/utils';
import { CtaLink } from '@/components/ui/CtaLink';

export interface WorkCardProps {
  title: string;
  subtitle?: string;
  description: string;
  tags?: readonly string[];
  href: string;
  status?: 'live' | 'coming-soon' | 'in-progress';
  external?: boolean;
  animateFrom?: 'left' | 'right';
  className?: string;
}

const statusConfig = {
  live: {
    label: 'Live',
    icon: Circle,
    className: 'bg-success/10 text-success border border-success/20',
    iconClassName: 'fill-success text-success',
  },
  'coming-soon': {
    label: 'Coming Soon',
    icon: Clock,
    className: 'bg-accent text-foreground-muted border border-border',
    iconClassName: 'text-foreground-muted',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Loader,
    className: 'bg-warning/10 text-warning border border-warning/20',
    iconClassName: 'animate-spin text-warning',
  },
};

const MAX_TAGS = 5;

export default function WorkCard({
  title,
  subtitle,
  description,
  tags,
  href,
  status = 'live',
  external = false,
  animateFrom = 'left',
  className,
}: WorkCardProps) {
  const visibleTags = tags?.slice(0, MAX_TAGS) ?? [];
  const isComingSoon = status === 'coming-soon';
  const Icon = statusConfig[status].icon;
  const IconClassName = statusConfig[status].iconClassName;
  const baseClass =
    'group flex h-full flex-col gap-6 rounded-lg border border-border bg-surface p-8 border-l-4 border-l-accent-gold transition-all duration-300';
  const comingSoonClass = 'pointer-events-none cursor-default opacity-60';
  const hoverClass = 'hover:bg-surface-muted hover:shadow-md';
  const focusVisibleClass =
    'focus-visible:ring-accent-gold/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';
  const classes = cn(
    baseClass,
    isComingSoon ? comingSoonClass : hoverClass,
    focusVisibleClass,
    className,
  );

  const router = useRouter();
  const handleInteraction = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isComingSoon) {
      event?.preventDefault();
    } else {
      router.push(href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: animateFrom === 'left' ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-disabled={isComingSoon}
        tabIndex={isComingSoon ? -1 : undefined}
        onClick={handleInteraction}
        className={classes}
      >
        <Stack direction="horizontal" gap={2}>
          <Typography
            variant="caption"
            as="span"
            className={cn(
              'ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium',
              statusConfig[status].className,
            )}
          >
            {Icon && (
              <Icon className={cn('h-3 w-3', IconClassName)} aria-hidden />
            )}
            {statusConfig[status].label}
          </Typography>
        </Stack>

        {/* Title + subtitle */}
        <Stack direction="vertical" gap={{ base: 1, md: 2 }}>
          <Typography
            variant="h5"
            as="h3"
            className={cn(
              'transition-colors duration-200',
              !isComingSoon && 'group-hover:text-accent-gold',
            )}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              as="p"
              className="text-foreground-subtle tracking-wider uppercase"
            >
              {subtitle}
            </Typography>
          )}
        </Stack>

        {/* Description */}
        <Typography
          variant="paragraph"
          as="p"
          className="text-foreground-muted line-clamp-3 flex-1"
        >
          {description}
        </Typography>

        {/* Tags */}
        {visibleTags.length > 0 && (
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="border-border bg-background text-foreground-muted rounded-full border px-3 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
            {(tags?.length ?? 0) > MAX_TAGS && (
              <span className="border-border bg-background text-foreground-subtle rounded-full border px-2 py-1 text-xs">
                +{(tags?.length ?? 0) - MAX_TAGS} more
              </span>
            )}
          </Stack>
        )}

        {/* CTA */}
        {!isComingSoon && (
          <CtaLink
            href={href}
            label="Explore Work"
            variant="trailing"
            asSpan={true}
          />
        )}
      </Link>
    </motion.div>
  );
}
