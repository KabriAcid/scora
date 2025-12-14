import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "live" | "finished" | "upcoming";
  league: string;
  homeLogo?: string;
  awayLogo?: string;
  onClick?: () => void;
}

export const MatchCard = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  league,
  homeLogo,
  awayLogo,
  onClick,
}: MatchCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="relative overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        style={{ 
          background: "var(--gradient-card)",
          boxShadow: "var(--shadow-card)"
        }}
        onClick={onClick}
      >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-primary-foreground/70 font-medium">{league}</span>
          {status === "live" && (
            <Badge className="bg-success text-success-foreground px-3 py-1 animate-pulse">
              LIVE
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center font-bold text-lg">
              {homeLogo || homeTeam.substring(0, 3).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-primary-foreground font-semibold">{homeTeam}</span>
              <span className="text-xs text-primary-foreground/60">Home</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mx-4">
            <span className="text-3xl font-bold text-primary-foreground">{homeScore}</span>
            <span className="text-2xl font-bold text-primary-foreground/50">:</span>
            <span className="text-3xl font-bold text-primary-foreground">{awayScore}</span>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="flex flex-col items-end">
              <span className="text-primary-foreground font-semibold">{awayTeam}</span>
              <span className="text-xs text-primary-foreground/60">Away</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center font-bold text-lg">
              {awayLogo || awayTeam.substring(0, 3).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </Card>
    </motion.div>
  );
};
