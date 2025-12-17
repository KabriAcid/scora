import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import LeaguesPage from "@/features/admin/pages/LeaguesPage";
import TeamsPage from "@/features/admin/pages/TeamsPage";
import PlayersPage from "@/features/admin/pages/PlayersPage";
import StadiumsPage from "@/features/admin/pages/StadiumsPage";
import FixturesPage from "@/features/admin/pages/FixturesPage";
import AgentsPage from "@/features/admin/pages/AgentsPage";
import SettingsPage from "@/features/admin/pages/SettingsPage";
import NotFound from "@/NotFound";
import { ROUTES } from "@/shared/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.ADMIN.DASHBOARD}
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.LEAGUES}
        element={
          <ProtectedRoute requiredRole="admin">
            <LeaguesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.TEAMS}
        element={
          <ProtectedRoute requiredRole="admin">
            <TeamsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.PLAYERS}
        element={
          <ProtectedRoute requiredRole="admin">
            <PlayersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.STADIUMS}
        element={
          <ProtectedRoute requiredRole="admin">
            <StadiumsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.FIXTURES}
        element={
          <ProtectedRoute requiredRole="admin">
            <FixturesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.AGENTS}
        element={
          <ProtectedRoute requiredRole="admin">
            <AgentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.SETTINGS}
        element={
          <ProtectedRoute requiredRole="admin">
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
