# Interview Preparation — Brilliant AS Oslo
## Senior Full-Stack Developer / Consultant

---

## About the Role (What They Actually Want)

From the job description, Brilliant is not just hiring a coder. They want:
- A **consultant** who advises customers and takes ownership of deliveries
- Someone who sees the project in the context of the **customer's value creation**
- Someone who has **led other developers** in technical deliveries
- A person who fits their values: **Openness, Teamwork, Integrity, Forward-leaning, Enthusiasm**
- Stack: .NET / Python backend, React frontend, PostgreSQL, Azure CI/CD

Your project covers: React (Next.js), TypeScript, PostgreSQL (Supabase), GitHub Actions, API design, Auth0, real-time architecture. The .NET / Python gap is real — prepare a clear honest answer for it.

---

## 1. PROJECT STORY (2–3 minutes)

Say this. Do not memorize it word for word — understand it and speak naturally.

> "I built TalentAtlas as a self-directed project to explore a full-stack architecture I could own end to end. The idea came from a real gap I noticed: NGOs and mission-driven organizations run hiring campaigns across multiple partner companies, with several stakeholders involved — internal recruiters, external company partners, the candidates themselves. Most ATS tools are either too expensive or designed for corporate HR workflows that don't fit this model.
>
> So I built a role-based hiring dashboard. Admins and coordinators can manage campaigns and move candidates through a pipeline. Partner companies can view their campaigns and submit feedback on candidates — a proceed or hold decision with a free-text note — which arrives in real time on every recruiter's screen. The whole candidate board is a live kanban with five pipeline stages, including a "Maybe Another Time" column for candidates who are good but not right for this campaign — a deliberate word choice to keep the door open rather than marking someone as rejected.
>
> What made it technically interesting was the real-time layer. I built a WebSocket server that runs alongside the Next.js app, and all events go through an RxJS pipeline before they hit the UI — deduplication, 200ms buffering, coalescing so if the same candidate is updated twice in a window you only process the latest event. That feeds directly into TanStack Query's cache, so the same data layer handles both REST responses and live updates.
>
> I also built role-based access control from scratch using Auth0. Not just UI guards — every API route is wrapped in a typed `withAuth` middleware that checks the user's roles before the handler even runs. The sidebar navigation itself adapts per role — a company partner never sees the recruiter pipeline.
>
> The project is deployed on Vercel with a GitHub Actions CI pipeline. It's not production at scale, but every architectural decision was made as if it would be."

---

## 2. ARCHITECTURE

### Overview

```
Browser
  │
  ├── Next.js App Router (Vercel)
  │     ├── (portfolio) route group  → public photography site
  │     └── (talent-atlas) route group → authenticated dashboard
  │           ├── Server Components (auth, layout, SSR)
  │           └── Client Components (kanban, forms, real-time UI)
  │
  ├── REST API  (/api/talent-atlas/*)
  │     └── Next.js Route Handlers + withAuth middleware + Zod validation
  │
  ├── WebSocket Server (Node.js, port 4000, separate process)
  │     └── Relay + heartbeat + broadcast
  │
  └── Auth0 (external)
        └── Session cookies + role claims
```

### Frontend
Next.js 16 App Router. Two route groups with completely separate layouts: `(portfolio)` is the public photography site, `(talent-atlas)` is the authenticated dashboard. Route groups let you share layouts without affecting the URL.

Server Components handle auth checking and layout. Client Components handle all interactive UI — kanban board, forms, real-time updates. This split is deliberate: the auth gate runs on the server before any client code executes.

**Likely question:** *"Why Next.js and not a pure React SPA?"*
Because I wanted server-side auth checking that can't be bypassed on the client. The `AuthGate` server component calls Auth0's session API before rendering children — if there's no session it redirects at the server level, not after the page loads.

### Backend / API
Next.js Route Handlers (no separate backend server). Every write endpoint is validated with Zod before touching data. Every endpoint is wrapped in `withAuth` — a higher-order function that reads the Auth0 session server-side, checks roles, and either runs the handler or returns 401/403.

Current data: in-memory mock store (`talentAtlasStore.ts`). In production this would be replaced by Supabase queries — the rest of the architecture stays identical.

**Likely question:** *"Why not a separate backend?"*
For a project with one developer and one deployment target, the operational overhead of a separate service isn't justified. Next.js route handlers give me typed, co-located API code. At scale — more teams, separate deployment cycles, different languages like .NET — a separate backend makes sense. I know where that boundary is.

### Database
Photography portfolio uses Supabase PostgreSQL. TalentAtlas currently uses an in-memory store — intentionally, to keep the real-time architecture demonstrable without database setup. The schemas, types, and Zod validation are all production-ready; only the backing layer would change.

**Likely question:** *"What would happen to your in-memory store under concurrent load?"*
It would break immediately — Node.js is single-threaded so there's no race condition within a single process, but across serverless function invocations you'd have divergent state. The fix is moving to a persistent store (Supabase) and using optimistic locking or row-level locking for stage updates. The current architecture is explicitly a mock — I documented this distinction clearly.

### State Management
TanStack Query (React Query v5) for all server state. No global client state store (no Redux, no Zustand) — because there's no state that isn't derived from server data. Query keys are centralized. Mutations use optimistic updates with rollback on error. The real-time WebSocket events patch the same TanStack cache directly, so components re-render identically whether an update came from a local mutation or a remote WS event.

**Likely question:** *"Why TanStack Query over Redux Toolkit Query or SWR?"*
TanStack Query v5 gives me more control over optimistic update logic and cache manipulation — `onMutate`, `onError` rollback, `setQueryData` for WS patches. RTK Query is great but adds Redux boilerplate I didn't need. SWR is simpler but less capable for optimistic updates and manual cache writes.

### Real-Time
Separate Node.js WebSocket server (port 4000). Next.js can't maintain persistent WebSocket connections in a serverless model. When an API route needs to broadcast an event, it opens a short-lived client WebSocket connection to the WS server and sends the event. The WS server relays it to all connected browser clients.

On the client: `useWebSocket` → RxJS Subject → pipeline (dedup + buffer + coalesce) → TanStack cache.

### Authentication / Authorization
Auth0 handles auth entirely. Roles are stored as a custom claim on the Auth0 user object and persisted into the session. `withAuth(roles, handler)` enforces access at the API layer — not just UI. The sidebar filters navigation items by role before rendering.

### Deployment
Vercel for the Next.js app. The WebSocket server would need a persistent host (Railway, Fly.io, or a VM) in production — serverless can't run it. GitHub Actions CI runs on every push: lint and type-check before deploy.

---

## 3. TECHNICAL DECISIONS

### Decision 1: Separate WebSocket server instead of Next.js API routes for real-time

**Problem:** Next.js on Vercel runs serverless — no persistent connections, no WebSocket support in route handlers.

**Options:**
- Polling every N seconds from the client
- Server-Sent Events (one-way, simpler)
- WebSocket via a third-party service (Pusher, Ably)
- Self-hosted WebSocket server

**Choice:** Self-hosted Node.js WebSocket server with `ws` library.

**Why:** Pusher/Ably add external dependencies and cost. SSE is one-way — I needed bidirectional (API routes need to push events to the server). Polling would work but defeats the purpose of demonstrating real-time architecture.

**Trade-offs:** Requires a separate deployment unit. Can't run on Vercel serverless. In production this would be a containerized service on a persistent host.

**At scale:** Would use a pub/sub broker (Redis Pub/Sub, or a managed service like Ably) so multiple WS server instances can share event state across horizontal scaling.

---

### Decision 2: RxJS pipeline between WebSocket and UI

**Problem:** Raw WebSocket events can arrive in bursts. The same entity (a candidate) could receive two `candidate_updated` events in 50ms. Processing both causes UI flicker and redundant renders.

**Options:**
- Handle deduplication manually in `useRealtimeSync` with a `useRef` Set
- Throttle/debounce with `setTimeout`
- RxJS operators: `bufferTime` + custom coalescing

**Choice:** RxJS pipeline — `filter` (dedup by eventId) → `bufferTime(200)` → `filter` (skip empty windows) → `map` (coalesce by entity ID).

**Why:** RxJS operators compose cleanly and are individually testable. The logic (dedup + buffer + coalesce) is pure data transformation — RxJS is exactly the right tool for that. A `setTimeout` approach would work but becomes hard to reason about as complexity grows.

