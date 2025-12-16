import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/features/user/pages/HomePage";
import MatchDetailPage from "@/features/user/pages/MatchDetailPage";
import StandingsPage from "@/features/user/pages/StandingsPage";
import CalendarPage from "@/features/user/pages/CalendarPage";
import StatsPage from "@/features/user/pages/StatsPage";
import AgentLoginPage from "@/features/agent/pages/AgentLoginPage";
import NotFound from "@/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/match/:id" element={<MatchDetailPage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/stats" element={<StatsPage />} />

          {/* Agent Routes */}
          <Route path="/agent/login" element={<AgentLoginPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
