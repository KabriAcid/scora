// Mock data for Agent Dashboard
import { clubs } from "./clubs";

export interface Notification {
    id: string;
    type: "goal" | "card" | "substitution" | "foul" | "corner" | "match_assigned";
    title: string;
    description: string;
    timestamp: Date;
    isRead: boolean;
    matchId?: string;
    teamId?: string;
}

export interface AgentStats {
    matchesLogged: number;
    eventsRecorded: number;
    accuracyRate: number;
    monthlyPerformance: number;
}

export interface AssignedMatch {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    status: "scheduled" | "live" | "completed";
    startTime: Date;
    venue: string;
    league: string;
    homeScore?: number;
    awayScore?: number;
}

export interface RecentEvent {
    id: string;
    type: "goal" | "yellow_card" | "red_card" | "substitution" | "foul" | "corner";
    player: string;
    team: string;
    minute: number;
    timestamp: Date;
    matchId: string;
}

// Mock Notifications for Agents
export const mockNotifications: Notification[] = [
    {
        id: "notif-1",
        type: "match_assigned",
        title: "New Match Assigned",
        description: "You have been assigned to Katsina Utd vs Eleven Shooting — Today, 15:00",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
        isRead: false,
        matchId: "match-2",
    },
    {
        id: "notif-2",
        type: "goal",
        title: "Goal Logged",
        description: "Ahmad Hassan scored for Katsina Utd (Minute 23) — Katsina Utd vs Sheffield Guga",
        timestamp: new Date(Date.now() - 1000 * 60 * 18), // 18 mins ago
        isRead: false,
        matchId: "match-1",
    },
    {
        id: "notif-3",
        type: "card",
        title: "Yellow Card Logged",
        description: "Sani Ibrahim (Sheffield Guga) received a yellow card (Minute 31)",
        timestamp: new Date(Date.now() - 1000 * 60 * 40), // 40 mins ago
        isRead: true,
        matchId: "match-1",
    },
    {
        id: "notif-4",
        type: "substitution",
        title: "Substitution Recorded",
        description: "Adamu Maliki replaced by Tanko Usman (Lazio KTS, Minute 62)",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hrs ago
        isRead: true,
        matchId: "match-3",
    },
    {
        id: "notif-5",
        type: "match_assigned",
        title: "Upcoming Match Reminder",
        description: "Katsina City vs Dan Buran is scheduled tomorrow at 14:00 — prepare your kit",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hrs ago
        isRead: true,
        matchId: "match-4",
    },
    {
        id: "notif-6",
        type: "foul",
        title: "Foul Logged",
        description: "Foul called on Lawal Mohammed (K-Soro, Minute 17) — free kick awarded",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 27), // yesterday
        isRead: true,
        matchId: "match-5",
    },
];

// Mock Agent Stats
export const mockAgentStats: AgentStats = {
    matchesLogged: 24,
    eventsRecorded: 187,
    accuracyRate: 98.5,
    monthlyPerformance: 94,
};

// Mock Assigned Matches
export const mockAssignedMatches: AssignedMatch[] = [
    {
        id: "match-1",
        homeTeam: clubs[0].responsiveName,
        awayTeam: clubs[5].responsiveName,
        homeTeamLogo: clubs[0].badgeUrl,
        awayTeamLogo: clubs[5].badgeUrl,
        status: "live",
        startTime: new Date(Date.now() - 1000 * 60 * 47), // 47 mins in
        venue: "Karkanda Stadium, Katsina",
        league: "Katsina League",
        homeScore: 2,
        awayScore: 1,
    },
    {
        id: "match-2",
        homeTeam: clubs[11].responsiveName,
        awayTeam: clubs[12].responsiveName,
        homeTeamLogo: clubs[11].badgeUrl,
        awayTeamLogo: clubs[12].badgeUrl,
        status: "scheduled",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 4), // 4 hours from now
        venue: "Lazio Stadium, Katsina",
        league: "Katsina League",
    },
    {
        id: "match-3",
        homeTeam: clubs[17].responsiveName,
        awayTeam: clubs[13].responsiveName,
        homeTeamLogo: clubs[17].badgeUrl,
        awayTeamLogo: clubs[13].badgeUrl,
        status: "completed",
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        venue: "Remo Stars Park, Katsina",
        league: "Katsina League",
        homeScore: 1,
        awayScore: 1,
    },
    {
        id: "match-4",
        homeTeam: clubs[2].responsiveName,
        awayTeam: clubs[8].responsiveName,
        homeTeamLogo: clubs[2].badgeUrl,
        awayTeamLogo: clubs[8].badgeUrl,
        status: "scheduled",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 26), // tomorrow
        venue: "Katsina City Arena",
        league: "Katsina Cup",
    },
    {
        id: "match-5",
        homeTeam: clubs[6].responsiveName,
        awayTeam: clubs[3].responsiveName,
        homeTeamLogo: clubs[6].badgeUrl,
        awayTeamLogo: clubs[3].badgeUrl,
        status: "completed",
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 27), // yesterday
        venue: "Unity Ground, Daura",
        league: "Katsina League",
        homeScore: 3,
        awayScore: 0,
    },
    {
        id: "match-6",
        homeTeam: clubs[14].responsiveName,
        awayTeam: clubs[1].responsiveName,
        homeTeamLogo: clubs[14].badgeUrl,
        awayTeamLogo: clubs[1].badgeUrl,
        status: "scheduled",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 50), // ~2 days from now
        venue: "Malumfashi Sports Centre",
        league: "Northern Championship",
    },
];

