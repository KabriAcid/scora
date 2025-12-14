import { clubs } from "./clubs";

export interface PlayerStat {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  teamBadge: string;
  value: number;
}

export const topScorers: PlayerStat[] = [
  { id: "1", name: "Erling Haaland", teamId: clubs[11].id, teamName: clubs[11].shortName, teamBadge: clubs[11].badgeUrl, value: 15 },
  { id: "2", name: "Igor Thiago", teamId: clubs[3].id, teamName: clubs[3].shortName, teamBadge: clubs[3].badgeUrl, value: 11 },
  { id: "3", name: "Hugo Ekitike", teamId: clubs[12].id, teamName: clubs[12].shortName, teamBadge: clubs[12].badgeUrl, value: 7 },
  { id: "4", name: "Jean-Philippe Mateta", teamId: clubs[6].id, teamName: clubs[6].shortName, teamBadge: clubs[6].badgeUrl, value: 7 },
  { id: "5", name: "Danny Welbeck", teamId: clubs[4].id, teamName: clubs[4].shortName, teamBadge: clubs[4].badgeUrl, value: 7 },
  { id: "6", name: "Mohamed Salah", teamId: clubs[12].id, teamName: clubs[12].shortName, teamBadge: clubs[12].badgeUrl, value: 6 },
  { id: "7", name: "Chris Wood", teamId: clubs[14].id, teamName: clubs[14].shortName, teamBadge: clubs[14].badgeUrl, value: 6 },
  { id: "8", name: "Bryan Mbeumo", teamId: clubs[3].id, teamName: clubs[3].shortName, teamBadge: clubs[3].badgeUrl, value: 6 },
  { id: "9", name: "Cole Palmer", teamId: clubs[5].id, teamName: clubs[5].shortName, teamBadge: clubs[5].badgeUrl, value: 6 },
  { id: "10", name: "Nicolas Jackson", teamId: clubs[5].id, teamName: clubs[5].shortName, teamBadge: clubs[5].badgeUrl, value: 5 },
];

export const topAssists: PlayerStat[] = [
  { id: "1", name: "Bruno Fernandes", teamId: clubs[13].id, teamName: clubs[13].shortName, teamBadge: clubs[13].badgeUrl, value: 6 },
  { id: "2", name: "Mohamed Salah", teamId: clubs[12].id, teamName: clubs[12].shortName, teamBadge: clubs[12].badgeUrl, value: 6 },
  { id: "3", name: "Cole Palmer", teamId: clubs[5].id, teamName: clubs[5].shortName, teamBadge: clubs[5].badgeUrl, value: 5 },
  { id: "4", name: "Bukayo Saka", teamId: clubs[0].id, teamName: clubs[0].shortName, teamBadge: clubs[0].badgeUrl, value: 5 },
  { id: "5", name: "Kevin De Bruyne", teamId: clubs[11].id, teamName: clubs[11].shortName, teamBadge: clubs[11].badgeUrl, value: 4 },
  { id: "6", name: "Anthony Gordon", teamId: clubs[14].id, teamName: clubs[14].shortName, teamBadge: clubs[14].badgeUrl, value: 4 },
  { id: "7", name: "Dwight McNeil", teamId: clubs[7].id, teamName: clubs[7].shortName, teamBadge: clubs[7].badgeUrl, value: 4 },
  { id: "8", name: "Alexander Isak", teamId: clubs[14].id, teamName: clubs[14].shortName, teamBadge: clubs[14].badgeUrl, value: 3 },
  { id: "9", name: "Morgan Rogers", teamId: clubs[1].id, teamName: clubs[1].shortName, teamBadge: clubs[1].badgeUrl, value: 3 },
  { id: "10", name: "Heung-Min Son", teamId: clubs[15].id, teamName: clubs[15].shortName, teamBadge: clubs[15].badgeUrl, value: 3 },
];

export const redCards: PlayerStat[] = [
  { id: "1", name: "William Saliba", teamId: clubs[0].id, teamName: clubs[0].shortName, teamBadge: clubs[0].badgeUrl, value: 1 },
  { id: "2", name: "Declan Rice", teamId: clubs[0].id, teamName: clubs[0].shortName, teamBadge: clubs[0].badgeUrl, value: 1 },
  { id: "3", name: "Daichi Kamada", teamId: clubs[6].id, teamName: clubs[6].shortName, teamBadge: clubs[6].badgeUrl, value: 1 },
  { id: "4", name: "Bruno Fernandes", teamId: clubs[13].id, teamName: clubs[13].shortName, teamBadge: clubs[13].badgeUrl, value: 1 },
  { id: "5", name: "Lisandro Martinez", teamId: clubs[13].id, teamName: clubs[13].shortName, teamBadge: clubs[13].badgeUrl, value: 1 },
];

