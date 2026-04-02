import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-none',
} as const

type MaxWidthPreset = keyof typeof maxWidthMap

interface ContainerProps {
  children: ReactNode
  maxWidth: MaxWidthPreset | false | (string & {})
  className?: string
}

function resolveMaxWidthClass(maxWidth: ContainerProps['maxWidth']): string{
    if(maxWidth === false) return 'max-w-none'
    if(maxWidth in maxWidthMap) {
        return maxWidthMap[maxWidth as MaxWidthPreset]
    }

    return maxWidth
}

const baseClass = 'mx-auto' as const;
const paddingClass = 'px-4 sm:px-6 lg:px-8' as const;

export default function Container({ children, maxWidth, className }: ContainerProps) {
  return (
    <div className={cn(resolveMaxWidthClass(maxWidth), className, baseClass, paddingClass)}>
      {children}
    </div>
  )
}
