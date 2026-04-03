import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-none',
} as const

type MaxWidthPreset = keyof typeof maxWidthMap

interface ContainerProps {
  children: ReactNode
  maxWidth?: MaxWidthPreset | (string & {})
  noPadding?: boolean
  paddingMdOnly?: boolean
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
  paddingMdOnly = false,
  className,
}: ContainerProps) {
  const horizontalPadding = !noPadding
    ? 'px-4 sm:px-6 lg:px-8'
    : paddingMdOnly
      ? 'px-4 md:px-0'
      : undefined

  return (
    <div
      className={cn(
        'mx-auto',
        resolveMaxWidthClass(maxWidth),
        horizontalPadding,
        className,
      )}
    >
      {children}
    </div>
  )
}