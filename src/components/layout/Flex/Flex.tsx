import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const directionMap = {
  row:           'flex-row',
  rowReverse:    'flex-row-reverse',
  column:        'flex-col',
  columnReverse: 'flex-col-reverse',
} as const

const justifyMap = {
  start:   'justify-start',
  end:     'justify-end',
  center:  'justify-center',
  between: 'justify-between',
  around:  'justify-around',
  evenly:  'justify-evenly',
} as const

const alignMap = {
  start:    'items-start',
  end:      'items-end',
  center:   'items-center',
  baseline: 'items-baseline',
  stretch:  'items-stretch',
} as const

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
} as const

type GapPreset = keyof typeof gapMap

interface FlexProps {
  children: ReactNode
  direction?: keyof typeof directionMap
  justify?: keyof typeof justifyMap
  align?: keyof typeof alignMap
  gap?: GapPreset
  wrap?: boolean
  className?: string
}

export default function Flex({
  children,
  direction = 'row',
  justify,
  align,
  gap,
  wrap,
  className,
}: FlexProps) {
  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        justify && justifyMap[justify],
        align && alignMap[align],
        gap !== undefined && gapMap[gap],
        wrap && 'flex-wrap',
        className,
      )}
    >
      {children}
    </div>
  )
}