import { Subject, filter, bufferTime, map } from 'rxjs';
import type { WsEvent } from '@/types/ws.types';

// The single shared event stream for the entire app.
// All WebSocket events flow through here.
export const wsEvents$ = new Subject<WsEvent>();

// Bounded deduplication set — prevents memory leak on long sessions
const SEEN_EVENTS = new Set<string>();
const MAX_SEEN = 10_000;

function isDuplicate(event: WsEvent): boolean {
  if (!('eventId' in event)) return false; // connected event has no ID — pass through
  if (SEEN_EVENTS.has(event.eventId)) {
    console.warn('[WS] Duplicate event dropped:', event.eventId);
    return true;
  }
  SEEN_EVENTS.add(event.eventId);
  // Prevent unbounded memory growth: evict oldest entry when limit reached
  if (SEEN_EVENTS.size > MAX_SEEN) {
    const oldest = SEEN_EVENTS.values().next().value;
    if (oldest !== undefined) SEEN_EVENTS.delete(oldest);
  }
  return false;
}

// Extract a stable entity ID for coalescing updates within a buffer window
function getEntityId(event: WsEvent): string {
  if (event.type === 'candidate_updated') return event.payload.candidateId;
  if (event.type === 'campaign_updated') return event.payload.campaignId;
  if (event.type === 'company_feedback') return event.payload.candidateId;
  return String(event.timestamp);
}

// Pipeline: deduplicate → batch → coalesce → emit arrays
export const cleanEvents$ = wsEvents$.pipe(
  filter((event) => !isDuplicate(event)), // drop duplicate eventIds
  bufferTime(200), // collect events for 200ms
  filter((batch) => batch.length > 0), // skip empty 200ms windows
  map((batch) => {
    // If the same entity was updated multiple times in the 200ms window,
    // keep only the latest update
    const latestById = new Map<string, WsEvent>();
    for (const event of batch) {
      latestById.set(getEntityId(event), event);
    }
    return Array.from(latestById.values());
  }),
);
