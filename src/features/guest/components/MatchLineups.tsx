import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TeamLineup, Player } from "@/data/matchDetails";
import { cn } from "@/shared/utils/utils";

interface FormationVisualizationProps {
    homeFormation: string;
    awayFormation: string;
    homeLineup: Player[];
    awayLineup: Player[];
}

const FormationVisualization = ({
    homeFormation,
    awayFormation,
    homeLineup,
    awayLineup,
}: FormationVisualizationProps) => {
    // Get formation array (e.g., "4-2-3-1" => [4, 2, 3, 1])
    const getFormationLines = (formation: string, lineup: Player[]) => {
        const lines = formation.split("-").map(Number);
        const players = [...lineup].reverse(); // Start from GK

        const formationLines: Player[][] = [[players[0]]]; // GK first
        let playerIndex = 1;

        lines.forEach((count) => {
            formationLines.push(players.slice(playerIndex, playerIndex + count));
            playerIndex += count;
        });

        return formationLines;
    };

    const homeLines = getFormationLines(homeFormation, homeLineup);
    const awayLines = getFormationLines(awayFormation, awayLineup);

    return (
        <div className="relative w-full h-[280px] rounded-lg overflow-hidden" style={{
            background: "linear-gradient(to bottom, #1a5a3a 0%, #1a5a3a 50%, #2d4a5a 50%, #2d4a5a 100%)"
        }}>
            {/* Middle Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50" />

            {/* Home Team (Top) */}
            <div className="absolute top-2 left-0 right-0 flex flex-col gap-6">
                {homeLines.map((line, lineIndex) => (
                    <div key={`home-${lineIndex}`} className="flex justify-around px-4">
                        {line.map((player, playerIndex) => (
                            <motion.div
                                key={player.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: lineIndex * 0.1 + playerIndex * 0.05 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg">
                                    <span className="text-[10px] font-bold text-white">
                                        {player.number}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Away Team (Bottom) */}
            <div className="absolute bottom-2 left-0 right-0 flex flex-col-reverse gap-6">
                {awayLines.map((line, lineIndex) => (
                    <div key={`away-${lineIndex}`} className="flex justify-around px-4">
                        {line.map((player, playerIndex) => (
                            <motion.div
                                key={player.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: lineIndex * 0.1 + playerIndex * 0.05 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-lg">
                                    <span className="text-[10px] font-bold text-white">
                                        {player.number}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

interface MatchLineupsProps {
    homeTeam: TeamLineup;
    awayTeam: TeamLineup;
    homeTeamName: string;
    awayTeamName: string;
}

export const MatchLineups = ({
    homeTeam,
    awayTeam,
    homeTeamName,
    awayTeamName,
}: MatchLineupsProps) => {
    if (!homeTeam || !awayTeam) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <p>Lineup information not available</p>
            </div>
        );
    }

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Team Headers with Formations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{homeTeamName}</span>
                            <Badge variant="secondary" className="text-xs">
                                {homeTeam.formation}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                                {awayTeam.formation}
                            </Badge>
                            <span className="text-sm font-semibold">{awayTeamName}</span>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Formation Visualization */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <FormationVisualization
                    homeFormation={homeTeam.formation}
                    awayFormation={awayTeam.formation}
                    homeLineup={homeTeam.lineup}
                    awayLineup={awayTeam.lineup}
                />
            </motion.div>

            {/* Managers */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <h3 className="font-semibold mb-3 text-sm">Manager</h3>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{homeTeam.manager}</span>
                        <span className="text-sm font-medium">{awayTeam.manager}</span>
                    </div>
                </Card>
            </motion.div>

            {/* Lineups List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <h3 className="font-semibold mb-3 text-sm">Lineups</h3>
                <Card className="p-4">
                    <div className="grid grid-cols-2 gap-x-4">
                        {/* Home Team */}
                        <div className="space-y-2">
                            {homeTeam.lineup.map((player, index) => (
                                <motion.div
                                    key={player.id}
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.02 }}
                                >
                                    <span className="text-xs text-muted-foreground w-5">
                                        {player.number}
                                    </span>
                                    <span className="text-xs font-medium truncate">
                                        {player.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Away Team */}
                        <div className="space-y-2">
                            {awayTeam.lineup.map((player, index) => (
                                <motion.div
                                    key={player.id}
                                    className="flex items-center gap-2 justify-end"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.02 }}
                                >
                                    <span className="text-xs font-medium truncate text-right">
                                        {player.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground w-5 text-right">
                                        {player.number}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Substitutes */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <h3 className="font-semibold mb-3 text-sm">Substitutes</h3>
                <Card className="p-4">
                    <div className="grid grid-cols-2 gap-x-4">
                        {/* Home Team Subs */}
                        <div className="space-y-2">
                            {homeTeam.substitutes.map((player, index) => (
                                <motion.div
                                    key={player.id}
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.02 }}
                                >
                                    <span className="text-xs text-muted-foreground w-5">
                                        {player.number}
                                    </span>
                                    <span className="text-xs truncate">{player.name}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Away Team Subs */}
                        <div className="space-y-2">
                            {awayTeam.substitutes.map((player, index) => (
                                <motion.div
                                    key={player.id}
                                    className="flex items-center gap-2 justify-end"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.02 }}
                                >
                                    <span className="text-xs truncate text-right">{player.name}</span>
                                    <span className="text-xs text-muted-foreground w-5 text-right">
                                        {player.number}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};
