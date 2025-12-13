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
    id: "arsenal",
    name: "Arsenal",
    shortName: "ARS",
    responsiveName: "Arsenal",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t3.svg",
    primaryColor: "#EF0107"
  },
  {
    id: "aston-villa",
    name: "Aston Villa",
    shortName: "AVL",
    responsiveName: "Aston Villa",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t7.svg",
    primaryColor: "#670E36"
  },
  {
    id: "bournemouth",
    name: "AFC Bournemouth",
    shortName: "BOU",
    responsiveName: "Bournemouth",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t91.svg",
    primaryColor: "#DA291C"
  },
  {
    id: "brentford",
    name: "Brentford",
    shortName: "BRE",
    responsiveName: "Brentford",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t94.svg",
    primaryColor: "#E30613"
  },
  {
    id: "brighton",
    name: "Brighton & Hove Albion",
    shortName: "BHA",
    responsiveName: "Brighton",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t36.svg",
    primaryColor: "#0057B8"
  },
  {
    id: "chelsea",
    name: "Chelsea",
    shortName: "CHE",
    responsiveName: "Chelsea",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t8.svg",
    primaryColor: "#034694"
  },
  {
    id: "crystal-palace",
    name: "Crystal Palace",
    shortName: "CRY",
    responsiveName: "Crystal Palace",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t31.svg",
    primaryColor: "#1B458F"
  },
  {
    id: "everton",
    name: "Everton",
    shortName: "EVE",
    responsiveName: "Everton",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t11.svg",
    primaryColor: "#003399"
  },
  {
    id: "fulham",
    name: "Fulham",
    shortName: "FUL",
    responsiveName: "Fulham",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t54.svg",
    primaryColor: "#000000"
  },
  {
    id: "ipswich",
    name: "Ipswich Town",
    shortName: "IPS",
    responsiveName: "Ipswich",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t40.svg",
    primaryColor: "#0044AA"
  },
  {
    id: "leicester",
    name: "Leicester City",
    shortName: "LEI",
    responsiveName: "Leicester",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t13.svg",
    primaryColor: "#003090"
  },
  {
    id: "liverpool",
    name: "Liverpool",
    shortName: "LIV",
    responsiveName: "Liverpool",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t14.svg",
    primaryColor: "#C8102E"
  },
  {
    id: "man-city",
    name: "Manchester City",
    shortName: "MCI",
    responsiveName: "Man City",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t43.svg",
    primaryColor: "#6CABDD"
  },
  {
    id: "man-utd",
    name: "Manchester United",
    shortName: "MUN",
    responsiveName: "Man United",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t1.svg",
    primaryColor: "#DA291C"
  },
  {
    id: "newcastle",
    name: "Newcastle United",
    shortName: "NEW",
    responsiveName: "Newcastle",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t4.svg",
    primaryColor: "#241F20"
  },
  {
    id: "nottm-forest",
    name: "Nottingham Forest",
    shortName: "NFO",
    responsiveName: "Nott'm Forest",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t17.svg",
    primaryColor: "#DD0000"
  },
  {
    id: "southampton",
    name: "Southampton",
    shortName: "SOU",
    responsiveName: "Southampton",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t20.svg",
    primaryColor: "#D71920"
  },
  {
    id: "tottenham",
    name: "Tottenham Hotspur",
    shortName: "TOT",
    responsiveName: "Tottenham",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t6.svg",
    primaryColor: "#132257"
  },
  {
    id: "west-ham",
    name: "West Ham United",
    shortName: "WHU",
    responsiveName: "West Ham",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t21.svg",
    primaryColor: "#7A263A"
  },
  {
    id: "wolves",
    name: "Wolverhampton Wanderers",
    shortName: "WOL",
    responsiveName: "Wolves",
    badgeUrl: "https://resources.premierleague.com/premierleague/badges/t39.svg",
    primaryColor: "#FDB913"
  }
];

export const getClubById = (id: string): PremierLeagueClub | undefined => {
  return clubs.find(club => club.id === id);
};
