import { NextRequest, NextResponse } from 'next/server';
import { WebSocket } from 'ws';
import { withAuth } from '@/lib/auth0/withAuth';
import { ROLES } from '@/lib/auth0/roles';
import { UpdateCandidateStageSchema } from '@/lib/schemas/talentAtlas';
import { candidatesStore } from '@/lib/store/talentAtlasStore';
import type { CandidateUpdatedEvent } from '@/types/ws.types';

export const PATCH = withAuth([ROLES.ADMIN, ROLES.COORDINATOR], async (req: NextRequest, ctx) => {
  const { id } = await ctx.params;
  const parsed = UpdateCandidateStageSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const idx = candidatesStore.findIndex((c) => c.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
  }

  candidatesStore[idx] = { ...candidatesStore[idx], stage: parsed.data.stage };
  const updated = candidatesStore[idx];

  const ws = new WebSocket(`ws://localhost:${process.env.NEXT_PUBLIC_WS_PORT ?? 4000}`);
  ws.on('open', () => {
    const event: CandidateUpdatedEvent = {
      type: 'candidate_updated',
      eventId: `candidate-updated-${updated.id}-${Date.now()}`,
      payload: {
        candidateId: updated.id,
        candidateName: updated.full_name,
        stage: updated.stage,
        campaignId: updated.campaign_id,
      },
      timestamp: Date.now(),
    };
    ws.send(JSON.stringify(event));
    ws.close();
  });

  return NextResponse.json(updated);
});