**Trade-offs:** RxJS is a significant dependency to justify for one pipeline. But the project already uses it (it's in `package.json`) and the alternative would be re-implementing the same logic imperatively.

**What I'd change:** The 200ms buffer is arbitrary. In production this would be configurable or driven by measuring actual event burst patterns.

---

### Decision 3: Shared in-memory store module

**Problem:** Next.js Route Handlers are separate modules. `/candidates` (GET/POST) and `/candidates/[id]` (PATCH) would each get their own copy of `[...MOCK_CANDIDATES]` at module load time. A PATCH would update one copy, a GET would return the stale other copy.

**Options:**
- Each route manages its own copy (broken by design)
- Import from a shared singleton module
- Use an actual database

**Choice:** Shared singleton module `talentAtlasStore.ts` — both routes import the same mutable array.

**Why:** Within a single Node.js process, module-level variables are shared across imports. This works correctly in development. It's an explicit technical decision documented in code, not an accident.

**Trade-offs:** This only works in a single-process environment. On serverless (Vercel) each function invocation may get a fresh module — state does not persist. For the purpose of a dev-mode demo with a local server, it's correct.

**What I'd change today:** In production, replace the store with Supabase. The `talentAtlasStore.ts` interface is the only thing that would change — all route handlers, hooks, and schemas stay identical.

---

### Decision 4: Optimistic updates on kanban drag

**Problem:** When a recruiter drags a card to a new column, there's a round-trip: PATCH request → WS broadcast → cache update. Without optimistic updates, the card snaps back to its original column for ~200ms before the response arrives.

**Options:**
- Wait for the API response before updating UI (bad UX)
- Optimistic update in the mutation, no rollback
- Optimistic update with rollback on error

**Choice:** Full optimistic update pattern with `onMutate` (snapshot + immediate cache write) and `onError` rollback.

**Why:** The drag action is a direct user intent — the UI should reflect it immediately. Rollback is essential for correctness if the PATCH fails (network error, auth expiry). TanStack Query's `onMutate` / `onError` lifecycle makes this straightforward.

**Trade-offs:** If the WS event arrives before the `onSuccess` callback, you could theoretically get a double-write to the cache (optimistic + WS event). In practice they're idempotent (both set the same stage value), so this is harmless.

---

### Decision 5: `withAuth` as a typed higher-order function

**Problem:** Every API route needs auth checking. Copy-pasting `auth0.getSession()` + role check into every handler creates duplication and easy-to-miss errors.

**Options:**
- Middleware file (`middleware.ts`) — Next.js middleware
- Copy-paste auth logic in each handler
- HOF (higher-order function) wrapping each handler

**Choice:** `withAuth(roles, handler)` HOF that wraps every route export.

**Why:** Next.js `middleware.ts` runs on the Edge Runtime and has limitations with Auth0's server SDK. The HOF approach keeps auth logic in one place, is fully typed, and means you can't accidentally export an unprotected handler — the pattern enforces it.

**Trade-offs:** Every route must explicitly opt in. A middleware approach would protect everything by default with opt-out exceptions. For a larger app I'd evaluate whether the explicit opt-in is an asset (clear which routes are protected) or a liability (easy to forget).

---

### Decision 6: Native HTML5 Drag and Drop for kanban (no library)

**Problem:** Need drag-and-drop between columns.

**Options:**
- `dnd-kit` (most maintained DnD library for React)
- `@hello-pangea/dnd` (react-beautiful-dnd fork)
- Framer Motion's `drag` prop (already installed)
- Native HTML5 DnD API

**Choice:** Native HTML5 DnD.

**Why:** Framer Motion's `drag` is for free-form spatial drag (animate to any x/y position), not column-to-column. Installing `dnd-kit` for column-to-column drag with no reordering within columns is significant dependency weight for limited return. Native DnD handles this cleanly in ~30 lines.

**Trade-offs:** Native DnD has poor mobile support (no touch events). For a desktop-only recruiter tool this is acceptable. A production system used on tablets would need `dnd-kit`.

---

### Decision 7: Computed counts instead of cached counters

**Problem:** `applied_count` and `hired_count` were stored as fields on each campaign, initialized from mock data and never updated. Creating a new candidate via the API did not increment the count. The numbers were permanently wrong after the first mutation.

**Options:**
- Update the counter on every mutation that affects it (increment on POST candidate, decrement on DELETE, recalculate on stage change to `hired`)
- Compute it fresh on every GET from the actual candidates in the store

**Choice:** Compute on every GET — filter `candidatesStore` for each campaign and count.

**Why:** A stored counter is a derived value that must be kept in sync with its source of truth. Every mutation that touches candidates becomes a potential place to forget an update. Computed values can never drift — there is only one source of truth. The compute cost here is negligible (12 candidates, in memory).

**Trade-offs:** At database scale with millions of rows, computing on every GET is expensive. The right answer there is a materialized column or a database aggregate query with an index. But the principle is the same — you decide when to pay the compute cost (at read time or at write time), not whether to have one source of truth.

---

### Decision 8: `revalidatePath` over time-based ISR for the portfolio

**Problem:** Portfolio pages (photography) are statically generated at build time. When an admin uploads a new photo, the static page doesn't update until the next deploy — the cache is stale.

**Options:**
- `export const revalidate = 3600` — regenerate pages every hour automatically
- `revalidatePath('/portfolio', 'layout')` called from admin mutation routes — regenerate on demand

**Choice:** On-demand revalidation via `revalidatePath`.

**Why:** I know exactly when the data changes — when an admin uploads, edits, or deletes a photo. Time-based revalidation would leave pages stale for up to an hour after a change and regenerate unnecessarily every hour even when nothing changed. `revalidatePath` triggers regeneration precisely when needed.

Note: `export const revalidate = N` is incompatible with `cacheComponents: true` (PPR) in `next.config.ts` — using both causes a build error. PPR pages must use on-demand invalidation only.

**Trade-offs:** Requires calling `revalidatePath` in every admin mutation. Easy to forget when adding new routes. A `revalidateTag('photos')` approach tagged at the fetch level is more robust — any page that fetched with that tag gets invalidated, regardless of its URL.

---

## 4. CODE WALKTHROUGH — Order and What to Say

**Show in this order:**

### 1. `src/types/ws.types.ts`
Start here. Show the event type union. Say: *"I defined all the events in one place with a discriminated union. This means every switch statement in the codebase is exhaustive — TypeScript tells me if I'm missing a case."*

### 2. `src/lib/auth0/withAuth.ts`
Short file, high impact. Say: *"This is the entry point to every write endpoint. The handler type requires three parameters — request, context, and session — so you literally cannot write a handler that forgets to use the session. The roles check happens before the handler runs."*

### 3. `src/app/api/talent-atlas/candidates/[id]/route.ts`
Show the PATCH endpoint. Say: *"Zod validates the body, the shared store gets updated, then a short-lived WebSocket connection sends the event to the WS server for broadcast. The handler itself is 40 lines. The complexity lives in the layers around it, not inside it."*

### 4. `src/lib/realtime/wsStream.ts`
This is your showpiece. Walk through each operator slowly. Say: *"Raw events hit the Subject. The filter drops anything with a duplicate eventId — using a bounded Set so it doesn't leak memory on long sessions. bufferTime(200) collects events for 200ms. The final map coalesces — if the same candidate was updated twice in that window, we only apply the latest. This prevents UI flicker and redundant renders."*

### 5. `src/hooks/talent-atlas/useRealtimeSync.ts`
Show how the pipeline output connects to TanStack cache. Say: *"This is the bridge between the real-time layer and the UI layer. It subscribes to the clean event stream and calls setQueryData directly. The component that renders a candidate card doesn't know if the data arrived via REST or WebSocket — it just observes the cache."*

### 6. `src/app/(talent-atlas)/talent-atlas/(app)/candidates/page.tsx`
Show the kanban board. Walk through the drag handlers. Say: *"The drag state is three event handlers and one piece of React state for the visual drop target highlight. The mutation does the heavy lifting. I chose not to add a DnD library because native handles this use case cleanly."*

### 7. `src/lib/store/talentAtlasStore.ts`
Two lines. Say: *"This is a deliberate architectural decision. Both the collection route and the single-resource route need to share state. In a Node.js process, module-level variables are singletons. This works correctly in local dev with a persistent server. In production, this module would be replaced by Supabase queries — nothing else changes."*

### Skip:
- Individual page components (campaigns, companies) — they're straightforward, not interesting
- Mock data file — not worth time
- Tailwind classes — don't get lost in styling

---

## 5. SENIOR-LEVEL QUESTIONS BY CATEGORY

### Architecture
- *"Your WebSocket server is a separate process. How does it scale horizontally?"*
  → Single WS server = single point of failure. At scale: multiple instances behind a load balancer, with Redis Pub/Sub so all instances share the event stream. Or replace entirely with a managed service like Ably or Pusher.

- *"What happens to your in-memory store when Vercel cold-starts a new function instance?"*
  → State is lost. This is a known limitation of the mock design, documented explicitly. The fix is a persistent database.

- *"Why two separate route groups `(portfolio)` and `(talent-atlas)`?"*
  → Completely different layouts, auth requirements, and loading behavior. Route groups in Next.js let you isolate these without URL impact.

### React / Next.js
- *"Why Server Components for the auth gate instead of client-side redirect?"*
  → A client-side guard can be bypassed — the JavaScript runs in the browser. A server component redirect happens before any HTML is sent. You can't bypass it.

- *"Your `SidebarWithRoles` is a Server Component inside a Suspense boundary. Why?"*
  → It calls `auth0.getSession()` which is async. Without Suspense, it would block the entire layout render. With Suspense, the layout streams and the sidebar fills in when the session resolves.

- *"How would you handle stale data if a user leaves the tab open for an hour?"*
  → I configured `staleTime: 60_000` globally — data is considered fresh for one minute. `refetchOnWindowFocus` is explicitly disabled. The reason is intentional: the WebSocket already keeps the cache current in real time. A tab-focus refetch would be redundant and could overwrite a more recent WS update with stale REST data — the two systems would fight each other. The rule is: REST populates the cache on first load, WebSocket maintains it from then on.

### TypeScript
- *"Your `WsEvent` is a discriminated union. What does that buy you?"*
  → Every `switch (event.type)` is exhaustive. If I add a new event type and forget to handle it in `useRealtimeSync`, TypeScript shows an error at compile time, not at runtime.

- *"How do you type the `withAuth` HOF so the handler gets the session?"*
  → The `AuthHandler` type requires `(req, ctx, session)`. The HOF only calls the handler after it has verified the session exists and cast it to `AppSession`. So the handler's third parameter is always non-null by the time it runs.

### APIs
- *"Your PATCH endpoint returns the updated candidate. Why not just 204?"*
  → The client can confirm the exact state that was persisted, including any server-side defaults or computed fields. More importantly, in a future version the server might modify the data (e.g., set `updated_at`) — returning the entity means the client doesn't need a follow-up GET.

- *"What happens if the WebSocket broadcast from the API route fails?"*
  → Currently: silently ignored. The `ws.on('open')` callback fires the send, but there's no error handler. In production I'd add `ws.on('error')` and log the failure. The optimistic update on the client has already committed, so the user doesn't see a problem — but other clients won't see the update until they refresh.

### Real-Time
- *"Why RxJS instead of just a custom hook with useRef?"*
  → The pipeline has three distinct concerns: deduplication, buffering, coalescing. RxJS lets me express each as a named operator and test them independently. A `useRef`-based approach would work but becomes an imperative tangle as complexity grows.

- *"What is the 200ms buffer based on?"*
  → Empirical guess based on the simulator firing events every 2 seconds. In production I'd measure actual event burst patterns and tune it. It should be configurable, not hardcoded.

- *"How do you prevent memory leaks in the deduplication Set?"*
  → The `SEEN_EVENTS` Set is bounded at 10,000 entries. When it hits the limit, the oldest entry is evicted using the iterator. This is a simple LRU approximation — in production I'd use a proper LRU cache with TTL.

### Authentication / Security
- *"Roles are stored in the Auth0 session. Can a user modify their own roles?"*
  → No. Roles are set by an Auth0 Action (server-side) and signed into the JWT. The client cannot write to the session. `withAuth` reads the session server-side using Auth0's SDK — it never trusts anything from the request body or headers for role data.

- *"What's the risk of your `withAuth` pattern?"*
  → The main risk is a developer forgetting to wrap a handler. Next.js middleware could enforce protection globally with opt-out. The explicit HOF pattern makes protection visible but requires discipline. I'd add an ESLint rule in a team setting to enforce that all route exports are wrapped.

### Performance
- *"Your dashboard fetches candidates and campaigns on every render. How would you optimize?"*
  → Set appropriate `staleTime` in TanStack Query so data isn't refetched if it's fresh. For the dashboard stats specifically — they're derived aggregates — I'd compute them server-side and cache the result. For a real production system, a dedicated analytics query or materialized view would replace client-side aggregation.

### State Management
- *"You have no global state store. What if you needed cross-component state that doesn't come from the server?"*
  → React Context for localized shared state (e.g., a sidebar open/close toggle). Zustand for genuinely global UI state that multiple unrelated components need. I deliberately kept the dependency surface small — I'd add state management tools when the need is concrete, not preemptively.

### Testing
*See Section on Testing below.*

### Error Handling
- *"What happens if the Auth0 session call fails?"*
  → `auth0.getSession()` throws. Currently there's no try/catch around it in `withAuth` — it would surface as a 500. I'd wrap it and return a 503 with a specific error code so the client can distinguish "not logged in" from "auth service unavailable."

### Scalability
- *"Name three things that would break first under real load."*
  → 1. The in-memory store — diverges across serverless instances. 2. The single WebSocket server — single point of failure. 3. The auth session call on every API request — `auth0.getSession()` makes an outbound call; under load this needs caching or a session store.

### Consultancy / Customer Mindset
*See Section 6.*

---

## 6. CONSULTANCY / CUSTOMER MINDSET

These questions matter as much as the technical ones at Brilliant. They said they want someone who sees the project in the context of customer value creation.

**"How would you clarify unclear requirements?"**
> "I'd start by separating what the customer said from what they need. In TalentAtlas — if a customer said 'we want a hiring tool' I'd ask: who are the users, what does success look like in six months, what breaks today that this fixes? I'd rather spend a day clarifying requirements than two weeks building the wrong thing. I'd document the understanding and get sign-off before writing code."

**"How do you deal with a customer who wants something technically problematic?"**
> "I explain the risk clearly, in their terms, not mine. If a customer wants real-time updates via polling every 500ms, I don't say 'that's bad architecture' — I say 'that will add X load to your server and cost Y more per month, here's an alternative that gives you the same result with less risk.' Then I let them decide. My job is to give them accurate information, not to override their judgment."

**"How do you explain technical trade-offs to a non-technical stakeholder?"**
> "I use the language of their problem, not mine. Instead of 'in-memory state doesn't persist across serverless invocations' I say 'if you restart the server, you lose all the data we haven't saved yet — so we need a database before we go live.' I also try to attach costs to trade-offs: time, money, risk. That gives stakeholders something concrete to weigh."

**"How do you estimate work?"**
> "I break work into the smallest pieces I can see clearly and estimate those. I add explicit buffers for integration, testing, and the things I haven't discovered yet — usually 30–40% on top. I communicate estimates as ranges, not single numbers, and I update them as I learn more. An estimate that was accurate three weeks ago isn't sacred if the scope changed."

**"How do you handle changing requirements?"**
> "I expect them. The question is whether the change is a refinement (we understand the problem better) or scope creep (something genuinely new). For refinements: adapt and adjust the estimate. For scope creep: flag it explicitly, re-estimate, and get agreement before building. I'd rather have an uncomfortable conversation about scope than quietly work overtime and deliver late."

**"Build vs buy?"**
> "I default to buy for anything that isn't core to the product. In TalentAtlas I used Auth0 instead of building auth — auth is hard to get right, expensive to maintain, and not what makes this product valuable. I built the WebSocket server myself because the specific behavior I needed (relay + heartbeat + broadcast) was simpler to own than to fit a managed service to. The question is always: does building this give us a competitive advantage, or are we just reinventing a solved problem?"

**"How do you handle disagreement with another developer?"**
> "I try to make the disagreement concrete: 'I think X is better than Y because of Z — what's your concern with X?' Most technical disagreements dissolve when you get specific. If we genuinely can't agree, I'd propose a time-boxed experiment or escalate to the tech lead with a summary of both positions. I don't dig in on ego — I care about the right decision, not winning."

**"How do you communicate risks?"**
> "Early and in writing. If I see a risk — a dependency, an assumption, a part of the codebase I don't fully understand — I flag it before it becomes a problem. In TalentAtlas I documented explicitly that the in-memory store doesn't survive serverless cold starts. A stakeholder reading the docs knows that before they try to demo it on Vercel."

**"Technical quality vs delivery deadline?"**
> "I don't frame it as a trade-off — I frame it as a choice about what debt we're taking on. If we ship fast and cut corners, I want that to be a conscious decision with a plan to fix it, not an accident. I'll push for time to do it right once. If the deadline is truly fixed, I'll identify which shortcuts are reversible and which aren't, and I'll choose reversible ones."

---

## 7. OWNERSHIP — Where You Can Demonstrate It

In your answers, these are the moments to reference:

| What | How to frame it |
|---|---|
| You chose the real-time architecture | "I evaluated three options, picked WebSocket + RxJS, and documented the trade-offs — including what would break at scale" |
| You recognized the shared store problem | "I noticed that two route modules couldn't share state if they each initialized their own copy — so I extracted a singleton before it became a bug" |
| You documented the MVP vs production boundary | "I wrote explicitly what's a mock and what's production-ready so anyone reading the code knows what's safe to ship and what isn't" |
| You built `withAuth` as a HOF | "I made it structurally impossible to export an unprotected handler — the pattern enforces correctness, not convention" |
| You removed `candidate_updated` from the simulator | "I noticed the simulator was fighting against user actions — it would randomly snap cards back to old stages. I fixed it before it became a confusing demo bug" |
| You colocated types, schemas, and validation | "Zod schemas are the single source of truth — they generate the TypeScript types and enforce validation at runtime, so there's no drift between what the API accepts and what the code expects" |
| You computed campaign counts from source of truth | "I noticed `applied_count` and `hired_count` were stored as static numbers that never updated. I removed the cached counters and compute them on every GET by filtering `candidatesStore` — one source of truth, impossible to drift" |
| You prevented campaign duplicates with a 409 guard | "I added a uniqueness check on campaign POST — same title and same company returns a 409 with a readable message. The UI surfaces it inline. Simple, but it's the kind of data integrity issue that's painful to clean up later if you ship without it" |
| You chose `revalidatePath` over time-based ISR | "Next.js has two cache invalidation models: time-based (`revalidate = N`) and on-demand (`revalidatePath`). I chose on-demand because I know exactly when data changes — when an admin uploads or edits a photo. Time-based would leave pages stale for up to an hour after a change. On-demand means the next visitor after an admin action always gets fresh HTML" |
| You named the rejection stage "Maybe Another Time" | "The easy word was 'Rejected'. I chose 'Maybe Another Time' deliberately — for NGO hiring, rejecting someone closes a door; deferring keeps it open. The word choice is a product decision, not just a label" |
| You disabled `refetchOnWindowFocus` intentionally | "Most apps want this on. I turned it off because the WebSocket already maintains the cache in real time. A tab-focus refetch would overwrite a WS update with older REST data — the two systems would fight. It's a deliberate architectural constraint, not a forgotten setting" |

---

## 8. PROBLEM-SOLVING STORIES

### Story 1: The shared store problem

**Context:** Building the PATCH /candidates/[id] endpoint.

**Problem:** Each Next.js route module initializes its own copy of the candidates array at load time. The GET/POST route would have one array, the PATCH route would have another. A stage update via PATCH would never be visible on the GET endpoint.

**My responsibility:** I was implementing the kanban drag-to-stage feature. I had to make PATCH mutations visible to GET without adding a database.

**Options:** Let each module have its own copy (broken), use a global variable in a shared module (singleton pattern), or add a real database.

**Decision:** Extracted `talentAtlasStore.ts` — a module that initializes the array once and exports it. Both routes import from it. In Node.js, module-level variables are shared across imports within a process.

**Challenge:** Making sure this works in dev (persistent Node.js process) but not misleading myself that it works on Vercel serverless (each invocation may get a fresh module).

**Result:** Works correctly in development. The module has a comment explaining its limitations in serverless.

**What I learned:** The boundary between "works in my mental model" and "works in the actual execution environment" is where bugs hide. I learned to think about module lifecycle explicitly.

**What I'd improve:** In production, this module becomes a Supabase client call. I'd keep the module as an interface and swap the implementation.

---

### Story 2: The RxJS coalescing pipeline

**Context:** Building the real-time layer. The WS simulator fires events every 2 seconds.

**Problem:** Multiple events for the same entity could arrive close together. Without deduplication, the same event could be applied twice (e.g., after reconnect). Without coalescing, two stage updates for the same candidate in 200ms would cause two cache writes and UI flicker.

**My responsibility:** Design the event processing pipeline between the WebSocket connection and the TanStack cache.

**Options:** Handle deduplication manually with a `useRef` Set in the React hook. Use `setTimeout` debouncing. Use RxJS operators.

**Decision:** RxJS — `filter` for dedup, `bufferTime(200)` for batching, custom `map` for coalescing by entity ID.

**Challenge:** The bounded Set for deduplication — a naive `Set` grows indefinitely on long sessions. I added a cap at 10,000 entries with oldest-entry eviction.

**Result:** Clean, composable, testable pipeline. Each operator has a single responsibility.

**What I learned:** The right tool for data transformation pipelines is a pipeline library. Imperative event handling with refs becomes hard to reason about quickly.

**What I'd improve:** The 200ms buffer should be configurable. The LRU eviction on the Set is approximate — a real LRU cache would be more correct.

---

### Story 3: The simulator fighting the kanban

**Context:** After building the kanban, I noticed cards were snapping back to old positions randomly.

**Problem:** The simulator was firing `candidate_updated` events with the stages from the original mock data — not from the current store. So if I dragged Eric to `hired`, the simulator would eventually fire `candidate_updated` with `stage: interview` (his original stage) and move him back.

**My responsibility:** I built both the simulator and the kanban, so I owned the fix.

**Options:** Use `candidatesStore` in the simulator instead of `MOCK_CANDIDATES`. Or remove `candidate_updated` from the simulator entirely.

**Decision:** Remove it from the simulator. Stage changes should only come from deliberate user actions (drag → PATCH → WS broadcast). The simulator is for demonstrating concurrent updates between users, not for faking user actions.

**Challenge:** Updating the `TYPES` array cleanly so the simulator loops over the remaining two event types without a hardcoded modulus.

**Result:** Changed `eventCounter % 3` to `eventCounter % TYPES.length` so adding or removing types doesn't require touching the loop logic.

**What I learned:** When two systems interact unexpectedly, look for implicit assumptions each system is making about the other. The simulator assumed it was the only thing updating stages. The kanban assumed stages only change when a user drags. Both were wrong.

---

### Story 4: Auth at the wrong layer

**Context:** Early in TalentAtlas, I had UI guards — the sidebar filtered nav items, and pages would redirect if the user didn't have the right role.

**Problem:** UI guards can be bypassed. A Company-role user who knows the URL `/talent-atlas/candidates` could navigate there directly and get data.

**My responsibility:** I was the only developer — I had to catch this myself during review.

**Options:** Keep UI-only guards (fast but insecure). Add middleware.ts to protect routes at the Next.js edge. Add auth checks to every API endpoint.

**Decision:** Both: `withAuth` on every API endpoint (the real security), and UI guards (for UX — so users don't hit 403s by navigating to pages they can't access).

**Challenge:** Writing `withAuth` as a typed HOF that works with Next.js dynamic route context — the `ctx.params` type had to match `RouteHandlerContext`.

**Result:** Every API endpoint is secured at the server level regardless of UI state.

**What I learned:** UI is for experience, not security. Authorization belongs at the API layer. Always both.

---

### Story 5: Building the architecture incrementally via PRs

**Context:** TalentAtlas was built over roughly two months, merged through several pull requests.

**Problem:** How to ship incrementally without breaking the portfolio site that was already live, and without committing to an architecture I hadn't proven yet.

**Decision:** Used Next.js route groups to isolate TalentAtlas completely from the portfolio. The `(talent-atlas)` group has its own layout, its own auth, its own providers. The portfolio doesn't know it exists.

**Result:** I could merge incomplete TalentAtlas features to main without risking the live photography site. Each PR built one layer: auth, API routes, data pages, React Query, real-time, kanban.

**What I learned:** Route groups are a powerful isolation tool — not just for URL organization but for keeping separate concerns truly separate within a monorepo-style Next.js app.

---

## 9. "WHY?" DRILL

Practice answering three levels deep on each of these.

### Why WebSocket?

Level 1: Because I needed server-push events — the server needs to notify all clients when any client triggers a change.

Level 2: Why not Server-Sent Events? SSE is one-way (server → client). My API routes also need to send events to the WS server, so I need bidirectional communication.

Level 3: Why a separate server instead of Next.js WebSocket support? Next.js on Vercel runs serverless — no persistent connections. A separate Node.js process can maintain connections indefinitely.

What happens when it grows? Multiple WS server instances + Redis Pub/Sub. Or replace with a managed service. The browser client code doesn't change — only the server topology does.

---

### Why RxJS?

Level 1: Because I needed to compose three data transformation operations: deduplication, batching, and coalescing.

Level 2: Why not implement those manually? I could. But RxJS operators are individually documented, testable, and composable. The pipeline reads like a description of what it does.

Level 3: Why `bufferTime` specifically? It gives me a time window to collect events rather than processing each one immediately. This is the key to coalescing — you can't coalesce what you haven't seen yet.

What are the trade-offs? RxJS is ~50kb. It's a significant dependency for one pipeline. In a larger system where observables appear elsewhere, it's justified. In a small app, you might prefer a simpler approach.

---

### Why TanStack Query?

Level 1: Because I needed caching, deduplication of inflight requests, and optimistic update support.

Level 2: Why not fetch + useState? That would work, but I'd be re-implementing cache invalidation, loading/error states, and refetch-on-focus by hand. TanStack Query gives those for free.

Level 3: Why v5 specifically? The new `onMutate`/`onError` API is cleaner for optimistic updates. `setQueryData` for manual cache writes (used by the WS integration) is more ergonomic.

What happens at scale? At high data volume you'd need more careful `staleTime` tuning and possibly infinite queries for pagination. The architecture supports this without changes.

---

### Why Auth0?

Level 1: Because auth is hard to implement correctly and not core to what TalentAtlas is about.

Level 2: Why not build it yourself? Session management, token rotation, password reset, MFA — these are months of work to do right and a permanent maintenance burden. Auth0 handles all of it.

Level 3: Why Auth0 over Supabase Auth (already in the stack)? Auth0 gives me custom role claims via Actions, a flexible user management dashboard, and a well-maintained Next.js SDK. Supabase Auth would have worked but has less flexibility around custom claims.

What would you change? In a production system, I'd evaluate whether Auth0's pricing at scale is justified versus something like Supabase Auth or a self-hosted Keycloak.

---

### Why Next.js?

Level 1: Because I wanted server-side auth checking, server components, and API routes in one deployment unit.

Level 2: Why App Router over Pages Router? Server Components. The auth gate runs on the server before HTML is sent — you can't bypass it client-side.

Level 3: Why not a separate React SPA + Node.js API? That's a valid architecture. For one developer and one Vercel deployment, the co-location reduces operational complexity. At team scale with separate frontend and backend teams and deployment cycles, I'd revisit.

---

## 10. FAILURE AND MISTAKE QUESTIONS

### "What would you do differently?"

> "The in-memory store was the right call for a demo, but I'd add a database earlier next time. The store works, but it made me have to think carefully about module initialization order and serverless limitations — complexity I wouldn't have if I'd just used Supabase from the start."

### "What's the biggest technical debt?"

> "The WebSocket error handling. If the API route fails to broadcast an event, it's silently swallowed. Other clients won't see the update. I know exactly what to fix — add `ws.on('error')`, log it, and in production I'd add a fallback: if the broadcast fails, mark the event for retry. I left it because for a demo it's acceptable. In production it would be the first thing I'd fix."

### "What part of the code are you least happy with?"

> "The `DashboardOverview` component. It fetches candidates and campaigns in the component, aggregates them with JavaScript, and renders stats. That aggregation belongs on the server — either a dedicated API endpoint that returns pre-computed stats, or a database view. As user counts grow, sending all candidates to the client to count them is wasteful. I know it's wrong; I built it to get the feature working and would refactor it before production."

### "What would break at scale?"

> "Three things in order: First, the in-memory store — it doesn't survive serverless cold starts or scale horizontally. Second, the single WebSocket server — one instance can't handle thousands of concurrent connections and is a single point of failure. Third, computing dashboard stats client-side from full dataset fetches — at 10,000 candidates that's an unacceptable payload."

### "Tell me about a time you got stuck."

> "When I first tried to add the PATCH endpoint for candidate stage updates, I hit a type error I didn't understand — `withAuth` was rejecting my handler signature. The error message from TypeScript wasn't clear. I spent time reading how the existing admin photo PATCH handler was structured, found that the pattern was an inline arrow function passed directly to `withAuth` rather than a named function, and that resolved it. The lesson: when your types don't fit, read the working code before reading documentation."

---

## 11. TESTING — What to Add Before the Interview

Two test suites are written and passing. Here's what exists and what remains.

### What's done:

**1. ✅ Unit test: `wsStream.ts` — `src/lib/realtime/__tests__/wsStream.test.ts`**

Four tests covering the full pipeline using Vitest fake timers and `vi.resetModules()` to isolate state between tests:
- Duplicate `eventId` → second event dropped, first passes through
- Same entity updated 3 times in 200ms → only the latest survives (coalescing)
- Empty 200ms window → nothing emitted
- Bounded Set eviction at 10,001 entries → oldest evicted, re-sent event treated as new

Key technique: each test calls `vi.resetModules()` + dynamic `import()` to get a fresh module with a clean `SEEN_EVENTS` Set and a new `Subject` — no shared state between tests.

**2. ✅ Unit test: `withAuth` — `src/lib/auth0/__tests__/withAuth.test.ts`**

Three tests covering the security boundary:
- No session → 401 `{ error: 'Unauthorized' }`, handler never called
- Session with wrong role (CANDIDATE vs ADMIN/COORDINATOR required) → 403 `{ error: 'Forbidden' }`, handler never called
- Session with matching role (COORDINATOR) → 200, handler called exactly once

Key technique: `vi.mock('@/lib/auth0/auth0')` hoisted above imports so the module gets the mocked version at load time. `vi.mocked(auth0.getSession)` for typed mock control.

---

### What remains (priority order):

**3. Unit test: Zod schemas — `src/lib/schemas/talentAtlas.ts`**
Test that invalid inputs return the right error fields. Quick to write, demonstrates schema-first thinking. Worth adding before the interview.

**4. API integration test: PATCH /candidates/[id]**
Test the happy path and the 403 path (wrong role). Mock the WS broadcast. Requires a bit more setup but proves the full route handler path.

---

### What to say about tests:

> "I have two test suites. The first covers the RxJS pipeline in `wsStream.ts` — four tests using Vitest's fake timers and `vi.resetModules()` to isolate module state between runs. This was the highest priority because the pipeline behavior (dedup, buffer, coalesce) is exactly the kind of thing that breaks silently and is hard to debug by hand. The second covers `withAuth` — the security boundary. A bug there silently allows unauthorized access, so I test every role combination: no session, wrong role, matching role.
>
> What I'd add next: Zod schema tests for invalid input shapes, and an integration test for the PATCH endpoint. I deliberately skipped UI snapshot tests — they're fragile and low signal — and E2E tests until the product stabilizes."

---

## 12. BRILLIANT-SPECIFIC ALIGNMENT

### Their stack vs yours

| Brilliant wants | You have | Bridge |
|---|---|---|
| .NET or Python backend | Node.js / Next.js | "I'm comfortable with typed, structured backend code. The patterns — middleware, validation, error handling — transfer. I'm actively learning .NET and see it as the next layer to add." |
| React frontend | React (Next.js) ✓ | Strong overlap. You know modern React deeply — Server Components, hooks, optimistic updates. |
| SQL databases (PostgreSQL) | Supabase PostgreSQL ✓ | Direct match. You've written queries, designed schema, used the typed client. |
| Azure CI/CD | GitHub Actions ✓, Vercel | "I've built CI pipelines with GitHub Actions. Azure DevOps pipelines follow the same principles — stages, jobs, environment variables, deployment gates. The tooling is different but the concepts are identical." |
| Testing web apps and APIs | Vitest: wsStream.ts (4 tests) + withAuth (3 tests) ✓ | Lead with what's done — the pipeline test with fake timers is the most impressive. Be honest that Zod schemas and API integration tests are still to add. |
| Strategic advisor mindset | You built this project with documented decisions | Frame every decision as "here's the problem, here's what I considered, here's what I chose and why" — that IS consultant thinking. |

### Their values — connect them to your work

- **Åpenhet (Openness):** "I documented explicitly what's mock and what's production-ready in this project. I'd rather be clear about limitations than let someone discover them later."
- **Lagspill (Teamwork):** "I shipped TalentAtlas through pull requests, not direct commits, even as a solo developer. That discipline matters in a team."
- **Integritet (Integrity):** "I didn't take shortcuts on the auth layer even though it would have been faster. Security isn't a feature you add later."
- **Framoverlent (Forward-leaning):** "I built the real-time layer not because the feature required it but because I wanted to understand how to do it correctly at scale."
- **Entusiasme (Enthusiasm):** You built this in your own time. That's the proof.

---

## 13. FINAL PRESENTATION STRUCTURE (30–45 min)

### 0–3 min: Project overview
**Show:** The running app. Landing page → sign in → dashboard.
**Say:** The 2–3 minute story from Section 1.
**Don't say:** Anything technical yet. Let them see the product first.
**Likely follow-up:** "Who would actually use this?" → "NGOs and mission-driven orgs that run multi-company hiring campaigns."

---

### 3–8 min: Architecture and technology choices
**Show:** Draw or describe the architecture diagram (WS server, Next.js, Auth0, TanStack Query).
**Say:** *"Let me walk you through the main moving parts and why I made the choices I did."* Cover: route groups, `withAuth`, TanStack Query, WebSocket server, Vercel.
**Don't say:** Every library name. Focus on the decisions, not the inventory.
**Likely follow-up:** "Why not a separate backend?" → See Decision 2 above.

---

### 8–20 min: Code walkthrough
**Show:** In this order: `ws.types.ts` → `withAuth.ts` → `candidates/[id]/route.ts` → `wsStream.ts` → `useRealtimeSync.ts` → `candidates/page.tsx` (kanban).
**Say:** For each file: what problem it solves, why it's structured this way, what you'd change.
**Don't say:** "And here you can see that..." while scrolling past code. Stop on each file.
**Likely follow-up:** "Why didn't you use middleware.ts for auth?" → See Decision 5 above.

---

### 20–30 min: Technical challenges and decisions
**Show:** The demo — two browser tabs, drag a card, see it move.
**Say:** Walk through Story 1 (shared store), Story 2 (RxJS pipeline), Story 3 (simulator vs kanban).
**Don't say:** "I'm not sure why I did it this way." You know exactly why. Say it.
**Likely follow-up:** "What would you do at 10x the load?" → Three things that break first — see Scalability questions above.

---

### 30–40 min: Testing, improvements, deployment
**Show:** GitHub Actions config if you have it. The `docs/` folder with decision documentation.
**Say:** Be honest about testing gap. Say what you'd test first and why (wsStream.ts). Talk about what you'd change before production.
**Don't say:** "It's just a hobby project so testing wasn't important." Testing is always important — you made a deliberate trade-off, not an oversight.
**Likely follow-up:** "How would you test the real-time layer?" → wsStream.ts is pure logic. RxJS TestScheduler for time-based operators. Mock the WebSocket, assert the pipeline output.

---

### 40–45 min: Questions and discussion
**They will likely ask about their stack.** Be ready to say: *"I haven't worked with .NET professionally, but I understand the patterns — typed, structured backend code, middleware, validation layers. I'd like to learn it. What does your typical customer project stack look like?"* Then listen.

**Ask them:**
- "What does a typical onboarding look like — do new consultants shadow existing projects first or go in independently?"
- "How much autonomy do consultants have in making technical decisions versus following the customer's existing stack?"
- "What's the balance between frontend and backend work in most projects?"

---

---

## 12. PORTFOLIO SITE & ADMIN CMS

This is the second half of the project — the public photography portfolio and the admin panel for managing it. It demonstrates a different set of decisions from TalentAtlas: static generation, server-only auth, file upload pipelines, and cache invalidation strategy.

---

### What to say about it (1–2 minutes)

> "The portfolio is a public photography showcase built with Next.js App Router and Supabase PostgreSQL. All routes are statically generated at build time — Next.js pre-renders every category and subcategory page so the public site is pure static HTML at the CDN edge. There's no server round-trip for the gallery.
>
> Alongside it I built a private admin CMS — only accessible if you have the Admin role in Auth0. The interesting part is the upload pipeline: the browser sends an image via `multipart/form-data`, the server extracts real pixel dimensions using Sharp from the raw buffer before trusting any user input, uploads the file to Supabase Storage, then writes the database record. If the DB insert fails, the already-uploaded file gets deleted — no orphaned files in storage.
>
> After an admin uploads or deletes a photo, I call `revalidatePath` which tells Next.js to regenerate those static pages on the next request — so the public portfolio is always in sync without needing a full redeploy."

---

### Architecture

```
Public Portfolio (static, CDN edge)
  ├── generateStaticParams → pre-renders /portfolio, /portfolio/[cat], /portfolio/[cat]/[sub]
  ├── Server Components → Supabase read queries (supabase/server.ts with cookies)
  ├── Next.js Image → Supabase CDN remote patterns, width/height from DB
  └── Lightbox (lazy) → next/dynamic({ ssr: false }) — JS only loads when photo is opened

Admin CMS (server-only auth gate)
  ├── AdminAuthGate (Server Component) → getAdminSessionOrRedirect()
  │     └── Redirects to Auth0 login if no session or role ≠ Admin
  ├── Upload page → await connection() (opts out of PPR caching, always fresh)
  ├── UploadForm (Client Component) → HTML5 drag-and-drop, URL.createObjectURL preview
  ├── POST /api/admin/photos → multipart/form-data → sharp → Supabase Storage → DB insert
  │     └── Rollback: delete storage file if DB insert fails
  ├── DELETE/PATCH /api/admin/photos/[id] → Supabase admin client (service role)
  └── revalidatePath('/portfolio', 'layout') + revalidatePath('/') after every mutation
```

---

### Three Supabase client variants — why each exists

| Client | File | Key | Used for |
|--------|------|-----|----------|
| `createServerClient` | `supabase/server.ts` | anon key + cookies | Server Components — reads user session for RLS |
| `createAdminClient` | `supabase/admin.ts` | service role key | Admin writes — bypasses RLS entirely |
| `getSupabaseStatic()` | `supabase/static.ts` | anon key | `generateStaticParams` at build time — no request context, no cookies |

**Why not just use the service role key everywhere?**
The service role key bypasses row-level security. If it ever leaked client-side it would give full database access to anyone. The anon key + RLS is the correct model for reading public data. Service role is only used on the server for admin mutations where you explicitly need to bypass user-level restrictions.

**Likely question:** *"What is RLS and why does the admin client bypass it?"*
Row-Level Security is a PostgreSQL feature where Supabase attaches policies to tables — for example "only return rows where `published = true` or where `user_id = auth.uid()`." The admin client uses the service role key which identifies as a superuser in Postgres and ignores those policies. An admin needs to see and modify all photos regardless of their published state or who owns them.

---

### Decision A: `sharp` for image dimensions (server-side extraction)

**What:** After the browser sends the file, the server reads the raw buffer with `sharp` to get `width` and `height` before inserting into the database.

**Why not let the client send dimensions?**
A malicious or buggy client could send wrong values — wrong dimensions break the `Next.js Image` component's layout reservation and cause Cumulative Layout Shift. Sharp reads the actual bytes of the file and returns the real pixel dimensions. You can't fake that.

**The code pattern:**
```ts
const buffer = Buffer.from(await file.arrayBuffer());
const { width, height } = await sharp(buffer).metadata();
// then upload buffer to Supabase Storage
```

**Trade-off:** Sharp adds ~2–5 MB to the serverless function's bundle. It's worth it for correctness, but in a cost-sensitive environment you could use a lightweight alternative like `image-size` (reads just the file header bytes) for dimensions and skip full decoding.

---

### Decision B: Atomic upload + rollback pattern

**The problem:** Two writes happen for every photo: (1) upload file to Supabase Storage, (2) insert metadata row to PostgreSQL. If they happen independently and step 2 fails, you have an orphaned file in storage with no database record — it wastes storage and is invisible to the admin UI.

**The solution — upload first, rollback on failure:**
```ts
// 1. Upload to storage
const { error: storageError } = await supabase.storage
  .from('photos').upload(path, buffer, { contentType });
if (storageError) return 400; // nothing to roll back

// 2. Insert DB record
const { error: dbError } = await supabase.from('photos').insert({ ...metadata, storage_path: path });
if (dbError) {
  // Roll back: delete the just-uploaded file
  await supabase.storage.from('photos').remove([path]);
  return 500;
}
```

**Why not DB first, then upload?**
If the DB insert succeeds but the upload fails, you have a record pointing to a file that doesn't exist — every image load for that photo returns 404. Storage orphans are cheaper to tolerate than broken DB records. Upload-first means any failure is recoverable.

**Trade-off:** There's still a race window between upload success and DB insert failure where the file exists transiently without a record. In a real production system you'd use a background job that scans storage for files with no matching DB record and removes them on a schedule.

---

### Decision C: `revalidatePath` vs `router.refresh()` — two different tools

| | `revalidatePath` | `router.refresh()` |
|---|---|---|
| Called from | Server (API route) | Client Component |
| Effect | Invalidates Next.js server cache — next user request to that path re-runs the Server Component and gets fresh data | Re-fetches data for the current user's client-side router navigation — does not affect other users |
| Used in this project | Admin API routes after photo mutations — makes public portfolio reflect changes for all visitors | `PhotoManager` component after deleting a photo — refreshes the admin grid for this session |

**Why both?**
`router.refresh()` is the lightweight option when you just need to re-render what's already on screen for this user. It's a client-side signal. `revalidatePath` is the cache key invalidation — it tells Next.js "the cached response for this path is stale, regenerate it on next request." Public visitors need `revalidatePath` or they'd see the old gallery from CDN cache even after you delete a photo.

**Likely question:** *"Why didn't you just use `export const revalidate = 3600`?"*
I tried that first. Next.js threw a build error: *"Route segment config 'revalidate' is not compatible with `nextConfig.cacheComponents`."* The project uses PPR (Partial Pre-Rendering) via `cacheComponents: true` in `next.config.ts`. PPR owns the caching model for those routes and those two mechanisms conflict. On-demand invalidation via `revalidatePath` is the correct approach when PPR is active.

---

### Decision D: Lazy loading the Lightbox with `next/dynamic`

**What:** The Lightbox component (full-screen photo viewer with keyboard navigation) is loaded lazily:
```ts
// GalleryGrid.tsx
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });
```

**Why `ssr: false`?**
The Lightbox uses `window.addEventListener('keydown', ...)` and sets `document.body.style.overflow = 'hidden'`. These are browser-only APIs — if Next.js tries to server-render the component it would throw `ReferenceError: window is not defined`. The `ssr: false` flag tells Next.js to skip this component entirely during server rendering and only hydrate it client-side.

**Why lazy at all?**
The Lightbox modal is only opened when the user clicks a photo. Shipping its JavaScript in the initial bundle means every visitor pays the download cost whether they open any photo or not. With `next/dynamic`, the Lightbox chunk only downloads when a photo is clicked — it's deferred until it's actually needed.

**Trade-off:** Very first photo open has a small delay (the chunk downloads). This is imperceptible on fast connections. On a slow 3G network you might notice it — you'd mitigate that with a preload hint (`<link rel="prefetch">`) triggered on hover.

---

### Decision E: `generateStaticParams` for portfolio routes

**What:** All portfolio pages are pre-rendered at build time:
```ts
// portfolio/[[...slug]]/page.tsx
export async function generateStaticParams() {
  const categories = await getAllCategoriesStatic(); // uses static Supabase client
  return [
    {}, // /portfolio — all photos
    ...categories.map(c => ({ slug: [c.slug] })),
    ...categories.flatMap(c =>
      (c.subcategories ?? []).map(s => ({ slug: [c.slug, s.slug] }))
    ),
  ];
}
```

**Why?** Photography galleries are read-heavy and content changes rarely — an admin uploads photos perhaps weekly. Serving pre-rendered HTML from the CDN is orders of magnitude faster than hitting a database on every page load. The content is also the same for every visitor, so there's no user-specific data that would require SSR.

**Why `getAllCategoriesStatic()` instead of the regular server client?**
`generateStaticParams` runs at build time in Node.js, not inside a request handler — there's no HTTP request context and no cookies. The regular `createServerClient` calls `cookies()` from `next/headers`, which throws if called outside a request context. The static client uses a singleton pattern with no cookie dependency.

---

### Decision F: `await connection()` in the upload page

**What:** The admin upload page has `await connection()` at the top:
```ts
// admin/upload/page.tsx
import { connection } from 'next/server';
export default async function UploadPage() {
  await connection(); // opt out of PPR
  const categories = await fetchCategories();
  ...
}
```

**Why?** PPR (`cacheComponents: true`) would try to cache a static shell of this page. The categories dropdown in the upload form must show the current state of categories — if someone just added a new category, the upload form should list it. `connection()` signals to Next.js that this page depends on a live request and cannot be pre-rendered or served from cache. It's the explicit "I need fresh data every time" marker.

---

### Decision G: Admin auth with `getAdminSessionOrRedirect`

**What:** The admin layout uses a Server Component as an auth gate:
```ts
// (admin)/admin/layout.tsx
async function AdminAuthGate({ children }) {
  const session = await getAdminSessionOrRedirect(); // throws redirect if not admin
  return <>{children}</>;
}
```

**Why a Server Component gate and not middleware?**
Middleware runs at the CDN edge and sees only the request headers — it can check for a cookie's existence but not decode an Auth0 session JWT securely. The full session validation (signature check, expiry, role extraction) requires the Auth0 SDK running in Node.js. The Server Component auth gate runs in the Node.js runtime and can do the full verification. It also keeps the auth logic co-located with the admin routes rather than scattered across a middleware pattern-matching config.

**Why `getAdminSessionOrRedirect` vs `getSession`?**
`getSession` returns `null` if there's no session — you'd need to check and redirect manually every time. `getAdminSessionOrRedirect` encapsulates the pattern: if no session, redirect to login; if session but wrong role, redirect to 403 page; otherwise return the session. One call handles all three cases.

---

### Likely Questions — Portfolio & Admin

**Q: "How does the public portfolio stay up to date when you add a new photo?"**
After the admin uploads, the API route calls `revalidatePath('/portfolio', 'layout')` and `revalidatePath('/')`. The `'layout'` scope tells Next.js to invalidate the entire layout subtree for that path — not just one page variant but all slug variations under `/portfolio`. The next visitor to that URL triggers a regeneration. Until then, the CDN serves the previous cached version. This is the on-demand ISR pattern.

**Q: "What happens if the Supabase Storage upload succeeds but your server crashes before the DB insert?"**
You'd have an orphaned file — a file in storage with no database record. The current implementation doesn't handle this fully. In production I'd add a background cleanup job that periodically queries storage for files with no matching `photos` row and removes them. Alternatively, if Supabase supported database transactions spanning storage operations (it doesn't in the standard SDK), you could use that.

