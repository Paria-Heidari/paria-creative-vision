'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/branding/Logo';
import { cn } from '@/lib/utils/utils';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import MobileNavOverlay from './MobileNavOverlay';

export default function Header() {
  const { hasMounted, isHiddenByScroll, isScrolled } = useHeaderScroll();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  const isScrolledClass = isScrolled ? 'h-16 shadow-md' : 'h-16 shadow-sm';
  const hasMountedClass = !hasMounted ? '-translate-y-3 opacity-0' : '';
  const isHiddenByScrollClass = isHiddenByScroll
    ? '-translate-y-full'
    : 'translate-y-0';

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={cn(
          'bg-surface-alt fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-out',
          isScrolledClass,
          hasMountedClass,
          isHiddenByScrollClass,
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex-shrink-0 transition-transform duration-200"
          >
            <Logo className="h-auto w-36 transition-all duration-300 sm:w-44 md:w-52" />
          </Link>
          <DesktopNav />
          <MobileNav
            isOpen={isMobileOpen}
            onToggle={() => setIsMobileOpen(!isMobileOpen)}
          />
        </div>
      </header>
      <MobileNavOverlay
        isOpen={isMobileOpen}
        isActive={isActive}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
