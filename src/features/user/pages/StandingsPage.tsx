import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { standingsData, TeamStanding } from "@/data/standings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navigation } from "@/components/common/Navigation";
import { cn } from "@/shared/utils/cn";

const FormBadge = ({
  result,
  index,
}: {
  result: "W" | "D" | "L";
  index: number;
}) => {
  const variants = {
    W: "bg-success text-success-foreground",
    D: "bg-muted text-muted-foreground",
    L: "bg-destructive text-destructive-foreground",
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 500 }}
      className={cn(
        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
        variants[result]
      )}
    >
      {result}
    </motion.div>
  );
};

const PositionIndicator = ({ position }: { position: number }) => {
  if (position <= 4) {
    return <div className="w-1 h-8 rounded-full bg-success absolute left-0" />;
  }
  if (position >= 18) {
    return (
      <div className="w-1 h-8 rounded-full bg-destructive absolute left-0" />
    );
  }
  return null;
};

const StandingsSkeleton = () => (
  <div className="space-y-1">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05 }}
        className="flex items-center gap-3 p-3 bg-card/50 rounded-xl"
      >
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <div className="flex-grow" />
        <Skeleton className="h-4 w-6" />
        <Skeleton className="h-4 w-6" />
        <Skeleton className="h-4 w-8" />
      </motion.div>
    ))}
  </div>
);

const StandingsPage = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("standings");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStandings(standingsData);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Premier League</h1>
                <p className="text-xs text-muted-foreground">2024/25 Season</p>
              </div>
            </div>
            <Select defaultValue="2024-2025">
              <SelectTrigger className="w-28 h-9 text-xs bg-card border-border/50">
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="2024-2025">2024/25</SelectItem>
                <SelectItem value="2023-2024">2023/24</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Champions League</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <span>Relegation</span>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="p-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <StandingsSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Column Headers */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-[28px_48px_24px_24px_24px_24px_32px_32px_32px_32px_56px] sm:grid-cols-[32px_1fr_28px_28px_28px_28px_36px_36px_36px_32px_64px] gap-1 px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
              >
                <span>#</span>
                <span>Team</span>
                <span className="text-center">P</span>
                <span className="text-center">W</span>
                <span className="text-center">D</span>
                <span className="text-center">L</span>
                <span className="text-center">GF</span>
                <span className="text-center">GA</span>
                <span className="text-center">GD</span>
                <span className="text-right">PTS</span>
                <span className="text-center">Form</span>
              </motion.div>

              {/* Standings List */}
              <div className="space-y-1">
                {standings.map((entry, index) => (
                  <motion.div
                    key={entry.position}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.03,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      backgroundColor: "hsl(var(--accent)/0.1)",
                    }}
                    className="relative grid grid-cols-[28px_48px_24px_24px_24px_24px_32px_32px_32px_32px_56px] sm:grid-cols-[32px_1fr_28px_28px_28px_28px_36px_36px_36px_32px_64px] gap-1 items-center p-3 bg-card/50 rounded-xl cursor-pointer transition-colors"
                  >
                    <PositionIndicator position={entry.position} />

                    {/* Position */}
                    <span
                      className={cn(
                        "text-xs font-bold pl-2",
                        entry.position <= 4 && "text-success",
                        entry.position >= 18 && "text-destructive"
                      )}
                    >
                      {entry.position}
                    </span>

                    {/* Team */}
                    <div className="flex items-center gap-2 min-w-0">
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        src={entry.team.badgeUrl}
                        alt={entry.team.shortName}
                        className="w-7 h-7 object-contain flex-shrink-0"
                      />
                      <span className="text-xs font-medium truncate hidden sm:inline">
                        {entry.team.responsiveName}
                      </span>
                    </div>

                    {/* P */}
                    <span className="text-xs text-center font-medium">
                      {entry.played}
                    </span>

                    {/* W */}
                    <span className="text-xs text-center text-success font-medium">
                      {entry.win}
                    </span>

                    {/* D */}
                    <span className="text-xs text-center text-muted-foreground font-medium">
                      {entry.draw}
                    </span>

                    {/* L */}
                    <span className="text-xs text-center text-destructive font-medium">
                      {entry.loss}
                    </span>

                    {/* GF (Goals For) */}
                    <span className="text-xs text-center font-medium text-success/80">
                      {entry.gf}
                    </span>

                    {/* GA (Goals Against) */}
                    <span className="text-xs text-center font-medium text-destructive/80">
                      {entry.ga}
                    </span>

                    {/* GD (Goal Difference) */}
                    <span
                      className={cn(
                        "text-xs text-center font-bold",
                        entry.gd > 0 && "text-success",
                        entry.gd < 0 && "text-destructive",
                        entry.gd === 0 && "text-muted-foreground"
                      )}
                    >
                      {entry.gd > 0 ? "+" : ""}
                      {entry.gd}
                    </span>

                    {/* Points */}
                    <div className="text-right">
                      <span className="text-sm font-bold text-primary">
                        {entry.points}
                      </span>
                    </div>

                    {/* Form */}
                    <div className="flex items-center gap-0.5 justify-center">
                      {entry.form.slice(-3).map((result, i) => (
                        <FormBadge key={i} result={result} index={i} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Card className="p-4 bg-card/50 border-border/50">
                  <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {standings[0]?.points}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Leader Points
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">
                        {standings[0]?.gf}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Top Goals
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {standings.reduce((acc, s) => acc + s.played, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total Matches
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default StandingsPage;
