import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import AgentLayout from "@/components/layout/AgentLayout";
import LiveMatchHeader from "@/features/agent/components/LiveMatchHeader";
import MatchControlPanel, {
  type MatchPhase,
} from "@/features/agent/components/MatchControlPanel";
import { EventTimeline } from "@/features/agent/components/EventTimeline";
import { LiveMatchStats } from "@/features/agent/components/LiveMatchStats";
import { PlayerRosterQuickActions } from "@/features/agent/components/PlayerRosterQuickActions";
import { LiveMatchPageSkeleton } from "@/features/agent/components/LiveMatchSkeleton";
import { MatchPhotoCapture } from "@/features/agent/components/MatchPhotoCapture";
import { mockAssignedMatches } from "@/data/agentMockData";
import type { MatchEvent, AssignedMatch } from "@/shared/types/agent";

const LiveMatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matchPhase, setMatchPhase] = useState<MatchPhase>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const match = useMemo(
    () => mockAssignedMatches.find((m) => m.id === id),
    [id],
  );
  const [homeScore, setHomeScore] = useState(match?.homeScore || 0);
  const [awayScore, setAwayScore] = useState(match?.awayScore || 0);

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  // If match is already live, start in first half
  useEffect(() => {
    if (match && match.status === "live") {
      setMatchPhase("first_half");
    }
  }, [match]);

  // Set home team as default active team
  useEffect(() => {
    if (match && !activeTeam) {
      setActiveTeam(match.homeTeam);
    }
  }, [match, activeTeam]);

  // Timer runs during active halves only
  const isTimerRunning =
    matchPhase === "first_half" || matchPhase === "second_half";
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isLoading) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isLoading]);

  // Memoized formatTime to prevent unnecessary recalculations
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const getCurrentMinute = useCallback(
    () => Math.floor(currentTime / 60) + 1,
    [currentTime],
  );

  // Optimized event logging handler
  const handleLogEvent = useCallback(
    (event: MatchEvent) => {
      const half: "first" | "second" =
        matchPhase === "second_half" || matchPhase === "paused_2nd"
          ? "second"
          : "first";
      setEvents((prev) => [{ ...event, half }, ...prev]);

      // Update scores if goal
      if (event.type === "goal") {
        if (event.team === match?.homeTeam) {
          setHomeScore((prev) => prev + 1);
        } else if (event.team === match?.awayTeam) {
          setAwayScore((prev) => prev + 1);
        }
      }
    },
    [match, matchPhase],
  );

  // Remove event handler — reverses score if it was a goal
  // TODO: call DELETE /api/events/:id when backend is ready
  const handleRemoveEvent = useCallback(
    (eventId: string) => {
      setEvents((prev) => {
        const removed = prev.find((e) => e.id === eventId);
        if (removed?.type === "goal") {
          if (removed.team === match?.homeTeam) {
            setHomeScore((s) => Math.max(0, s - 1));
          } else if (removed.team === match?.awayTeam) {
            setAwayScore((s) => Math.max(0, s - 1));
          }
        }
        return prev.filter((e) => e.id !== eventId);
      });
    },
    [match],
  );

  if (!match) {
    return (
      <AgentLayout>
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Match Not Found
              </h2>
              <p className="text-muted-foreground mb-6">
                The match you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate("/agent/dashboard")}>
                Back to Dashboard
              </Button>
            </Card>
          </motion.div>
        </div>
      </AgentLayout>
    );
  }

  // Show skeleton loader during initial load
  if (isLoading) {
    return (
      <AgentLayout>
        <LiveMatchPageSkeleton />
      </AgentLayout>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <AgentLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6 md:space-y-8"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            {/* Exit button — triggers confirmation dialog */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowExitDialog(true)}
              className="text-muted-foreground hover:text-destructive"
              title="Exit match"
            >
              <LogOut className="w-5 h-5" />
            </Button>

            {/* Exit confirmation dialog */}
            <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Exit live match?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are currently{" "}
                    {matchPhase === "idle"
                      ? "setting up the match"
                      : matchPhase === "full_time"
                        ? "reviewing the completed match"
                        : "logging a live match"}
                    .
                    {matchPhase !== "idle" && matchPhase !== "full_time" && (
                      <>
                        {" "}
                        Any unsaved progress may be lost. Make sure all events
                        have been logged before exiting.
                      </>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => navigate("/agent/dashboard")}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Exit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex items-center gap-3 md:gap-4">
              <Badge
                variant={
                  matchPhase === "first_half" || matchPhase === "second_half"
                    ? "default"
                    : matchPhase === "full_time"
                      ? "destructive"
                      : "secondary"
                }
              >
                {
                  {
                    idle: "NOT STARTED",
                    first_half: "1ST HALF",
                    paused_1st: "PAUSED",
                    half_time: "HALF TIME",
                    second_half: "2ND HALF",
                    paused_2nd: "PAUSED",
                    full_time: "FULL TIME",
                  }[matchPhase]
                }
              </Badge>
              <div className="text-2xl md:text-3xl font-mono font-bold text-primary">
                {formatTime(currentTime)}
              </div>
            </div>
          </motion.div>

          {/* Control Panel */}
          <motion.div variants={itemVariants}>
            <MatchControlPanel
              matchPhase={matchPhase}
              onKickOff={() => setMatchPhase("first_half")}
              onPause={() =>
                setMatchPhase((p) =>
                  p === "first_half" ? "paused_1st" : "paused_2nd",
                )
              }
              onResume={() =>
                setMatchPhase((p) =>
                  p === "paused_1st" ? "first_half" : "second_half",
                )
              }
              onHalfTime={() => setMatchPhase("half_time")}
              onSecondHalf={() => setMatchPhase("second_half")}
              onFullTime={() => setMatchPhase("full_time")}
            />
          </motion.div>

          {/* Match Header */}
          <motion.div variants={itemVariants}>
            <LiveMatchHeader
              match={match}
              homeScore={homeScore}
              awayScore={awayScore}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 md:gap-8">
            {/* 1 — Player Roster with Quick Actions (lg: col 1 row 1) */}
            {matchPhase !== "idle" &&
              matchPhase !== "half_time" &&
              matchPhase !== "full_time" &&
              activeTeam ? (
              <motion.div
                variants={itemVariants}
                className="lg:col-start-1 lg:row-start-1"
              >
                <PlayerRosterQuickActions
                  matchId={id}
                  activeTeam={activeTeam}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  homeTeamLogo={match.homeTeamLogo}
                  awayTeamLogo={match.awayTeamLogo}
                  currentMinute={getCurrentMinute()}
                  events={events}
                  onEventLogged={handleLogEvent}
                  onSelectTeam={setActiveTeam}
                />
              </motion.div>
            ) : matchPhase === "full_time" ? (
              <motion.div
                variants={itemVariants}
                className="lg:col-start-1 lg:row-start-1"
              >
                <Card className="p-5 border border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Match Complete
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Final score&nbsp;·&nbsp;
                        <span className="font-medium text-foreground">
                          {match.homeTeam} {homeScore} – {awayScore}{" "}
                          {match.awayTeam}
                        </span>
                        &nbsp;·&nbsp;{events.length} event
                        {events.length !== 1 ? "s" : ""} logged
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="lg:col-start-1 lg:row-start-1"
              >
                <Card className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {matchPhase === "idle"
                      ? "Kick off to begin logging events"
                      : matchPhase === "half_time"
                        ? "Half time — waiting for 2nd half"
                        : "Select a team to log events"}
                  </p>
                </Card>
              </motion.div>
            )}

            {/* 2 — Match Stats (lg: col 2, rows 1–2, sticky) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-4"
            >
              <LiveMatchStats
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                matchPhase={matchPhase}
                events={events}
              />
            </motion.div>

            {/* 3 — Photo Capture + Event Timeline (lg: col 1, row 2) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-start-1 lg:row-start-2 space-y-4"
            >
              {/* Photo capture — available from pre-match (idle) through full time */}
              <MatchPhotoCapture matchId={id} />
              <EventTimeline
                events={events}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                onRemoveEvent={handleRemoveEvent}
                readOnly={matchPhase === "full_time"}
                matchPhase={matchPhase}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AgentLayout>
  );
};

export default LiveMatchPage;
