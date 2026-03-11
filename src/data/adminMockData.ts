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
  agentCode: string;
  matchesLogged: number;
  accuracy: number;
  state: string;
  status: "Active" | "Inactive" | "Pending";
}

export interface PlayerSummary {
  id: string;
  name: string;
  number: number;
  position: "GK" | "DEF" | "MID" | "FWD";
  team: string;
  league: string;
  state: string;
  age: number;
  goals: number;
  assists: number;
  appearances: number;
  status: "Active" | "Injured" | "Suspended";
}

export interface StadiumSummary {
  id: string;
  name: string;
  city: string;
  state: string;
  capacity: number;
  surface: "Natural Grass" | "Artificial Turf";
  homeTeam: string;
  fixturesHosted: number;
  status: "Active" | "Under Renovation" | "Inactive";
}

export interface FixtureSummary {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  stadium: string;
  date: string;
  time: string;
  week: string;
  agentAssigned: string | null;
  status: "Scheduled" | "Live" | "Completed" | "Postponed";
  homeScore: number | null;
  awayScore: number | null;
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
    agentCode: "SCR-003",
    matchesLogged: 34,
    accuracy: 98,
    state: "Kano",
    status: "Active",
  },
  {
    id: "a2",
    name: "Halima Bello",
    agentCode: "SCR-007",
    matchesLogged: 28,
    accuracy: 95,
    state: "Kaduna",
    status: "Active",
  },
  {
    id: "a3",
    name: "Musa Danladi",
    agentCode: "SCR-011",
    matchesLogged: 21,
    accuracy: 91,
    state: "Katsina",
    status: "Active",
  },
  {
    id: "a4",
    name: "Aisha Lawal",
    agentCode: "SCR-015",
    matchesLogged: 17,
    accuracy: 88,
    state: "Gombe",
    status: "Inactive",
  },
  {
    id: "a5",
    name: "Ibrahim Sule",
    agentCode: "SCR-019",
    matchesLogged: 0,
    accuracy: 100,
    state: "Bauchi",
    status: "Pending",
  },
  {
    id: "a6",
    name: "Fatima Garba",
    agentCode: "SCR-022",
    matchesLogged: 0,
    accuracy: 100,
    state: "Yobe",
    status: "Pending",
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

// ─── Players ──────────────────────────────────────────────────────────────────

export const playerSummaries: PlayerSummary[] = [
  {
    id: "p1",
    name: "Ibrahim Musa",
    number: 9,
    position: "FWD",
    team: "Kano Pillars FC",
    league: "Kano State League",
    state: "Kano",
    age: 24,
    goals: 14,
    assists: 6,
    appearances: 18,
    status: "Active",
  },
  {
    id: "p2",
    name: "Yusuf Aliyu",
    number: 1,
    position: "GK",
    team: "Kano Pillars FC",
    league: "Kano State League",
    state: "Kano",
    age: 28,
    goals: 0,
    assists: 0,
    appearances: 15,
    status: "Active",
  },
  {
    id: "p3",
    name: "Emeka Okafor",
    number: 5,
    position: "DEF",
    team: "Kaduna United",
    league: "Kaduna Premier League",
    state: "Kaduna",
    age: 26,
    goals: 2,
    assists: 1,
    appearances: 14,
    status: "Active",
  },
  {
    id: "p4",
    name: "Chukwudi Eze",
    number: 10,
    position: "MID",
    team: "Kaduna United",
    league: "Kaduna Premier League",
    state: "Kaduna",
    age: 22,
    goals: 5,
    assists: 9,
    appearances: 15,
    status: "Active",
  },
  {
    id: "p5",
    name: "Abubakar Sani",
    number: 7,
    position: "MID",
    team: "Gombe Bulls FC",
    league: "Gombe United League",
    state: "Gombe",
    age: 25,
    goals: 4,
    assists: 7,
    appearances: 15,
    status: "Injured",
  },
  {
    id: "p6",
    name: "Ismail Bello",
    number: 11,
    position: "FWD",
    team: "Gombe Bulls FC",
    league: "Gombe United League",
    state: "Gombe",
    age: 21,
    goals: 8,
    assists: 3,
    appearances: 14,
    status: "Active",
  },
  {
    id: "p7",
    name: "Nathaniel Duku",
    number: 4,
    position: "DEF",
    team: "Bauchi City FC",
    league: "Gombe United League",
    state: "Bauchi",
    age: 27,
    goals: 1,
    assists: 2,
    appearances: 13,
    status: "Active",
  },
  {
    id: "p8",
    name: "Suleiman Garba",
    number: 6,
    position: "DEF",
    team: "Katsina Rangers",
    league: "Katsina FA Cup",
    state: "Katsina",
    age: 30,
    goals: 0,
    assists: 0,
    appearances: 14,
    status: "Suspended",
  },
  {
    id: "p9",
    name: "Aminu Umar",
    number: 8,
    position: "MID",
    team: "Zamfara Warriors FC",
    league: "Kano State League",
    state: "Zamfara",
    age: 23,
    goals: 3,
    assists: 5,
    appearances: 15,
    status: "Active",
  },
  {
    id: "p10",
    name: "David Ochoa",
    number: 3,
    position: "DEF",
    team: "Jigawa Stars",
    league: "Jigawa State Cup",
    state: "Jigawa",
    age: 24,
    goals: 0,
    assists: 1,
    appearances: 0,
    status: "Active",
  },
];

// ─── Stadiums ─────────────────────────────────────────────────────────────────

export const stadiumSummaries: StadiumSummary[] = [
  {
    id: "st1",
    name: "Sani Abacha Stadium",
    city: "Kano",
    state: "Kano",
    capacity: 25000,
    surface: "Natural Grass",
    homeTeam: "Kano Pillars FC",
    fixturesHosted: 22,
    status: "Active",
  },
  {
    id: "st2",
    name: "Ahmadu Bello Stadium",
    city: "Kaduna",
    state: "Kaduna",
    capacity: 15000,
    surface: "Natural Grass",
    homeTeam: "Kaduna United",
    fixturesHosted: 18,
    status: "Active",
  },
  {
    id: "st3",
    name: "Pantami Stadium",
    city: "Gombe",
    state: "Gombe",
    capacity: 8000,
    surface: "Artificial Turf",
    homeTeam: "Gombe Bulls FC",
    fixturesHosted: 14,
    status: "Active",
  },
  {
    id: "st4",
    name: "Muhammadu Dikko Stadium",
    city: "Katsina",
    state: "Katsina",
    capacity: 12000,
    surface: "Natural Grass",
    homeTeam: "Katsina Rangers",
    fixturesHosted: 10,
    status: "Under Renovation",
  },
  {
    id: "st5",
    name: "Karkanda Ground",
    city: "Kankara",
    state: "Katsina",
    capacity: 5000,
    surface: "Natural Grass",
    homeTeam: "Katsina Rangers",
    fixturesHosted: 8,
    status: "Active",
  },
  {
    id: "st6",
    name: "Zamfara Sports Complex",
    city: "Gusau",
    state: "Zamfara",
    capacity: 6000,
    surface: "Artificial Turf",
    homeTeam: "Zamfara Warriors FC",
    fixturesHosted: 12,
    status: "Active",
  },
  {
    id: "st7",
    name: "Jigawa Township Stadium",
    city: "Dutse",
    state: "Jigawa",
    capacity: 7500,
    surface: "Natural Grass",
    homeTeam: "Jigawa Stars",
    fixturesHosted: 0,
    status: "Active",
  },
  {
    id: "st8",
    name: "Abubakar Tafawa Balewa Ground",
    city: "Bauchi",
    state: "Bauchi",
    capacity: 9000,
    surface: "Natural Grass",
    homeTeam: "Bauchi City FC",
    fixturesHosted: 16,
    status: "Inactive",
  },
];

// ─── Fixtures ─────────────────────────────────────────────────────────────────

export const fixtureSummaries: FixtureSummary[] = [
  {
    id: "f1",
    homeTeam: "Kano Pillars FC",
    awayTeam: "Kaduna United",
    league: "Kano State League",
    stadium: "Sani Abacha Stadium",
    date: "2026-03-15",
    time: "15:00",
    week: "Week 19",
    agentAssigned: "Umar Farouk",
    status: "Scheduled",
    homeScore: null,
    awayScore: null,
  },
  {
    id: "f2",
    homeTeam: "Gombe Bulls FC",
    awayTeam: "Bauchi City FC",
    league: "Gombe United League",
    stadium: "Pantami Stadium",
    date: "2026-03-15",
    time: "16:00",
    week: "Week 16",
    agentAssigned: "Halima Bello",
    status: "Scheduled",
    homeScore: null,
    awayScore: null,
  },
  {
    id: "f3",
    homeTeam: "Zamfara Warriors FC",
    awayTeam: "Kano Pillars FC",
    league: "Kano State League",
    stadium: "Zamfara Sports Complex",
    date: "2026-03-11",
    time: "15:00",
    week: "Week 18",
    agentAssigned: "Musa Danladi",
    status: "Live",
    homeScore: 1,
    awayScore: 1,
  },
  {
    id: "f4",
    homeTeam: "Kaduna United",
    awayTeam: "Sokoto Rovers",
    league: "Kaduna Premier League",
    stadium: "Ahmadu Bello Stadium",
    date: "2026-03-08",
    time: "15:00",
    week: "Week 18",
    agentAssigned: "Umar Farouk",
    status: "Completed",
    homeScore: 3,
    awayScore: 0,
  },
  {
    id: "f5",
    homeTeam: "Katsina Rangers",
    awayTeam: "Jigawa Stars",
    league: "Katsina FA Cup",
    stadium: "Karkanda Ground",
    date: "2026-03-08",
    time: "13:00",
    week: "Week 7",
    agentAssigned: "Aisha Lawal",
    status: "Completed",
    homeScore: 1,
    awayScore: 2,
  },
  {
    id: "f6",
    homeTeam: "Bauchi City FC",
    awayTeam: "Zamfara Warriors FC",
    league: "Gombe United League",
    stadium: "Abubakar Tafawa Balewa Ground",
    date: "2026-03-22",
    time: "16:00",
    week: "Week 17",
    agentAssigned: null,
    status: "Scheduled",
    homeScore: null,
    awayScore: null,
  },
  {
    id: "f7",
    homeTeam: "Jigawa Stars",
    awayTeam: "Kaduna United",
    league: "Jigawa State Cup",
    stadium: "Jigawa Township Stadium",
    date: "2026-03-29",
    time: "14:00",
    week: "Week 1",
    agentAssigned: null,
    status: "Scheduled",
    homeScore: null,
    awayScore: null,
  },
  {
    id: "f8",
    homeTeam: "Kano Pillars FC",
    awayTeam: "Gombe Bulls FC",
    league: "Kano State League",
    stadium: "Sani Abacha Stadium",
    date: "2026-03-01",
    time: "15:00",
    week: "Week 17",
    agentAssigned: "Halima Bello",
    status: "Postponed",
    homeScore: null,
    awayScore: null,
  },
];
