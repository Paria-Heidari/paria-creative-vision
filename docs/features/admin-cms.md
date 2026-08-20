## Admin CMS

Private photo management panel for uploading, editing, and deleting photos from the portfolio.

---

### Routes

```
/admin                        — dashboard / redirect
/admin/upload                 — photo upload form
/admin/photos                 — photo grid with management actions
/admin/photos/[id]/edit       — edit photo metadata
```

All routes share the `(admin)/admin/layout.tsx` layout.

---

### Authentication

Layout: `AdminAuthGate` (Server Component) calls `getAdminSessionOrRedirect()` from `src/lib/auth0/session.ts` before rendering children. If there is no session or the session role is not `ADMIN`, it redirects at the server level — no client code executes.

`AdminSidebar` is rendered outside `AdminAuthGate` inside a `Suspense` boundary so the sidebar shell streams while the auth check resolves.

**Why a Server Component gate and not `middleware.ts`?**
`middleware.ts` runs on the Edge Runtime and can only check for a cookie's presence, not decode the Auth0 JWT securely. The full session validation (signature check, expiry, role extraction) requires the Auth0 Node.js SDK. The Server Component runs in Node.js and performs the full check before HTML is sent.

---

### Upload pipeline

Entry: `src/app/(admin)/admin/upload/page.tsx`

`await connection()` at the top of the upload page opts it out of PPR caching — the categories dropdown must show current state, never a stale cached shell.

Route handler: `POST /api/admin/photos` (`src/app/api/admin/photos/route.ts`)

**Step-by-step:**

1. Parse `multipart/form-data` from the request
2. Extract pixel dimensions using `sharp(buffer).metadata()` — server-side, from the raw file bytes. Never trusts client-provided values (wrong dimensions break `next/image` layout reservation and cause CLS)
3. Upload buffer to Supabase Storage
4. Insert metadata row to PostgreSQL (title, description, dimensions, storage_path, category_id, subcategory_id, published)
5. If the DB insert fails → delete the just-uploaded Storage file (rollback). Prevents orphaned files with no DB record
6. Call `revalidatePath('/portfolio', 'layout')` and `revalidatePath('/')` so public gallery reflects the new photo on next request

**Atomic upload pattern — why upload first, then insert?**
If Storage upload fails, nothing needs to be rolled back. If the DB insert fails after a successful upload, delete the file. This means failures always leave the system in a consistent state. The alternative (DB first) risks a record pointing to a file that doesn't exist yet — every image load for that photo would return 404.

**Component:** `UploadForm` (`src/components/features/admin/UploadForm.tsx`) — `'use client'`, HTML5 drag-and-drop, `URL.createObjectURL` for local preview before upload.

---

### Photo management

Route: `/admin/photos` — `src/app/(admin)/admin/photos/page.tsx`

**Component:** `PhotoManager` (`src/components/features/admin/PhotoManager.tsx`) wraps `PhotoGrid` with delete and edit actions.

- **Delete** (`DELETE /api/admin/photos/[id]`): removes DB record + Storage file, then calls `revalidatePath` for public portfolio
- **Edit** (`PATCH /api/admin/photos/[id]`): updates metadata, then calls `revalidatePath`
- After each mutation, `PhotoManager` calls `router.refresh()` to re-render the admin grid for the current session. `revalidatePath` handles all other visitors.

**`revalidatePath` vs `router.refresh()`:**

| | `revalidatePath` | `router.refresh()` |
|---|---|---|
| Called from | Server (API route) | Client Component |
| Effect | Invalidates Next.js server cache — next visitor gets fresh HTML | Re-fetches data for this user's session only |
| Used for | Public portfolio stays up-to-date after admin mutations | Admin grid reflects the change immediately for the admin |

---

### Edit photo

Route: `/admin/photos/[id]/edit` — `src/app/(admin)/admin/photos/[id]/edit/page.tsx`

**Component:** `EditPhotoForm` (`src/components/features/admin/EditPhotoForm.tsx`) — pre-filled form with current photo metadata.

`PATCH /api/admin/photos/[id]`: validates body, updates DB record, calls `revalidatePath`.

---

### Key components

| Component | File | Role |
|-----------|------|------|
| `AdminSidebar` | `features/admin/AdminSidebar.tsx` | Navigation sidebar with links and active route highlight |
| `AdminTopBar` | `features/admin/AdminTopBar.tsx` | Top bar with section title |
| `UploadForm` | `features/admin/UploadForm.tsx` | Drag-and-drop upload with local preview |
| `PhotoGrid` | `features/admin/PhotoGrid.tsx` | Grid of `PhotoCard` components |
| `PhotoCard` | `features/admin/PhotoCard.tsx` | Single photo thumbnail with edit/delete actions |
| `PhotoManager` | `features/admin/PhotoManager.tsx` | Wraps `PhotoGrid`, handles mutations + `router.refresh()` |
| `PhotoMetadataCard` | `features/admin/PhotoMetadataCard.tsx` | Metadata display (dimensions, storage path, tags) |
| `EditPhotoForm` | `features/admin/EditPhotoForm.tsx` | Pre-filled edit form |

---

### Supabase client variants

Three client types used in this feature:

| Client | Key | Used for |
|--------|-----|----------|
| `createServerClient` (`supabase/server.ts`) | anon + cookies | Server Component reads (category list for upload form) |
| admin client (service role) | service role | Write mutations — bypasses RLS entirely |
| `getSupabaseStatic()` (`supabase/static.ts`) | anon | `generateStaticParams` at build time (no cookies context) |

The service role key is only used server-side for admin mutations. It must never be exposed client-side — it bypasses row-level security and gives full database access.

---

### Cache invalidation strategy

On-demand invalidation via `revalidatePath` (not time-based `export const revalidate = N`).

**Why on-demand?** The admin knows exactly when data changes — when they upload, edit, or delete. Time-based ISR would leave the public gallery stale for up to N seconds after a change and regenerate unnecessarily even when nothing changed.

**Why not `export const revalidate = N`?** Incompatible with `cacheComponents: true` (PPR) in `next.config.ts`. PPR routes must use on-demand invalidation only — using both causes a build error.

Scope used: `revalidatePath('/portfolio', 'layout')` — the `'layout'` scope invalidates all slug variants under `/portfolio` (not just one URL), so `/portfolio`, `/portfolio/nature`, `/portfolio/nature/forest` all get fresh HTML on next request.
