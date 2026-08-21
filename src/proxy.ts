import { auth0 } from '@/lib/auth0/auth0';

export async function proxy(request: Request) {
  const authRes = await auth0.middleware(request);

  return authRes;
}

export const config = {
  matcher: [
    '/talent-atlas/(.*)', // talent-atlas app (requires auth)
    '/admin/(.*)', // admin CMS (requires auth)
    '/auth/(.*)', // Auth0 login / logout / callback routes
  ],
};

// The proxy layer automatically mounts these authentication routes:

// /auth/login - Redirects to Auth0 login page
// /auth/logout - Logs out the user
// /auth/callback - Handles the OAuth callback
// /auth/profile - Returns the user profile as JSON
// /auth/access-token - Returns the access token
// /auth/backchannel-logout - Receives a logout_token when a configured Back-Channel Logout initiator occurs
