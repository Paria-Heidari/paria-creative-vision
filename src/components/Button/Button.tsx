import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import LoadingSpinner from '@/components/icons/LoadingSpinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      btnText,
      children,
      variant = 'primary',
      loading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Variant classes
    const variantClasses = {
      primary: 'bg-foreground text-accent hover:bg-foreground/90 active:bg-accent/80 shadow-sm hover:shadow-md',
      secondary: 'bg-accent text-foreground border border-foreground/10 hover:border-foreground/20 active:bg-accent/90 shadow-sm hover:shadow-md',
      tertiary: 'bg-transparent border border-foreground text-foreground hover:bg-foreground/5 active:bg-foreground/10 shadow-sm hover:shadow-md',
      ghost: 'bg-transparent text-foreground hover:bg-foreground/5 active:bg-foreground/10 shadow-sm hover:shadow-md',
      link: 'bg-transparent text-foreground hover:text-foreground/70 underline-offset-4 hover:underline shadow-sm hover:shadow-md',
    };

    // Base classes
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Combine classes
    const variantClass = variantClasses[variant];
    const combinedClassName = `${baseClasses} ${variantClass} ${className}`.trim();

    // Determine content to display
    const content = children ?? btnText ?? null;


    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-label={content as string}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {content && <span>{content}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';


export default Button;
