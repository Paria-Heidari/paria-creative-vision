import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const directionClassMap = {
    row: 'flex-row',
    rowReverse: 'flex-row-reverse',
    column: 'flex-col',
    columnReverse: 'flex-col-reverse',
} as const

const justifyClassMap = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
} as const

const alignClassMap = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
} as const

const gapClassMap = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-5',
} as const

type DirectionPreset = keyof typeof directionClassMap
type JustifyPreset = keyof typeof justifyClassMap
type AlignPreset = keyof typeof alignClassMap
type GapPreset = keyof typeof gapClassMap

interface FlexProps {
    children: ReactNode
    direction: DirectionPreset
    justify?: JustifyPreset
    align?: AlignPreset
    gap?: GapPreset
    className?: string
}

export default function Flex({ children, direction, justify, align, gap, className }: FlexProps) {
  return (
    <div className={cn('flex', directionClassMap[direction], justify && justifyClassMap[justify], align && alignClassMap[align], gap && gapClassMap[gap], className)}>
      {children}
    </div>
  )
}