**Q: "Why not store image dimensions client-side from `File.prototype` data?"**
`File` objects expose `name`, `size`, and `type` but not pixel dimensions. You'd need to draw the image to a canvas to read `naturalWidth`/`naturalHeight` — which works but runs in the browser before upload. The problem is you're trusting client-side code that can be manipulated. Sharp on the server reads the raw bytes and gives authoritative values.

**Q: "How would you handle large file uploads that exceed serverless function limits?"**
Vercel's max request body is ~4.5 MB for Edge, ~50 MB for Node.js functions. For large images I'd generate a signed Supabase Storage upload URL server-side and have the browser upload directly to Supabase — bypassing the Next.js function entirely. Then the function only receives a callback with the storage path and runs sharp to extract metadata. This is the presigned URL pattern used by S3, Azure Blob, and Supabase alike.

**Q: "Why use CSS columns for the masonry gallery instead of a library?"**
CSS `column-count` gives multi-column masonry in pure CSS with no JavaScript. It works without hydration, renders on first paint, and is zero JS. The trade-off: CSS columns flow items top-to-bottom within each column, not left-to-right across the grid. If display order matters (e.g. you want the first photo to appear top-left and the second top of column 2), you'd need a JS layout library like Masonry.js. For a photography portfolio where visual rhythm matters more than strict sequence order, CSS columns are the better choice.

