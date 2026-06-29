'use client';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from '@/hooks/useWebSocket';
import { wsEvents$, cleanEvents$ } from '@/lib/realtime/wsStream';
import { queryKeys } from '@/lib/query/queryKeys';
import type { WsEvent } from '@/types/ws.types';

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
  useWebSocket({
    url: 'ws://localhost:4000',
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
  }
}
