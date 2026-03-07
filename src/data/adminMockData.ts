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

export interface MonthStat {
  month: string;
  players: number;
  fixtures: number;
}

export interface FixtureStatus {
  status: string;
  count: number;
  color: string;
}

export interface LeagueSummary {
  id: string;
  name: string;
  state: string;
  teams: number;
  fixtures: number;
  completed: number;
  status: "Active" | "Upcoming" | "Completed";
}

export interface TeamSummary {
  id: string;
  name: string;
  shortCode: string;
  state: string;
  league: string;
  players: number;
  wins: number;
  draws: number;
  losses: number;
  status: "Active" | "Inactive" | "Suspended";
}

export interface AgentSummary {
  id: string;
  name: string;
  code: string;
  matchesLogged: number;
  accuracy: number;
  state: string;
  status: "Active" | "Inactive";
}

// ─── Overview Stats ───────────────────────────────────────────────────────────

export const adminOverviewStats = {
  totalPlayers: 420,
  totalTeams: 32,
  upcomingFixtures: 38,
  activeAgents: 12,
  totalLeagues: 6,
  totalStadiums: 14,
  liveMatches: 3,
  pendingAgents: 5,
};

// ─── Monthly Trends (last 6 months) ──────────────────────────────────────────

export const monthlyTrends: MonthStat[] = [
  { month: "Oct", players: 48, fixtures: 22 },
  { month: "Nov", players: 62, fixtures: 30 },
  { month: "Dec", players: 35, fixtures: 18 },
  { month: "Jan", players: 74, fixtures: 42 },
  { month: "Feb", players: 91, fixtures: 55 },
  { month: "Mar", players: 110, fixtures: 63 },
];

// ─── Fixture Status Breakdown ─────────────────────────────────────────────────

export const fixtureStatusBreakdown: FixtureStatus[] = [
  { status: "Completed", count: 142, color: "hsl(var(--primary))" },
  { status: "Scheduled", count: 38, color: "hsl(var(--accent))" },
  { status: "Live", count: 3, color: "hsl(142 71% 45%)" },
  { status: "Postponed", count: 7, color: "hsl(var(--muted-foreground))" },
];

// ─── Top Leagues ──────────────────────────────────────────────────────────────

export const topLeagues: LeagueSummary[] = [
  {
    id: "l1",
    name: "Kano State League",
    state: "Kano",
    teams: 16,
    fixtures: 60,
    completed: 48,
    status: "Active",
  },
  {
    id: "l2",
    name: "Kaduna Premier League",
    state: "Kaduna",
    teams: 14,
    fixtures: 52,
    completed: 40,
    status: "Active",
  },
  {
    id: "l3",
    name: "Katsina FA Cup",
    state: "Katsina",
    teams: 8,
    fixtures: 14,
    completed: 14,
    status: "Completed",
  },
  {
    id: "l4",
    name: "Gombe United League",
    state: "Gombe",
    teams: 10,
    fixtures: 36,
    completed: 18,
    status: "Active",
  },
  {
    id: "l5",
    name: "Jigawa State Cup",
    state: "Jigawa",
    teams: 12,
    fixtures: 22,
    completed: 0,
    status: "Upcoming",
  },
];

// ─── Team Summaries ──────────────────────────────────────────────────────────

export const teamSummaries: TeamSummary[] = [
  {
    id: "t1",
    name: "Kano Pillars FC",
    shortCode: "KPL",
    state: "Kano",
    league: "Kano State League",
    players: 24,
    wins: 10,
    draws: 3,
    losses: 2,
    status: "Active",
  },
  {
    id: "t2",
    name: "Kaduna United",
    shortCode: "KDU",
    state: "Kaduna",
    league: "Kaduna Premier League",
    players: 22,
    wins: 8,
    draws: 4,
    losses: 3,
    status: "Active",
  },
  {
    id: "t3",
    name: "Gombe Bulls FC",
    shortCode: "GBL",
    state: "Gombe",
    league: "Gombe United League",
    players: 20,
    wins: 6,
    draws: 5,
    losses: 4,
    status: "Active",
  },
  {
    id: "t4",
    name: "Jigawa Stars",
    shortCode: "JGS",
    state: "Jigawa",
    league: "Jigawa State Cup",
    players: 18,
    wins: 0,
    draws: 0,
    losses: 0,
    status: "Active",
  },
  {
    id: "t5",
    name: "Katsina Rangers",
    shortCode: "KTR",
    state: "Katsina",
    league: "Katsina FA Cup",
    players: 19,
    wins: 5,
    draws: 2,
    losses: 7,
    status: "Inactive",
  },
  {
    id: "t6",
    name: "Zamfara Warriors FC",
    shortCode: "ZWF",
    state: "Zamfara",
    league: "Kano State League",
    players: 21,
    wins: 7,
    draws: 3,
    losses: 5,
    status: "Active",
  },
  {
    id: "t7",
    name: "Sokoto Rovers",
    shortCode: "SKR",
    state: "Sokoto",
    league: "Kano State League",
    players: 17,
    wins: 3,
    draws: 1,
    losses: 9,
    status: "Suspended",
  },
  {
    id: "t8",
    name: "Bauchi City FC",
    shortCode: "BCF",
    state: "Bauchi",
    league: "Gombe United League",
    players: 23,
    wins: 9,
    draws: 2,
    losses: 4,
    status: "Active",
  },
];

// ─── Agent Summaries ──────────────────────────────────────────────────────────

export const agentSummaries: AgentSummary[] = [
  {
    id: "a1",
    name: "Umar Farouk",
    code: "SCR-003",
    matchesLogged: 34,
    accuracy: 98,
    state: "Kano",
    status: "Active",
  },
  {
    id: "a2",
    name: "Halima Bello",
    code: "SCR-007",
    matchesLogged: 28,
    accuracy: 95,
    state: "Kaduna",
    status: "Active",
  },
  {
    id: "a3",
    name: "Musa Danladi",
    code: "SCR-011",
    matchesLogged: 21,
    accuracy: 91,
    state: "Katsina",
    status: "Active",
  },
  {
    id: "a4",
    name: "Aisha Lawal",
    code: "SCR-015",
    matchesLogged: 17,
    accuracy: 88,
    state: "Gombe",
    status: "Inactive",
  },
];

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
