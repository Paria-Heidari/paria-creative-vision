'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/data/staticData';
import { Logo } from '@/components/branding/Logo';
import { Stack } from '@/components/layout/Stack';
import { cn } from '@/lib/utils/utils';
import { Typography } from '@/components/ui/Typography';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';

export default function Header() {
  const { isVisible, isHidden, isScrolled } = useHeaderScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'bg-surface-alt fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-out',
          isScrolled ? 'h-14 shadow-md' : 'h-16 shadow-sm',
          !isVisible
            ? '-translate-y-3 opacity-0'
            : isHidden
              ? '-translate-y-full'
              : 'translate-y-0',
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex-shrink-0 transition-transform duration-200"
          >
            <Logo className="h-auto w-36 transition-all duration-300 sm:w-44 md:w-52" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center md:flex">
            <Stack direction="horizontal" gap={{ base: 6, lg: 8 }}>
              <ul className="contents">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group relative">
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
                      <span
                        className={cn(
                          'bg-accent-gold absolute -bottom-1 left-0 h-0.5 transition-all duration-200 ease-out',
                          isActive(item.href)
                            ? 'w-full'
                            : 'w-0 group-hover:w-full',
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Stack>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:ring-accent-gold/30 relative flex h-10 w-10 items-center justify-center rounded-md focus:ring-2 focus:outline-none md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden>
              <Menu
                className={cn(
                  'text-foreground absolute size-6 transition-opacity duration-300',
                  isMobileMenuOpen
                    ? 'pointer-events-none opacity-0'
                    : 'opacity-100',
                )}
                strokeWidth={2}
              />
              <X
                className={cn(
                  'text-foreground absolute size-6 transition-opacity duration-300',
                  isMobileMenuOpen
                    ? 'opacity-100'
                    : 'pointer-events-none opacity-0',
                )}
                strokeWidth={2}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <nav
        className={cn(
          'bg-surface-alt fixed top-14 right-0 bottom-0 z-40 w-72 transform shadow-2xl transition-transform duration-300 ease-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
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
                    ? 'bg-accent-gold/15 border-accent-gold border-l-5'
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
            <Typography
              variant="caption"
              as="p"
              className="text-center tracking-wide"
            >
              © {currentYear} Paria Creative Vision
            </Typography>
          </div>
        </div>
      </nav>
    </>
  );
}
