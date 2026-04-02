import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import LoadingSpinner from '@/components/ui/icons/LoadingSpinner'
import { cn } from '@/lib/utils/utils'
import { Typography } from '../Typography'

const buttonClassMap = {
  primary:
    'bg-foreground text-white hover:bg-foreground/90 shadow-sm hover:shadow-lg',
  secondary:
    'bg-accent text-foreground border border-foreground/10 hover:border-foreground/20 hover:bg-accent-hover/30 shadow-sm hover:shadow-md',
  tertiary:
    'bg-transparent border-2 border-foreground/20 text-foreground hover:border-accent-gold hover:text-accent-gold',
  ghost: 'bg-transparent text-foreground hover:bg-foreground/5 active:bg-foreground/10',
  link: 'bg-transparent text-foreground hover:text-accent-gold underline-offset-4 hover:underline px-0 py-0 h-auto',
  gold: 'bg-accent-gold text-white hover:bg-accent-gold-hover shadow-md hover:shadow-lg',
} as const

const buttonSizeClassMap = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
} as const

const roundedClassMap = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  sm: 'rounded-sm',
} as const

type ButtonVariant = keyof typeof buttonClassMap
type ButtonSize = keyof typeof buttonSizeClassMap
type ButtonRounded = keyof typeof roundedClassMap

type BaseProps = {
  children?: ReactNode
  btnText?: string
  variant?: ButtonVariant
  size?: ButtonSize
  startIcon?: ReactNode
  endIcon?: ReactNode
  rounded?: ButtonRounded
  loading?: boolean
  disabled?: boolean
  className?: string
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never
    external?: never
  }

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
    external?: boolean
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const baseButtonClasses =
  'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/40 focus-visible:ring-offset-2'

export default function Button({
  children,
  btnText,
  variant = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  rounded = 'md',
  loading = false,
  disabled = false,
  className,
  href,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  const classes = cn(
    baseButtonClasses,
    buttonClassMap[variant],
    buttonSizeClassMap[size],
    roundedClassMap[rounded],
    isDisabled && 'pointer-events-none opacity-60',
    className,
  )

  const content = (
    <>
      {startIcon ? <span className="shrink-0" aria-hidden="true">{startIcon}</span> : null}
      {btnText ? (
        <Typography variant="paragraph" as="span" className={cn(loading && 'opacity-0')}>
          {btnText}
        </Typography>
      ) : (
        children
      )}
      {loading && (
        <span className="absolute">
          <LoadingSpinner />
        </span>
      )}
      {endIcon ? <span className="shrink-0" aria-hidden="true">{endIcon}</span> : null}
    </>
  )

  if (href) {
    const { external, ...linkProps } = props as Omit<ButtonAsLink, keyof BaseProps | 'href'>
    return (
      <Link
        href={href}
        aria-disabled={isDisabled || undefined}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  const { type = 'button', ...buttonProps } = props as Omit<ButtonAsButton, keyof BaseProps>
  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  )
}