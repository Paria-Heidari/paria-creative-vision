import { MOCK_CANDIDATES } from '@/data/talentAtlasMockData';
import { ROLES } from '@/lib/auth0/roles';
import { withAuth } from '@/lib/auth0/withAuth';
import { NextRequest, NextResponse } from 'next/server';

const roles = [ROLES.ADMIN, ROLES.COORDINATOR];
const handlerGet = async () => NextResponse.json(MOCK_CANDIDATES);
const handlerPost = async (req: NextRequest) => {
  const body = await req.json();
  const newCandidate = {
    id: `temp-${Date.now()}`,
    stage: 'applied',
    ...body,
  };
  return NextResponse.json(newCandidate, { status: 201 });
};

export const GET = withAuth(roles, handlerGet);

export const POST = withAuth(roles, handlerPost);
