import { auth0 } from '@/lib/auth0/auth0';

export async function proxy(request: Request) {
  const authRes = await auth0.middleware(request);

  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - api (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)',
  ],
};

// The proxy layer automatically mounts these authentication routes:

// /auth/login - Redirects to Auth0 login page
// /auth/logout - Logs out the user
// /auth/callback - Handles the OAuth callback
// /auth/profile - Returns the user profile as JSON
// /auth/access-token - Returns the access token
// /auth/backchannel-logout - Receives a logout_token when a configured Back-Channel Logout initiator occurs