---

### Portfolio & Admin — Ownership Moments

| Moment | What you did | Why it matters |
|--------|-------------|----------------|
| Lazy-loaded Lightbox | Added `next/dynamic({ ssr: false })` to `GalleryGrid` | Avoids `window is not defined` SSR crash; defers JS download until the user actually opens a photo |
| Sharp dimension extraction | Read file buffer server-side before accepting user-provided values | Correct dimensions prevent CLS; removes trust in client data |
| Atomic upload + rollback | Delete storage file if DB insert fails | Prevents orphaned files without a cross-service transaction mechanism |
| `revalidatePath` after admin mutations | Called from POST, PATCH, DELETE admin routes | Public gallery reflects changes for all visitors without a full redeploy |
| `await connection()` in upload page | One line that opts the admin upload form out of PPR | Without it, the categories dropdown could serve stale cached data |
| `generateStaticParams` with static client | Created a singleton Supabase client that doesn't call `cookies()` | Allows pre-rendering at build time — `cookies()` throws outside request context |

---

### Code Walkthrough Order — Portfolio & Admin

If asked to walk through the portfolio or admin:

1. **`src/app/(portfolio)/portfolio/[[...slug]]/page.tsx`** — show `generateStaticParams`, the catch-all slug param pattern, and how the same page handles all three URL variants
2. **`src/components/features/portfolio/GalleryGrid.tsx`** — show the dynamic Lightbox import with `ssr: false`
3. **`src/app/(admin)/admin/layout.tsx`** — show `AdminAuthGate` server component calling `getAdminSessionOrRedirect()`
4. **`src/app/(admin)/admin/upload/page.tsx`** — show `await connection()` and server-side category fetch
5. **`src/components/features/admin/UploadForm.tsx`** — show drag-and-drop with `URL.createObjectURL` and cleanup
6. **`src/app/api/admin/photos/route.ts`** — show multipart parsing, sharp, atomic upload pattern, and `revalidatePath`
7. **`src/components/features/admin/PhotoManager.tsx`** — show `router.refresh()` after delete

