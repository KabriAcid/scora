import { clubs, PremierLeagueClub, getClubById } from "./clubs";

export interface Match {
    id: string;
    homeTeam: PremierLeagueClub;
    awayTeam: PremierLeagueClub;
    homeScore: number;
    awayScore: number;
    status: "live" | "finished" | "upcoming";
    stadium?: string;
    week?: string;
    matchTime?: string;
    date?: string;
    time?: string;
}

// Live matches
export const liveMatches: Match[] = [
    {
        id: "1",
        homeTeam: getClubById("sheffield-guga")!,
        awayTeam: getClubById("mani-ultimate")!,
        homeScore: 1,
        awayScore: 1,
        status: "live",
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
        stadium: "Arrow Park",
        week: "Week 10",
        time: "20:00",
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

// Get today's matches
export const getTodayMatches = (): Match[] => {
    return todayMatches;
};

// Get match by ID
export const getMatchById = (id: string): Match | undefined => {
    return [...liveMatches, ...todayMatches].find(match => match.id === id);
};
