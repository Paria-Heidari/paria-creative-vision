'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Images, Upload, ArrowLeft, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

const navItems = [
  { label: 'All Photos', href: '/admin/photos', icon: Images },
  { label: 'Upload', href: '/admin/upload', icon: Upload },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-[220px] shrink-0 flex-col bg-[#0F172A]">
      {/* Logo */}
      <div className="border-b border-white/[0.06] px-5 py-5">
        <p className="font-grotesk text-[11px] font-bold tracking-[0.18em] text-white uppercase">
          paria.eu
        </p>
        <p className="font-inter mt-0.5 text-[10px] tracking-[0.1em] text-slate-500 uppercase">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <p className="font-inter mb-1.5 px-2.5 text-[10px] font-semibold tracking-[0.14em] text-slate-600 uppercase">
          Content
        </p>

        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'font-inter flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] leading-none transition-colors duration-150',
                    isActive
                      ? 'bg-white/[0.08] font-medium text-slate-100'
                      : 'font-normal text-slate-400 hover:bg-white/[0.05] hover:text-slate-200',
                  )}
                >
                  <Icon
                    className={cn('h-[15px] w-[15px] shrink-0', isActive ? 'opacity-100' : 'opacity-50')}
                    aria-hidden
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-3 py-4 flex flex-col gap-0.5">
        <Link
          href="/"
          className="font-inter flex items-center gap-2 px-2.5 py-2 text-[12px] text-slate-500 transition-colors duration-150 hover:text-slate-300"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Back to site
        </Link>
        <Link
          href="/auth/logout?returnTo=https://paria.eu"
          className="font-inter flex items-center gap-2 px-2.5 py-2 text-[12px] text-slate-500 transition-colors duration-150 hover:text-red-400"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Log out
        </Link>
      </div>
    </aside>
  );
}