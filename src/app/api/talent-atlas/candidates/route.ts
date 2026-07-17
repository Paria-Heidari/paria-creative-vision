import { NextRequest, NextResponse } from 'next/server';
import { WebSocket } from 'ws';
import { withAuth } from '@/lib/auth0/withAuth';
import { MOCK_CANDIDATES } from '@/data/talentAtlasMockData';
import { ROLES } from '@/lib/auth0/roles';
import type { CandidateCreatedEvent } from '@/types/ws.types';

type Candidate = (typeof MOCK_CANDIDATES)[number];

const notifyWsServer = (candidate: Candidate) => {
  const ws = new WebSocket(
    `ws://localhost:${process.env.NEXT_PUBLIC_WS_PORT ?? 4000}`,
  );
  ws.on('open', () => {
    const event: CandidateCreatedEvent = {
      type: 'candidate_created',
      eventId: `candidate-created-${candidate.id}`,
      payload: {
        candidateId: candidate.id,
        fullName: candidate.full_name,
        email: candidate.email,
        stage: candidate.stage,
        campaignId: candidate.campaign_id,
      },
      timestamp: Date.now(),
    };
    ws.send(JSON.stringify(event));
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
