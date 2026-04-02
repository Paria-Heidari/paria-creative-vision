import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const gapMap = {
  4: 'gap-4',
  8: 'gap-8',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
} as const

type GapPreset = keyof typeof gapMap

const directionClassMap = {
  vertical: 'flex-col',
  horizontal: 'flex-row',
} as const

interface StackProps {
  children: ReactNode
  direction: keyof typeof directionClassMap
  gap?: GapPreset
  className?: string
}

export default function Stack({
  children,
  direction,
  gap = 4,
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        directionClassMap[direction],
        gapMap[gap],
        className,
      )}
    >
      {children}
    </div>
  )
}
