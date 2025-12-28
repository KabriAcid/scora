/**
 * Agent-related type definitions
 */

export type EventType =
    | "goal"
    | "yellow_card"
    | "red_card"
    | "substitution"
    | "foul"
    | "corner"
    | "offside"
    | "injury";

export type MatchStatus = "scheduled" | "live" | "completed";

export interface MatchEvent {
    id: string;
    type: EventType;
    player: string;
    team: string;
    minute: number;
    description?: string;
    timestamp: Date;
}

export interface AssignedMatch {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    status: MatchStatus;
    startTime: Date;
    venue: string;
    league: string;
    homeScore?: number;
    awayScore?: number;
}

export interface AgentProfile {
    id: string;
    name: string;
    email: string;
    agentCode: string;
    status: "active" | "inactive" | "on_break";
    joinDate: Date;
}

export interface AgentStats {
    matchesLogged: number;
    eventsRecorded: number;
    accuracyRate: number;
    monthlyPerformance: number;
}

export interface Notification {
    id: string;
    type: EventType | "match_assigned";
    title: string;
    description: string;
    timestamp: Date;
    isRead: boolean;
    matchId?: string;
    teamId?: string;
}
