import { MOCK_CAMPAIGNS } from '@/data/talentAtlasMockData';
import { ROLES } from '@/lib/auth0/roles';
import { withAuth } from '@/lib/auth0/withAuth';
import { NextResponse } from 'next/server';

const roles = [ROLES.ADMIN, ROLES.COORDINATOR, ROLES.COMPANY];
const handler = async () => {
  return NextResponse.json(MOCK_CAMPAIGNS);
};

export const GET = withAuth(roles, handler);
