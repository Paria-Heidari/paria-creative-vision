import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/utils';

const rowSpanClassMap = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  7: 'row-span-7',
  8: 'row-span-8',
  9: 'row-span-9',
} as const;

const colSpanClassMap = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
} as const;

const colStartClassMap = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
} as const;

const rowStartClassMap = {
  1: 'row-start-1',
  2: 'row-start-2',
  3: 'row-start-3',
  4: 'row-start-4',
  5: 'row-start-5',
  6: 'row-start-6',
  7: 'row-start-7',
  8: 'row-start-8',
  9: 'row-start-9',
} as const;

type RowSpanPreset = keyof typeof rowSpanClassMap;
type ColSpanPreset = keyof typeof colSpanClassMap;
type ColStartPreset = keyof typeof colStartClassMap;
type RowStartPreset = keyof typeof rowStartClassMap;

interface GridItemProps {
  children: ReactNode;
  rowSpan?: RowSpanPreset;
  colSpan?: ColSpanPreset;
  colStart?: ColStartPreset;
  rowStart?: RowStartPreset;
  className?: string;
}

export default function GridItem({
  children,
  rowSpan,
  colSpan,
  colStart,
  rowStart,
  className,
}: GridItemProps) {
  return (
    <div
      className={cn(
        'grid-item',
        rowSpan && rowSpanClassMap[rowSpan],
        colSpan && colSpanClassMap[colSpan],
        colStart && colStartClassMap[colStart],
        rowStart && rowStartClassMap[rowStart],
        className,
      )}
    >
      {children}
    </div>
  );
}