Start at the public surface (the gallery) and work toward the private surface (the admin). That arc — "here's what visitors see, here's how it gets there" — tells the story naturally.

---

---

## 13. CONSULTING MINDSET

Brilliant hires consultants, not just coders. These situations will come up — have a line for each.

**"A client pushes back on your recommendation."**
> "I make sure I understand what they're actually protecting — it's usually a cost, a timeline, or a risk they haven't said out loud. I name it back to them: 'It sounds like the concern is X.' Then I show the trade-off clearly — not 'my way is right', but 'here's what each option costs you.' If they still choose differently, I implement it well and flag the risk in writing so we can revisit if it bites us."

**"Requirements are unclear. How do you start?"**
> "I write down my assumptions and share them before writing a line of code. A one-pager with 'I'm assuming X, Y, Z — does this match what you need?' Surface disagreement early when it's cheap to fix. Then I build the smallest thing that lets the client see and react to something real."

**"How do you handle scope creep?"**
> "I make the cost visible. 'This adds two days and pushes feature B to next sprint — do you want to make that trade?' I don't say no, I make them the decision-maker with full information. And I flag it the moment I see it, not at the end when it's too late."

**Hints to keep in mind:**
- Always position yourself as someone who makes the client *more* informed, not someone who overrides them
- Mention writing things down — it signals professionalism and protects everyone
- "I implement it well and flag the risk" = you disagree and commit, which is exactly what a senior consultant does

