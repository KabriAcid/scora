import { clubs, PremierLeagueClub, getClubById } from "./clubs";

export interface Competition {
    id: string;
    name: string;
    region: string;
    icon: string;
}

export interface Match {
    id: string;
    homeTeam: PremierLeagueClub;
    awayTeam: PremierLeagueClub;
    homeScore: number;
    awayScore: number;
    status: "live" | "finished" | "upcoming";
    priority?: number; // Lower number = higher priority (0=live, 1=upcoming, 2=finished)
    competition: Competition;
    stadium?: string;
    week?: string;
    matchTime?: string;
    date?: string;
    time?: string;
}

// Competition definitions
export const competitions: Competition[] = [
    {
        id: "premier-league",
        name: "Premier League",
        region: "Katsina",
        icon: "⚽"
    },
    {
        id: "katsina-cup",
        name: "Katsina State Cup",
        region: "Katsina",
        icon: "🏆"
    },
    {
        id: "northern-championship",
        name: "Northern Championship",
        region: "Qualification 2026",
        icon: "🏅"
    }
];

// Live matches
export const liveMatches: Match[] = [
    {
        id: "1",
        homeTeam: getClubById("sheffield-guga")!,
        awayTeam: getClubById("mani-ultimate")!,
        homeScore: 1,
        awayScore: 1,
        status: "live",
        competition: competitions[0],
        stadium: "Karkanda Stadium",
        week: "Week 10",
        matchTime: "90+4",
    },
    {
        id: "2",
        homeTeam: getClubById("faskari-united")!,
        awayTeam: getClubById("nursing-home")!,
        homeScore: 0,
        awayScore: 3,
        status: "live",
        competition: competitions[0],
        stadium: "Faskari Stadium",
        week: "Week 10",
        matchTime: "78",
    },
    {
        id: "3",
        homeTeam: getClubById("gawo-united")!,
        awayTeam: getClubById("katsina-city")!,
        homeScore: 2,
        awayScore: 1,
        status: "live",
        competition: competitions[0],
        stadium: "Gawo Park",
        week: "Week 10",
        matchTime: "65",
    },
    {
        id: "4",
        homeTeam: getClubById("baure-flyers")!,
        awayTeam: getClubById("lazio-katsina")!,
        homeScore: 1,
        awayScore: 0,
        status: "live",
        competition: competitions[0],
        stadium: "Baure Arena",
        week: "Week 10",
        matchTime: "52",
    },
];

// Today's matches (mix of upcoming and finished)
export const todayMatches: Match[] = [
    {
        id: "5",
        homeTeam: getClubById("katsina-united")!,
        awayTeam: getClubById("kankia-warriors")!,
        homeScore: 2,
        awayScore: 1,
        status: "finished",
        competition: competitions[0],
        stadium: "Katsina United Ground",
        week: "Week 10",
        time: "FT",
    },
    {
        id: "6",
        homeTeam: getClubById("dutsinma-united")!,
        awayTeam: getClubById("saulawa-united")!,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        competition: competitions[1],
        stadium: "Dutsin-Ma Field",
        week: "Week 10",
        time: "17:30",
    },
    {
        id: "7",
        homeTeam: getClubById("golden-arrow")!,
        awayTeam: getClubById("malumfashi-fc")!,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        competition: competitions[1],
        stadium: "Arrow Park",
        week: "Week 10",
        time: "21:12",
    },
    {
        id: "8",
        homeTeam: getClubById("baure-flyers")!,
        awayTeam: getClubById("golden-arrow")!,
        homeScore: 2,
        awayScore: 0,
        status: "finished",
        competition: competitions[0],
        stadium: "Baure Arena",
        week: "Week 10",
        time: "FT",
    },
    {
        id: "9",
        homeTeam: getClubById("faskari-united")!,
        awayTeam: getClubById("nursing-home")!,
        homeScore: 1,
        awayScore: 0,
        status: "finished",
        competition: competitions[0],
        stadium: "Faskari Stadium",
        week: "Week 10",
        time: "FT",
    },
    {
        id: "10",
        homeTeam: getClubById("gawo-united")!,
        awayTeam: getClubById("katsina-city")!,
        homeScore: 2,
        awayScore: 2,
        status: "finished",
        competition: competitions[2],
        stadium: "Gawo Park",
        week: "Week 10",
        time: "FT",
    },
];

// Get featured match (usually the most important live match)
export const getFeaturedMatch = (): Match => {
    return liveMatches[0];
};

// Get all live matches
export const getLiveMatches = (): Match[] => {
    return liveMatches;
};

// Get priority for match status (lower = higher priority)
export const getStatusPriority = (status: Match["status"]): number => {
    const priorities = { live: 0, upcoming: 1, finished: 2 };
    return priorities[status];
};

// Get today's matches
export const getTodayMatches = (): Match[] => {
    // Sort: live first (priority 0), then upcoming (1), then finished (2)
    return [...todayMatches].sort((a, b) => {
        return getStatusPriority(a.status) - getStatusPriority(b.status);
    });
};

// Get match by ID
export const getMatchById = (id: string): Match | undefined => {
    return [...liveMatches, ...todayMatches].find(match => match.id === id);
};

// Group matches by competition
export const getMatchesByCompetition = (): Map<Competition, Match[]> => {
    const allMatches = [...getTodayMatches(), ...getLiveMatches()];
    const grouped = new Map<Competition, Match[]>();

    allMatches.forEach(match => {
        const existing = grouped.get(match.competition);
        if (existing) {
            existing.push(match);
        } else {
            grouped.set(match.competition, [match]);
        }
    });

    return grouped;
};
