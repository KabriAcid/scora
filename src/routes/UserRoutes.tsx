import { Routes, Route } from "react-router-dom";
import HomePage from "@/features/user/pages/HomePage";
import MatchDetailPage from "@/features/user/pages/MatchDetailPage";
import StandingsPage from "@/features/user/pages/StandingsPage";
import CalendarPage from "@/features/user/pages/CalendarPage";
import TeamDetailPage from "@/features/user/pages/TeamDetailPage";
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
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
