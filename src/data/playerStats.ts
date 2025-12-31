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
  {
    id: "1",
    name: "Ayya Griezman",
    teamId: clubs[11].id,
    teamName: clubs[11].name,
    teamBadge: clubs[11].badgeUrl,
    value: 15,
  },
  {
    id: "2",
    name: "Abubakar Yellow",
    teamId: clubs[3].id,
    teamName: clubs[3].name,
    teamBadge: clubs[3].badgeUrl,
    value: 11,
  },
  {
    id: "3",
    name: "Anas Dan 02",
    teamId: clubs[12].id,
    teamName: clubs[12].name,
    teamBadge: clubs[12].badgeUrl,
    value: 7,
  },
  {
    id: "4",
    name: "Shafiu Illa",
    teamId: clubs[6].id,
    teamName: clubs[6].name,
    teamBadge: clubs[6].badgeUrl,
    value: 7,
  },
  {
    id: "5",
    name: "Adamu Kanu",
    teamId: clubs[4].id,
    teamName: clubs[4].name,
    teamBadge: clubs[4].badgeUrl,
    value: 7,
  },
  {
    id: "6",
    name: "Anas Mayu",
    teamId: clubs[12].id,
    teamName: clubs[12].name,
    teamBadge: clubs[12].badgeUrl,
    value: 6,
  },
  {
    id: "7",
    name: "Anas Dauda",
    teamId: clubs[14].id,
    teamName: clubs[14].name,
    teamBadge: clubs[14].badgeUrl,
    value: 6,
  },
  {
    id: "8",
    name: "Mustapha Mysterio",
    teamId: clubs[3].id,
    teamName: clubs[3].name,
    teamBadge: clubs[3].badgeUrl,
    value: 6,
  },
  {
    id: "9",
    name: "Nunu Striker",
    teamId: clubs[5].id,
    teamName: clubs[5].name,
    teamBadge: clubs[5].badgeUrl,
    value: 6,
  },
  {
    id: "10",
    name: "Oris Power",
    teamId: clubs[5].id,
    teamName: clubs[5].name,
    teamBadge: clubs[5].badgeUrl,
    value: 5,
  },
];

export const topAssists: PlayerStat[] = [
  {
    id: "1",
    name: "Fadi Saleh",
    teamId: clubs[13].id,
    teamName: clubs[13].name,
    teamBadge: clubs[13].badgeUrl,
    value: 6,
  },
  {
    id: "2",
    name: "Rabi Musa",
    teamId: clubs[12].id,
    teamName: clubs[12].name,
    teamBadge: clubs[12].badgeUrl,
    value: 6,
  },
  {
    id: "3",
    name: "Uban Club",
    teamId: clubs[5].id,
    teamName: clubs[5].name,
    teamBadge: clubs[5].badgeUrl,
    value: 5,
  },
  {
    id: "4",
    name: "Muhammad Diarra",
    teamId: clubs[0].id,
    teamName: clubs[0].name,
    teamBadge: clubs[0].badgeUrl,
    value: 5,
  },
  {
    id: "5",
    name: "Otoke Defender",
    teamId: clubs[11].id,
    teamName: clubs[11].name,
    teamBadge: clubs[11].badgeUrl,
    value: 4,
  },
  {
    id: "6",
    name: "Senior Kante",
    teamId: clubs[14].id,
    teamName: clubs[14].name,
    teamBadge: clubs[14].badgeUrl,
    value: 4,
  },
  {
    id: "7",
    name: "Sharabilu Attack",
    teamId: clubs[7].id,
    teamName: clubs[7].name,
    teamBadge: clubs[7].badgeUrl,
    value: 4,
  },
  {
    id: "8",
    name: "Yahya Ibrahim",
    teamId: clubs[14].id,
    teamName: clubs[14].name,
    teamBadge: clubs[14].badgeUrl,
    value: 3,
  },
  {
    id: "9",
    name: "Ado Mallam",
    teamId: clubs[1].id,
    teamName: clubs[1].name,
    teamBadge: clubs[1].badgeUrl,
    value: 3,
  },
  {
    id: "10",
    name: "Isa Kwara",
    teamId: clubs[15].id,
    teamName: clubs[15].name,
    teamBadge: clubs[15].badgeUrl,
    value: 3,
  },
];

export const redCards: PlayerStat[] = [
  {
    id: "1",
    name: "Saidu Gida",
    teamId: clubs[0].id,
    teamName: clubs[0].name,
    teamBadge: clubs[0].badgeUrl,
    value: 1,
  },
  {
    id: "2",
    name: "Aminu Dodo",
    teamId: clubs[0].id,
    teamName: clubs[0].name,
    teamBadge: clubs[0].badgeUrl,
    value: 1,
  },
  {
    id: "3",
    name: "Yusuf A",
    teamId: clubs[6].id,
    teamName: clubs[6].name,
    teamBadge: clubs[6].badgeUrl,
    value: 1,
  },
  {
    id: "4",
    name: "Tanko Usman",
    teamId: clubs[13].id,
    teamName: clubs[13].name,
    teamBadge: clubs[13].badgeUrl,
    value: 1,
  },
  {
    id: "5",
    name: "Lawal Mohammed",
    teamId: clubs[13].id,
    teamName: clubs[13].name,
    teamBadge: clubs[13].badgeUrl,
    value: 1,
  },
];

