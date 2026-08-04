'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import Stack from '@/components/layout/Stack/Stack';
import { cn } from '@/lib/utils/utils';
import { navigation } from '@/data/staticData';
import { routes as ROUTES } from '@/lib/routes/routes';

interface NavItemProps {
  href: string;
  name: string;
  isActive: boolean;
}

const adminLink = `/auth/login?returnTo=${ROUTES.admin}`;

const NavItemLink = ({ href, name, isActive }: NavItemProps) => (
  <li className="group relative">
    <Link href={href}>
      <Typography
        variant="navLink"
        as="span"
        className={cn(
          isActive
            ? 'text-accent-gold'
            : 'text-foreground/70 group-hover:text-foreground',
        )}
      >
        {name}
      </Typography>
      <span
        className={cn(
          'bg-accent-gold absolute -bottom-1 left-0 h-0.5 transition-all duration-200 ease-out',
          isActive ? 'w-full' : 'w-0 group-hover:w-full',
        )}
      />
    </Link>
  </li>
);

export default function DesktopNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <nav className="hidden items-center md:flex">
      <Stack direction="horizontal" gap={{ base: 6, lg: 8 }}>
        <ul className="contents">
          {navigation.map((item) => (
            <NavItemLink
              key={item.href}
              href={item.href}
              name={item.name}
              isActive={isActive(item.href)}
            />
          ))}
        </ul>
        <li className="group relative ml-4 flex items-center gap-3">
          <span className="bg-foreground/20 h-3.5 w-px" />
          <Link href={adminLink} className="flex items-center gap-1.5">
            <Lock className="text-foreground/40 group-hover:text-accent-gold h-3 w-3 transition-colors duration-200" aria-hidden="true" />
            <Typography
              variant="navLink"
              as="span"
              className="text-foreground/40 group-hover:text-accent-gold transition-colors duration-200"
            >
              Admin
            </Typography>
            <span className="bg-accent-gold absolute -bottom-1 left-7 h-0.5 w-0 transition-all duration-200 ease-out group-hover:w-[calc(100%-1.75rem)]" />
          </Link>
        </li>
      </Stack>
    </nav>
  );
}
