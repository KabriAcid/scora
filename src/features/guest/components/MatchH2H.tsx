import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { HeadToHead } from "@/data/matchDetails";
import { Trophy, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!previousMatches || previousMatches.length === 0) {
    return (
      <motion.div
        className="text-center py-12 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No head-to-head history available</p>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <Skeleton className="h-5 w-32 mx-auto mb-6" />
          <div className="flex justify-around items-center">
            <div className="text-center space-y-2">
              <Skeleton className="h-10 w-10 mx-auto" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="text-center space-y-2">
              <Skeleton className="h-10 w-10 mx-auto" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="text-center space-y-2">
              <Skeleton className="h-10 w-10 mx-auto" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </Card>
        <div className="space-y-3">
          <Skeleton className="h-5 w-32 mb-3" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const totalMatches = homeWins + draws + awayWins;
  const homeWinPercentage = ((homeWins / totalMatches) * 100).toFixed(0);
  const awayWinPercentage = ((awayWins / totalMatches) * 100).toFixed(0);

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
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <h3 className="font-bold mb-6 text-center text-sm flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            Last {totalMatches} Meetings
          </h3>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {homeWins}
              </div>
              <div className="text-xs font-medium text-muted-foreground mb-1">
                {homeTeamName}
              </div>
              <div className="text-xs text-primary font-semibold">
                {homeWinPercentage}%
              </div>
            </div>
            <div className="h-16 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-muted-foreground mb-2">
                {draws}
              </div>
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Draws
              </div>
              <div className="text-xs text-muted-foreground font-semibold">
                {((draws / totalMatches) * 100).toFixed(0)}%
              </div>
            </div>
            <div className="h-16 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                {awayWins}
              </div>
              <div className="text-xs font-medium text-muted-foreground mb-1">
                {awayTeamName}
              </div>
              <div className="text-xs text-accent font-semibold">
                {awayWinPercentage}%
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Previous Matches */}
      <div>
        <h3 className="font-semibold mb-4 text-sm text-center">
          Previous Results
        </h3>
        <div className="space-y-3">
          {previousMatches.map((match, index) => {
            const isHomeWin = match.homeScore > match.awayScore;
            const isAwayWin = match.awayScore > match.homeScore;
            const isDraw = match.homeScore === match.awayScore;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-4 shadow-xl border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(match.date)}
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {match.competition}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <span
                        className={`text-sm font-semibold truncate ${
                          isHomeWin
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {match.homeTeam}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mx-4 px-4 py-1.5 rounded-md bg-secondary/50">
                      <span
                        className={`font-bold text-base ${
                          isHomeWin
                            ? "text-primary"
                            : isDraw
                            ? "text-muted-foreground"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {match.homeScore}
                      </span>
                      <span className="text-muted-foreground text-sm font-medium">
                        -
                      </span>
                      <span
                        className={`font-bold text-base ${
                          isAwayWin
                            ? "text-accent"
                            : isDraw
                            ? "text-muted-foreground"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {match.awayScore}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span
                        className={`text-sm font-semibold truncate text-right ${
                          isAwayWin
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {match.awayTeam}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
