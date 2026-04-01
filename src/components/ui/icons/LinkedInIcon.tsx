import React from 'react';

interface LinkedInIconProps {
  className?: string;
}

export default function LinkedInIcon({ className = 'w-6 h-6' }: LinkedInIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6A2.5 2.5 0 0 1 0 3.5C0 2.12 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h3.98v12H.5V8Zm7 0h3.81v1.7h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.09V20h-3.98v-5.58c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H7.5V8Z" />
    </svg>
  );
}
