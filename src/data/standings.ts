import { clubs, PremierLeagueClub } from "./clubs";

export interface TeamStanding {
  position: number;
  team: PremierLeagueClub;
  played: number;
  win: number;
  draw: number;
  loss: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export const standingsData: TeamStanding[] = [
  { position: 1, team: clubs[11], played: 11, win: 10, draw: 1, loss: 0, gf: 27, ga: 6, gd: 21, points: 31, form: ["W", "W", "W", "D", "W"] },
  { position: 2, team: clubs[12], played: 11, win: 8, draw: 2, loss: 1, gf: 25, ga: 12, gd: 13, points: 26, form: ["W", "W", "L", "W", "W"] },
  { position: 3, team: clubs[5], played: 11, win: 6, draw: 4, loss: 1, gf: 24, ga: 13, gd: 11, points: 22, form: ["W", "D", "W", "D", "W"] },
  { position: 4, team: clubs[0], played: 11, win: 6, draw: 3, loss: 2, gf: 22, ga: 13, gd: 9, points: 21, form: ["W", "D", "W", "L", "W"] },
  { position: 5, team: clubs[15], played: 11, win: 6, draw: 3, loss: 2, gf: 17, ga: 10, gd: 7, points: 21, form: ["W", "W", "D", "W", "L"] },
  { position: 6, team: clubs[4], played: 11, win: 5, draw: 5, loss: 1, gf: 20, ga: 14, gd: 6, points: 20, form: ["D", "W", "D", "W", "D"] },
  { position: 7, team: clubs[1], played: 11, win: 5, draw: 4, loss: 2, gf: 19, ga: 16, gd: 3, points: 19, form: ["L", "W", "D", "W", "W"] },
  { position: 8, team: clubs[8], played: 11, win: 5, draw: 3, loss: 3, gf: 17, ga: 14, gd: 3, points: 18, form: ["W", "L", "W", "D", "W"] },
  { position: 9, team: clubs[2], played: 11, win: 5, draw: 3, loss: 3, gf: 18, ga: 16, gd: 2, points: 18, form: ["D", "W", "L", "W", "W"] },
  { position: 10, team: clubs[14], played: 11, win: 5, draw: 3, loss: 3, gf: 13, ga: 11, gd: 2, points: 18, form: ["W", "D", "W", "L", "D"] },
  { position: 11, team: clubs[3], played: 11, win: 5, draw: 2, loss: 4, gf: 22, ga: 20, gd: 2, points: 17, form: ["L", "W", "W", "L", "W"] },
  { position: 12, team: clubs[13], played: 11, win: 5, draw: 2, loss: 4, gf: 14, ga: 12, gd: 2, points: 17, form: ["W", "L", "W", "W", "L"] },
  { position: 13, team: clubs[17], played: 11, win: 5, draw: 1, loss: 5, gf: 23, ga: 15, gd: 8, points: 16, form: ["L", "W", "L", "W", "W"] },
  { position: 14, team: clubs[19], played: 11, win: 4, draw: 3, loss: 4, gf: 21, ga: 20, gd: 1, points: 15, form: ["D", "L", "W", "D", "W"] },
  { position: 15, team: clubs[18], played: 11, win: 4, draw: 3, loss: 4, gf: 16, ga: 18, gd: -2, points: 15, form: ["W", "D", "L", "W", "L"] },
  { position: 16, team: clubs[7], played: 11, win: 3, draw: 4, loss: 4, gf: 12, ga: 17, gd: -5, points: 13, form: ["D", "L", "D", "W", "L"] },
  { position: 17, team: clubs[6], played: 11, win: 2, draw: 5, loss: 4, gf: 12, ga: 15, gd: -3, points: 11, form: ["D", "D", "L", "D", "W"] },
  { position: 18, team: clubs[10], played: 11, win: 2, draw: 3, loss: 6, gf: 14, ga: 22, gd: -8, points: 9, form: ["L", "L", "W", "D", "L"] },
  { position: 19, team: clubs[9], played: 11, win: 1, draw: 4, loss: 6, gf: 11, ga: 24, gd: -13, points: 7, form: ["L", "D", "L", "D", "L"] },
  { position: 20, team: clubs[16], played: 11, win: 1, draw: 1, loss: 9, gf: 9, ga: 28, gd: -19, points: 4, form: ["L", "L", "L", "W", "L"] },
];
