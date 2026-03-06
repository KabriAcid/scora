import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import LeaguesPage from "@/features/admin/pages/LeaguesPage";
import LeagueStandingsPage from "@/features/admin/pages/LeagueStandingsPage";
import LeagueSeasonsPage from "@/features/admin/pages/LeagueSeasonsPage";
import LeagueFixturesPage from "@/features/admin/pages/LeagueFixturesPage";
import TeamsPage from "@/features/admin/pages/TeamsPage";
import PlayersPage from "@/features/admin/pages/PlayersPage";
import StadiumsPage from "@/features/admin/pages/StadiumsPage";
import FixturesPage from "@/features/admin/pages/FixturesPage";
import AgentsPage from "@/features/admin/pages/AgentsPage";
import SettingsPage from "@/features/admin/pages/SettingsPage";
import NotFound from "@/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";

// Paths are relative to the /admin/* parent mount in App.tsx
export const AdminRoutes = () => {
  return (
    <Routes>
      {/* Redirect /admin → /admin/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="leagues"
        element={
          <ProtectedRoute requiredRole="admin">
            <LeaguesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="leagues/standings"
        element={
          <ProtectedRoute requiredRole="admin">
            <LeagueStandingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="leagues/seasons"
        element={
          <ProtectedRoute requiredRole="admin">
            <LeagueSeasonsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="leagues/fixtures"
        element={
          <ProtectedRoute requiredRole="admin">
            <LeagueFixturesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="teams"
        element={
          <ProtectedRoute requiredRole="admin">
            <TeamsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="players"
        element={
          <ProtectedRoute requiredRole="admin">
            <PlayersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="stadiums"
        element={
          <ProtectedRoute requiredRole="admin">
            <StadiumsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="fixtures"
        element={
          <ProtectedRoute requiredRole="admin">
            <FixturesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="agents"
        element={
          <ProtectedRoute requiredRole="admin">
            <AgentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="settings"
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
