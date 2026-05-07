'use client';

import Link from 'next/link';
import { navigation } from '@/data/staticData';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils/utils';

const CURRENT_YEAR = new Date().getFullYear();

interface MobileNavDrawerProps {
  isOpen: boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ isOpen, isActive, onClose }: MobileNavDrawerProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        aria-hidden={!isOpen}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        className={cn(
          'bg-surface-alt fixed top-14 right-0 bottom-0 z-40 w-72 transform shadow-2xl transition-transform duration-300 ease-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <ul className="flex flex-col gap-2 p-6 pt-8">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-lg px-4 py-3 transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-accent-gold/15 border-accent-gold border-l-4'
                    : 'hover:bg-foreground/5 hover:translate-x-1',
                )}
              >
                <Typography
                  variant="navLink"
                  as="span"
                  className={cn(
                    isActive(item.href)
                      ? 'text-accent-gold'
                      : 'text-foreground/70 group-hover:text-foreground',
                  )}
                >
                  {item.name}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute right-0 bottom-8 left-0 px-6">
          <div className="border-foreground/10 border-t pt-6">
            <Typography variant="caption" as="p" className="text-center tracking-wide">
              © {CURRENT_YEAR} Paria Creative Vision
            </Typography>
          </div>
        </div>
      </nav>
    </>
  );
}
