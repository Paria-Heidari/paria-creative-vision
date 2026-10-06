import Link from 'next/link';
import { cn } from '@/lib/utils/utils';

interface AdminTopBarProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export default function AdminTopBar({ title, subtitle, action, className }: AdminTopBarProps) {
  return (
    <header
      className={cn(
        'flex h-[52px] shrink-0 items-center justify-between border-b border-border bg-surface px-7',
        className,
      )}
    >
      <div className="flex items-baseline gap-3">
        <p className="font-grotesk text-[17px] font-semibold leading-none text-foreground">
          {title}
        </p>
        {subtitle && (
          <p className="font-inter text-[13px] leading-none text-foreground-subtle">{subtitle}</p>
        )}
      </div>

      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="font-inter flex items-center gap-1.5 rounded-md bg-action-primary px-3.5 py-1.5 text-[13px] font-medium text-on-action-primary transition-colors hover:bg-action-primary-hover"
          >
            <span className="text-[15px] leading-none">+</span>
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="font-inter flex items-center gap-1.5 rounded-md bg-action-primary px-3.5 py-1.5 text-[13px] font-medium text-on-action-primary transition-colors hover:bg-action-primary-hover"
          >
            <span className="text-[15px] leading-none">+</span>
            {action.label}
          </button>
        )
      )}
    </header>
  );
}