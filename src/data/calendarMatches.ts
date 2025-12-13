import { clubs, PremierLeagueClub } from "./clubs";

export interface CalendarMatch {
  id: string;
  homeTeam: PremierLeagueClub;
  awayTeam: PremierLeagueClub;
  homeLogo: string;
  awayLogo: string;
  date: string;
  time: string;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "live" | "finished";
  venue: string;
}

export const calendarMatchesData: CalendarMatch[] = [
  {
    id: "1",
    homeTeam: clubs[2],
    awayTeam: clubs[12],
    homeLogo: clubs[2].badgeUrl,
    awayLogo: clubs[12].badgeUrl,
    date: "Saturday, 2 Nov",
    time: "12:30",
    status: "scheduled",
    venue: "Vitality Stadium"
  },
  {
    id: "2",
    homeTeam: clubs[1],
    awayTeam: clubs[17],
    homeLogo: clubs[1].badgeUrl,
    awayLogo: clubs[17].badgeUrl,
    date: "Saturday, 2 Nov",
    time: "15:00",
    status: "scheduled",
    venue: "Villa Park"
  },
  {
    id: "3",
    homeTeam: clubs[8],
    awayTeam: clubs[3],
    homeLogo: clubs[8].badgeUrl,
    awayLogo: clubs[3].badgeUrl,
    date: "Saturday, 2 Nov",
    time: "15:00",
    status: "scheduled",
    venue: "Craven Cottage"
  },
  {
    id: "4",
    homeTeam: clubs[11],
    awayTeam: clubs[4],
    homeLogo: clubs[11].badgeUrl,
    awayLogo: clubs[4].badgeUrl,
    date: "Saturday, 2 Nov",
    time: "17:30",
    status: "scheduled",
    venue: "Anfield"
  },
  {
    id: "5",
    homeTeam: clubs[14],
    awayTeam: clubs[0],
    homeLogo: clubs[14].badgeUrl,
    awayLogo: clubs[0].badgeUrl,
    date: "Saturday, 2 Nov",
    time: "17:30",
    status: "scheduled",
    venue: "St. James' Park"
  },
  {
    id: "6",
    homeTeam: clubs[5],
    awayTeam: clubs[13],
    homeLogo: clubs[5].badgeUrl,
    awayLogo: clubs[13].badgeUrl,
    date: "Sunday, 3 Nov",
    time: "14:00",
    status: "scheduled",
    venue: "Stamford Bridge"
  },
  {
    id: "7",
    homeTeam: clubs[6],
    awayTeam: clubs[8],
    homeLogo: clubs[6].badgeUrl,
    awayLogo: clubs[8].badgeUrl,
    date: "Sunday, 3 Nov",
    time: "14:00",
    status: "scheduled",
    venue: "Selhurst Park"
  },
  {
    id: "8",
    homeTeam: clubs[19],
    awayTeam: clubs[16],
    homeLogo: clubs[19].badgeUrl,
    awayLogo: clubs[16].badgeUrl,
    date: "Sunday, 3 Nov",
    time: "16:30",
    status: "scheduled",
    venue: "Molineux Stadium"
  },
  {
    id: "9",
    homeTeam: clubs[18],
    awayTeam: clubs[7],
    homeLogo: clubs[18].badgeUrl,
    awayLogo: clubs[7].badgeUrl,
    date: "Monday, 4 Nov",
    time: "20:00",
    status: "scheduled",
    venue: "London Stadium"
  },
  {
    id: "10",
    homeTeam: clubs[15],
    awayTeam: clubs[14],
    homeLogo: clubs[15].badgeUrl,
    awayLogo: clubs[14].badgeUrl,
    date: "Monday, 4 Nov",
    time: "20:00",
    status: "scheduled",
    venue: "City Ground"
  }
];

export const pastCalendarMatchesData: CalendarMatch[] = [
  {
    id: "p1",
    homeTeam: clubs[11],
    awayTeam: clubs[5],
    homeLogo: clubs[11].badgeUrl,
    awayLogo: clubs[5].badgeUrl,
    date: "Saturday, 26 Oct",
    time: "12:30",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    venue: "Anfield"
  },
  {
    id: "p2",
    homeTeam: clubs[0],
    awayTeam: clubs[11],
    homeLogo: clubs[0].badgeUrl,
    awayLogo: clubs[11].badgeUrl,
    date: "Saturday, 26 Oct",
    time: "17:30",
    homeScore: 2,
    awayScore: 2,
    status: "finished",
    venue: "Emirates Stadium"
  },
  {
    id: "p3",
    homeTeam: clubs[12],
    awayTeam: clubs[17],
    homeLogo: clubs[12].badgeUrl,
    awayLogo: clubs[17].badgeUrl,
    date: "Saturday, 26 Oct",
    time: "15:00",
    homeScore: 4,
    awayScore: 0,
    status: "finished",
    venue: "Etihad Stadium"
  },
  {
    id: "p4",
    homeTeam: clubs[13],
    awayTeam: clubs[18],
    homeLogo: clubs[13].badgeUrl,
    awayLogo: clubs[18].badgeUrl,
    date: "Sunday, 27 Oct",
    time: "14:00",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    venue: "Old Trafford"
  },
  {
    id: "p5",
    homeTeam: clubs[14],
    awayTeam: clubs[0],
    homeLogo: clubs[14].badgeUrl,
    awayLogo: clubs[0].badgeUrl,
    date: "Sunday, 27 Oct",
    time: "16:30",
    homeScore: 1,
    awayScore: 0,
    status: "finished",
    venue: "St. James' Park"
  },
  {
    id: "p6",
    homeTeam: clubs[4],
    awayTeam: clubs[19],
    homeLogo: clubs[4].badgeUrl,
    awayLogo: clubs[19].badgeUrl,
    date: "Monday, 28 Oct",
    time: "20:00",
    homeScore: 2,
    awayScore: 2,
    status: "finished",
    venue: "American Express Stadium"
  }
];
