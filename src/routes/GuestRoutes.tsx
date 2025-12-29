import { Routes, Route } from "react-router-dom";
import HomePage from "@/features/guest/pages/HomePage";
import MatchDetailPage from "@/features/guest/pages/MatchDetailPage";
import StandingsPage from "@/features/guest/pages/StandingsPage";
import CalendarPage from "@/features/guest/pages/CalendarPage";
import TeamDetailPage from "@/features/guest/pages/TeamDetailPage";
import StatsPage from "@/features/guest/pages/StatsPage";
import NotFound from "@/NotFound";
import { ROUTES } from "@/shared/config/routes";

export const GuestRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.GUEST.HOME} element={<HomePage />} />
      <Route path={ROUTES.GUEST.MATCH_DETAIL} element={<MatchDetailPage />} />
      <Route path={ROUTES.GUEST.STANDINGS} element={<StandingsPage />} />
      <Route path={ROUTES.GUEST.CALENDAR} element={<CalendarPage />} />
      <Route path={ROUTES.GUEST.TEAM_DETAIL} element={<TeamDetailPage />} />
      <Route path={ROUTES.GUEST.STATS} element={<StatsPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
