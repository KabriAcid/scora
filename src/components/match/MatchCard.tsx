import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "live" | "finished" | "upcoming";
  stadium?: string;
  week?: string;
  matchTime?: string; // e.g., "90+4" for live matches
  homeLogo?: string;
  awayLogo?: string;
  variant?: "dark" | "light";
  onClick?: () => void;
}

export const MatchCard = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  stadium,
  week,
  matchTime,
  homeLogo,
  awayLogo,
  variant = "dark",
  onClick,
}: MatchCardProps) => {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden cursor-pointer shadow-2xl hover:shadow-xl transition-all duration-300 rounded-2xl",
          isDark ? "bg-primary text-primary-foreground" : "bg-white text-gray-800"
        )}
        onClick={onClick}
      >
        <div className="py-5">
          {/* Stadium and Week */}
          <div className="text-center mb-5">
            {stadium && (
              <h3 className={cn(
                "font-semibold text-base mb-1",
                isDark ? "text-primary-foreground" : "text-gray-900"
              )}>
                {stadium}
              </h3>
            )}
            {week && (
              <p className={cn(
                "text-xs font-medium",
                isDark ? "text-primary-foreground/60" : "text-gray-500"
              )}>
                {week}
              </p>
            )}
          </div>

          {/* Match Content */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex flex-col items-center flex-1 gap-2">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center overflow-hidden",
                isDark ? "bg-white/10" : "bg-gray-100"
              )}>
                {homeLogo ? (
                  <img src={homeLogo} alt={homeTeam} className="w-12 h-12 object-contain" />
                ) : (
                  <span className={cn(
                    "font-bold text-lg",
                    isDark ? "text-primary-foreground" : "text-gray-700"
                  )}>
                    {homeTeam.substring(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-center">
                <p className={cn(
                  "font-semibold text-sm mb-0.5",
                  isDark ? "text-primary-foreground" : "text-gray-900"
                )}>
                  {homeTeam}
                </p>
                <p className={cn(
                  "text-xs",
                  isDark ? "text-primary-foreground/60" : "text-gray-500"
                )}>
                  Home
                </p>
              </div>
            </div>

            {/* Score and Status */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-3xl font-bold",
                  isDark ? "text-primary-foreground" : "text-gray-900"
                )}>
                  {homeScore}
                </span>
                <span className={cn(
                  "text-2xl font-medium",
                  isDark ? "text-primary-foreground/50" : "text-gray-400"
                )}>
                  :
                </span>
                <span className={cn(
                  "text-3xl font-bold",
                  isDark ? "text-primary-foreground" : "text-gray-900"
                )}>
                  {awayScore}
                </span>
              </div>

              {/* Live Match Time Badge */}
              {status === "live" && matchTime && (
                <Badge
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full",
                    isDark
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-success/10 text-success border border-success/20"
                  )}
                >
                  {matchTime}'
                </Badge>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center flex-1 gap-2">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center overflow-hidden",
                isDark ? "bg-white/10" : "bg-gray-100"
              )}>
                {awayLogo ? (
                  <img src={awayLogo} alt={awayTeam} className="w-12 h-12 object-contain" />
                ) : (
                  <span className={cn(
                    "font-bold text-lg",
                    isDark ? "text-primary-foreground" : "text-gray-700"
                  )}>
                    {awayTeam.substring(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-center">
                <p className={cn(
                  "font-semibold text-sm mb-0.5",
                  isDark ? "text-primary-foreground" : "text-gray-900"
                )}>
                  {awayTeam}
                </p>
                <p className={cn(
                  "text-xs",
                  isDark ? "text-primary-foreground/60" : "text-gray-500"
                )}>
                  Away
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
