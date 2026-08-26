import { LogOut } from 'lucide-react';
import { getSessionOrRedirect } from '@/lib/auth0/session';
import Image from 'next/image';

export async function SidebarUserFooter() {
  const session = await getSessionOrRedirect();
  const user = session.user;

  if (!user) return null;

  const initials = user.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : (user.email ?? '??').slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3 border-t border-slate-700/50 px-5 py-4">
      {user.picture ? (
        <Image
          src={user.picture}
          alt={user.name ?? ''}
          width={32}
          height={32}
          className="rounded-full"
          unoptimized
        />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-600 text-xs font-semibold text-white">
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{user.name ?? user.email}</p>
        <p className="truncate text-xs text-slate-400">{user.email}</p>
      </div>
      <a
        href={`/auth/logout?returnTo=${process.env.APP_BASE_URL}`}
        className="shrink-0 text-slate-400 transition-colors hover:text-white"
        title="Sign out"
      >
        <LogOut size={15} />
      </a>
    </div>
  );
}
