import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { PremierLeagueClub } from "@/data/clubs";
import { cn } from "@/shared/utils/utils";

interface MatchDetailScoreProps {
    homeTeam: PremierLeagueClub;
    awayTeam: PremierLeagueClub;
    homeScore: number;
    awayScore: number;
    status: "live" | "finished" | "upcoming";
    stadium?: string;
    week?: string;
    matchTime?: string;
}

export const MatchDetailScore = ({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    status,
    stadium,
    week,
    matchTime,
}: MatchDetailScoreProps) => {
    return (
        <motion.div
            className="text-center px-6 py-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            {/* Stadium and Week */}
            {stadium && (
                <p className="text-sm text-foreground font-semibold mb-1">{stadium}</p>
            )}
            {week && (
                <p className="text-xs text-muted-foreground mb-3">{week}</p>
            )}

            {/* Live Badge */}
            {status === "live" && matchTime && (
                <Badge className="bg-success/20 text-success border border-success/30 mb-4">
                    {matchTime}'
                </Badge>
            )}

            {/* Score */}
            <div className="flex items-center justify-center gap-6">
                {/* Home Team */}
                <div className="flex flex-col items-center flex-1 max-w-[100px]">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2 overflow-hidden">
                        {homeTeam.badgeUrl ? (
                            <img
                                src={homeTeam.badgeUrl}
                                alt={homeTeam.name}
                                className="w-12 h-12 object-contain"
                            />
                        ) : (
                            <span className="font-bold text-xl text-foreground">
                                {homeTeam.shortName}
                            </span>
                        )}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{homeTeam.responsiveName}</span>
                    <span className="text-xs text-muted-foreground">Home</span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-3 mx-2">
                    <span className="text-5xl font-bold text-foreground">{homeScore}</span>
                    <span className="text-3xl text-muted-foreground">:</span>
                    <span className="text-5xl font-bold text-foreground">{awayScore}</span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center flex-1 max-w-[100px]">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2 overflow-hidden">
                        {awayTeam.badgeUrl ? (
                            <img
                                src={awayTeam.badgeUrl}
                                alt={awayTeam.name}
                                className="w-12 h-12 object-contain"
                            />
                        ) : (
                            <span className="font-bold text-xl text-foreground">
                                {awayTeam.shortName}
                            </span>
                        )}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{awayTeam.responsiveName}</span>
                    <span className="text-xs text-muted-foreground">Away</span>
                </div>
            </div>
        </motion.div>
    );
};
