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

  if (!session) {
    redirect(
      `/auth/login?returnTo=${process.env.APP_BASE_URL?.replace(/\/$/, '')}${ROUTE.admin}`,
    );
  }

  const userRoles = (session.user as { roles?: string[] }).roles ?? [];
  const isAdmin = userRoles.includes(ROLES.ADMIN);

  if (!isAdmin) {
    // because Auth0 already has an active session and would bounce back here.
    redirect(ROUTE.talentAtlas);
  }

  return session;
}
