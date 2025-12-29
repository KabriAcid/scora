import { Routes, Route } from "react-router-dom";
import HomePage from "@/features/guest/pages/HomePage";
import MatchDetailPage from "@/features/guest/pages/MatchDetailPage";
import StandingsPage from "@/features/guest/pages/StandingsPage";
import CalendarPage from "@/features/guest/pages/CalendarPage";
import TeamDetailPage from "@/features/guest/pages/TeamDetailPage";
import StatsPage from "@/features/guest/pages/StatsPage";
import NotFound from "@/NotFound";
import { ROUTES } from "@/shared/config/routes";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.USER.HOME} element={<HomePage />} />
      <Route path={ROUTES.USER.MATCH_DETAIL} element={<MatchDetailPage />} />
      <Route path={ROUTES.USER.STANDINGS} element={<StandingsPage />} />
      <Route path={ROUTES.USER.CALENDAR} element={<CalendarPage />} />
      <Route path={ROUTES.USER.TEAM_DETAIL} element={<TeamDetailPage />} />
      <Route path={ROUTES.USER.STATS} element={<StatsPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
