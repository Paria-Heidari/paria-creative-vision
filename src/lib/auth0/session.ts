import { auth0 } from '@/lib/auth0/auth0';
import { redirect } from 'next/navigation';
import { routes as ROUTE } from '@/lib/routes/routes';
import { ROLES } from './roles';

export async function getSessionOrRedirect() {
  const session = await auth0.getSession();

  if (!session) {
    redirect(
      `/auth/login?returnTo=${process.env.APP_BASE_URL?.replace(/\/$/, '')}${ROUTE.talentAtlasDashboard}`,
    );
  }
  return session;
}

export async function getAdminSessionOrRedirect() {
  const session = await auth0.getSession();

  const userRoles = session?.user?.roles ?? [];
  const isAdmin = userRoles.includes(ROLES.ADMIN);
  if (!session || !isAdmin) {
    redirect(
      `/auth/login?returnTo=${process.env.APP_BASE_URL?.replace(/\/$/, '')}${ROUTE.admin}`,
    );
  }
  return session;
}
