import { auth0 } from '@/lib/auth0/auth0';
import { redirect } from 'next/navigation';

export async function DashboardContent() {
  const session = await auth0.getSession();

  // user does not have a session — redirect to login
  if (!session) {
    redirect('/auth/login?returnTo=/talentAtlas/dashboard');
  }

  const user = session?.user;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <p>Logged in as {user?.email}</p>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a href="/auth/logout?returnTo=/talentAtlas/dashboard" className="text-blue-500 hover:underline">
        Logout
      </a>
    </div>
  );
}
