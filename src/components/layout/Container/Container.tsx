import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  prose: 'max-w-prose',
  full: 'max-w-none',
} as const

type MaxWidthPreset = keyof typeof maxWidthMap

interface ContainerProps {
  children: ReactNode
  maxWidth?: MaxWidthPreset | (string & {})
  noPadding?: boolean
  className?: string
}

function resolveMaxWidthClass(maxWidth: MaxWidthPreset | (string & {})): string {
  if (maxWidth in maxWidthMap) return maxWidthMap[maxWidth as MaxWidthPreset]
  return maxWidth
}

export default function Container({
  children,
  maxWidth = 'xl',
  noPadding = false,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto',
        resolveMaxWidthClass(maxWidth),
        !noPadding && 'px-4 sm:px-6 lg:px-8',
        className,
      )}
    >
      {children}
    </div>
  )
}