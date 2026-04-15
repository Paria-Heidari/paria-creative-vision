import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Typography } from '../Typography';
import { cn } from '@/lib/utils/utils';

export interface BackNavigationLinkProps {
  href: string;
  label: string;
  className?: string;
}

export default function BackNavigationLink({
  href,
  label,
  className,
}: BackNavigationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex w-fit items-center gap-2 transition-colors',
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      <Typography variant="paragraphSmall" as="span">
        {label}
      </Typography>
    </Link>
  );
}
