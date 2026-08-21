import { NextRequest, NextResponse } from 'next/server';
import { WebSocket } from 'ws';
import { withAuth } from '@/lib/auth0/withAuth';
import { ROLES } from '@/lib/auth0/roles';
import { CreateCandidateSchema } from '@/lib/schemas/talentAtlas';
import { candidatesStore } from '@/lib/store/talentAtlasStore';
import type { CandidateCreatedEvent } from '@/types/ws.types';

type Candidate = (typeof candidatesStore)[number];

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

const roles = [ROLES.ADMIN, ROLES.COORDINATOR];

const handlerGet = async () => NextResponse.json(candidatesStore);
const handlerPost = async (req: NextRequest) => {
  const parsed = CreateCandidateSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, campaign_id } = parsed.data;
  const duplicate = candidatesStore.some(
    (c) =>
      c.email.toLowerCase() === email.toLowerCase() &&
      c.campaign_id === campaign_id,
  );
  if (duplicate) {
    return NextResponse.json(
      { error: 'This candidate has already been added to this campaign' },
      { status: 409 },
    );
  }

  const newCandidate = {
    id: `temp-${Date.now()}`,
    stage: 'applied' as const,
    ...parsed.data,
  };
  candidatesStore.push(newCandidate);
  notifyWsServer(newCandidate);

  return NextResponse.json(newCandidate, { status: 201 });
};

export const GET = withAuth(roles, handlerGet);

export const POST = withAuth(roles, handlerPost);
