# Scora v2.0 — Migration & Architecture Plan

---

## 1. Stack Decision

**Chosen Stack:** Next.js 15 (App Router) + Supabase (PostgreSQL + Realtime + Auth + Storage) + Python FastAPI microservice

**Why Next.js over Laravel + React:**

- Laravel + React is two separate codebases with no shared types. Every interface you define in TypeScript has no PHP equivalent, making contract maintenance manual and error-prone.
- A React SPA has zero SEO on first render. Guest pages (standings, match detail, fixtures) are exactly what search engines need to crawl — that requires server-side rendering.
- Real-time in Laravel requires Pusher or self-hosted Soketi as an extra paid service. Supabase Realtime is built into the database layer at no extra cost.

**Why Supabase over raw PostgreSQL:**

- Supabase is not a separate database — it is PostgreSQL with a full platform on top: Auth, Realtime, Storage, Edge Functions, and a dashboard UI, all accessible via a TypeScript SDK.
- The SDK calls feel like local function calls but hit the cloud database, with no REST API boilerplate to write.
- Row Level Security (RLS) replaces the current `ProtectedRoute.tsx` at the database level — guests can only SELECT public tables, agents can only INSERT events for their assigned match, admins have full access.

**Why Python as a microservice (not the main backend):**

- PDF match report generation, bulk stats recalculation, standings aggregation, and future ML (match predictions, anomaly detection in agent logs) are all CPU-heavy tasks that should run async and separately.
- The Next.js app calls it via internal API routes — the frontend never touches the Python service directly.
- This keeps the Python service optional and replaceable without touching the main app.

---

## 2. Project Structure — Turborepo Monorepo

The project is split into apps and shared packages so that UI components, types, and utilities are written once and used everywhere.

**`apps/web`** — The Next.js 15 application. Contains all pages, layouts, and server actions.

**`packages/ui`** — All current shadcn/Radix UI components copy directly here. Used by the web app and any future mobile web or admin-only app.

**`packages/types`** — All shared TypeScript interfaces (`MatchEvent`, `AssignedMatch`, `AgentProfile`, etc.) live here. The Python service can also reference these via a generated schema.

**`packages/utils`** — Shared utility functions (`cn`, date formatters, validators) used across packages.

**`services/analytics`** — The Python FastAPI microservice. Handles reports, bulk aggregation, and future ML. Runs as a separate process on the VPS.

**`supabase/`** — Database migrations (schema as code), seed files (current mock data converted to SQL), and Edge Functions.

---

## 3. Database Schema

The schema maps directly from existing mock data types. No structural redesign is needed.

**Core tables:** `leagues`, `teams`, `players`, `stadiums`, `fixtures`, `match_events`, `agents`, `profiles`

**Relationships:**

- Leagues contain Teams
- Teams contain Players
- Fixtures belong to a League and two Teams, played at a Stadium
- Match Events belong to a Fixture and are logged by an Agent
- Profiles extend Supabase Auth users with a `role` (`guest`, `agent`, `admin`) and `status` (`active`, `pending`, `suspended`)

**Row Level Security rules replace all current mock auth:**

- Public tables (matches, standings, teams) are readable by everyone
- `match_events` INSERT is restricted to the agent assigned to that fixture
- All admin tables require `role = 'admin'`

---

## 4. Route Migration

Current React Router routes map 1:1 to Next.js App Router file system routes.

| Current (React Router) | Next.js App Router                 |
| ---------------------- | ---------------------------------- |
| `/`                    | `app/(public)/page.tsx`            |
| `/standings`           | `app/(public)/standings/page.tsx`  |
| `/match/:id`           | `app/(public)/match/[id]/page.tsx` |
| `/calendar`            | `app/(public)/calendar/page.tsx`   |
| `/stats`               | `app/(public)/stats/page.tsx`      |
| `/agent/dashboard`     | `app/(agent)/dashboard/page.tsx`   |
| `/agent/match/:id`     | `app/(agent)/match/[id]/page.tsx`  |
| `/admin/dashboard`     | `app/(admin)/dashboard/page.tsx`   |
| `/admin/leagues`       | `app/(admin)/leagues/page.tsx`     |

Route groups in parentheses (`(public)`, `(agent)`, `(admin)`) apply different layouts and middleware rules without affecting the URL.

---

## 5. Auth Migration

**Current state:** `ProtectedRoute.tsx` with `userRole` hardcoded to `"admin"`. No real auth exists.

**v2.0 auth flow:**

- Supabase Auth handles JWT creation, session cookies, and token refresh automatically. No manual `localStorage` token management.
- On register: Supabase creates the auth user, then a `profiles` row is inserted with `role` and `status = 'pending'` for agents (admin approval required).
- On login: role is read from `profiles`, redirect goes to the appropriate dashboard.
- Route protection moves to `middleware.ts` at the Next.js edge — runs before any page renders, so protected routes never flash unauthorized content.
- Logout calls Supabase `signOut()`, clears the session cookie, and redirects.

---

## 6. Navigation Behavior (Custom Next.js Style)

**What is disabled:** Viewport-based prefetching. By default Next.js prefetches every visible link aggressively. This is turned off.

**What replaces it:** A custom `SmartLink` component wraps every `<Link>`. On mouse hover, `router.prefetch()` is called manually — the route's JavaScript chunk downloads silently during the 100–300ms window before the user clicks. By click time, the code is already there.

**Page transition behavior:**

