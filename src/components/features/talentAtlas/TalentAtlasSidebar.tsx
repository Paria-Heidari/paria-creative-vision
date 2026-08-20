'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings } from 'lucide-react';
import { routes as ROUTE } from '@/lib/routes/routes';
import { ROLES, type Role } from '@/lib/auth0/roles';
import { Typography } from '@/components/ui/Typography';

const sections = [
  {
    label: 'Overview',
    allowedRoles: [ROLES.ADMIN, ROLES.COORDINATOR, ROLES.COMPANY, ROLES.CANDIDATE] as Role[],
    items: [{ label: 'Dashboard', href: ROUTE.talentAtlasDashboard, icon: LayoutDashboard, badge: null }],
  },
  {
    label: 'Hiring',
    allowedRoles: [ROLES.ADMIN, ROLES.COORDINATOR] as Role[],
    items: [{ label: 'Candidates', href: ROUTE.talentAtlasCandidates, icon: Users, badge: null }],
  },
  {
    label: 'Campaigns',
    allowedRoles: [ROLES.ADMIN, ROLES.COORDINATOR, ROLES.COMPANY] as Role[],
    items: [{ label: 'Overview', href: ROUTE.talentAtlasCampaigns, icon: LayoutDashboard, badge: null }],
  },
  {
    label: 'Companies',
    allowedRoles: [ROLES.ADMIN, ROLES.COORDINATOR, ROLES.COMPANY] as Role[],
    items: [{ label: 'Overview', href: ROUTE.talentAtlasCompanies, icon: LayoutDashboard, badge: null }],
  },
  {
    label: 'Admin',
    allowedRoles: [ROLES.ADMIN, ROLES.COORDINATOR] as Role[],
    items: [{ label: 'Settings', href: ROUTE.talentAtlasSettings, icon: Settings, badge: null }],
  },
];

export function TalentAtlasSidebar({ footer, roles }: { footer?: ReactNode; roles: Role[] }) {
  const pathname = usePathname();
  const visibleSections = sections.filter((s) =>
    s.allowedRoles.some((r) => roles.includes(r)),
  );

  return (
    <aside className="flex w-80 shrink-0 flex-col bg-[#0f1929]">
      {/* Org header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fuchsia-700 text-sm font-bold text-white">
          TA
        </div>
        <div className="min-w-0">
          <Link href={ROUTE.talentAtlas}>
            <Typography
              variant="h6"
              className="truncate font-semibold text-white"
            >
              TalentAtlas
            </Typography>
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-6 px-3 pb-4">
        {visibleSections.map((section) => (
          <div key={section.label}>
            <p className="mb-1 px-2 text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-slate-700/60 font-medium text-white'
                          : 'text-slate-300 hover:bg-slate-700/30 hover:text-white'
                      }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge !== null && (
                        <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {footer}
    </aside>
  );
}
