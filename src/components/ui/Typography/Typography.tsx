import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const typographyClassMap = {
  h1: 'text-5xl font-bold font-grotesk leading-tight',
  h2: 'text-4xl font-semibold font-grotesk leading-tight',
  h3: 'text-3xl font-semibold font-grotesk leading-tight',
  h4: 'text-2xl font-semibold font-grotesk leading-tight',
  h5: 'text-xl font-semibold font-grotesk leading-tight',
  h6: 'text-lg font-semibold font-grotesk leading-tight',
  
  body: 'text-lg font-inter leading-relaxed',
  bodySmall: 'text-base font-inter leading-relaxed',

  p: 'text-lg font-inter leading-relaxed',
  span: 'text-base font-inter leading-relaxed',
  caption: 'text-xs font-inter text-foreground-muted',
  
} as const

type TypographyPreset = keyof typeof typographyClassMap

interface TypographyProps {
  children: ReactNode
  variant?: TypographyPreset
  as?: ElementType
  className?: string
}

export default function Typography({
  children,
  variant = 'body',
  as: Component = 'p',
  className,
}: TypographyProps) {
  return (
    <Component className={cn(typographyClassMap[variant], className)}>
      {children}
    </Component>
  )
}
