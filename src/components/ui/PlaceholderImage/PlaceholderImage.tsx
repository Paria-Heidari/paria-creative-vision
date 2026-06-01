interface PlaceholderImageProps {
  label?: string;
  className?: string;
}

export default function PlaceholderImage({
  label = 'Preview coming soon',
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={`bg-surface-muted flex w-full items-center justify-center ${className ?? ''}`}
      style={{ minHeight: '400px' }}
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          className="text-foreground-subtle"
        >
          <rect
            x="4"
            y="8"
            width="40"
            height="32"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M4 32l10-8 8 6 8-10 14 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-foreground-subtle text-sm">{label}</span>
      </div>
    </div>
  );
}