---

## 14. TESTING PHILOSOPHY

You don't have full test coverage. Own it with a clear position — not an apology.

**What to say:**
> "I made a deliberate trade-off: building the architecture first, then adding tests where the risk of being wrong is highest. In a solo project with evolving requirements, testing everything early creates tests that you throw away. What I'd prioritize now:
> 1. `wsStream.ts` — pure RxJS logic, no side effects, deterministic. This is the highest-value test because it's also the hardest to debug manually.
> 2. `withAuth` — security boundary. A bug here silently allows unauthorized access. Unit test every role combination.
> 3. API route handlers — integration tests against the in-memory store, covering the happy path and the 409/400 error cases.
>
> What I deliberately skipped: UI snapshot tests (fragile, low signal) and E2E tests (high maintenance cost before the product stabilizes)."

**Key framing:** You test at the boundary that gives you the most signal per line of test code. Not everything equally.

**If they ask "how would you test the real-time layer?"**
RxJS has a `TestScheduler` that lets you control virtual time. You'd mock the WebSocket, push events through the Subject, and assert what comes out of the pipeline after the 200ms buffer window — without waiting 200ms in real time.

---

## 15. LEADERSHIP & MENTORING

You may not have managed a team, but you have led. Frame it correctly.

**What you can honestly say:**
> "On this project I made every architecture decision — not just 'what framework' but 'why this pattern, what are the trade-offs, and how would the next developer pick this up.' I documented decisions as they happened, not after. The `docs/` folder exists because I know that a system you can't explain to someone else isn't really done."

