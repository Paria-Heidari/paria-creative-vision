import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
// Testing --- no session, wrong role, matching role
vi.mock('@/lib/auth0/auth0', () => ({
  auth0: { getSession: vi.fn() },
}));

import { withAuth } from '@/lib/auth0/withAuth';
import { auth0 } from '@/lib/auth0/auth0';
import { ROLES } from '@/lib/auth0/roles';

const mockGetSession = vi.mocked(auth0.getSession);

const makeRequest = () =>
  new NextRequest('http://localhost/api/test', { method: 'GET' });

const makeCtx = () => ({
  params: Promise.resolve({} as Record<string, string>),
});

// A handler that always succeeds — used to verify withAuth calls through
const successHandler = vi
  .fn()
  .mockResolvedValue(new Response('ok', { status: 200 }));

describe('withAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 when there is no session', async () => {
    mockGetSession.mockResolvedValue(null);

    const handler = withAuth([ROLES.ADMIN], successHandler);
    const res = await handler(makeRequest(), makeCtx());

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: 'Unauthorized' });
    expect(successHandler).not.toHaveBeenCalled();
  });

  it('returns 403 when the user has no matching role', async () => {
    mockGetSession.mockResolvedValue({
      user: { roles: [ROLES.CANDIDATE] },
    } as never);

    const handler = withAuth([ROLES.ADMIN, ROLES.COORDINATOR], successHandler);
    const res = await handler(makeRequest(), makeCtx());

    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: 'Forbidden' });
    expect(successHandler).not.toHaveBeenCalled();
  });

  it('calls the handler when the user has a matching role', async () => {
    mockGetSession.mockResolvedValue({
      user: { roles: [ROLES.COORDINATOR] },
    } as never);

    const handler = withAuth([ROLES.ADMIN, ROLES.COORDINATOR], successHandler);
    const res = await handler(makeRequest(), makeCtx());

    expect(res.status).toBe(200);
    expect(successHandler).toHaveBeenCalledOnce();
  });
});
