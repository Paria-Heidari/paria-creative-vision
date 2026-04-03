import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const gapMap = {
  0:  'gap-0',
  1:  'gap-1',
  2:  'gap-2',
  3:  'gap-3',
  4:  'gap-4',
  6:  'gap-6',
  8:  'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
} as const

const directionMap = {
  vertical:   'flex-col',
  horizontal: 'flex-row',
} as const

const alignMap = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
} as const

const justifyMap = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
} as const

const itemsMap = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
} as const

type GapPreset     = keyof typeof gapMap
type AlignPreset   = keyof typeof alignMap
type JustifyPreset = keyof typeof justifyMap
type ItemsPreset = keyof typeof itemsMap

interface StackProps {
  children: ReactNode
  direction?: keyof typeof directionMap
  gap?: GapPreset
  align?: AlignPreset
  items?: ItemsPreset
  justify?: JustifyPreset
  className?: string
}

export default function Stack({
  children,
  direction = 'vertical',
  gap = 4,
  align,
  justify,
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
    >
      {children}
    </div>
  )
}