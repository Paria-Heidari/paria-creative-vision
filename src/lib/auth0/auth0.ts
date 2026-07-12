import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { decodeJwt } from 'jose';

// Must match exactly what the Auth0 Action sets on the token
const ROLES_CLAIM = 'https://paria.eu/roles';

export const auth0 = new Auth0Client({
  async beforeSessionSaved(session, idToken) {
    if (!idToken) return session;

    const claims = decodeJwt(idToken);

    return {
      ...session,
      user: {
        ...session.user,
        roles: (claims[ROLES_CLAIM] as string[]) ?? [],
      },
    };
  },
});
