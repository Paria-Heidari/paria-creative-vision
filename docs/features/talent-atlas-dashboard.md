## Talent Atlas — Dashboard

Entry:
src/app/(talent-atlas)/talent-atlas/(app)/dashboard/page.tsx

Shell/Layout:
src/app/(talent-atlas)/talent-atlas/(app)/layout.tsx — wraps children in QueryProvider, RealtimeProvider (WS → TanStack cache), TalentAtlasHeader, TalentAtlasSidebar, Auth0Provider

Authentication:
See [[authentication]]. Server-side gated by `AuthGate` in the shared `(app)/layout.tsx` (blocks before any page renders, applies to this page like every other Talent Atlas route). `useUser()` in `DashboardOverview` is display-only (welcome message), not a gate.

API:
Fetched (fixed 2026-07-12) — `useCampaigns()` and `useCandidates()`, same as Candidates/Campaigns/Companies pages, hitting `/api/talent-atlas/{campaigns,candidates}`.

State:
React Query, via `useCampaigns()` / `useCandidates()` — same pattern as the other Talent Atlas pages, no dashboard-specific fetching logic.
- **Total Hired** = sum of `hired_count` across all campaigns
- **Active Campaigns** = count of campaigns with `status === 'active'`
- **Hire Rate** = total hired ÷ total applied, as a percentage (`—` if nothing applied yet)
- **Avg Time to Hire** = always `—`, not computable — `MOCK_CANDIDATES`/`MOCK_CAMPAIGNS` have no `applied_at`/`hired_at` timestamps to average. Would need a data-model change, not just a wiring change.
- **Active Campaigns list** = top 3 campaigns by `applied_count`, progress bar = `hired_count / applied_count`
- **Recent Candidates** (replaces the old hardcoded "Live Activity" feed) = first 4 candidates from `useCandidates()`, campaign name resolved via a `campaignMap`, stage shown instead of a timestamp — there's no `created_at` field anywhere, so a real "2h ago"-style feed isn't possible without new data, and this doesn't fabricate one.

Realtime:
RealtimeProvider (src/components/providers/talentAtlas/RealtimeProvider.tsx) + useRealtimeSync (src/hooks/talent-atlas/useRealtimeSync.ts) + wsStream (src/lib/realtime/wsStream.ts) — opens a WebSocket and feeds updates into the TanStack Query cache. Runs at the layout level. Since this page now reads `queryKeys.campaigns`/`queryKeys.candidates` via the same hooks as Candidates/Campaigns pages, realtime updates to those keys (e.g. `candidate_created`, `campaign_updated`) now also refresh this page's stats live — not just the pages that were already wired up.

Main Components:
- DashboardOverview (src/components/features/talentAtlas/DashboardOverview.tsx)
- TalentAtlasHeader
- TalentAtlasSidebar
- SidebarUserFooter
