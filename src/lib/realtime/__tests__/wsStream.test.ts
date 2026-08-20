import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { Subject } from 'rxjs';
import type { Observable } from 'rxjs';
import type { WsEvent, CandidateUpdatedEvent } from '@/types/ws.types';

// Helpers — build valid typed events without repeating all fields
function candidateEvent(
  id: string,
  stage: string,
  eventId: string,
): CandidateUpdatedEvent {
  return {
    type: 'candidate_updated',
    eventId,
    payload: {
      candidateId: id,
      candidateName: 'Test',
      stage,
      campaignId: 'c1',
    },
    timestamp: Date.now(),
  };
}

// Each test gets fresh module state via resetModules + dynamic import.
// This clears the SEEN_EVENTS Set and resets the wsEvents$ Subject.
async function freshStream(): Promise<{
  wsEvents$: Subject<WsEvent>;
  cleanEvents$: Observable<WsEvent[]>;
}> {
  vi.resetModules();
  return import('@/lib/realtime/wsStream');
}

// Collect all batches emitted while fn() runs, then flush the 200ms buffer
async function collect(
  cleanEvents$: Observable<WsEvent[]>,
  wsEvents$: Subject<WsEvent>,
  fn: () => void,
): Promise<WsEvent[][]> {
  const batches: WsEvent[][] = [];
  const sub = cleanEvents$.subscribe((b) => batches.push(b));
  fn();
  vi.advanceTimersByTime(200);
  sub.unsubscribe();
  return batches;
}

describe('wsStream pipeline', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('drops a duplicate eventId, passes the first through', async () => {
    const { wsEvents$, cleanEvents$ } = await freshStream();

    const batches = await collect(cleanEvents$, wsEvents$, () => {
      wsEvents$.next(candidateEvent('1', 'applied', 'evt-1'));
      wsEvents$.next(candidateEvent('1', 'interview', 'evt-1')); // same id
    });

    const events = batches.flat() as CandidateUpdatedEvent[];
    expect(events).toHaveLength(1);
    expect(events[0].payload.stage).toBe('applied'); // first wins, second dropped
  });

  it('coalesces multiple updates to the same entity within 200ms', async () => {
    const { wsEvents$, cleanEvents$ } = await freshStream();

    const batches = await collect(cleanEvents$, wsEvents$, () => {
      wsEvents$.next(candidateEvent('1', 'applied', 'evt-2'));
      wsEvents$.next(candidateEvent('1', 'screening', 'evt-3'));
      wsEvents$.next(candidateEvent('1', 'interview', 'evt-4')); // latest
    });

    const events = batches.flat() as CandidateUpdatedEvent[];
    expect(events).toHaveLength(1);
    expect(events[0].payload.stage).toBe('interview'); // latest survives
  });

  it('emits nothing for an empty 200ms window', async () => {
    const { cleanEvents$ } = await freshStream();

    const batches: WsEvent[][] = [];
    const sub = cleanEvents$.subscribe((b) => batches.push(b));
    vi.advanceTimersByTime(200);
    sub.unsubscribe();

    expect(batches).toHaveLength(0);
  });

  it('evicts the oldest entry when SEEN_EVENTS exceeds 10,000', async () => {
    const { wsEvents$, cleanEvents$ } = await freshStream();

    const batches: WsEvent[][] = [];
    const sub = cleanEvents$.subscribe((b) => batches.push(b));

    // Fill the set to exactly 10,000 entries
    for (let i = 1; i <= 10_000; i++) {
      wsEvents$.next(candidateEvent(String(i), 'applied', `fill-${i}`));
    }
    vi.advanceTimersByTime(200);

    // Push entry 10,001 — triggers eviction of 'fill-1' (the oldest)
    wsEvents$.next(candidateEvent('10001', 'applied', 'fill-10001'));

    // Now re-send 'fill-1' — it should be treated as new (was evicted)
    wsEvents$.next(candidateEvent('1', 'hired', 'fill-1'));
    vi.advanceTimersByTime(200);

    sub.unsubscribe();

    const lastBatch = batches.at(-1) ?? [];
    const replayedEvent = lastBatch.find(
      (e) => 'eventId' in e && e.eventId === 'fill-1',
    );
    expect(replayedEvent).toBeDefined(); // fill-1 was evicted, so it passes through
  });
});
