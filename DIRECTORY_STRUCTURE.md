# Scora — Reorganized Directory Structure (Role-Based & Scalable)

## Overview

Reorganized `src/` to enforce role-based separation of concerns:

- **Shared components** (universal across all portals) → `src/components/`
- **Role-specific components** → `src/features/{role}/components/`
- **Features, pages, hooks** → `src/features/{role}/`

---

## New Directory Structure

```
src/
├── components/                       # SHARED: Universal components used across all portals
│   ├── common/                       # Non-layout utilities (ErrorBoundary, Skeleton, Toast, etc)
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── ForgotPasswordModal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Logo.tsx
│   │   ├── PageLoader.tsx
│   │   ├── Skeleton.tsx
│   │   └── Navigation.tsx            # Bottom nav (used by all portals)
│   ├── layout/                       # Layout shells (Sidebar, Header, responsive wrappers)
│   │   ├── Header.tsx
│   │   ├── NavItem.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AdminLayout.tsx           # ADMIN layout shell
│   │   ├── AgentLayout.tsx           # AGENT layout shell
│   │   └── UserLayout.tsx            # GUEST layout shell
│   └── ui/                           # Radix UI + Tailwind primitives (Button, Input, Modal, etc)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── tooltip.tsx
│       └── ... (other UI primitives)
│
├── features/
│   │
│   ├── admin/                         # ADMIN PORTAL
│   │   ├── components/                # Admin-specific components
│   │   │   ├── AdminSidebar.tsx       # Admin sidebar variant
│   │   │   ├── DataTable.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── agents/
│   │   │   │   ├── AgentAssignment.tsx
│   │   │   │   ├── AgentList.tsx
│   │   │   │   └── AgentPerformance.tsx
│   │   │   ├── fixtures/
│   │   │   │   ├── FixtureEditor.tsx
│   │   │   │   ├── FixtureGenerator.tsx
│   │   │   │   └── FixtureList.tsx
│   │   │   ├── leagues/
│   │   │   │   ├── LeagueForm.tsx
│   │   │   │   └── LeagueList.tsx
│   │   │   ├── players/
│   │   │   │   ├── PlayerForm.tsx
│   │   │   │   └── PlayerList.tsx
│   │   │   ├── stadiums/
│   │   │   │   ├── StadiumForm.tsx
│   │   │   │   └── StadiumList.tsx
│   │   │   └── teams/
│   │   │       ├── TeamForm.tsx
│   │   │       ├── TeamList.tsx
│   │   │       └── TeamPlayers.tsx
│   │   ├── hooks/
│   │   │   ├── useFixtureGenerator.ts
│   │   │   ├── useLeagueManagement.ts
│   │   │   └── useTeamManagement.ts
│   │   └── pages/
│   │       ├── AdminDashboard.tsx
│   │       ├── AgentsPage.tsx
│   │       ├── FixturesPage.tsx
│   │       ├── LeaguesPage.tsx
│   │       ├── PlayersPage.tsx
│   │       ├── SettingsPage.tsx
│   │       ├── StadiumsPage.tsx
│   │       └── TeamsPage.tsx
│   │
│   ├── agent/                         # AGENT PORTAL (Live Match Control)
│   │   ├── components/                # Agent-specific components (MOVED from src/components/agent)
│   │   │   ├── EventLoggingForm.tsx
│   │   │   ├── EventTimeline.tsx
│   │   │   ├── EventTypeButtons.tsx
│   │   │   ├── LiveMatchCard.tsx
│   │   │   ├── LiveMatchHeader.tsx
│   │   │   ├── LiveMatchSkeleton.tsx
│   │   │   ├── MatchControlPanel.tsx
│   │   │   ├── MatchStats.tsx
│   │   │   ├── MatchTimeline.tsx
│   │   │   ├── PlayerRosterQuickActions.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   ├── SubstitutionSelector.tsx
│   │   │   └── TeamSelector.tsx
│   │   ├── hooks/
│   │   │   ├── useEventLogger.ts
│   │   │   └── useMatchControl.ts
│   │   └── pages/
│   │       ├── AgentDashboard.tsx
│   │       ├── AgentLoginPage.tsx
│   │       ├── AssignedMatchesPage.tsx
│   │       └── LiveMatchPage.tsx
│   │
│   └── guest/                         # GUEST PORTAL (Fan/Public)
│       ├── components/                # Guest-specific components (MOVED from src/components)
│       │   ├── calendar/              # MOVED from src/components/calendar
│       │   │   ├── DateSelector.tsx
│       │   │   ├── FixtureCalendar.tsx
│       │   │   └── MatchweekSelector.tsx
│       │   ├── match/                 # MOVED from src/components/match
│       │   │   ├── LiveMatchIndicator.tsx
│       │   │   ├── MatchCard.tsx
│       │   │   ├── MatchListItem.tsx
│       │   │   ├── MatchScore.tsx
│       │   │   ├── MatchStats.tsx
│       │   │   └── MatchTimeline.tsx
│       │   ├── team/                  # MOVED from src/components/team
│       │   │   ├── PlayerCard.tsx
│       │   │   ├── TeamCard.tsx
│       │   │   ├── TeamLineup.tsx
│       │   │   ├── TeamLogo.tsx
│       │   │   └── TeamStandings.tsx
│       │   ├── FeaturedMatch.tsx
│       │   ├── HomeSkeleton.tsx
│       │   ├── MatchDetailHeader.tsx
│       │   ├── MatchFilter.tsx
│       │   ├── MatchH2H.tsx
│       │   ├── MatchLineups.tsx
│       │   ├── MatchStandingsTable.tsx
│       │   ├── MatchStatsTab.tsx
│       │   └── MatchSummary.tsx
│       ├── hooks/
│       │   ├── useMatchData.ts
│       │   └── useStandings.ts
│       └── pages/
│           ├── CalendarPage.tsx
│           ├── HomePage.tsx
│           ├── MatchDetailPage.tsx
│           ├── StandingsPage.tsx
│           ├── StatsPage.tsx
│           ├── TeamDetailPage.tsx
│           └── TermsPage.tsx
│
├── data/                              # SHARED: Mock data (temp, will be replaced by API)
│   ├── agentMockData.ts
│   ├── calendarMatches.ts
│   ├── clubs.ts
│   ├── matchDetails.ts
│   ├── matches.ts
│   ├── playerStats.ts
│   └── standings.ts
│
├── routes/                            # SHARED: Route definitions
│   ├── AdminRoutes.tsx
│   ├── AgentRoutes.tsx
│   ├── GuestRoutes.tsx
│   ├── index.tsx
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
│
├── shared/                            # SHARED: Cross-portal utilities & contexts
│   ├── api/                           # API clients (TODO: replace mock data)
│   ├── config/                        # Global config
│   ├── contexts/                      # React contexts (Auth, Theme, etc)
│   ├── hooks/                         # Shared hooks (useAuth, useTheme, etc)
│   ├── types/                         # Shared TypeScript interfaces
│   └── utils/
│       ├── cn.ts                      # classname utility
│       ├── eventIcons.ts              # Event icon config (shared across agent/guest)
│       └── ... (other utilities)
│
├── assets/                            # SHARED: Static assets
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── App.tsx                            # Main app entry (routing, theme provider)
├── main.tsx                           # Vite entry
├── index.css                          # Global styles
├── vite-env.d.ts                      # Vite types
└── NotFound.tsx                       # 404 page
```

