import { getClubById } from "./clubs";
import { TeamStanding } from "./standings";

export interface Player {
  id: string;
  name: string;
  number: number;
  position?: string;
}

export interface MatchEvent {
  id: string;
  time: string;
  team: "home" | "away";
  type:
    | "goal"
    | "yellow"
    | "red"
    | "substitution"
    | "penalty"
    | "offside"
    | "corner"
    | "foul";
  player: string;
  assist?: string;
  description?: string;
}

export interface MatchStat {
  label: string;
  home: number;
  away: number;
  isPercentage?: boolean;
}

export interface TeamLineup {
  formation: string;
  manager: string;
  lineup: Player[];
  substitutes: Player[];
}

export interface HeadToHead {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition: string;
}

export interface MatchDetail {
  matchId: string;
  league: string;
  homeTeam: TeamLineup;
  awayTeam: TeamLineup;
  events: MatchEvent[];
  stats: MatchStat[];
  h2h: {
    homeWins: number;
    draws: number;
    awayWins: number;
    previousMatches: HeadToHead[];
  };
  standings: {
    homeTeamStanding: TeamStanding;
    awayTeamStanding: TeamStanding;
  };
}

// Match detail data
export const matchDetailsData: Record<string, MatchDetail> = {
  "1": {
    matchId: "1",
    league: "Premier League",
    homeTeam: {
      formation: "4-2-3-1",
      manager: "Graham Potter",
      lineup: [
        { id: "1", name: "Kepa Arrizabalaga", number: 1, position: "GK" },
        { id: "2", name: "Reece James", number: 24, position: "RB" },
        { id: "3", name: "Thiago Silva", number: 6, position: "CB" },
        { id: "4", name: "K. Koulibaly", number: 26, position: "CB" },
        { id: "5", name: "Ben Chilwell", number: 21, position: "LB" },
        { id: "6", name: "Enzo Fernandez", number: 5, position: "CDM" },
        { id: "7", name: "Mateo Kovacic", number: 8, position: "CDM" },
        { id: "8", name: "Mason Mount", number: 19, position: "CAM" },
        { id: "9", name: "Raheem Sterling", number: 17, position: "LW" },
        { id: "10", name: "Kai Havertz", number: 29, position: "RW" },
        { id: "11", name: "P. Aubameyang", number: 9, position: "ST" },
      ],
      substitutes: [
        { id: "12", name: "Edouard Mendy", number: 16, position: "GK" },
        { id: "13", name: "Cesar Azpilicueta", number: 28, position: "DF" },
        { id: "14", name: "Jorginho", number: 23, position: "MF" },
        { id: "15", name: "Christian Pulisic", number: 10, position: "FW" },
        { id: "16", name: "Hakim Ziyech", number: 22, position: "FW" },
        { id: "17", name: "Conor Gallagher", number: 30, position: "MF" },
        { id: "18", name: "Armando Broja", number: 18, position: "FW" },
      ],
    },
    awayTeam: {
      formation: "4-1-4-1",
      manager: "E. ten Hag",
      lineup: [
        { id: "21", name: "David de Gea", number: 1, position: "GK" },
        { id: "22", name: "Diogo Dalot", number: 20, position: "RB" },
        { id: "23", name: "Raphael Varane", number: 19, position: "CB" },
        { id: "24", name: "L. Martinez", number: 6, position: "CB" },
        { id: "25", name: "Luke Shaw", number: 23, position: "LB" },
        { id: "26", name: "Casemiro", number: 18, position: "CDM" },
        { id: "27", name: "C. Eriksen", number: 14, position: "CM" },
        { id: "28", name: "Antony", number: 21, position: "RW" },
        { id: "29", name: "Bruno Fernandes", number: 8, position: "CAM" },
        { id: "30", name: "Jadon Sancho", number: 25, position: "LW" },
        { id: "31", name: "Marcus Rashford", number: 10, position: "ST" },
      ],
      substitutes: [
        { id: "32", name: "Tom Heaton", number: 22, position: "GK" },
        { id: "33", name: "Harry Maguire", number: 5, position: "DF" },
        { id: "34", name: "Fred", number: 17, position: "MF" },
        { id: "35", name: "Scott McTominay", number: 39, position: "MF" },
        { id: "36", name: "Anthony Martial", number: 9, position: "FW" },
        { id: "37", name: "A. Garnacho", number: 49, position: "FW" },
        { id: "38", name: "F. Pellistri", number: 28, position: "FW" },
      ],
    },
    events: [
      {
        id: "e1",
        time: "12",
        team: "home",
        type: "goal",
        player: "Mason Mount",
        assist: "Kai Havertz",
        description: "Assisted by Kai Havertz",
      },
      {
        id: "e2",
        time: "18",
        team: "away",
        type: "offside",
        player: "Marcus Rashford",
        description: "Offside position",
      },
      {
        id: "e3",
        time: "23",
        team: "away",
        type: "yellow",
        player: "Bruno Fernandes",
        description: "Foul",
      },
      {
        id: "e4",
        time: "31",
        team: "home",
        type: "offside",
        player: "Kai Havertz",
        description: "Offside position",
      },
      {
        id: "e5",
        time: "38",
        team: "away",
        type: "goal",
        player: "Marcus Rashford",
        description: "Penalty kick",
      },
      {
        id: "e6",
        time: "45",
        team: "home",
        type: "yellow",
        player: "Jorginho",
        description: "Tactical foul",
      },
      {
        id: "e7",
        time: "53",
        team: "away",
        type: "red",
        player: "Casemiro",
        description: "Serious foul play",
      },
      {
        id: "e8",
        time: "62",
        team: "home",
        type: "corner",
        player: "Chelsea",
        description: "Corner kick",
      },
      {
        id: "e9",
        time: "67",
        team: "home",
        type: "substitution",
        player: "Christian Pulisic",
        description: "↔ Hakim Ziyech",
      },
      {
        id: "e10",
        time: "75",
        team: "away",
        type: "yellow",
        player: "Luke Shaw",
        description: "Unsporting behavior",
      },
      {
        id: "e11",
        time: "81",
        team: "away",
        type: "substitution",
        player: "Anthony Martial",
        description: "↔ Jadon Sancho",
      },
    ],
    stats: [
      { label: "Possession", home: 58, away: 42, isPercentage: true },
      { label: "Shots", home: 12, away: 8 },
      { label: "Shots on Target", home: 5, away: 3 },
      { label: "Corners", home: 7, away: 4 },
      { label: "Fouls", home: 11, away: 14 },
      { label: "Yellow Cards", home: 2, away: 3 },
      { label: "Passes", home: 432, away: 318 },
      { label: "Pass Accuracy", home: 85, away: 78, isPercentage: true },
    ],
    h2h: {
      homeWins: 2,
      draws: 1,
      awayWins: 2,
      previousMatches: [
        {
          date: "Mar 2024",
          homeTeam: "Man Utd",
          awayTeam: "Chelsea",
          homeScore: 2,
          awayScore: 1,
          competition: "Premier League",
        },
        {
          date: "Nov 2023",
          homeTeam: "Chelsea",
          awayTeam: "Man Utd",
          homeScore: 3,
          awayScore: 1,
          competition: "Premier League",
        },
        {
          date: "May 2023",
          homeTeam: "Man Utd",
          awayTeam: "Chelsea",
          homeScore: 1,
          awayScore: 1,
          competition: "FA Cup",
        },
        {
          date: "Feb 2023",
          homeTeam: "Chelsea",
          awayTeam: "Man Utd",
          homeScore: 0,
          awayScore: 2,
          competition: "Premier League",
        },
        {
          date: "Oct 2022",
          homeTeam: "Man Utd",
          awayTeam: "Chelsea",
          homeScore: 1,
          awayScore: 2,
          competition: "Premier League",
        },
      ],
    },
    standings: {
      homeTeamStanding: {
        position: 4,
        team: getClubById("chelsea")!,
        played: 15,
        win: 8,
        draw: 4,
        loss: 3,
        gf: 28,
        ga: 18,
        gd: 10,
        points: 28,
        form: ["W", "D", "W", "L", "W"],
      },
      awayTeamStanding: {
        position: 7,
        team: getClubById("man-utd")!,
        played: 15,
        win: 7,
        draw: 3,
        loss: 5,
        gf: 22,
        ga: 20,
        gd: 2,
        points: 24,
        form: ["L", "W", "D", "W", "L"],
      },
    },
  },
};

// Helper function to get match details
export const getMatchDetails = (matchId: string): MatchDetail | undefined => {
  return matchDetailsData[matchId];
};
