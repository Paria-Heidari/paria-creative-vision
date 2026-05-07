'use client';

import { usePathname } from 'next/navigation';
import { navigation } from '@/data/staticData';
import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import Stack from '../Stack/Stack';
import { cn } from '@/lib/utils/utils';

interface NavItemProps {
  href: string;
  name: string;
  isActive: boolean;
}

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
      </Stack>
    </nav>
  );
}
