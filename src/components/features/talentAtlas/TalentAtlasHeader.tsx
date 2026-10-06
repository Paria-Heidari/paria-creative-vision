'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes as ROUTE } from '@/lib/routes/routes';

const navItems = [
  { label: 'Dashboard', href: ROUTE.talentAtlasDashboard },
  { label: 'Companies', href: ROUTE.talentAtlasCompanies },
  { label: 'Candidates', href: ROUTE.talentAtlasCandidates },
  { label: 'Campaigns', href: ROUTE.talentAtlasCampaigns },
  { label: 'Settings', href: ROUTE.talentAtlasSettings },
];

export function TalentAtlasHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-12 shrink-0 items-center gap-8 bg-chrome px-6">
      <span className="font-[family-name:var(--font-family-syne)] text-xs font-bold tracking-[0.18em] text-on-chrome uppercase">
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
                  ? 'bg-accent font-medium text-on-accent'
                  : 'text-on-chrome-muted hover:text-on-chrome'
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