// Mock Recent Events
export const mockRecentEvents: RecentEvent[] = [
    {
        id: "event-1",
        type: "goal",
        player: "Ahmad Hassan",
        team: clubs[0].responsiveName,
        minute: 45,
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        matchId: "match-1",
    },
    {
        id: "event-2",
        type: "yellow_card",
        player: "Sani Ibrahim",
        team: clubs[5].responsiveName,
        minute: 38,
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        matchId: "match-1",
    },
    {
        id: "event-3",
        type: "substitution",
        player: "Adamu Maliki → Tanko Usman",
        team: clubs[11].responsiveName,
        minute: 35,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        matchId: "match-1",
    },
    {
        id: "event-4",
        type: "corner",
        player: "Corner Kick",
        team: clubs[5].responsiveName,
        minute: 28,
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        matchId: "match-1",
    },
    {
        id: "event-5",
        type: "goal",
        player: "Lawal Mohammed",
        team: clubs[12].responsiveName,
        minute: 12,
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        matchId: "match-1",
    },
];

// Mock Agent Profile
export const mockAgentProfile = {
    id: "agent-001",
    name: "Khalid Bello",
    email: "khalid.bello@scora.ng",
    phone: "+234 801 234 5678",
    agentCode: "AG-2024-001",
    joinDate: new Date("2024-01-15"),
    avatar: null, // Placeholder avatar
    status: "active" as const,
};

// ── Stats page data ──────────────────────────────────────────────────────────

export interface MonthlyActivity {
    month: string;
    matches: number;
    events: number;
}

export interface EventBreakdown {
    type: string;
    count: number;
    color: string;
}

export interface MatchPerformance {
    id: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    league: string;
    totalEvents: number;
    goals: number;
    cards: number;
    substitutions: number;
    accuracyScore: number; // 0–100
    status: "completed";
}

export const mockMonthlyActivity: MonthlyActivity[] = [
    { month: "Sep", matches: 3, events: 22 },
    { month: "Oct", matches: 4, events: 31 },
    { month: "Nov", matches: 3, events: 28 },
    { month: "Dec", matches: 5, events: 41 },
    { month: "Jan", matches: 4, events: 33 },
    { month: "Feb", matches: 5, events: 32 },
];

export const mockEventBreakdown: EventBreakdown[] = [
    { type: "Goals", count: 47, color: "hsl(var(--success))" },
    { type: "Yellow Cards", count: 38, color: "hsl(48 96% 53%)" },
    { type: "Red Cards", count: 6, color: "hsl(var(--destructive))" },
    { type: "Substitutions", count: 52, color: "hsl(var(--primary))" },
    { type: "Fouls", count: 29, color: "hsl(var(--accent))" },
    { type: "Corners", count: 15, color: "hsl(var(--muted-foreground))" },
];

export const mockMatchPerformances: MatchPerformance[] = [
    {
        id: "match-1",
        date: "2026-02-28",
        homeTeam: "Katsina Utd",
        awayTeam: "Sheffield Guga",
        homeTeamLogo: "/images/clubs/katsina-utd.png",
        awayTeamLogo: "/images/clubs/sheffield-guga.png",
        league: "Katsina League",
        totalEvents: 14,
        goals: 3,
        cards: 4,
        substitutions: 5,
        accuracyScore: 100,
        status: "completed",
    },
    {
        id: "match-5",
        date: "2026-02-21",
        homeTeam: "K-Soro FC",
        awayTeam: "Lazio KTS",
        homeTeamLogo: "/images/clubs/ksoro.png",
        awayTeamLogo: "/images/clubs/lazio-kts.png",
        league: "Katsina League",
        totalEvents: 11,
        goals: 2,
        cards: 2,
        substitutions: 6,
        accuracyScore: 98,
        status: "completed",
    },
    {
        id: "match-3",
        date: "2026-02-14",
        homeTeam: "Dan Buran FC",
        awayTeam: "Katsina City",
        homeTeamLogo: "/images/clubs/dan-buran.png",
        awayTeamLogo: "/images/clubs/katsina-city.png",
        league: "Katsina Cup",
        totalEvents: 9,
        goals: 1,
        cards: 3,
        substitutions: 4,
        accuracyScore: 96,
        status: "completed",
    },
    {
        id: "match-dec-2",
        date: "2026-01-30",
        homeTeam: "Malumfashi FC",
        awayTeam: "Remo Stars Kats",
        homeTeamLogo: "/images/clubs/malumfashi.png",
        awayTeamLogo: "/images/clubs/remo-kats.png",
        league: "Northern Championship",
        totalEvents: 13,
        goals: 4,
        cards: 1,
        substitutions: 6,
        accuracyScore: 100,
        status: "completed",
    },
    {
        id: "match-dec-1",
        date: "2026-01-17",
        homeTeam: "Eleven Shooting",
        awayTeam: "Katsina Utd",
        homeTeamLogo: "/images/clubs/eleven-shooting.png",
        awayTeamLogo: "/images/clubs/katsina-utd.png",
        league: "Katsina League",
        totalEvents: 8,
        goals: 2,
        cards: 2,
        substitutions: 3,
        accuracyScore: 94,
        status: "completed",
    },
];

