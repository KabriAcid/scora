import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { matchDetailsData } from "@/data/matchDetails";
import type { Player } from "@/data/matchDetails";
import type { MatchEvent } from "@/shared/types/agent";

interface PlayerRosterQuickActionsProps {
    matchId: string;
    activeTeam: string;
    homeTeam: string;
    awayTeam: string;
    currentMinute: number;
    onEventLogged: (event: MatchEvent) => void;
}

const eventTypes = [
    { id: "goal", label: "⚽ Goal", color: "bg-success" },
    { id: "assist", label: "🤝 Assist", color: "bg-blue-500" },
    { id: "yellow_card", label: "🟨 Yellow", color: "bg-yellow-500" },
    { id: "red_card", label: "🔴 Red", color: "bg-destructive" },
];

export const PlayerRosterQuickActions = ({
    matchId,
    activeTeam,
    homeTeam,
    awayTeam,
    currentMinute,
    onEventLogged,
}: PlayerRosterQuickActionsProps) => {
    // Extract numeric ID from matchId (e.g., "match-1" -> "1")
    const numericMatchId = matchId?.replace("match-", "") || "";
    const matchDetail = matchDetailsData[numericMatchId];

    // Debug: log if matchDetail is found
    if (!matchDetail) {
        return (
            <Card className="p-4 bg-card/50">
                <p className="text-sm text-muted-foreground">
                    No match data found for ID: {matchId} (numeric: {numericMatchId})
                </p>
            </Card>
        );
    }

    const isHomeTeam = activeTeam === homeTeam;
    const teamLineup = isHomeTeam ? matchDetail.homeTeam : matchDetail.awayTeam;
    const allPlayers = [...teamLineup.lineup, ...teamLineup.substitutes];

    // Debug: check if team names match
    if (!isHomeTeam && activeTeam !== awayTeam) {
        return (
            <Card className="p-4 bg-card/50">
                <p className="text-sm text-muted-foreground">
                    Team mismatch: activeTeam={activeTeam}, home={homeTeam}, away={awayTeam}
                </p>
            </Card>
        );
    }

    const handleQuickAction = (player: Player, eventType: string) => {
        const newEvent: MatchEvent = {
            id: `event-${Date.now()}`,
            type: eventType as MatchEvent['type'],
            player: player.name,
            team: activeTeam,
            minute: currentMinute,
            timestamp: new Date(),
        };

        onEventLogged(newEvent);

        // Show toast feedback
        const eventLabel = eventTypes.find(e => e.id === eventType)?.label || eventType;
        toast.success(`✓ ${eventLabel} - ${player.name} (${activeTeam})`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const playerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                    {activeTeam}
                </h3>
                <p className="text-xs text-muted-foreground">
                    Formation: {teamLineup.formation} | {allPlayers.length} players
                </p>
            </div>

            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-2">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                >
                    {/* Starting Lineup */}
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Starting XI
                        </p>
                        <motion.div className="space-y-2">
                            {teamLineup.lineup.map((player) => (
                                <motion.div
                                    key={player.id}
                                    variants={playerVariants}
                                    className="p-3 bg-secondary/40 rounded-lg hover:bg-secondary/60 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-foreground">
                                                #{player.number} {player.name}
                                            </p>
                                            {player.position && (
                                                <p className="text-xs text-muted-foreground">
                                                    {player.position}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 flex-wrap">
                                        {eventTypes.map((event) => (
                                            <Button
                                                key={event.id}
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    handleQuickAction(player, event.id)
                                                }
                                                className={`text-xs h-8 px-2 border-0 ${event.color} text-white hover:opacity-90`}
                                            >
                                                {event.label}
                                            </Button>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Substitutes */}
                    {teamLineup.substitutes.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
                                Substitutes
                            </p>
                            <motion.div className="space-y-2">
                                {teamLineup.substitutes.map((player) => (
                                    <motion.div
                                        key={player.id}
                                        variants={playerVariants}
                                        className="p-3 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors opacity-75"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-foreground">
                                                    #{player.number} {player.name}
                                                </p>
                                                {player.position && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {player.position}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 flex-wrap">
                                            {eventTypes.map((event) => (
                                                <Button
                                                    key={event.id}
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleQuickAction(player, event.id)
                                                    }
                                                    className={`text-xs h-8 px-2 border-0 ${event.color} text-white hover:opacity-90`}
                                                >
                                                    {event.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
        </Card>
    );
};
