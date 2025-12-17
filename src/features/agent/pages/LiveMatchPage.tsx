import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AgentLayout from "@/components/layout/AgentLayout";
import LiveMatchHeader from "@/components/agent/LiveMatchHeader";
import MatchControlPanel from "@/components/agent/MatchControlPanel";
import MatchTimeline from "@/components/agent/MatchTimeline";
import EventTypeButtons from "@/components/agent/EventTypeButtons";
import TeamSelector from "@/components/agent/TeamSelector";
import EventLoggingForm from "@/components/agent/EventLoggingForm";
import { mockAssignedMatches } from "@/data/agentMockData";

interface MatchEvent {
    id: string;
    type: "goal" | "yellow_card" | "red_card" | "substitution" | "foul" | "corner" | "offside" | "injury";
    player: string;
    team: string;
    minute: number;
    description?: string;
    timestamp: Date;
}

const LiveMatchPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMatchActive, setIsMatchActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [events, setEvents] = useState<MatchEvent[]>([]);
    const [activeTeam, setActiveTeam] = useState<string | null>(null);
    const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

    const match = mockAssignedMatches.find(m => m.id === id);
    const [homeScore, setHomeScore] = useState(match?.homeScore || 0);
    const [awayScore, setAwayScore] = useState(match?.awayScore || 0);

    useEffect(() => {
        if (match && match.status === "live") {
            setIsMatchActive(true);
        }
    }, [match]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isMatchActive) {
            interval = setInterval(() => {
                setCurrentTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isMatchActive]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getCurrentMinute = () => Math.floor(currentTime / 60) + 1;

    const handleLogEvent = (data: {
        player: string;
        team: string;
        description?: string;
        type: string;
    }) => {
        const newEvent: MatchEvent = {
            id: `event-${Date.now()}`,
            type: data.type as MatchEvent['type'],
            player: data.player,
            team: data.team,
            minute: getCurrentMinute(),
            description: data.description,
            timestamp: new Date(),
        };

        setEvents(prev => [newEvent, ...prev]);

        // Update scores if goal
        if (data.type === "goal") {
            if (data.team === match?.homeTeam) {
                setHomeScore(prev => prev + 1);
            } else if (data.team === match?.awayTeam) {
                setAwayScore(prev => prev + 1);
            }
        }

        setSelectedEventType(null);
    };

    if (!match) {
        return (
            <AgentLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <Card className="p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Match Not Found</h2>
                        <Button onClick={() => navigate("/agent/dashboard")}>
                            Back to Dashboard
                        </Button>
                    </Card>
                </div>
            </AgentLayout>
        );
    }

    return (
        <AgentLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto space-y-6 md:space-y-8"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/agent/dashboard")}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                        <div className="flex items-center gap-4">
                            <Badge variant={isMatchActive ? "default" : "secondary"}>
                                {isMatchActive ? "LIVE" : "PAUSED"}
                            </Badge>
                            <div className="text-2xl font-mono font-bold">
                                {formatTime(currentTime)}
                            </div>
                        </div>
                    </div>

                    {/* Match Header */}
                    <LiveMatchHeader match={match} homeScore={homeScore} awayScore={awayScore} />

                    {/* Control Panel */}
                    <MatchControlPanel
                        isMatchActive={isMatchActive}
                        matchStatus={match.status}
                        formattedTime={formatTime(currentTime)}
                        onStart={() => setIsMatchActive(true)}
                        onPause={() => setIsMatchActive(false)}
                        onEnd={() => setIsMatchActive(false)}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Event Logging Panel */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Team Selector */}
                            <TeamSelector
                                homeTeam={match.homeTeam}
                                awayTeam={match.awayTeam}
                                activeTeam={activeTeam}
                                onSelectTeam={setActiveTeam}
                                homeTeamLogo={match.homeTeamLogo}
                                awayTeamLogo={match.awayTeamLogo}
                            />

                            {/* Event Type Buttons */}
                            <EventTypeButtons
                                onSelectEventType={setSelectedEventType}
                                activeEventType={selectedEventType}
                            />

                            {/* Event Logging Form - Hidden until event is selected */}
                            <AnimatePresence>
                                {selectedEventType && activeTeam && (
                                    <EventLoggingForm
                                        homeTeam={match.homeTeam}
                                        awayTeam={match.awayTeam}
                                        activeTeam={activeTeam}
                                        eventType={selectedEventType}
                                        currentMinute={getCurrentMinute()}
                                        onSubmit={handleLogEvent}
                                        onClose={() => setSelectedEventType(null)}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Match Timeline */}
                            <MatchTimeline events={events} />
                        </div>

                        {/* Stats & Info Panel */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-bold mb-4">Match Stats</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Score</span>
                                        <span className="font-bold">{homeScore} - {awayScore}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Events Logged</span>
                                        <span className="font-bold">{events.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Match Time</span>
                                        <span className="font-bold">{formatTime(currentTime)}</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <BarChart3 className="w-4 h-4" />
                                        Statistics
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AgentLayout>
    );
};

export default LiveMatchPage; 