---

## Import Path Examples (After Reorganization)

### AGENT Portal

```typescript
// Agent components (role-specific)
import { EventLoggingForm } from "@/features/agent/components/EventLoggingForm";
import { MatchControlPanel } from "@/features/agent/components/MatchControlPanel";

// Shared UI
import { Button, Card } from "@/components/ui";
import { Layout } from "@/components/layout";

// Shared types
import { User, Project } from "@/shared/types";
```

### GUEST Portal

```typescript
// Guest components (role-specific)
import { MatchCard } from "@/features/guest/components/match/MatchCard";
import { MatchLineups } from "@/features/guest/components/MatchLineups";
import { DateSelector } from "@/features/guest/components/calendar/DateSelector";
import { TeamStandings } from "@/features/guest/components/team/TeamStandings";

// Shared UI
import { Button, Tabs } from "@/components/ui";
import { Navigation } from "@/components/common/Navigation";

// Shared hooks
import { useAuth } from "@/shared/hooks";
```

### ADMIN Portal

```typescript
// Admin components (role-specific)
import { AgentList } from "@/features/admin/components/agents/AgentList";
import { FixtureGenerator } from "@/features/admin/components/fixtures/FixtureGenerator";

// Shared UI
import { DataTable } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
```

---

## Benefits of This Structure

1. **Role-Based Separation**: Each portal's components are isolated and self-contained.
2. **Scalability**: Easy to add new roles (COORDINATOR, JUDGE, etc.) by creating `src/features/{role}/`.
3. **Maintainability**: Clear ownership—agent components only live in agent portal, guest in guest portal.
4. **Shared Resources**: Common UI primitives, layout shells, and utilities remain in `src/components/` and `src/shared/`.
5. **Reduced Naming Conflicts**: No component name clashes between portals.
6. **Import Clarity**: Component import path clearly indicates which portal it belongs to.
7. **Code Splitting**: Build tools can better tree-shake and lazy-load by role.

---

## Migration Checklist

- [ ] Move `src/components/agent/*` → `src/features/agent/components/`
- [ ] Move `src/components/calendar/*` → `src/features/guest/components/calendar/`
- [ ] Move `src/components/match/*` → `src/features/guest/components/match/`
- [ ] Move `src/components/team/*` → `src/features/guest/components/team/`
- [ ] Keep `src/components/common/*` (shared)
- [ ] Keep `src/components/layout/*` (shared)
- [ ] Keep `src/components/ui/*` (shared)
- [ ] Update all import statements across project
- [ ] Test routing and component rendering per portal
- [ ] Update IDE project structure references

---

## Notes

- **Shared utilities** (eventIcons.ts) remain in `src/shared/utils/` so both agent and guest can import.
- **Data layer** stays in `src/data/` for now (mock), but API integration should move to `src/shared/api/`.
- **Routes** define portal entry points; each portal is lazy-loaded or statically bundled based on build config.
- **Layout shells** (AdminLayout, AgentLayout, UserLayout) remain shared in `src/components/layout/` since they wrap entire portals.
