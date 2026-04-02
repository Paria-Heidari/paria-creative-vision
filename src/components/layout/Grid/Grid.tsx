import { cn } from '@/lib/utils/utils'
import type { ReactNode } from 'react'

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
} as const

type GapPreset = keyof typeof gapClassMap

interface GridProps {
    children: ReactNode
    gap: GapPreset
    className?: string
}

export default function Grid({ children, gap, className }: GridProps) {
  return (
    <div className={cn('grid', gapClassMap[gap], className)}>
        {children}
    </div>
  )
}
