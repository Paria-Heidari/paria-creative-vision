import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import LoadingSpinner from '@/components/icons/LoadingSpinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      btnText,
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Variant classes with improved styling
    const variantClasses = {
      primary: 'bg-foreground text-white hover:bg-foreground/90 active:scale-[0.98] shadow-sm hover:shadow-lg',
      secondary: 'bg-accent text-foreground border border-foreground/10 hover:border-foreground/20 hover:bg-accent-hover/30 active:scale-[0.98] shadow-sm hover:shadow-md',
      tertiary: 'bg-transparent border-2 border-foreground/20 text-foreground hover:border-accent-gold hover:text-accent-gold active:scale-[0.98]',
      ghost: 'bg-transparent text-foreground hover:bg-foreground/5 active:bg-foreground/10',
      link: 'bg-transparent text-foreground hover:text-accent-gold underline-offset-4 hover:underline',
      gold: 'bg-accent-gold text-white hover:bg-accent-gold-hover active:scale-[0.98] shadow-md hover:shadow-lg',
    };

    // Size classes
    const sizeClasses = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base',
    };

    // Base classes
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-accent-gold/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100';

    // Combine classes
    const variantClass = variantClasses[variant];
    const sizeClass = sizeClasses[size];
    const combinedClassName = `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();

    // Determine content to display
    const content = children ?? btnText ?? null;

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-label={typeof content === 'string' ? content : undefined}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';


export default Button;
