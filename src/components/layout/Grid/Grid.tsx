import { cn } from '@/lib/utils/utils';
import type { ReactNode } from 'react';

const gapClassMap = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
} as const;

const colsClassMap = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  '5': 'grid-cols-5',
  '6': 'grid-cols-6',
  '7': 'grid-cols-7',
  '8': 'grid-cols-8',
  '9': 'grid-cols-9',
  '10': 'grid-cols-10',
  '11': 'grid-cols-11',
  '12': 'grid-cols-12',
} as const;

type GapPreset = keyof typeof gapClassMap;
type ColsPreset = keyof typeof colsClassMap;

interface GridProps {
  children: ReactNode;
  gap: GapPreset;
  cols?: ColsPreset;
  className?: string;
}

export default function Grid({ children, gap, cols, className }: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        gapClassMap[gap],
        cols && colsClassMap[cols],
        className,
      )}
    >
      {children}
    </div>
  );
}
