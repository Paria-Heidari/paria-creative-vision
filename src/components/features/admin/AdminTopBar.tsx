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
        'flex h-[52px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-7',
        className,
      )}
    >
      <div className="flex items-baseline gap-3">
        <p className="font-grotesk text-[17px] font-semibold leading-none text-slate-900">
          {title}
        </p>
        {subtitle && (
          <p className="font-inter text-[13px] leading-none text-slate-400">{subtitle}</p>
        )}
      </div>

      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="font-inter flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-slate-700"
          >
            <span className="text-[15px] leading-none">+</span>
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="font-inter flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-slate-700"
          >
            <span className="text-[15px] leading-none">+</span>
            {action.label}
          </button>
        )
      )}
    </header>
  );
}