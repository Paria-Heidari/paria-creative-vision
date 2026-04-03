import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils/utils'

const typographyVariants = {
  // Display headings — Syne for editorial impact
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-syne leading-[1.05] tracking-tight',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-syne leading-[1.1] tracking-tight',
  h3: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-syne leading-snug tracking-tight',

  // Functional headings — Grotesk for clean hierarchy
  h4: 'text-xl sm:text-2xl md:text-3xl font-semibold font-grotesk leading-snug',
  h5: 'text-lg sm:text-xl md:text-2xl font-semibold font-grotesk leading-snug',
  h6: 'text-base sm:text-lg md:text-xl font-semibold font-grotesk leading-snug',

  // Body text — Inter for readability
  lead: 'text-lg sm:text-xl md:text-2xl font-inter leading-relaxed tracking-wide',
  leadSmall: 'text-lg sm:text-xl md:text-2xl font-inter font-light leading-relaxed tracking-wide',
  paragraph: 'text-base sm:text-lg font-inter leading-relaxed',
  paragraphSmall: 'text-sm sm:text-base font-inter leading-relaxed',

  // UI / meta text
  caption: 'text-xs sm:text-sm font-inter text-foreground-muted leading-normal',

  // Nav labels
  navLink: 'text-sm md:text-base font-medium font-grotesk tracking-widest uppercase',
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
