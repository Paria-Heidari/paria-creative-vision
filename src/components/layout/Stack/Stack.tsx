import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'
import {
  stackGapClassName,
  type StackGap,
} from './stackGap'

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

const textAlignMap = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
} as const

type AlignPreset = keyof typeof alignMap
type JustifyPreset = keyof typeof justifyMap
type ItemsPreset = keyof typeof itemsMap
type TextAlignPreset = keyof typeof textAlignMap

export type { GapPreset, GapBreakpoints, ResponsiveGap, StackGap } from './stackGap'

interface StackProps {
  children: ReactNode
  direction?: keyof typeof directionMap
  /** Uniform gap, or mobile-first `{ base, sm, md, lg, xl }` using the same scale */
  gap?: StackGap
  align?: AlignPreset
  items?: ItemsPreset
  justify?: JustifyPreset
  textAlign?: TextAlignPreset
  className?: string
}

export default function Stack({
  children,
  direction = 'vertical',
  gap = 4,
  align,
  items,
  justify,
  textAlign,
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        stackGapClassName(gap),
        align && alignMap[align],
        items && itemsMap[items],
        justify && justifyMap[justify],
        textAlign && textAlignMap[textAlign],
        className,
      )}
    >
      {children}
    </div>
  )
}
