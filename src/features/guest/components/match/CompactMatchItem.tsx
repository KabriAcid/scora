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
          <span className="text-sm font-semibold text-foreground">{time}</span>
        )}
      </div>

      {/* Teams Section */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        {/* Home Team */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={homeLogo}
            alt={homeTeam}
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain flex-shrink-0"
          />
          <span className="text-sm sm:text-base font-medium text-foreground truncate">
            {homeTeam}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={awayLogo}
            alt={awayTeam}
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain flex-shrink-0"
          />
          <span className="text-sm sm:text-base font-medium text-foreground truncate">
            {awayTeam}
          </span>
        </div>
      </div>

      {/* Scores Section */}
      {status === "finished" && (
        <div className="flex flex-col gap-2 min-w-[32px] items-end">
          <span
            className={cn(
              "text-lg sm:text-xl font-bold",
              homeScore !== undefined && awayScore !== undefined && homeScore > awayScore
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {homeScore}
          </span>
          <span
            className={cn(
              "text-lg sm:text-xl font-bold",
              homeScore !== undefined && awayScore !== undefined && awayScore > homeScore
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