**On mentoring/leading others:**
> "I've found the highest-leverage thing I can do for a less experienced developer is explain the *why*, not just the *what*. When I review code I'm not fixing bugs, I'm asking 'do you see why this creates a problem at scale?' — that's a different conversation."

**Hints:**
- The `docs/interview-prep-brilliant.md` and `docs/talent-atlas.md` files themselves demonstrate leadership thinking — you wrote structured decision docs as if onboarding a team
- If you've ever explained a technical decision to a non-technical person, that counts — say so
- "I'd want to grow into a role where I'm actively unblocking others" is a fine honest answer if formal leadership experience is limited
- Don't oversell. Brilliant will check. Undersell slightly and let the technical depth do the work.

---

---

## 16. CODE WALKTHROUGH ROADMAP

The interview brief: *"talk us through your code, how you have tried to find a solution and how you prefer to work as a developer."*

**Rule:** Don't open files — tell the story of a problem, then show the code that solved it. The file is evidence, not the presentation.

**How to open:**
> "I'll show you three things: a public photography portfolio, the admin panel behind it, and a real-time hiring dashboard. Each one has one technical decision I'm proud of — let me walk you through those."

**For every file you open, say three sentences:**
1. "The problem I had here was…"
2. "The decision I made was…"
3. "The trade-off was…"

