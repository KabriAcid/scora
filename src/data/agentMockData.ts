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
        description: "You have been assigned to Arsenal vs Chelsea match",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
        isRead: false,
        matchId: "match-1",
    },
    {
        id: "notif-2",
        type: "goal",
        title: "Goal Logged Successfully",
        description: "Bukayo Saka scored for Arsenal (Minute 12)",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
        isRead: false,
        matchId: "match-1",
    },
    {
        id: "notif-3",
        type: "card",
        title: "Yellow Card Logged",
        description: "Mason Mount received yellow card (Minute 8)",
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 mins ago
        isRead: true,
        matchId: "match-1",
    },
    {
        id: "notif-4",
        type: "substitution",
        title: "Substitution Recorded",
        description: "Mohamed Salah replaced Darwin Núñez (Minute 35)",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
        isRead: true,
        matchId: "match-1",
    },
    {
        id: "notif-5",
        type: "corner",
        title: "Corner Kick Logged",
        description: "Corner awarded to Chelsea (Minute 42)",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        isRead: true,
        matchId: "match-1",
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
        startTime: new Date(),
        venue: "Emirates Stadium, London",
        league: "Premier League",
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
        venue: "Anfield, Liverpool",
        league: "Premier League",
    },
    {
        id: "match-3",
        homeTeam: clubs[17].responsiveName,
        awayTeam: clubs[13].responsiveName,
        homeTeamLogo: clubs[17].badgeUrl,
        awayTeamLogo: clubs[13].badgeUrl,
        status: "completed",
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        venue: "Tottenham Hotspur Stadium, London",
        league: "Premier League",
        homeScore: 1,
        awayScore: 1,
    },
];

// Mock Recent Events
export const mockRecentEvents: RecentEvent[] = [
    {
        id: "event-1",
        type: "goal",
        player: "Bukayo Saka",
        team: clubs[0].responsiveName,
        minute: 45,
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        matchId: "match-1",
    },
    {
        id: "event-2",
        type: "yellow_card",
        player: "Mason Mount",
        team: clubs[5].responsiveName,
        minute: 38,
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        matchId: "match-1",
    },
    {
        id: "event-3",
        type: "substitution",
        player: "Mohamed Salah → Darwin Núñez",
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
        player: "Kevin De Bruyne",
        team: clubs[12].responsiveName,
        minute: 12,
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        matchId: "match-1",
    },
];

// Mock Agent Profile
export const mockAgentProfile = {
    id: "agent-001",
    name: "Seun Adeyemi",
    email: "seun.adeyemi@scora.ng",
    phone: "+234 801 234 5678",
    agentCode: "AG-2024-001",
    joinDate: new Date("2024-01-15"),
    avatar: null, // Placeholder avatar
    status: "active" as const,
};
