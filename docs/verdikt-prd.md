# Verdikt — Product Requirements Document

> **Version:** 1.1  
> **Status:** In Progress  
> **Author:** Paria  
> **Last updated:** 2026-05-03

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Goals & Success Metrics](#4-goals--success-metrics)
5. [Scope — MVP vs Future](#5-scope--mvp-vs-future)
6. [Information Architecture](#6-information-architecture)
7. [Data Model](#7-data-model)
8. [Roles & Permissions](#8-roles--permissions)
9. [Workflow Design](#9-workflow-design)
10. [KPI & Analytics Logic](#10-kpi--analytics-logic)
11. [Technical Architecture](#11-technical-architecture)
12. [Implementation Plan](#12-implementation-plan)
13. [Portfolio & Storytelling Strategy](#13-portfolio--storytelling-strategy)
14. [Open Questions](#14-open-questions)

---

## 1. Product Overview

**Verdikt** is a lightweight, multi-tenant B2B SaaS that formalizes how organizations approve internal business decisions — budget requests, hiring approvals, vendor contracts, and policy changes.

Most companies handle these processes through email threads and spreadsheets. Verdikt replaces that with a structured workflow, a clear audit trail, and a KPI dashboard that turns approval data into business insights.

**Tagline:** *"Decisions, tracked. Outcomes, owned."*

**Live demo:** `paria.dev/verdikt/dashboard`  
**Portfolio case study:** `paria.dev/work/verdikt`

---

## 2. Problem Statement

### The Gap

Organizations make dozens of internal decisions weekly. Most are tracked informally:

- Approval chains happen over email — no single source of truth
- Decisions lack documented reasoning — institutional knowledge is lost
- No visibility into bottlenecks — which department is slowest to approve?
- No accountability — who approved what, and when?

### The Insight

The problem is not that people make bad decisions. The problem is that **decisions are not treated as data**. Once formalized as structured records, decision history becomes a source of organizational intelligence.

---

## 3. Target Users

### Primary (MVP)

| Persona | Role | Pain point |
|---|---|---|
| **HR Manager, IT Manager** | Approves hiring requests | Requests arrive via email, no history of reasoning |
| **Finance Lead** | Reviews budget approvals | No visibility into pending items or approval timelines |
| **Employee** | Submits purchase requests | No status updates after submission, has to follow up manually |

### Secondary (post-MVP)

- **C-level executives** — Want a bird's-eye view across the whole org: approval rates, decision volume trends, department bottlenecks
- **Ops managers** — Care about deadlines and SLA compliance: are approvals happening on time, or are things getting stuck?

---

## 4. Goals & Success Metrics

### Product Goals

- Reduce approval process from email chains to a structured, trackable workflow
- Give managers a single queue of pending decisions requiring their action
- Give leadership a dashboard that turns approval data into business metrics

### MVP Success Criteria

| Metric | Target |
|---|---|
| Decision can be created and submitted in under 2 minutes | ✓ |
| Manager can approve or reject with documented reason | ✓ |
| Every status change is recorded in an immutable audit log | ✓ |
| Dashboard shows 6 core KPIs from seeded data | ✓ |
| Demo is live and shareable | ✓ |

### Portfolio Success Criteria

- Recruiter can understand the system within 60 seconds of landing on the case study
- Live demo has realistic seed data — no empty states
- GitHub repo README explains product decisions, not just setup steps

---

## 5. Scope — MVP vs Future

### In Scope (MVP)

- [x] Auth with magic link (Supabase Auth)
- [x] Multi-tenant organizations (one `org_id` on all tables)
- [x] Role-based access: Employee / Manager / Admin
- [x] Decision CRUD (create, view, list, filter by status)
- [x] Workflow engine: Draft → Pending → Approved / Rejected
- [x] Rejection requires documented reason (enforced at API level)
- [x] Audit log (append-only, records every state transition)
- [x] Comment thread on each decision
- [x] Analytics dashboard (6 KPIs + 2 charts)
- [x] Seed data: 50 decisions, 5 departments, 3 user roles
- [x] Deploy to Vercel (as part of portfolio site)

### Out of Scope (Post-MVP)

- [ ] Email notifications on status change
- [ ] File attachments on decisions
- [ ] Multi-level approval chains (manager → director → CEO)
- [ ] SLA tracking with automatic escalation
- [ ] CSV/PDF export
- [ ] Slack integration
- [ ] Custom decision types per organization
- [ ] Mobile responsive layout

---

## 6. Information Architecture

### App Routes

```
/verdikt/login                 Login (magic link) — no sidebar
/verdikt/dashboard             Analytics overview
/verdikt/decisions             All decisions (filterable)
/verdikt/decisions/new         Create new decision
/verdikt/decisions/[id]        Decision detail + comments + audit trail
/verdikt/departments           Department list (admin only)
/verdikt/settings              Organization settings (admin only)
```

### Navigation (Sidebar)

```
← Back to portfolio

OVERVIEW
  Dashboard

DECISIONS
  All Decisions         [count badge]
  My Decisions
  Pending Approval      [badge — manager/admin only]

ORGANIZATION
  Departments           [admin only]
  Settings              [admin only]
```

### Recruiter Flow Through Demo

```
Portfolio work page
  → "Open Demo" button → /verdikt/dashboard (logs in as seeded admin user)
  → Dashboard (KPIs visible immediately with real data)
  → Clicks into "Pending Approval" queue
  → Opens a decision detail
  → Approves it
  → Watches dashboard KPI update
  → Checks audit log on the decision
  → "← Back to portfolio" returns to paria.dev
```

The demo is designed to tell the whole product story in under 90 seconds.

---

## 7. Data Model

### Schema Overview

```
organizations
    │
    ├── verdikt_users (org_id)
    │       └── role: employee | manager | admin
    │
    ├── departments (org_id)
    │       └── head_user_id → verdikt_users
    │
    ├── decisions (org_id)
    │       ├── requested_by → verdikt_users
    │       ├── assigned_to → verdikt_users (approver)
    │       ├── department_id → departments
    │       ├── decision_comments
    │       └── decision_audit_log
```

### Table Definitions

```sql
CREATE TABLE organizations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  slug       text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE verdikt_users (
  id            uuid PRIMARY KEY,   -- matches auth.users.id
  org_id        uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  full_name     text NOT NULL,
  email         text NOT NULL,
  role          verdikt_role NOT NULL DEFAULT 'employee',
  department_id uuid,               -- FK added after departments table
  avatar_url    text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

CREATE TABLE departments (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id       uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name         text NOT NULL,
  head_user_id uuid REFERENCES verdikt_users(id) ON DELETE SET NULL,
  created_at   timestamptz DEFAULT now(),
  UNIQUE (org_id, name)
);

CREATE TABLE decisions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id           uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title            text NOT NULL,
  description      text,
  type             decision_type NOT NULL,
  status           decision_status NOT NULL DEFAULT 'draft',
  priority         decision_priority NOT NULL DEFAULT 'medium',
  amount           numeric(12, 2),
  requested_by     uuid NOT NULL REFERENCES verdikt_users(id),
  department_id    uuid REFERENCES departments(id) ON DELETE SET NULL,
  assigned_to      uuid REFERENCES verdikt_users(id) ON DELETE SET NULL,
  due_date         date,
  decided_at       timestamptz,     -- set only when approved or rejected
  rejection_reason text,            -- required when status = rejected (API-enforced)
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

CREATE TABLE decision_comments (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id uuid NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
  org_id      uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES verdikt_users(id),
  content     text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE decision_audit_log (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id uuid NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
  org_id      uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES verdikt_users(id),
  action      audit_action NOT NULL,
  old_value   text,
  new_value   text,
  metadata    jsonb,
  created_at  timestamptz DEFAULT now()
  -- append-only: UPDATE and DELETE blocked at DB level via rules
);
```

> Note: table is named `verdikt_users` (not `users`) to avoid collision with Supabase's `auth.users` and the existing portfolio schema.

### Design Decisions Worth Noting

- `decided_at` is separate from `updated_at` — enables accurate time-to-decision calculation
- `rejection_reason` is nullable at DB level but enforced NOT NULL in API layer when status = rejected
- Audit log is append-only — mirrors real compliance systems, no UPDATE/DELETE allowed
- Every table carries `org_id` — enables multi-tenancy without separate schemas

---

## 8. Roles & Permissions

| Action | Employee | Manager | Admin |
|---|---|---|---|
| Create decision | ✓ | ✓ | ✓ |
| Submit own draft | ✓ | ✓ | ✓ |
| Cancel own pending | ✓ | ✓ | ✓ |
| View own decisions | ✓ | ✓ | ✓ |
| View all decisions in dept | — | ✓ | ✓ |
| View all decisions org-wide | — | — | ✓ |
| Approve / Reject | — | ✓ (own dept) | ✓ |
| Reassign decision | — | — | ✓ |
| View analytics dashboard | — | ✓ | ✓ |
| Manage departments | — | — | ✓ |
| Manage users | — | — | ✓ |

---

## 9. Workflow Design

### State Machine

```
                    ┌─────────┐
                    │  DRAFT  │ ← employee can edit/delete
                    └────┬────┘
                         │  submit()
                         ▼
                    ┌─────────┐
                    │ PENDING │ ← assigned to approver
                    └────┬────┘
              ┌──────────┼──────────┐
           approve()  reject()   cancel()
              │          │          │
              ▼          ▼          ▼
         APPROVED    REJECTED   CANCELLED
                         │
                    resubmit()
                         │
                         ▼
                       DRAFT   ← employee can revise and resubmit
```

### Allowed Transitions

Implemented in `src/lib/verdikt/workflow.ts`:

```typescript
const TRANSITIONS: Record<VerdiktRole, Partial<Record<DecisionStatus, DecisionStatus[]>>> = {
  employee: {
    draft:    ['pending'],
    pending:  ['cancelled'],
    rejected: ['draft'],
  },
  manager: {
    pending: ['approved', 'rejected'],
  },
  admin: {
    draft:     ['pending', 'cancelled'],
    pending:   ['approved', 'rejected', 'cancelled'],
    approved:  ['rejected'],    // admin override
    rejected:  ['approved'],    // admin override
  },
}
```

---

## 10. KPI & Analytics Logic

### Dashboard KPIs

| KPI | Formula | Business meaning |
|---|---|---|
| **Total Decisions** | `COUNT(*)` | Pipeline size |
| **Approval Rate** | `COUNT(approved) / COUNT(approved + rejected) * 100` | Decision quality upstream |
| **Avg Time to Decision** | `AVG(decided_at - created_at)` where status in approved/rejected | SLA performance |
| **Overdue Pending** | `COUNT(*) WHERE status='pending' AND due_date < NOW()` | Immediate action required |
| **Decisions by Department** | `COUNT(*) GROUP BY department_id` | Load distribution |
| **Volume Trend (30d)** | `COUNT(*) GROUP BY DATE(created_at) WHERE created_at > NOW()-30d` | Growth / activity signal |

### Charts

**Area chart — Decision Volume (30 days)**
- X axis: date
- Y axis: count of decisions created
- Shows organizational activity trend

**Bar chart — By Department**
- X axis: department name
- Y axis: count
- Color coded by approval rate (green if >70%, amber if 50-70%, red if <50%)

### Why These 6

These are the metrics a CFO, COO, or HR Director would actually open a dashboard to see. Each one is directly actionable:
- High overdue count → manager is a bottleneck
- Low approval rate → employees are submitting poorly reasoned requests
- High avg time → SLA problem in a specific department

---

## 11. Technical Architecture

### Stack

```
Frontend      Next.js 16 (App Router), TypeScript, Tailwind CSS v4
Backend       Next.js API Route Handlers
Database      Supabase (same project as portfolio)
Auth          Supabase Auth (magic link)
Charts        Recharts
Deploy        Vercel (same deployment as portfolio)
```

### Hosting Decision

Verdikt lives **inside the portfolio repo** (`paria-creative-vision`), not a separate app. Route groups isolate the two layouts:

- `(portfolio)/` — public portfolio with Header + Footer → `paria.dev/*`
- `(verdikt)/` — Verdikt app with Sidebar → `paria.dev/verdikt/*`

This means one domain, one deployment, one Supabase project.

### Project Structure (within paria-creative-vision)

```
src/
├── app/
│   ├── layout.tsx                    # bare HTML shell (fonts only)
│   ├── (portfolio)/
│   │   ├── layout.tsx                # Header + Footer
│   │   ├── page.tsx                  # /
│   │   ├── work/[slug]/page.tsx      # /work/verdikt (case study)
│   │   └── ...
│   └── (verdikt)/
│       └── verdikt/
│           ├── layout.tsx            # Sidebar
│           ├── login/page.tsx
│           ├── dashboard/page.tsx
│           ├── decisions/
│           │   ├── page.tsx
│           │   ├── new/page.tsx
│           │   └── [id]/page.tsx
│           ├── departments/page.tsx
│           └── settings/page.tsx
├── lib/
│   ├── verdikt/
│   │   ├── workflow.ts               # pure state machine logic
│   │   ├── auth/getVerdiktUser.ts    # server auth helper
│   │   └── queries/                  # Supabase query functions
│   └── supabase/
│       ├── server.ts                 # SSR client (respects RLS)
│       ├── client.ts                 # browser client
│       └── server-admin.ts           # service role client (bypasses RLS)
└── types/
    └── verdikt.types.ts              # domain types
```

### Key Architectural Decisions

- **Workflow logic lives in `lib/verdikt/workflow.ts`** — pure TypeScript, no Supabase dependency, testable in isolation
- **Audit log written via service role** — uses `server-admin.ts` to bypass RLS, ensuring every transition is recorded even if the user's RLS policy would block it
- **Row-level security on all tables** — `org_id` filter enforced at DB level, not just application level
- **Seed script at `scripts/seed-verdikt.ts`** — runnable via `npm run seed:verdikt`, idempotent

---

## 12. Implementation Plan

### Day 1 — Foundation ✅ (done)

- [x] Route group structure (`(portfolio)/` and `(verdikt)/`)
- [x] Root layout surgery — bare HTML shell, each group has its own layout
- [x] Verdikt placeholder pages for all routes
- [ ] Navigation: portfolio → Verdikt, Verdikt → portfolio
- [ ] SQL migration 
- [ ] Types defined (`src/types/verdikt.types.ts`)
- [ ] Workflow state machine (`src/lib/verdikt/workflow.ts`)
- [ ] Server admin client (`src/lib/supabase/server-admin.ts`)
- [ ] Run SQL migration in Supabase dashboard
- [ ] Regenerate types: `npm run supabase:types`
- [ ] Auth callback route (`/verdikt/auth/callback`)
- [ ] Login page wired to Supabase magic link
- [ ] Write seed script — run it, confirm data looks right

**Definition of done:** Can log in, see sidebar, seed data exists in DB.

---

### Day 2 — Core Decision CRUD

- [ ] Decision list page with status filter tabs (All / Draft / Pending / Approved / Rejected)
- [ ] Create decision form: title, type, department, description, amount, priority, due_date
- [ ] Save as DRAFT
- [ ] Decision detail page: all fields, status badge, requester info

**Definition of done:** Can create a decision, see it in the list, open the detail.

---

### Day 3 — Workflow + Roles

- [ ] API route `POST /api/verdikt/decisions/[id]/transition`
- [ ] Submit for approval button (employee)
- [ ] Approve / Reject buttons with confirmation modal (manager/admin)
- [ ] Rejection reason required — validated server-side
- [ ] Audit log writes on every transition
- [ ] Comment thread on detail page
- [ ] Role-based UI: manager sees "Pending Approval" queue

**Definition of done:** Full workflow works end-to-end. Audit trail visible.

---

### Day 4 — Analytics + Polish + Deploy

- [ ] Dashboard: 6 KPI cards
- [ ] Recharts: 30-day volume area chart
- [ ] Recharts: decisions by department bar chart
- [ ] Verify seed data makes dashboard look real (no empty states)
- [ ] Test demo flow end-to-end (create → approve → check dashboard)
- [ ] Add `/work/verdikt` case study page to portfolio

**Definition of done:** Live at `paria.dev/verdikt`. Dashboard shows real data. Portfolio links to it.

---

## 13. Portfolio & Storytelling Strategy

### Case Study Structure (`/work/verdikt`)

```
1. HEADER
   Name, tagline, live demo link, tech tags

2. CONTEXT (3 sentences)
   The problem. The insight. The solution.

3. PRODUCT DECISIONS
   — Why I used a state machine (not a boolean approved field)
   — Why rejection_reason is enforced at API level, not just UI
   — Why decided_at is separate from updated_at
   — What I cut from the MVP and why

4. ARCHITECTURE
   Simple diagram: user → API → workflow.ts → Supabase

5. ANALYTICS DESIGN
   Why these 6 KPIs. What business action each one drives.

6. WHAT I'D ADD NEXT
   SLA tracking, email escalation, Slack integration

7. LIVE DEMO
```

### The Story in Interviews

> "I built Verdikt to show I can model business logic — not just UI. The interesting part wasn't the form or the list view. It was the workflow engine: a state machine that enforces valid transitions per role, writes an immutable audit log on every change, and requires documented reasoning for rejections. The analytics dashboard turns that data into 6 metrics a CFO would actually care about."

### Key Phrases for LinkedIn / CV

- *Multi-tenant B2B SaaS*
- *Role-based workflow engine with enforced state transitions*
- *Immutable audit log*
- *KPI dashboard: approval rate, time-to-decision, overdue tracking*

---

## 14. Open Questions

| Question | Status | Decision |
|---|---|---|
| Project name: Verdikt vs alternatives? | ✅ Decided | Verdikt |
| Call it SaaS in portfolio? | ✅ Decided | Yes — multi-tenant org table confirms it |
| Magic link only, or add password auth? | ✅ Decided | Magic link for MVP simplicity |
| Separate repo or inside portfolio? | ✅ Decided | Inside portfolio — one domain, one deployment |
| Use existing portfolio's Supabase project or new one? | ✅ Decided | Same project — separate tables prefixed `verdikt_` |
| Recharts or Chart.js for analytics? | ✅ Decided | Recharts (better React integration) |
| Publish Medium article before or after shipping? | Open | Article 1 during schema design |

---


