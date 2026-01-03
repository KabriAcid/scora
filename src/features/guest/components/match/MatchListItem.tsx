import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface MatchListItemProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "live" | "finished" | "upcoming";
  homeLogo?: string;
  awayLogo?: string;
  time?: string;
  onClick?: () => void;
}

export const MatchListItem = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  homeLogo,
  awayLogo,
  time,
  onClick,
}: MatchListItemProps) => {
  return (
    <motion.div
      className="flex items-center justify-between p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
          {homeLogo ? (
            <img src={homeLogo} alt={homeTeam} className="w-6 h-6 object-contain" />
          ) : (
            <span className="text-xs font-bold">{homeTeam.substring(0, 2).toUpperCase()}</span>
          )}
        </div>
        <span className="font-medium text-sm">{homeTeam}</span>
      </div>

      <div className="flex items-center gap-3 mx-4">
        {status === "live" ? (
          <>
            <Badge variant="outline" className="bg-success/10 text-success border-success/30 px-3">
              {homeScore}
            </Badge>
            <Badge variant="outline" className="bg-success/10 text-success border-success/30 px-3">
              {awayScore}
            </Badge>
          </>
        ) : status === "upcoming" ? (
          <span className="text-xs font-semibold text-muted-foreground">{time || "TBD"}</span>
        ) : (
          <>
            <span className="font-bold text-lg">{homeScore}</span>
            <span className="font-bold text-lg text-muted-foreground">:</span>
            <span className="font-bold text-lg">{awayScore}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 flex-1 justify-end">
        <span className="font-medium text-sm text-right">{awayTeam}</span>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
          {awayLogo ? (
            <img src={awayLogo} alt={awayTeam} className="w-6 h-6 object-contain" />
          ) : (
            <span className="text-xs font-bold">{awayTeam.substring(0, 2).toUpperCase()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
