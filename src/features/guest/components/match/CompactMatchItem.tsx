import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";

interface CompactMatchItemProps {
    homeTeam: string;
    awayTeam: string;
    homeLogo: string;
    awayLogo: string;
    homeScore?: number;
    awayScore?: number;
    status: "live" | "finished" | "upcoming";
    time?: string;
    matchTime?: string;
    homeRedCards?: number;
    awayRedCards?: number;
    onClick?: () => void;
}

export const CompactMatchItem = ({
    homeTeam,
    awayTeam,
    homeLogo,
    awayLogo,
    homeScore,
    awayScore,
    status,
    time,
    matchTime,
    homeRedCards = 0,
    awayRedCards = 0,
    onClick,
}: CompactMatchItemProps) => {
    const displayTime = status === "live" ? matchTime : time;

    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 py-3 px-4 bg-card hover:bg-card/80 rounded-lg transition-colors group"
        >
            {/* Time/Status Section */}
            <div className="flex flex-col items-center justify-center min-w-[50px] sm:min-w-[60px]">
                {status === "finished" ? (
                    <span className="text-xs font-semibold text-muted-foreground uppercase">
                        FT
                    </span>
                ) : status === "live" ? (
                    <>
                        <span className="text-xs font-bold text-green-500">{matchTime}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mt-1" />
                    </>
                ) : (
                    <span className="text-xs font-medium text-muted-foreground">{time}</span>
                )}
            </div>

            {/* Teams Section */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                {/* Home Team */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative flex-shrink-0">
                        <img
                            src={homeLogo}
                            alt={homeTeam}
                            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                        />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-foreground truncate">
                        {homeTeam}
                    </span>
                    {homeRedCards > 0 && (
                        <div className="flex gap-px flex-shrink-0">
                            {Array.from({ length: homeRedCards }).map((_, i) => (
                                <img key={i} src="/images/event-red-card.svg" alt="Red card" className="w-2 h-2.5" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Away Team */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative flex-shrink-0">
                        <img
                            src={awayLogo}
                            alt={awayTeam}
                            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                        />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-foreground truncate">
                        {awayTeam}
                    </span>
                    {awayRedCards > 0 && (
                        <div className="flex gap-px flex-shrink-0">
                            {Array.from({ length: awayRedCards }).map((_, i) => (
                                <img key={i} src="/images/event-red-card.svg" alt="Red card" className="w-2 h-2.5" />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Scores Section — shown for live and finished matches */}
            {(status === "finished" || status === "live") && (
                <div className="flex flex-col gap-2 min-w-[28px] items-end">
                    <span
                        className={cn(
                            "text-sm font-bold",
                            status === "live"
                                ? "text-green-500"
                                : homeScore !== undefined && awayScore !== undefined && homeScore > awayScore
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                        )}
                    >
                        {homeScore}
                    </span>
                    <span
                        className={cn(
                            "text-sm font-bold",
                            status === "live"
                                ? "text-green-500"
                                : homeScore !== undefined && awayScore !== undefined && awayScore > homeScore
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                        )}
                    >
                        {awayScore}
                    </span>
                </div>
            )}

            {/* Arrow Indicator */}
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all flex-shrink-0" />
        </motion.button>
    );
};
