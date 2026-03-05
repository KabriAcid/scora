import { motion } from "framer-motion";
import {
  ArrowRight,
  User,
  Activity,
  Clock,
  Calendar,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AgentLayout from "@/components/layout/AgentLayout";
import LiveMatchCard from "@/features/agent/components/LiveMatchCard";
import { mockAgentProfile, mockAssignedMatches } from "@/data/agentMockData";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

const AgentDashboard = () => {
  const navigate = useNavigate();

  // Get the live or next scheduled match
  const currentMatch =
    mockAssignedMatches.find((m) => m.status === "scheduled") ||
    mockAssignedMatches[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AgentLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6 md:space-y-8 lg:space-y-10"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-primary-foreground" />
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    Welcome back, {mockAgentProfile.name.split(" ")[0]}! 👋
                  </h1>
                  <p className="text-primary-foreground/80 text-sm md:text-base">
                    {currentMatch.status === "live"
                      ? `You're currently logging the match between ${currentMatch.homeTeam} and ${currentMatch.awayTeam}`
                      : `Your next match is ${currentMatch.homeTeam} vs ${currentMatch.awayTeam
                      } at ${formatTime(currentMatch.startTime)}`}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex gap-3 flex-wrap"
                >
                  {currentMatch.status === "live" && (
                    <Button
                      onClick={() =>
                        navigate(`/agent/match/${currentMatch.id}`)
                      }
                      className="bg-accent hover:bg-accent/90 text-white font-semibold gap-2 text-sm md:text-base"
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5" />
                      Continue Logging
                    </Button>
                  )}
                  {currentMatch.status !== "live" && (
                    <Button
                      onClick={() =>
                        navigate(`/agent/match/${currentMatch.id}`)
                      }
                      className="bg-accent hover:bg-accent/90 text-white font-semibold gap-2 text-sm md:text-base"
                    >
                      <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                      Prepare for Match
                    </Button>
                  )}
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="hidden">
            {/* Stats moved to dedicated Stats page */}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Match & Events */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Current/Featured Match */}
              <motion.div variants={itemVariants}>
                <LiveMatchCard match={currentMatch} isLoading={false} />
              </motion.div>

              {/* Recent Matches */}
              <motion.div variants={itemVariants}>
                <Card className="rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                    Recent Matches
                  </h2>

                  <div className="space-y-4">
                    {mockAssignedMatches.map((match, idx) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground truncate">
                            {match.homeTeam} vs {match.awayTeam}
                          </p>
                          <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground truncate mt-0.5">
                            {match.venue}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          {match.status === "completed" && (
                            <div className="text-right">
                              <p className="text-xs sm:text-sm md:text-base font-bold text-foreground tabular-nums">
                                {match.homeScore}–{match.awayScore}
                              </p>
                            </div>
                          )}
                          <span
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${match.status === "live"
                              ? "bg-green-500/15 text-green-600 dark:text-green-400"
                              : match.status === "completed"
                                ? "bg-muted text-muted-foreground"
                                : "bg-accent/10 text-accent"
                              }`}
                          >
                            {match.status === "live"
                              ? "LIVE"
                              : match.status === "completed"
                                ? "FT"
                                : "SCHEDULED"}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 md:space-y-8"
            >
              <Card className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-border">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-2 sm:space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(ROUTES.AGENT.CALENDAR)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-primary/90 transition-colors flex items-center justify-between group"
                  >
                    <span>View Calendar</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(ROUTES.AGENT.SETTINGS)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-secondary text-foreground rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-secondary/80 transition-colors flex items-center justify-between group"
                  >
                    <span>Settings</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </Card>

              {/* Agent Info Card */}
              <Card className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-border bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">
                  Agent Info
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mb-0.5">
                        Agent Code
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground">
                        {mockAgentProfile.agentCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mb-0.5">
                        Status
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-success rounded-full" />
                        <p className="text-xs sm:text-sm font-semibold text-foreground capitalize">
                          {mockAgentProfile.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mb-0.5">
                        Member Since
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground">
                        {mockAgentProfile.joinDate.toLocaleDateString(
                          "en-NG"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
