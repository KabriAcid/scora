import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { HeadToHead } from "@/data/matchDetails";
import { Trophy } from "lucide-react";

interface MatchH2HProps {
    homeWins: number;
    draws: number;
    awayWins: number;
    previousMatches: HeadToHead[];
    homeTeamName: string;
    awayTeamName: string;
}

export const MatchH2H = ({
    homeWins,
    draws,
    awayWins,
    previousMatches,
    homeTeamName,
    awayTeamName,
}: MatchH2HProps) => {
    if (!previousMatches || previousMatches.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No head-to-head history available</p>
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
            {/* Overall Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="p-6">
                    <h3 className="font-semibold mb-4 text-center text-sm">
                        Last {previousMatches.length} Meetings
                    </h3>
                    <div className="flex justify-around items-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-1">
                                {homeWins}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {homeTeamName}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-muted-foreground mb-1">
                                {draws}
                            </div>
                            <div className="text-xs text-muted-foreground">Draws</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600 mb-1">
                                {awayWins}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {awayTeamName}
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Previous Matches */}
            <div>
                <h3 className="font-semibold mb-3 text-sm">Previous Results</h3>
                <div className="space-y-3">
                    {previousMatches.map((match, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-muted-foreground">
                                        {match.date}
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                        {match.competition}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 flex-1">
                                        <span className="text-sm font-medium truncate">
                                            {match.homeTeam}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mx-4">
                                        <span
                                            className={`font-bold text-sm ${match.homeScore > match.awayScore
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            {match.homeScore}
                                        </span>
                                        <span className="text-muted-foreground text-sm">-</span>
                                        <span
                                            className={`font-bold text-sm ${match.awayScore > match.homeScore
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            {match.awayScore}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-1 justify-end">
                                        <span className="text-sm font-medium truncate text-right">
                                            {match.awayTeam}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
