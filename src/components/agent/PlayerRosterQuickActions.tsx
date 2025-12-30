import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EVENT_TYPES } from "@/shared/utils/eventIcons";
import { matchDetailsData } from "@/data/matchDetails";
import { SubstitutionSelector } from "./SubstitutionSelector";
import type { Player } from "@/data/matchDetails";
import type { MatchEvent } from "@/shared/types/agent";

interface PlayerRosterQuickActionsProps {
    matchId: string;
    activeTeam: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    currentMinute: number;
    onEventLogged: (event: MatchEvent) => void;
    onSelectTeam: (team: string) => void;
}

const eventTypes = [
    { type: "goal", icon: "/images/event-goal.svg", label: "Goal" },
    { type: "yellow_card", icon: "/images/event-yellow-card.svg", label: "Yellow" },
    { type: "red_card", icon: "/images/event-red-card.svg", label: "Red" },
];

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

export const PlayerRosterQuickActions = ({
    matchId,
    activeTeam,
    homeTeam,
    awayTeam,
    homeTeamLogo,
    awayTeamLogo,
    currentMinute,
    onEventLogged,
    onSelectTeam,
}: PlayerRosterQuickActionsProps) => {
    const [showSubstitutionSelector, setShowSubstitutionSelector] = useState(false);
    const [substitutedPlayers, setSubstitutedPlayers] = useState<{
        out: Set<string>;
        in: Set<string>;
    }>({ out: new Set(), in: new Set() });
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
    const teamLogo = isHomeTeam ? homeTeamLogo : awayTeamLogo;

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

        // Show toast feedback with SVG icon
        const eventConfig = eventTypes.find(e => e.type === eventType);
        const eventLabel = eventConfig?.label || eventType;
        const eventIcon = eventConfig?.icon || "/images/event-goal.svg";

        toast.success(
            <div className="flex items-center gap-2">
                <img src={eventIcon} alt={eventLabel} className="w-4 h-4" />
                <span>{eventLabel} - {player.name} ({activeTeam})</span>
            </div>,
            { duration: 2000 }
        );
    };

    const handleSubstitutionRecorded = (event: MatchEvent, playerIn: Player, playerOut: Player) => {
        onEventLogged(event);

        // Update substituted players tracking
        const newOutSet = new Set(substitutedPlayers.out);
        const newInSet = new Set(substitutedPlayers.in);
        newOutSet.add(playerOut.id);
        newInSet.add(playerIn.id);

        setSubstitutedPlayers({ out: newOutSet, in: newInSet });
    };

    return (
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10">
            {/* Fixed Header with Team Tabs */}
            <div className="mb-4 flex gap-2 sticky top-0 z-20 bg-card -mx-4 px-4 py-2 -mt-4">
                {/* Home Team Tab */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectTeam(homeTeam)}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${activeTeam === homeTeam
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                        }`}
                >
                    <img
                        src={homeTeamLogo}
                        alt={homeTeam}
                        className="w-4 h-4 object-contain mx-auto mb-0.5"
                    />
                    <p className="text-xs font-semibold">{homeTeam}</p>
                </motion.button>

                {/* Away Team Tab */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectTeam(awayTeam)}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${activeTeam === awayTeam
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                        }`}
                >
                    <img
                        src={awayTeamLogo}
                        alt={awayTeam}
                        className="w-4 h-4 object-contain mx-auto mb-0.5"
                    />
                    <p className="text-xs font-semibold">{awayTeam}</p>
                </motion.button>
            </div>

            <div className="mb-4 flex items-center gap-3">
                <img
                    src={teamLogo}
                    alt={activeTeam}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                        console.error("Logo failed to load:", teamLogo);
                        e.currentTarget.src = "/images/placeholder-logo.svg";
                    }}
                />
                <div>
                    <h3 className="text-sm font-semibold text-foreground">
                        {activeTeam}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Formation: {teamLineup.formation}
                    </p>
                </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-2">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                >
                    {/* Starting Lineup Only - On Pitch Players */}
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            On Pitch
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
                                                {player.position && (
                                                    <span className="text-xs text-muted-foreground ml-1">
                                                        ({player.position})
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {eventTypes.map((event) => (
                                            <Button
                                                key={event.type}
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    handleQuickAction(player, event.type)
                                                }
                                                className="text-xs h-8 px-2 gap-1 hover:bg-primary hover:text-primary-foreground"
                                                title={event.label}
                                            >
                                                <img
                                                    src={event.icon}
                                                    alt={event.label}
                                                    className="w-3 h-3"
                                                />
                                                {event.label}
                                            </Button>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Substitution Trigger Button */}
                    <div className="pt-2 border-t border-border">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowSubstitutionSelector(!showSubstitutionSelector)}
                            className="w-full text-xs h-8"
                        >
                            {showSubstitutionSelector ? "Hide Subs" : "Manage Subs"}
                        </Button>
                    </div>

                    {/* Substitution Selector Component */}
                    {showSubstitutionSelector && (
                        <div className="pt-2">
                            <SubstitutionSelector
                                team={activeTeam}
                                onPitch={teamLineup.lineup.filter(p => !substitutedPlayers.out.has(p.id))}
                                offPitch={teamLineup.substitutes.filter(p => !substitutedPlayers.in.has(p.id))}
                                currentMinute={currentMinute}
                                onSubstitutionRecorded={handleSubstitutionRecorded}
                                onClose={() => setShowSubstitutionSelector(false)}
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </Card>
    );
};
