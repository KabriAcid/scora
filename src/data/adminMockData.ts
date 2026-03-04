// ─── Types ────────────────────────────────────────────────────────────────────

export type EntityType =
  | "player"
  | "team"
  | "fixture"
  | "agent"
  | "league"
  | "stadium";

export type ActionType = "Created" | "Updated" | "Deleted" | "Assigned";

export interface ActivityItem {
  id: string;
  action: ActionType;
  entity: string;
  entityType: EntityType;
  time: Date;
}

// ─── Overview Stats ───────────────────────────────────────────────────────────

export const adminOverviewStats = {
  totalPlayers: 420,
  totalTeams: 20,
  upcomingFixtures: 38,
  activeAgents: 12,
};

// ─── Recent Activity ──────────────────────────────────────────────────────────

const n = Date.now();

export const recentAdminActivity: ActivityItem[] = [
  {
    id: "1",
    action: "Created",
    entity: "Youssouf Koné",
    entityType: "player",
    time: new Date(n - 4 * 60_000),
  },
  {
    id: "2",
    action: "Updated",
    entity: "FC Maghreb",
    entityType: "team",
    time: new Date(n - 18 * 60_000),
  },
  {
    id: "3",
    action: "Assigned",
    entity: "Matchday 26 · FUT vs ATL",
    entityType: "fixture",
    time: new Date(n - 45 * 60_000),
  },
  {
    id: "4",
    action: "Created",
    entity: "Stade Mohammed V",
    entityType: "stadium",
    time: new Date(n - 2 * 3_600_000),
  },
  {
    id: "5",
    action: "Updated",
    entity: "Agent Karimi",
    entityType: "agent",
    time: new Date(n - 3 * 3_600_000),
  },
  {
    id: "6",
    action: "Created",
    entity: "Premier League 2025/26",
    entityType: "league",
    time: new Date(n - 5 * 3_600_000),
  },
  {
    id: "7",
    action: "Deleted",
    entity: "Test Fixture",
    entityType: "fixture",
    time: new Date(n - 8 * 3_600_000),
  },
];
