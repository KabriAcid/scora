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
        homeTeam: getClubById("chelsea")!,
        awayTeam: getClubById("man-utd")!,
        homeScore: 1,
        awayScore: 1,
        status: "live",
        stadium: "Stamford Bridge",
        week: "Week 10",
        matchTime: "90+4",
    },
    {
        id: "2",
        homeTeam: getClubById("nottm-forest")!,
        awayTeam: getClubById("liverpool")!,
        homeScore: 0,
        awayScore: 3,
        status: "live",
        stadium: "City Ground",
        week: "Week 10",
        matchTime: "78",
    },
    {
        id: "3",
        homeTeam: getClubById("man-city")!,
        awayTeam: getClubById("brighton")!,
        homeScore: 2,
        awayScore: 1,
        status: "live",
        stadium: "Etihad Stadium",
        week: "Week 10",
        matchTime: "65",
    },
    {
        id: "4",
        homeTeam: getClubById("wolves")!,
        awayTeam: getClubById("leicester")!,
        homeScore: 1,
        awayScore: 0,
        status: "live",
        stadium: "Molineux Stadium",
        week: "Week 10",
        matchTime: "52",
    },
];

// Today's matches (mix of upcoming and finished)
export const todayMatches: Match[] = [
    {
        id: "5",
        homeTeam: getClubById("arsenal")!,
        awayTeam: getClubById("tottenham")!,
        homeScore: 2,
        awayScore: 1,
        status: "finished",
        stadium: "Emirates Stadium",
        week: "Week 10",
        time: "FT",
    },
    {
        id: "6",
        homeTeam: getClubById("newcastle")!,
        awayTeam: getClubById("west-ham")!,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        stadium: "St. James' Park",
        week: "Week 10",
        time: "17:30",
    },
    {
        id: "7",
        homeTeam: getClubById("everton")!,
        awayTeam: getClubById("fulham")!,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        stadium: "Goodison Park",
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
