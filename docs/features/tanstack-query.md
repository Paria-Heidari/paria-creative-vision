## TanStack Query + Realtime — Talent Atlas

Purpose:
Server-state cache for Talent Atlas data (candidates, campaigns, companies). Kept live by piping WebSocket events directly into the TanStack Query cache instead of polling or refetching — candidate stage changes, campaign counts, and company feedback need to appear instantly without a page refresh.

Flow:

QueryProvider (mounts QueryClient)
↓
Page calls a hook (`useCandidates` / `useCampaigns` / `useCompanies`)
↓
`fetch('/api/talent-atlas/*')` on mount / cache miss
↓
Data cached under a `queryKeys.*` key, `staleTime: 60s`

In parallel, once per app session:

```
WS Server (ws-server.ts, port NEXT_PUBLIC_WS_PORT, default 4000)
  └── useWebSocket          # raw connection + exponential-backoff reconnect (1s → 30s max)
        └── wsEvents$       # RxJS Subject
              └── cleanEvents$  # dedupe by eventId → 200ms buffer → coalesce by entity
                    └── useRealtimeSync   # applyEventToCache: queryClient.setQueryData(...)
                          └── React UI    # re-renders automatically, no refetch
```

`RealtimeProvider` mounts `useRealtimeSync` (renders null) in `(talent-atlas)/talent-atlas/(app)/layout.tsx` — scoped to Talent Atlas routes only; the WS connection never opens on portfolio/work/about pages.

Event types (`src/types/ws.types.ts`, discriminated union on `type`):
- `connected` — handshake on socket open
- `candidate_updated` — candidate moved to a new stage
- `campaign_updated` — campaign applicant/hired counts changed
- `company_feedback` — company submitted feedback + decision on a candidate
- `candidate_created` — a new candidate was POSTed via the API

`ws-server.ts`'s own 2s timer only ever emits the first three (see its `TYPES` array) — `candidate_created` is only ever sent by `notifyWsServer` in the candidates API route, relayed by the server's message handler (also added 2026-07-11).

Files:

- src/lib/query/queryClient.ts — `createQueryClient()`, defaults (`staleTime: 60s`, no refetch-on-focus)
- src/lib/query/queryKeys.ts — the only source of query keys, shared by hooks and the realtime cache writer
- src/components/providers/QueryProvider.tsx — wraps the Talent Atlas app shell, includes devtools
- src/hooks/talent-atlas/useCandidates.ts, useCampaigns.ts, useCompanies.ts — one `useQuery` per resource; `useCandidates` also exports `useCreateCandidate` (a mutation) and the `CandidateFeedback` type
- src/app/(talent-atlas)/talent-atlas/(app)/candidates/page.tsx — renders `latestFeedback` as the "Latest Feedback" column
- src/hooks/talent-atlas/useRealtimeSync.ts — WS → RxJS → cache bridge, plus `applyEventToCache`
- src/components/providers/talentAtlas/RealtimeProvider.tsx — thin wrapper that just calls `useRealtimeSync()`
- src/lib/realtime/wsStream.ts — RxJS pipeline (dedupe by `eventId`, 200ms buffer, coalesce by entity)
- src/hooks/useWebSocket.ts — generic WS hook with exponential-backoff reconnect
- src/types/ws.types.ts — `WsEvent` discriminated union
- src/server/ws-server.ts — standalone dev-only Node process, broadcasts a random mock event every 2s to all connected clients
- src/app/api/talent-atlas/{candidates,campaigns,companies}/route.ts — the REST endpoints the hooks fetch from

Current status: mock.
`ws-server.ts` (`npm run ws:server`) generates random fake events on a 2s interval — a dev stand-in, not driven by real database changes. In production this would be a real backend (e.g. Supabase Realtime triggers, or a server-side event bus) broadcasting actual mutations.

Running locally:

```bash
npm run dev:all      # Next.js + WS server together
# or, in two terminals:
npm run dev
npm run ws:server
```

Only needed when working on Talent Atlas — for portfolio/work/about development, `npm run dev` alone is enough.

Things to remember:

- Port is a single source of truth: `NEXT_PUBLIC_WS_PORT` (`.env.local` / `.env.example`, default 4000), read by `ws-server.ts`, `useRealtimeSync.ts`, and `candidates/route.ts`'s `notifyWsServer`. (Previously `notifyWsServer` was hardcoded to port 8080 while the server/client used 4000, and the env var wasn't read anywhere — fixed 2026-07-09.)
- **Creating a candidate shows up live**: `ws-server.ts` gained a `socket.on('message', ...)` handler that JSON-parses and rebroadcasts any `WsEvent` a client sends it. `notifyWsServer` sends a properly-typed `candidate_created` event (not the old ad-hoc `{ type: 'new_candidate', data: ... }` shape) and `applyEventToCache` has a case that prepends it into `queryKeys.candidates`. Note: the tab that performed the POST gets the update twice — once from the realtime prepend, once from `useCreateCandidate`'s `invalidateQueries` refetch (see below). Harmless, just redundant; other open tabs only get the realtime prepend.
- **`company_feedback` updates the UI**: `applyEventToCache` has a case that attaches `latestFeedback: { company, feedback, decision }` (see the `CandidateFeedback` type in `useCandidates.ts`) to the matching candidate in `queryKeys.candidates`. Surfaced as a new "Latest Feedback" column on the Candidates page — a decision badge (green "proceed" / amber "hold") plus the feedback text, `—` if none has arrived yet. Chose "new column on the existing table" over a candidate-detail view since no detail view exists anywhere in the app yet. Verified the WS payload shape end-to-end with a raw listener script; couldn't verify the actual table render in a browser since `AuthGate` (unlike the API routes) has no dev-mode bypass and requires a real Auth0 login.
- Realtime writes bypass React Query's normal fetch/invalidate cycle (`setQueryData`, not `invalidateQueries`) — adding a new resource to the WS payload means adding a matching case in `applyEventToCache`, or updates for it silently never reach the cache.
- `useCreateCandidate`'s `onSuccess` calls `queryClient.invalidateQueries({ queryKey: queryKeys.candidates })`.
- Companies page (`(talent-atlas)/talent-atlas/(app)/companies/page.tsx`) is read-only — just `useCompanies()`, no mutation, no `useCreateCompany`.
- Dashboard page now uses `useCampaigns()`/`useCandidates()` too — see [[talent-atlas-dashboard]] for the specific stat formulas and the one gap that's a real data-model limitation, not a wiring gap (Avg Time to Hire, no timestamps exist to average).