export const yellowCards: PlayerStat[] = [
  { id: "1", name: "Yves Bissouma", teamId: clubs[15].id, teamName: clubs[15].shortName, teamBadge: clubs[15].badgeUrl, value: 6 },
  { id: "2", name: "Joao Palhinha", teamId: clubs[9].id, teamName: clubs[9].shortName, teamBadge: clubs[9].badgeUrl, value: 5 },
  { id: "3", name: "Lewis Cook", teamId: clubs[2].id, teamName: clubs[2].shortName, teamBadge: clubs[2].badgeUrl, value: 5 },
  { id: "4", name: "Moises Caicedo", teamId: clubs[5].id, teamName: clubs[5].shortName, teamBadge: clubs[5].badgeUrl, value: 4 },
  { id: "5", name: "Bruno Guimaraes", teamId: clubs[14].id, teamName: clubs[14].shortName, teamBadge: clubs[14].badgeUrl, value: 4 },
  { id: "6", name: "Kai Havertz", teamId: clubs[0].id, teamName: clubs[0].shortName, teamBadge: clubs[0].badgeUrl, value: 4 },
  { id: "7", name: "Amadou Onana", teamId: clubs[1].id, teamName: clubs[1].shortName, teamBadge: clubs[1].badgeUrl, value: 4 },
  { id: "8", name: "Ederson", teamId: clubs[1].id, teamName: clubs[1].shortName, teamBadge: clubs[1].badgeUrl, value: 4 },
  { id: "9", name: "Ruben Dias", teamId: clubs[11].id, teamName: clubs[11].shortName, teamBadge: clubs[11].badgeUrl, value: 3 },
  { id: "10", name: "Pedro Porro", teamId: clubs[15].id, teamName: clubs[15].shortName, teamBadge: clubs[15].badgeUrl, value: 3 },
];

export const cleanSheets: PlayerStat[] = [
  { id: "1", name: "Jordan Pickford", teamId: clubs[7].id, teamName: clubs[7].shortName, teamBadge: clubs[7].badgeUrl, value: 5 },
  { id: "2", name: "Robert Sanchez", teamId: clubs[5].id, teamName: clubs[5].shortName, teamBadge: clubs[5].badgeUrl, value: 5 },
  { id: "3", name: "David Raya", teamId: clubs[0].id, teamName: clubs[0].shortName, teamBadge: clubs[0].badgeUrl, value: 4 },
  { id: "4", name: "Nick Pope", teamId: clubs[14].id, teamName: clubs[14].shortName, teamBadge: clubs[14].badgeUrl, value: 4 },
  { id: "5", name: "Ederson", teamId: clubs[11].id, teamName: clubs[11].shortName, teamBadge: clubs[11].badgeUrl, value: 4 },
  { id: "6", name: "Alisson Becker", teamId: clubs[12].id, teamName: clubs[12].shortName, teamBadge: clubs[12].badgeUrl, value: 3 },
  { id: "7", name: "Emiliano Martinez", teamId: clubs[1].id, teamName: clubs[1].shortName, teamBadge: clubs[1].badgeUrl, value: 3 },
  { id: "8", name: "Guglielmo Vicario", teamId: clubs[15].id, teamName: clubs[15].shortName, teamBadge: clubs[15].badgeUrl, value: 3 },
  { id: "9", name: "Bart Verbruggen", teamId: clubs[4].id, teamName: clubs[4].shortName, teamBadge: clubs[4].badgeUrl, value: 2 },
  { id: "10", name: "Andre Onana", teamId: clubs[13].id, teamName: clubs[13].shortName, teamBadge: clubs[13].badgeUrl, value: 2 },
];

export type StatCategory = "scorers" | "assists" | "red" | "yellow" | "cleansheets";

export const getStatsByCategory = (category: StatCategory): PlayerStat[] => {
  switch (category) {
    case "scorers":
      return topScorers;
    case "assists":
      return topAssists;
    case "red":
      return redCards;
    case "yellow":
      return yellowCards;
    case "cleansheets":
      return cleanSheets;
    default:
      return topScorers;
  }
};
