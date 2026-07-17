'use client';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from '@/hooks/useWebSocket';
import { wsEvents$, cleanEvents$ } from '@/lib/realtime/wsStream';
import { queryKeys } from '@/lib/query/queryKeys';
import type { WsEvent } from '@/types/ws.types';
import type { CandidateFeedback } from '@/hooks/talent-atlas/useCandidates';

// Connects WS server → RxJS pipeline → TanStack cache
// Drop this hook once in the (app) layout — one connection for the entire app
export function useRealtimeSync() {
  const queryClient = useQueryClient();

  // Subscribe RxJS pipeline output to TanStack cache
  useEffect(() => {
    const sub = cleanEvents$.subscribe((batch) => {
      for (const event of batch) {
        applyEventToCache(queryClient, event);
      }
    });
    return () => sub.unsubscribe();
  }, [queryClient]);

  // Feed raw WS events into the RxJS Subject
  const wsUrl =
    process.env.NEXT_PUBLIC_WS_URL ??
    `ws://localhost:${process.env.NEXT_PUBLIC_WS_PORT ?? 4000}`;

  useWebSocket({
    url: wsUrl,
    onEvent: (event) => wsEvents$.next(event),
  });
}

function applyEventToCache(
  queryClient: ReturnType<typeof useQueryClient>,
  event: WsEvent,
) {
  switch (event.type) {
    case 'candidate_updated': {
      queryClient.setQueryData(
        queryKeys.candidates,
        (old: { id: string; stage: string }[] = []) =>
          old.map((c) =>
            c.id === event.payload.candidateId
              ? { ...c, stage: event.payload.stage }
              : c,
          ),
      );
      break;
    }
    case 'campaign_updated': {
      queryClient.setQueryData(
        queryKeys.campaigns,
        (
          old: {
            id: string;
            applied_count: number;
            hired_count: number;
          }[] = [],
        ) =>
          old.map((c) =>
            c.id === event.payload.campaignId
              ? {
                  ...c,
                  applied_count: event.payload.applied_count,
                  hired_count: event.payload.hired_count,
                }
              : c,
          ),
      );
      break;
    }
    case 'candidate_created': {
      queryClient.setQueryData(
        queryKeys.candidates,
        (
          old: {
            id: string;
            full_name: string;
            email: string;
            stage: string;
            campaign_id: string;
          }[] = [],
        ) => [
          {
            id: event.payload.candidateId,
            full_name: event.payload.fullName,
            email: event.payload.email,
            stage: event.payload.stage,
            campaign_id: event.payload.campaignId,
          },
          ...old,
        ],
      );
      break;
    }
    case 'company_feedback': {
      queryClient.setQueryData(
        queryKeys.candidates,
        (old: { id: string; latestFeedback?: CandidateFeedback }[] = []) =>
          old.map((c) =>
            c.id === event.payload.candidateId
              ? {
                  ...c,
                  latestFeedback: {
                    company: event.payload.company,
                    feedback: event.payload.feedback,
                    decision: event.payload.decision,
                  },
                }
              : c,
          ),
      );
      break;
    }
  }
}
