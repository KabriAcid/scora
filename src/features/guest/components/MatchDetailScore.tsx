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
            className="text-center px-6 pb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            {/* Stadium and Week */}
            {stadium && (
                <p className="text-sm text-primary-foreground/80 font-medium mb-1">{stadium}</p>
            )}
            {week && (
                <p className="text-xs text-primary-foreground/60 mb-3">{week}</p>
            )}

            {/* Live Badge */}
            {status === "live" && matchTime && (
                <Badge className="bg-success/20 text-success border border-success/30 mb-4">
                    {matchTime}'
                </Badge>
            )}

            {/* Score */}
            <div className="flex items-center justify-center gap-6 mb-0">
                {/* Home Team */}
                <div className="flex flex-col items-center flex-1 max-w-[100px]">
                    <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center mb-2 shadow-lg overflow-hidden">
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
                    <span className="text-sm font-semibold text-primary-foreground">{homeTeam.responsiveName}</span>
                    <span className="text-xs text-primary-foreground/60">Home</span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-3 mx-2">
                    <span className="text-5xl font-bold text-primary-foreground">{homeScore}</span>
                    <span className="text-3xl text-primary-foreground/50">:</span>
                    <span className="text-5xl font-bold text-primary-foreground">{awayScore}</span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center flex-1 max-w-[100px]">
                    <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center mb-2 shadow-lg overflow-hidden">
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
                    <span className="text-sm font-semibold text-primary-foreground">{awayTeam.responsiveName}</span>
                    <span className="text-xs text-primary-foreground/60">Away</span>
                </div>
            </div>
        </motion.div>
    );
};
