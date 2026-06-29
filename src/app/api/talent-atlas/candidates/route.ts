import { NextRequest, NextResponse } from 'next/server';
import { WebSocket } from 'ws';
import { withAuth } from '@/lib/auth0/withAuth';
import { MOCK_CANDIDATES } from '@/data/talentAtlasMockData';
import { ROLES } from '@/lib/auth0/roles';

const notifyWsServer = (candidate: Record<string, unknown>) => {
  const ws = new WebSocket('ws://localhost:8080');
  ws.on('open', () => {
    ws.send(JSON.stringify({ type: 'new_candidate', data: candidate }));
    ws.close();
  });
};

// mutable in-memory store — persists until dev server restarts
const candidates = [...MOCK_CANDIDATES];
const roles = [ROLES.ADMIN, ROLES.COORDINATOR];

const handlerGet = async () => NextResponse.json(candidates);
const handlerPost = async (req: NextRequest) => {
  const body = await req.json();
  const newCandidate = {
    id: `temp-${Date.now()}`,
    stage: 'applied',
    ...body,
  };
  candidates.push(newCandidate);
  notifyWsServer(newCandidate);

  return NextResponse.json(newCandidate, { status: 201 });
};

export const GET = withAuth(roles, handlerGet);

export const POST = withAuth(roles, handlerPost);
