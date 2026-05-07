'use client';

import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileNav({ isOpen, onToggle }: MobileNavProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="focus:ring-accent-gold/30 relative flex h-10 w-10 items-center justify-center rounded-md focus:ring-2 focus:outline-none md:hidden"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden>
        <Menu
          className={cn(
            'text-foreground absolute size-6 transition-opacity duration-300',
            isOpen ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
          strokeWidth={2}
        />
        <X
          className={cn(
            'text-foreground absolute size-6 transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          strokeWidth={2}
        />
      </span>
    </button>
  );
}
