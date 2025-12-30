import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AgentLayout from "@/components/layout/AgentLayout";
import LiveMatchHeader from "@/components/agent/LiveMatchHeader";
import MatchControlPanel from "@/components/agent/MatchControlPanel";
import MatchTimeline from "@/components/agent/MatchTimeline";
import TeamSelector from "@/components/agent/TeamSelector";
import MatchStats from "@/components/agent/MatchStats";
import QuickActions from "@/components/agent/QuickActions";
import { PlayerRosterQuickActions } from "@/components/agent/PlayerRosterQuickActions";
import { LiveMatchPageSkeleton } from "@/components/agent/LiveMatchSkeleton";
import { mockAssignedMatches } from "@/data/agentMockData";
import type { MatchEvent, AssignedMatch } from "@/shared/types/agent";

const LiveMatchPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isMatchActive, setIsMatchActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [events, setEvents] = useState<MatchEvent[]>([]);
    const [activeTeam, setActiveTeam] = useState<string | null>(null);

    const match = useMemo(() => mockAssignedMatches.find(m => m.id === id), [id]);
    const [homeScore, setHomeScore] = useState(match?.homeScore || 0);
    const [awayScore, setAwayScore] = useState(match?.awayScore || 0);

    // Simulate initial page load
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [id]);

    // Set match as active if it's already live
    useEffect(() => {
        if (match && match.status === "live") {
            setIsMatchActive(true);
        }
    }, [match]);

    // Set home team as default active team
    useEffect(() => {
        if (match && !activeTeam) {
            setActiveTeam(match.homeTeam);
        }
    }, [match, activeTeam]);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isMatchActive && !isLoading) {
            interval = setInterval(() => {
                setCurrentTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isMatchActive, isLoading]);

    // Memoized formatTime to prevent unnecessary recalculations
    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    const getCurrentMinute = useCallback(() => Math.floor(currentTime / 60) + 1, [currentTime]);

    // Optimized event logging handler
    const handleLogEvent = useCallback((event: MatchEvent) => {
        setEvents(prev => [event, ...prev]);

        // Update scores if goal
        if (event.type === "goal") {
            if (event.team === match?.homeTeam) {
                setHomeScore(prev => prev + 1);
            } else if (event.team === match?.awayTeam) {
                setAwayScore(prev => prev + 1);
            }
        }
    }, [match]);

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
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/agent/dashboard")}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                        <div className="flex items-center gap-3 md:gap-4">
                            <Badge variant={isMatchActive ? "default" : "secondary"}>
                                {isMatchActive ? "LIVE" : "PAUSED"}
                            </Badge>
                            <div className="text-2xl md:text-3xl font-mono font-bold text-primary">
                                {formatTime(currentTime)}
                            </div>
                        </div>
                    </motion.div>

                    {/* Match Header */}
                    <motion.div variants={itemVariants}>
                        <LiveMatchHeader match={match} homeScore={homeScore} awayScore={awayScore} />
                    </motion.div>

                    {/* Control Panel */}
                    <motion.div variants={itemVariants}>
                        <MatchControlPanel
                            isMatchActive={isMatchActive}
                            matchStatus={match.status}
                            formattedTime={formatTime(currentTime)}
                            onStart={() => setIsMatchActive(true)}
                            onPause={() => setIsMatchActive(false)}
                            onEnd={() => setIsMatchActive(false)}
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Event Logging Panel */}
                        <div className="lg:col-span-2 space-y-6 md:space-y-8">
                            {/* Team Selector */}
                            <motion.div variants={itemVariants}>
                                <TeamSelector
                                    homeTeam={match.homeTeam}
                                    awayTeam={match.awayTeam}
                                    activeTeam={activeTeam}
                                    onSelectTeam={setActiveTeam}
                                    homeTeamLogo={match.homeTeamLogo}
                                    awayTeamLogo={match.awayTeamLogo}
                                />
                            </motion.div>

                            {/* Player Roster with Quick Actions */}
                            {activeTeam && (
                                <motion.div variants={itemVariants}>
                                    <PlayerRosterQuickActions
                                        matchId={id}
                                        activeTeam={activeTeam}
                                        homeTeam={match.homeTeam}
                                        awayTeam={match.awayTeam}
                                        currentMinute={getCurrentMinute()}
                                        onEventLogged={handleLogEvent}
                                    />
                                </motion.div>
                            )}

                            {/* Match Timeline */}
                            <motion.div variants={itemVariants}>
                                <MatchTimeline events={events} />
                            </motion.div>
                        </div>

                        {/* Stats & Info Panel */}
                        <div className="space-y-6 md:space-y-8">
                            <MatchStats
                                homeScore={homeScore}
                                awayScore={awayScore}
                                eventsCount={events.length}
                                matchTime={formatTime(currentTime)}
                            />

                            <QuickActions
                                onStatistics={() => toast.info("Statistics feature coming soon")}
                                onSettings={() => toast.info("Settings feature coming soon")}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </AgentLayout>
    );
};

export default LiveMatchPage; 
