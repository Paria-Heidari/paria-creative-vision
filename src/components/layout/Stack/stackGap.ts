export type GapPreset = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
export type GapBreakpoints = 'base' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveGap = Partial<Record<GapBreakpoints, GapPreset>>;
export type StackGap = GapPreset | ResponsiveGap;

const gapClasses = {
  base: {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16',
    20: 'gap-20',
    24: 'gap-24',
    32: 'gap-32',
  },
  sm: {
    0: 'sm:gap-0',
    1: 'sm:gap-1',
    2: 'sm:gap-2',
    3: 'sm:gap-3',
    4: 'sm:gap-4',
    6: 'sm:gap-6',
    8: 'sm:gap-8',
    10: 'sm:gap-10',
    12: 'sm:gap-12',
    16: 'sm:gap-16',
    20: 'sm:gap-20',
    24: 'sm:gap-24',
    32: 'sm:gap-32',
  },
  md: {
    0: 'md:gap-0',
    1: 'md:gap-1',
    2: 'md:gap-2',
    3: 'md:gap-3',
    4: 'md:gap-4',
    6: 'md:gap-6',
    8: 'md:gap-8',
    10: 'md:gap-10',
    12: 'md:gap-12',
    16: 'md:gap-16',
    20: 'md:gap-20',
    24: 'md:gap-24',
    32: 'md:gap-32',
  },
  lg: {
    0: 'lg:gap-0',
    1: 'lg:gap-1',
    2: 'lg:gap-2',
    3: 'lg:gap-3',
    4: 'lg:gap-4',
    6: 'lg:gap-6',
    8: 'lg:gap-8',
    10: 'lg:gap-10',
    12: 'lg:gap-12',
    16: 'lg:gap-16',
    20: 'lg:gap-20',
    24: 'lg:gap-24',
    32: 'lg:gap-32',
  },
  xl: {
    0: 'xl:gap-0',
    1: 'xl:gap-1',
    2: 'xl:gap-2',
    3: 'xl:gap-3',
    4: 'xl:gap-4',
    6: 'xl:gap-6',
    8: 'xl:gap-8',
    10: 'xl:gap-10',
    12: 'xl:gap-12',
    16: 'xl:gap-16',
    20: 'xl:gap-20',
    24: 'xl:gap-24',
    32: 'xl:gap-32',
  },
} as const;

const ORDER: GapBreakpoints[] = ['base', 'sm', 'md', 'lg', 'xl'];

export function stackGapClassName(gap: StackGap): string {
  if (typeof gap !== 'object') return gapClasses.base[gap];

  const classes = ORDER.filter((bp) => gap[bp] !== undefined).map(
    (bp) => gapClasses[bp][gap[bp]!],
  );

  return classes.length ? classes.join(' ') : gapClasses.base[4];
}
