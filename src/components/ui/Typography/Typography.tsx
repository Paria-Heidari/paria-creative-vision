import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const typographyVariants = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-syne leading-tight',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-syne leading-tight',
  h3: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-syne leading-tight',
  h4: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-syne leading-tight',
  h5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-syne leading-tight',
  h6: 'text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-syne leading-tight',
  
  lead: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter leading-relaxed',
  
  paragraph: 'text-base sm:text-lg md:text-xl lg:text-2xl font-inter leading-relaxed',
  paragraphSmall: 'text-sm sm:text-base md:text-lg lg:text-xl font-inter leading-relaxed',
  
  caption: 'text-xs sm:text-sm md:text-base lg:text-lg font-inter text-foreground-muted',
} as const

type TypographyPreset = keyof typeof typographyVariants

interface TypographyProps {
  children: ReactNode
  variant?: TypographyPreset
  as?: ElementType
  className?: string
}

export default function Typography({
  children,
  variant = 'paragraph',
  as: Component = 'p',
  className,
}: TypographyProps) {
  return (
    <Component className={cn(typographyVariants[variant], className)}>
      {children}
    </Component>
  )
}
