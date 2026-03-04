import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AssignedMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  status: "scheduled" | "live" | "completed";
  startTime: Date;
  venue: string;
  league: string;
  homeScore?: number;
  awayScore?: number;
}

interface LiveMatchHeaderProps {
  match: AssignedMatch;
  homeScore: number;
  awayScore: number;
}

const LiveMatchHeader = ({
  match,
  homeScore,
  awayScore,
}: LiveMatchHeaderProps) => {
  return (
    <Card className="px-4 py-5 md:px-6 md:py-6 bg-gradient-to-r from-primary/5 to-accent/5 border-2">
      {/* Row 1 — logos + scoreline, all on the same axis */}
      <div className="flex items-center justify-between gap-2">
        {/* Home logo */}
        <div className="flex flex-1 justify-center">
          <img
            src={match.homeTeamLogo}
            alt={match.homeTeam}
            className="w-14 h-14 md:w-20 md:h-20 object-contain"
          />
        </div>

        {/* Scoreline */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={homeScore}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-3xl md:text-5xl font-bold tabular-nums"
            >
              {homeScore}
            </motion.span>
          </AnimatePresence>
          <span className="text-xl md:text-3xl font-light text-muted-foreground">
            -
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={awayScore}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-3xl md:text-5xl font-bold tabular-nums"
            >
              {awayScore}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Away logo */}
        <div className="flex flex-1 justify-center">
          <img
            src={match.awayTeamLogo}
            alt={match.awayTeam}
            className="w-14 h-14 md:w-20 md:h-20 object-contain"
          />
        </div>
      </div>

      {/* Row 2 — team names, pinned under their respective logos */}
      <div className="flex items-start justify-between gap-2 mt-2 md:mt-3">
        <h3 className="flex-1 text-center text-xs md:text-sm lg:text-base font-semibold leading-tight">
          {match.homeTeam}
        </h3>
        {/* spacer to match the score column width */}
        <div className="flex-shrink-0 w-[72px] md:w-[104px]" />
        <h3 className="flex-1 text-center text-xs md:text-sm lg:text-base font-semibold leading-tight">
          {match.awayTeam}
        </h3>
      </div>
    </Card>
  );
};

export default LiveMatchHeader;
