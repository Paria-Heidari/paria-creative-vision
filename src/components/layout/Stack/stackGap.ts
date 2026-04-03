/**
 * Stack gap tokens: design-scale spacing + optional per-breakpoint overrides.
 * Responsive classes are composed at runtime; literal list below keeps Tailwind output complete.
 */

export const gapMap = {
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
} as const

export type GapPreset = keyof typeof gapMap

export type GapBreakpoints = 'base' | 'sm' | 'md' | 'lg' | 'xl'

/** Per-breakpoint gap; omit keys to leave that range unchanged (no class). */
export type ResponsiveGap = Partial<Record<GapBreakpoints, GapPreset>>

/** Single token everywhere, or breakpoint-specific spacing (mobile-first). */
export type StackGap = GapPreset | ResponsiveGap

const ORDER: GapBreakpoints[] = ['base', 'sm', 'md', 'lg', 'xl']

function isResponsiveGap(gap: StackGap): gap is ResponsiveGap {
  return typeof gap === 'object' && gap !== null
}

export function stackGapClassName(gap: StackGap): string {
  if (!isResponsiveGap(gap)) {
    return gapMap[gap]
  }

  const parts: string[] = []
  for (const bp of ORDER) {
    const preset = gap[bp]
    if (preset === undefined) continue
    parts.push(bp === 'base' ? gapMap[preset] : `${bp}:gap-${preset}`)
  }

  if (parts.length === 0) {
    return gapMap[4]
  }

  return parts.join(' ')
}

/**
 * Every `gap-*` and `{sm,md,lg,xl}:gap-*` utility Stack may emit (Tailwind scan).
 * Keep presets in sync with `gapMap` keys.
 */
export const STACK_GAP_TAILWIND_SOURCES = [
  'gap-0',
  'gap-1',
  'gap-2',
  'gap-3',
  'gap-4',
  'gap-6',
  'gap-8',
  'gap-10',
  'gap-12',
  'gap-16',
  'gap-20',
  'gap-24',
  'gap-32',
  'sm:gap-0',
  'sm:gap-1',
  'sm:gap-2',
  'sm:gap-3',
  'sm:gap-4',
  'sm:gap-6',
  'sm:gap-8',
  'sm:gap-10',
  'sm:gap-12',
  'sm:gap-16',
  'sm:gap-20',
  'sm:gap-24',
  'sm:gap-32',
  'md:gap-0',
  'md:gap-1',
  'md:gap-2',
  'md:gap-3',
  'md:gap-4',
  'md:gap-6',
  'md:gap-8',
  'md:gap-10',
  'md:gap-12',
  'md:gap-16',
  'md:gap-20',
  'md:gap-24',
  'md:gap-32',
  'lg:gap-0',
  'lg:gap-1',
  'lg:gap-2',
  'lg:gap-3',
  'lg:gap-4',
  'lg:gap-6',
  'lg:gap-8',
  'lg:gap-10',
  'lg:gap-12',
  'lg:gap-16',
  'lg:gap-20',
  'lg:gap-24',
  'lg:gap-32',
  'xl:gap-0',
  'xl:gap-1',
  'xl:gap-2',
  'xl:gap-3',
  'xl:gap-4',
  'xl:gap-6',
  'xl:gap-8',
  'xl:gap-10',
  'xl:gap-12',
  'xl:gap-16',
  'xl:gap-20',
  'xl:gap-24',
  'xl:gap-32',
] as const
