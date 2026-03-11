// Route configuration for all user roles
export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Guest routes (public access)
  GUEST: {
    HOME: "/",
    MATCH_DETAIL: "/match/:id",
    STANDINGS: "/standings",
    CALENDAR: "/calendar",
    TEAM_DETAIL: "/team/:id",
    STATS: "/stats",
  },

  // Live Agent routes
  AGENT: {
    DASHBOARD: "/agent/dashboard",
    LIVE_MATCH: "/agent/match/:id",
    ASSIGNED_MATCHES: "/agent/matches",
    EVENT_LOG: "/agent/event-log",
    CALENDAR: "/agent/calendar",
    NOTIFICATIONS: "/agent/notifications",
    SETTINGS: "/agent/settings",
  },

  // Administrator routes
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
    LEAGUES: "/admin/leagues",
    LEAGUES_STANDINGS: "/admin/leagues/standings",
    LEAGUES_SEASONS: "/admin/leagues/seasons",
    LEAGUES_FIXTURES: "/admin/leagues/fixtures",
    TEAMS: "/admin/teams",
    TEAMS_SQUADS: "/admin/teams/squads",
    TEAMS_STATS: "/admin/teams/stats",
    PLAYERS: "/admin/players",
    STADIUMS: "/admin/stadiums",
    FIXTURES: "/admin/fixtures",
    AGENTS: "/admin/agents",
    ACTIVITY: "/admin/activity",
    SETTINGS: "/admin/settings",
  },

  // Error pages
  NOT_FOUND: "*",
} as const;

export type RouteKeys = typeof ROUTES;
