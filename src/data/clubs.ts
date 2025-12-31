export interface PremierLeagueClub {
  id: string;
  name: string;
  shortName: string;
  responsiveName: string;
  badgeUrl: string;
  primaryColor: string;
}

export const clubs: PremierLeagueClub[] = [
  {
    id: "katsina-united",
    name: "Katsina United FC",
    shortName: "KTS",
    responsiveName: "Katsina Utd",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t3.svg",
    primaryColor: "#008000"
  },
  {
    id: "malumfashi-fc",
    name: "Malumfashi FC",
    shortName: "MAL",
    responsiveName: "Malumfashi",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t7.svg",
    primaryColor: "#0000FF"
  },
  {
    id: "katsina-city",
    name: "Katsina City FC",
    shortName: "KCT",
    responsiveName: "Katsina City",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t91.svg",
    primaryColor: "#FFD700"
  },
  {
    id: "dan-buran-daura",
    name: "Dan Buran FC Daura",
    shortName: "DAN",
    responsiveName: "Dan Buran",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t94.svg",
    primaryColor: "#FFFFFF"
  },
  {
    id: "katsina-academy",
    name: "Katsina Football Academy",
    shortName: "KFA",
    responsiveName: "Katsina Acad",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t36.svg",
    primaryColor: "#006400"
  },
  {
    id: "sheffield-guga",
    name: "FC Sheffield K/Guga",
    shortName: "SHE",
    responsiveName: "Sheffield Guga",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t8.svg",
    primaryColor: "#CC0000"
  },
  {
    id: "afdin-fc",
    name: "Eleven Shooting",
    shortName: "ELS",
    responsiveName: "Eleven Shooting",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t31.svg",
    primaryColor: "#800080"
  },
  {
    id: "k-soro-united",
    name: "K-Soro United",
    shortName: "KSR",
    responsiveName: "K-Soro",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t11.svg",
    primaryColor: "#FFA500"
  },
  {
    id: "saulawa-united",
    name: "Saulawa United",
    shortName: "SAU",
    responsiveName: "Saulawa",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t54.svg",
    primaryColor: "#000000"
  },
  {
    id: "ranchers-katsina",
    name: "Abukur Royals",
    shortName: "ABR",
    responsiveName: "Abukur Royals",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t40.svg",
    primaryColor: "#FFFF00"
  },
  {
    id: "lazio-katsina",
    name: "Lazio FC Katsina",
    shortName: "LAZ",
    responsiveName: "Lazio KTS",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t13.svg",
    primaryColor: "#ADD8E6"
  },
  {
    id: "nursing-home",
    name: "Abukur Pillars",
    shortName: "ABP",
    responsiveName: "Abukur Pillars",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t14.svg",
    primaryColor: "#00FF00"
  },
  {
    id: "gawo-united",
    name: "Gawo United",
    shortName: "GAW",
    responsiveName: "Gawo Utd",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t43.svg",
    primaryColor: "#A52A2A"
  },
  {
    id: "southern-stars",
    name: "Southern Stars Katsina",
    shortName: "SST",
    responsiveName: "S. Stars",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t1.svg",
    primaryColor: "#000080"
  },
  {
    id: "golden-arrow",
    name: "Golden Arrow FC",
    shortName: "GAR",
    responsiveName: "G. Arrow",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t4.svg",
    primaryColor: "#DAA520"
  },
  {
    id: "faskari-united",
    name: "Faskari United",
    shortName: "FAS",
    responsiveName: "Faskari",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t17.svg",
    primaryColor: "#2E8B57"
  },
  {
    id: "dutsinma-united",
    name: "Dutsin-Ma United",
    shortName: "DUT",
    responsiveName: "Dutsin-Ma",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t20.svg",
    primaryColor: "#FF4500"
  },
  {
    id: "mani-ultimate",
    name: "Mani Ultimate FC",
    shortName: "MAN",
    responsiveName: "Mani Ult.",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t6.svg",
    primaryColor: "#4682B4"
  },
  {
    id: "kankia-warriors",
    name: "Kankia Warriors",
    shortName: "KAN",
    responsiveName: "Kankia",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t21.svg",
    primaryColor: "#708090"
  },
  {
    id: "baure-flyers",
    name: "Baure Flyers FC",
    shortName: "BAU",
    responsiveName: "Baure Flyers",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t39.svg",
    primaryColor: "#FF69B4"
  }
];

export const getClubById = (id: string): PremierLeagueClub | undefined => {
  return clubs.find(club => club.id === id);
};
