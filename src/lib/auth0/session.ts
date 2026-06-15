import { auth0 } from '@/lib/auth0/auth0';
import { redirect } from 'next/navigation';
import { routes as ROUTE } from '@/lib/routes/routes';

export async function getSessionOrRedirect() {
  const session = await auth0.getSession();

  if (!session) {
    redirect(
      `/auth/login?returnTo=${process.env.APP_BASE_URL}${ROUTE.talentAtlasDashboard}`,
    );
  }
  return session;
}
