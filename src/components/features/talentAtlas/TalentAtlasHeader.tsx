'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes as ROUTE } from '@/lib/routes/routes';

const navItems = [
  { label: 'Dashboard', href: ROUTE.talentAtlasDashboard },
  { label: 'Members', href: ROUTE.talentAtlasMembers },
];

export function TalentAtlasHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-12 shrink-0 items-center gap-8 bg-[#0f1929] px-6">
      <span className="font-[family-name:var(--font-family-syne)] text-xs font-bold tracking-[0.18em] text-white uppercase">
        TalentAtlas
      </span>
      <nav className="flex items-center gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 font-medium text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
