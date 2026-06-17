import { MOCK_COMPANIES } from '@/data/talentAtlasMockData';
import { ROLES } from '@/lib/auth0/roles';
import { withAuth } from '@/lib/auth0/withAuth';
import { NextResponse } from 'next/server';

const roles = [ROLES.ADMIN, ROLES.COMPANY, ROLES.COORDINATOR];
const handler = async () => NextResponse.json(MOCK_COMPANIES);

export const GET = withAuth(roles, handler);
