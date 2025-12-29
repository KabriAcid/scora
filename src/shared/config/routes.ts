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
  },

  // Administrator routes
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    LEAGUES: "/admin/leagues",
    TEAMS: "/admin/teams",
    PLAYERS: "/admin/players",
    STADIUMS: "/admin/stadiums",
    FIXTURES: "/admin/fixtures",
    AGENTS: "/admin/agents",
    SETTINGS: "/admin/settings",
  },

  // Error pages
  NOT_FOUND: "*",
} as const;

export type RouteKeys = typeof ROUTES;
