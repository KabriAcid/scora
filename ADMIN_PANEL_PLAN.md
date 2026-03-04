# Admin Panel — Build Plan

## Overview

The admin panel is a protected, role-gated portal for full CRUD management of everything that powers the Scora platform. It reuses the same design system (Tailwind tokens, Radix/shadcn components, Framer Motion) as the agent panel but with a distinct identity — wider data-dense layout, sidebar always visible on desktop.

---

## Shared Infrastructure (build first)

| File                                          | Purpose                                                                          |
| --------------------------------------------- | -------------------------------------------------------------------------------- |
| `components/layout/AdminLayout.tsx`           | Shell: collapsible sidebar + header + `<main>` scroll area (mirrors AgentLayout) |
| `features/admin/components/AdminSidebar.tsx`  | Nav links for all 7 sections, active-route highlight, collapse/expand            |
| `features/admin/components/AdminHeader.tsx`   | Page title slot, breadcrumb, admin avatar/logout                                 |
| `features/admin/components/StatCard.tsx`      | Reusable KPI tile (icon + label + value + optional trend)                        |
| `features/admin/components/DataTable.tsx`     | Generic sortable/filterable table: columns config + row data + action slot       |
| `features/admin/components/ConfirmDialog.tsx` | Reusable delete/destructive-action AlertDialog                                   |
| `features/admin/components/PageHeader.tsx`    | Section title + subtitle + primary CTA button (used by every page)               |
| `features/admin/hooks/useAdminTable.ts`       | Shared search, sort, pagination state hook                                       |

---

## Pages & Their Components

### 1. Dashboard `/admin/dashboard`

- KPI stat cards: Total Players, Teams, Fixtures, Active Agents
- Recent activity feed (latest CRUD actions)
- Quick-link tiles to each section

### 2. Leagues `/admin/leagues`

- `LeagueList` — DataTable (name, season, teams count, status, actions)
- `LeagueForm` — Sheet/Dialog: name, season year, logo upload, status toggle

### 3. Teams `/admin/teams`

- `TeamList` — DataTable (badge, name, league, stadium, player count)
- `TeamForm` — Sheet: name, short name, badge upload, league select, stadium select
- `TeamPlayersDrawer` — View/manage squad from within the team row

### 4. Players `/admin/players`

- `PlayerList` — DataTable (photo, name, position, team, nationality, age)
- `PlayerForm` — Sheet: personal info, position, team assignment, photo upload
- `PlayerStatsPanel` — Read-only stats summary within the player row expand

### 5. Stadiums `/admin/stadiums`

- `StadiumList` — DataTable (name, city, capacity, home team)
- `StadiumForm` — Sheet: name, city, capacity, image upload

### 6. Fixtures `/admin/fixtures`

- `FixtureList` — DataTable with date/time, home vs away, venue, status, assigned agent
- `FixtureForm` — Sheet: team selectors, date/time picker, stadium, matchweek
- `AgentAssignmentModal` — Assign/reassign live agent to a fixture
- `FixtureStatusBadge` — Reusable status chip (scheduled / live / completed)

### 7. Agents `/admin/agents`

- `AgentList` — DataTable (name, email, assigned matches count, status)
- `AgentForm` — Sheet: create/edit agent account (name, email, role, active toggle)
- `AgentMatchHistory` — Expandable row showing past match assignments

### 8. Settings `/admin/settings`

- Season management (current season label, start/end dates)
- Platform toggles (registration open, public stats visible)
- Admin profile (name, password change)

---

## Component Breakdown Rules

- **Max ~300 lines per file** — lists, forms, and detail panels always split into separate components
- **Forms** live in `Sheet` side panels (not full-page navigations) to keep context visible
- **DataTable** is the single generic table — each page passes its own `columns` config, no duplicated table markup
- **PageHeader** is used by every page — no inline title/button repetition

---

## Build Order

```
1. AdminLayout + AdminSidebar + AdminHeader
2. StatCard + DataTable + ConfirmDialog + PageHeader (shared atoms)
3. Dashboard (wires everything together, validates layout)
4. Leagues → Teams → Players (entity hierarchy order)
5. Stadiums → Fixtures → Agents (supporting entities)
6. Settings (last — least blocking)
```

---

## Design Notes

- Sidebar: `bg-card border-r` — same dark card surface as agent sidebar
- Active nav item: `bg-primary/10 text-primary` pill
- Forms: `Sheet` from right, not full-page modals
- Destructive actions: always behind `ConfirmDialog` — never one-click delete
- Mobile: sidebar becomes a drawer (hamburger in AdminHeader), table horizontally scrolls inside a `ScrollArea`
