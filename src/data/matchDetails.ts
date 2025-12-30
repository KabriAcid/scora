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
    league: "Katsina League",
    homeTeam: {
      formation: "4-2-3-1",
      manager: "Musa Kabir",
      lineup: [
        { id: "1", name: "Habu Benzima", number: 1, position: "GK" },
        { id: "2", name: "Abubakar Yellow", number: 24, position: "RB" },
        { id: "3", name: "Anas Dan 02", number: 6, position: "CB" },
        { id: "4", name: "Shafiu Illa", number: 26, position: "CB" },
        { id: "5", name: "Adamu Kanu", number: 21, position: "LB" },
        { id: "6", name: "Anas Mayu", number: 5, position: "CDM" },
        { id: "7", name: "Anas Dauda", number: 8, position: "CDM" },
        { id: "8", name: "Mustapha Mysterio", number: 19, position: "CAM" },
        { id: "9", name: "Nunu Striker", number: 17, position: "LW" },
        { id: "10", name: "Sani Benzima", number: 29, position: "RW" },
        { id: "11", name: "Uban Club", number: 9, position: "ST" },
      ],
      substitutes: [
        { id: "12", name: "Muhammad Diarra", number: 16, position: "GK" },
        { id: "13", name: "Otoke Defender", number: 28, position: "DF" },
        { id: "14", name: "Senior Kante", number: 23, position: "MF" },
        { id: "15", name: "Sharabilu Nunu", number: 10, position: "FW" },
        { id: "16", name: "Yahya Ibrahim", number: 22, position: "FW" },
        { id: "17", name: "Ado Mallam", number: 30, position: "MF" },
        { id: "18", name: "Isa Kwara", number: 18, position: "FW" },
      ],
    },
    awayTeam: {
      formation: "4-1-4-1",
      manager: "Ibrahim Katisiya",
      lineup: [
        { id: "21", name: "Ahmad Hassan", number: 1, position: "GK" },
        { id: "22", name: "Sani Ibrahim", number: 20, position: "RB" },
        { id: "23", name: "Tanko Usman", number: 19, position: "CB" },
        { id: "24", name: "Lawal Mohammed", number: 6, position: "CB" },
        { id: "25", name: "Adamu Maliki", number: 23, position: "LB" },
        { id: "26", name: "Saidu Gida", number: 18, position: "CDM" },
        { id: "27", name: "Musa Kabir", number: 14, position: "CM" },
        { id: "28", name: "Zainab Ahmed", number: 21, position: "RW" },
        { id: "29", name: "Fadi Saleh", number: 8, position: "CAM" },
        { id: "30", name: "Rabi Musa", number: 25, position: "LW" },
        { id: "31", name: "Aminu Dodo", number: 10, position: "ST" },
      ],
      substitutes: [
        { id: "32", name: "Wasiu Bello", number: 22, position: "GK" },
        { id: "33", name: "Chinedu Obi", number: 5, position: "DF" },
        { id: "34", name: "Emeka Nwosu", number: 17, position: "MF" },
        { id: "35", name: "Kunle Okafor", number: 39, position: "MF" },
        { id: "36", name: "Obi Martins", number: 9, position: "FW" },
        { id: "37", name: "Chidi Okoro", number: 49, position: "FW" },
        { id: "38", name: "Tunde Adebayo", number: 28, position: "FW" },
      ],
    },
    events: [
      {
        id: "e1",
        time: "12",
        team: "home",
        type: "goal",
        player: "Mustapha Mysterio",
        assist: "Sani Benzima",
        description: "Assisted by Sani Benzima",
      },
      {
        id: "e2",
        time: "18",
        team: "away",
        type: "offside",
        player: "Aminu Dodo",
        description: "Offside position",
      },
      {
        id: "e3",
        time: "23",
        team: "away",
        type: "yellow",
        player: "Fadi Saleh",
        description: "Foul",
      },
      {
        id: "e4",
        time: "31",
        team: "home",
        type: "offside",
        player: "Sani Benzima",
        description: "Offside position",
      },
      {
        id: "e5",
        time: "38",
        team: "away",
        type: "goal",
        player: "Aminu Dodo",
        description: "Penalty kick",
      },
      {
        id: "e6",
        time: "45",
        team: "home",
        type: "yellow",
        player: "Senior Kante",
        description: "Tactical foul",
      },
      {
        id: "e7",
        time: "53",
        team: "away",
        type: "red",
        player: "Saidu Gida",
        description: "Serious foul play",
      },
      {
        id: "e8",
        time: "62",
        team: "home",
        type: "corner",
        player: "Shafiu Illa",
        description: "Corner kick",
      },
      {
        id: "e9",
        time: "67",
        team: "home",
        type: "substitution",
        player: "Sharabilu Attack",
        description: "↔ Yahya Ibrahim",
      },
      {
        id: "e10",
        time: "75",
        team: "away",
        type: "yellow",
        player: "Adamu Maliki",
        description: "Unsporting behavior",
      },
      {
        id: "e11",
        time: "81",
        team: "away",
        type: "substitution",
        player: "Uban Club",
        description: "↔ Rabi Musa",
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
          homeTeam: "Mani Ultimate",
          awayTeam: "Sheffield Guga",
          homeScore: 2,
          awayScore: 1,
          competition: "Katsina League",
        },
        {
          date: "Nov 2023",
          homeTeam: "Sheffield Guga",
          awayTeam: "Mani Ultimate",
          homeScore: 3,
          awayScore: 1,
          competition: "Katsina League",
        },
        {
          date: "May 2023",
          homeTeam: "Mani Ultimate",
          awayTeam: "Sheffield Guga",
          homeScore: 1,
          awayScore: 1,
          competition: "Katsina Cup",
        },
        {
          date: "Feb 2023",
          homeTeam: "Sheffield Guga",
          awayTeam: "Mani Ultimate",
          homeScore: 0,
          awayScore: 2,
          competition: "Katsina League",
        },
        {
          date: "Oct 2022",
          homeTeam: "Mani Ultimate",
          awayTeam: "Sheffield Guga",
          homeScore: 1,
          awayScore: 2,
          competition: "Katsina League",
        },
      ],
    },
    standings: {
      homeTeamStanding: {
        position: 4,
        team: getClubById("sheffield-guga")!,
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
        team: getClubById("mani-ultimate")!,
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
