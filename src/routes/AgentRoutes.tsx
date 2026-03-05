import { Routes, Route } from "react-router-dom";
import AgentDashboard from "@/features/agent/pages/AgentDashboard";
import LiveMatchPage from "@/features/agent/pages/LiveMatchPage";
import AssignedMatchesPage from "@/features/agent/pages/AssignedMatchesPage";
import EventLogPage from "@/features/agent/pages/EventLogPage";
import AgentCalendarPage from "@/features/agent/pages/AgentCalendarPage";
import NotFound from "@/NotFound";
import { ROUTES } from "@/shared/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";

export const AgentRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.AGENT.DASHBOARD}
        element={
          <ProtectedRoute requiredRole="agent">
            <AgentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.AGENT.LIVE_MATCH}
        element={
          <ProtectedRoute requiredRole="agent">
            <LiveMatchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.AGENT.ASSIGNED_MATCHES}
        element={
          <ProtectedRoute requiredRole="agent">
            <AssignedMatchesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.AGENT.EVENT_LOG}
        element={
          <ProtectedRoute requiredRole="agent">
            <EventLogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.AGENT.CALENDAR}
        element={
          <ProtectedRoute requiredRole="agent">
            <AgentCalendarPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
