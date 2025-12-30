import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/features/guest/pages/HomePage";
import MatchDetailPage from "@/features/guest/pages/MatchDetailPage";
import StandingsPage from "@/features/guest/pages/StandingsPage";
import CalendarPage from "@/features/guest/pages/CalendarPage";
import StatsPage from "@/features/guest/pages/StatsPage";
import TermsPage from "@/features/guest/pages/TermsPage";
import AgentLoginPage from "@/features/agent/pages/AgentLoginPage";
import AgentDashboard from "@/features/agent/pages/AgentDashboard";
import LiveMatchPage from "@/features/agent/pages/LiveMatchPage";
// import AssignedMatchesPage from "@/features/agent/pages/AssignedMatchesPage";
import NotFound from "@/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Guest Routes (Public Access) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/match/:id" element={<MatchDetailPage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Agent Routes */}
          <Route path="/agent" element={<AgentLoginPage />} />
          <Route path="/agent/login" element={<AgentLoginPage />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/match/:id" element={<LiveMatchPage />} />
          {/* <Route path="/agent/matches" element={<AssignedMatchesPage />} /> */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
