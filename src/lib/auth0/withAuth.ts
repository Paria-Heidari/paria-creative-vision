import { NextRequest, NextResponse } from 'next/server';
import { hasAnyRole, type Role } from '@/lib/auth0/roles';
import { auth0 } from '@/lib/auth0/auth0';

type BaseSession = NonNullable<Awaited<ReturnType<typeof auth0.getSession>>>;
type AppSession = BaseSession & {
  user: BaseSession['user'] & { roles: Role[] };
};
type RouteHandlerContext = {
  params: Promise<{ [key: string]: string }>;
};

type AuthHandler = (
  req: NextRequest,
  ctx: RouteHandlerContext,
  session: AppSession,
) => Promise<Response>;

const bypassAuth =
  process.env.NODE_ENV === 'development' && process.env.AUTH_BYPASS === 'true';

export function withAuth(allowedRoles: Role[], authHandler: AuthHandler) {
  const handler = async (req: NextRequest, ctx: RouteHandlerContext) => {
    if (bypassAuth) {
      return authHandler(req, ctx, {} as AppSession);
    }
    const session = (await auth0.getSession()) as AppSession | null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasAnyRole(session.user.roles, allowedRoles)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return authHandler(req, ctx, session);
  };

  return handler;
}