- Clicking a link navigates the URL instantly (same frame).
- Static content (headers, nav, layout shell, non-data UI) renders immediately.
- Only async data sections show skeletons via `<Suspense>` fallbacks placed directly inside `page.tsx` — not in `loading.tsx`.
- `loading.tsx` files exist only as minimal layout shells for the rare case the page component itself is slow to initialize. They contain no skeleton rows.
- Multiple independent `<Suspense>` zones per page mean each data section loads and resolves independently — the match card, the lineups, and the stats can all stream in at different times without blocking each other.

**What is removed:** The top-of-page progress bar (`NavigationProgress`). There is no "waiting" state between click and navigation. The user is already on the page.

---

## 7. Component Migration

| Asset                  | Portability | Notes                                                                                                        |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `src/components/ui/*`  | 100%        | Copy directly to `packages/ui`. shadcn works identically in Next.js.                                         |
| Feature components     | ~85%        | Replace mock data imports with async server fetches or Supabase queries. Swap `useNavigate` for `useRouter`. |
| `shared/types/*`       | 100%        | Move to `packages/types` unchanged.                                                                          |
| `shared/hooks/*`       | ~90%        | Hooks that use `window` or browser APIs need `'use client'` directive.                                       |
| Mock data files        | Convert     | `matches.ts`, `adminMockData.ts` etc. become `supabase/seed.sql` and Prisma seed scripts.                    |
| Empty service files    | Fill        | `matchService.ts`, `eventService.ts` etc. already named correctly — fill with Supabase SDK calls.            |
| `shared/api/client.ts` | Replace     | Becomes Supabase browser/server client setup.                                                                |
| Route protection       | Replace     | `ProtectedRoute.tsx` is replaced entirely by `middleware.ts`.                                                |

---

## 8. Real-time (LiveMatchPage)

**Current state:** `setInterval` timer in local React state. Events held in component memory only. No persistence. If the agent refreshes, all logged events are lost.

**v2.0 behavior:**

- Agent logs an event → INSERT into `match_events` table in Supabase.
- Supabase Realtime broadcasts the change to all subscribers on that match channel.
- Any admin watching the dashboard, any other device viewing the live match, and the agent's own UI all update instantly via WebSocket — no polling.
- Events are persisted to the database immediately on log. Refresh-safe.
- The `useWebSocket.ts` hook (currently empty) gets filled with the Supabase channel subscription pattern.

---

## 9. Production — VPS Setup

**Recommendation:** Start on Supabase Cloud free tier during development (5 min setup, $0). Migrate to self-hosted on your VPS for production (full control, no pausing, no monthly platform fee beyond VPS cost).

### Self-hosting Supabase on VPS

Supabase is fully open-source and runs via Docker Compose. The self-hosted version is the exact same platform as the cloud version — same dashboard, same SDK, same behavior.

**VPS minimum spec:** 2 vCPU, 4 GB RAM, 40 GB SSD (sufficient for Scora's scale).

**What runs on the VPS:**

- Supabase stack (Postgres, Auth, Realtime, Storage, Studio dashboard) via Docker Compose
- Next.js app via Node.js process managed by PM2
- Python FastAPI microservice via Uvicorn managed by PM2
- Nginx as reverse proxy — routes domain traffic to Next.js (port 3000), API subdomain to FastAPI (port 8000), Supabase Studio on an internal port only
- SSL via Certbot (Let's Encrypt, free, auto-renewing)

**Migration from cloud to self-hosted:** `pg_dump` from Supabase Cloud, restore to self-hosted Postgres. Update `.env` with new Supabase URL and keys. Zero code changes required.

### Deployment Flow

- Push to `main` branch triggers a GitHub Actions workflow
- Workflow SSHs into the VPS, pulls latest code, runs `npm run build`, and restarts the PM2 process
- Database migrations run via `supabase db push` as part of the CI step
- Zero-downtime deploys via PM2 cluster mode

### Backups

- Automated daily `pg_dump` via a cron job on the VPS, uploaded to object storage (Backblaze B2 or Supabase Storage itself)
- Retention: 7 daily, 4 weekly

---

## 10. Migration Sequence

The migration is additive — the current Vite app keeps running while v2.0 is built in a new directory. No work is thrown away.

1. **Scaffold** — Create Turborepo monorepo, install Next.js 15, configure `packages/ui`, `packages/types`, `packages/utils`
2. **Copy shared assets** — Move all UI components, types, hooks, and utils into packages
3. **Supabase setup** — Create project (cloud), write schema migrations, run seed from mock data files
4. **Auth** — Implement register/login/logout server actions, middleware route protection
5. **Public pages** — Migrate guest pages (home, standings, match detail, calendar, stats) as SSR Server Components with granular Suspense
6. **Agent section** — Migrate agent pages as Client Components, wire LiveMatchPage to Supabase Realtime
7. **Admin section** — Migrate all admin CRUD pages, wire DataTable to live Supabase queries
8. **Python service** — Bootstrap FastAPI, implement match report PDF endpoint, connect from Next.js API route
9. **VPS production** — Set up Docker Compose for self-hosted Supabase, deploy Next.js via PM2, configure Nginx + SSL
10. **Cutover** — Point domain DNS to VPS, decommission Vite app

---

## 11. What Is Not Changing

- All UI design, color tokens, component names, and Tailwind config are preserved exactly
- The feature folder structure (`features/guest`, `features/agent`, `features/admin`) carries over directly
- The `ROUTES` config object maps to the new file system without changes to route paths
- All mock data shapes (types/interfaces) are preserved — they just get database tables instead of static arrays