export const yellowCards: PlayerStat[] = [
  {
    id: "1",
    name: "Musa Kabir",
    teamId: clubs[15].id,
    teamName: clubs[15].name,
    teamBadge: clubs[15].badgeUrl,
    value: 6,
  },
  {
    id: "2",
    name: "Adamu Maliki",
    teamId: clubs[9].id,
    teamName: clubs[9].name,
    teamBadge: clubs[9].badgeUrl,
    value: 5,
  },
  {
    id: "3",
    name: "Sani Ibrahim",
    teamId: clubs[2].id,
    teamName: clubs[2].name,
    teamBadge: clubs[2].badgeUrl,
    value: 5,
  },
  {
    id: "4",
    name: "Abu Benzima",
    teamId: clubs[5].id,
    teamName: clubs[5].name,
    teamBadge: clubs[5].badgeUrl,
    value: 4,
  },
  {
    id: "5",
    name: "Wasiu Bello",
    teamId: clubs[14].id,
    teamName: clubs[14].name,
    teamBadge: clubs[14].badgeUrl,
    value: 4,
  },
  {
    id: "6",
    name: "Ahmad Hassan",
    teamId: clubs[0].id,
    teamName: clubs[0].name,
    teamBadge: clubs[0].badgeUrl,
    value: 4,
  },
  {
    id: "7",
    name: "Chinedu Obi",
    teamId: clubs[1].id,
    teamName: clubs[1].name,
    teamBadge: clubs[1].badgeUrl,
    value: 4,
  },
  {
    id: "8",
    name: "Emeka Nwosu",
    teamId: clubs[1].id,
    teamName: clubs[1].name,
    teamBadge: clubs[1].badgeUrl,
    value: 4,
  },
  {
    id: "9",
    name: "Kunle Okafor",
    teamId: clubs[11].id,
    teamName: clubs[11].name,
    teamBadge: clubs[11].badgeUrl,
    value: 3,
  },
  {
    id: "10",
    name: "Tunde Adebayo",
    teamId: clubs[15].id,
    teamName: clubs[15].name,
    teamBadge: clubs[15].badgeUrl,
    value: 3,
  },
];

export const cleanSheets: PlayerStat[] = [
  {
    id: "1",
    name: "Dan Hajiya",
    teamId: clubs[7].id,
    teamName: clubs[7].name,
    teamBadge: clubs[7].badgeUrl,
    value: 5,
  },
  {
    id: "2",
    name: "Chidi Okoro",
    teamId: clubs[5].id,
    teamName: clubs[5].name,
    teamBadge: clubs[5].badgeUrl,
    value: 5,
  },
  {
    id: "3",
    name: "Ibrahim Katisiya",
    teamId: clubs[0].id,
    teamName: clubs[0].name,
    teamBadge: clubs[0].badgeUrl,
    value: 4,
  },
  {
    id: "4",
    name: "Nunu Keeper",
    teamId: clubs[14].id,
    teamName: clubs[14].name,
    teamBadge: clubs[14].badgeUrl,
    value: 4,
  },
  {
    id: "5",
    name: "Sanusi Azare",
    teamId: clubs[11].id,
    teamName: clubs[11].name,
    teamBadge: clubs[11].badgeUrl,
    value: 4,
  },
  {
    id: "6",
    name: "Yahya Gara",
    teamId: clubs[12].id,
    teamName: clubs[12].name,
    teamBadge: clubs[12].badgeUrl,
    value: 3,
  },
  {
    id: "7",
    name: "Ado Mukhtar",
    teamId: clubs[1].id,
    teamName: clubs[1].name,
    teamBadge: clubs[1].badgeUrl,
    value: 3,
  },
  {
    id: "8",
    name: "Isa Gwari",
    teamId: clubs[15].id,
    teamName: clubs[15].name,
    teamBadge: clubs[15].badgeUrl,
    value: 3,
  },
  {
    id: "9",
    name: "Rabi Protector",
    teamId: clubs[4].id,
    teamName: clubs[4].name,
    teamBadge: clubs[4].badgeUrl,
    value: 2,
  },
  {
    id: "10",
    name: "Fadi Guardian",
    teamId: clubs[13].id,
    teamName: clubs[13].name,
    teamBadge: clubs[13].badgeUrl,
    value: 2,
  },
];

export type StatCategory =
  | "scorers"
  | "assists"
  | "red"
  | "yellow"
  | "cleansheets";

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