Then stop and let them ask. The follow-up questions are where the real conversation happens.

---

### Portfolio — ~7 min

Thread: *"A photography site that's fast for visitors but easy to update."*

| # | File | What to show |
|---|------|-------------|
| 1 | `app/(portfolio)/portfolio/[[...slug]]/page.tsx` | The catch-all slug — one page handles `/portfolio`, `/portfolio/nature`, `/portfolio/nature/forest`. Show `generateStaticParams`. Say: "All routes are pre-built at deploy time from the database — no server on every visit." |
| 2 | `lib/api/photos/photos.ts` | `getAllCategoriesStatic()` — show the static Supabase client. Say: "Build time has no request context, so I needed a singleton that doesn't call `cookies()` — that function throws outside a request." |
| 3 | `components/features/portfolio/GalleryGrid.tsx` | The dynamic Lightbox import with `ssr: false`. Say: "The lightbox uses `window` — crashes on the server. And with `next/dynamic` the JS chunk only downloads when someone actually opens a photo." |

Stop here. Three files, three decisions.

---

### Admin CMS — ~7 min

Thread: *"The admin panel has a real upload pipeline with a safety net."*

| # | File | What to show |
|---|------|-------------|
| 1 | `app/(admin)/admin/layout.tsx` | `AdminAuthGate` server component calling `getAdminSessionOrRedirect()`. Say: "Auth runs on the server before any client code executes — there's no way to bypass it on the client." |
| 2 | `app/api/admin/photos/route.ts` | Walk linearly: multipart parse → `sharp(buffer).metadata()` → Storage upload → DB insert → **rollback on failure** → `revalidatePath`. Say: "If the DB insert fails I delete the just-uploaded file. No orphaned files in storage." Spend most time here. |
| 3 | `components/features/admin/PhotoManager.tsx` | `router.refresh()` after delete. Say: "`revalidatePath` invalidates the server cache for all visitors. `router.refresh()` re-renders just my current session. Two different tools for two different audiences." |

---

### TalentAtlas — ~15 min

Thread: *"A live hiring board where multiple people see changes in real time."*

| # | File | What to show |
|---|------|-------------|
| 1 | `app/(talent-atlas)/talent-atlas/(app)/candidates/page.tsx` | Demo the kanban visually if possible, then show `handleDrop` → `updateStage`. Say: "Drag a card and it moves immediately — before the server confirms anything." |
| 2 | `hooks/talent-atlas/useCandidates.ts` | `onMutate` → optimistic update → `onError` rollback. Say: "If the server returns an error the card snaps back. The user never waits for a round trip to see their action." |
| 3 | `lib/auth0/withAuth.ts` | The HOF pattern. Say: "Every write endpoint is wrapped in this. It reads the session, checks the role, and either runs the handler or returns 401. The handler never sees an unauthenticated request." |
| 4 | `lib/schemas/talentAtlas.ts` | Zod schemas. Say: "One file owns the shape of every write. The TypeScript types are inferred from the schema — no duplication between validation and type definition." |
| 5 | `server/ws-server.ts` | Show the heartbeat ping/pong briefly. Say: "Separate Node process on port 4000 so it keeps running — a serverless function would be killed between requests." |
| 6 | `lib/store/wsStream.ts` | **Showstopper.** Show Subject → `filter(isDuplicate)` → `bufferTime(200)` → `map(coalesce)`. Say: "If the same candidate is updated twice in 200ms, only the latest event reaches the UI. A naive approach would let race conditions produce stale state — this is where I had to think carefully." |
| 7 | `hooks/talent-atlas/useRealtimeSync.ts` | `setQueryData` patching the TanStack Query cache directly. Say: "Real-time events don't trigger a refetch — they patch the existing cache in place. Same data layer whether the update came from REST or WebSocket." |

---

### Order and pacing

Go **portfolio → admin → TalentAtlas**. Each section adds complexity. TalentAtlas lands last when they're already familiar with how you think. Total: ~30 minutes, leaving 10–15 for their questions and discussion.

If time is short, drop portfolio entirely and open with admin → TalentAtlas. The real-time architecture is the most interesting thing in the project — make sure it gets enough time.

---

## One Thing to Remember

The interviewer said they're not looking for right or wrong answers. They want to understand how you think. Every answer you give should end with a trade-off or a "what I'd do differently." That is senior-level thinking — not having the perfect answer, but knowing what the perfect answer would require and why you made the choice you did instead.
