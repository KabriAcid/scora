import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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

interface LiveMatchCardProps {
  match: AssignedMatch;
  isLoading: boolean;
}

const LiveMatchCard = ({ match, isLoading }: LiveMatchCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (match.status === "scheduled") {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = match.startTime.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeRemaining("Starting soon...");
          clearInterval(interval);
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [match]);

  if (isLoading) {
    return (
      <Card className="rounded-2xl p-6 md:p-8 shadow-lg border border-border overflow-hidden">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex-1 text-center">
              <div className="h-12 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
            <div className="h-16 bg-gray-300 rounded"></div>
            <div className="flex-1 text-center">
              <div className="h-12 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-12 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-sm md:text-base lg:text-xl font-bold text-foreground">
          {match.status === "live" ? "🔴 Live Match" : "📅 Upcoming Match"}
        </h2>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            match.status === "live"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {match.status === "live" ? "LIVE" : "SCHEDULED"}
        </span>
      </div>

      <div className="space-y-4 md:space-y-5 lg:space-y-6">
        {/* Score Section */}
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <motion.div className="flex-1 text-center">
            <img
              src={match.homeTeamLogo}
              alt={match.homeTeam}
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain mx-auto mb-1.5 md:mb-2"
            />
            <div className="text-xs md:text-sm lg:text-base font-semibold text-foreground mb-1 leading-tight line-clamp-2">
              {match.homeTeam}
            </div>
            <div className="text-base md:text-xl lg:text-2xl font-bold text-primary">
              {match.homeScore ?? "-"}
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="text-xs md:text-sm lg:text-base text-muted-foreground font-semibold">
              VS
            </span>
          </div>

          <motion.div className="flex-1 text-center">
            <img
              src={match.awayTeamLogo}
              alt={match.awayTeam}
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain mx-auto mb-1.5 md:mb-2"
            />
            <div className="text-xs md:text-sm lg:text-base font-semibold text-foreground mb-1 leading-tight line-clamp-2">
              {match.awayTeam}
            </div>
            <div className="text-base md:text-xl lg:text-2xl font-bold text-primary">
              {match.awayScore ?? "-"}
            </div>
          </motion.div>
        </div>

        {/* Countdown for Scheduled Matches */}
        {match.status === "scheduled" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-2 md:py-3 lg:py-4"
          >
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-muted-foreground" />
              <span className="text-xs md:text-sm text-muted-foreground">
                Match starts in
              </span>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-xl md:text-3xl lg:text-4xl font-bold text-primary tracking-wider"
            >
              {timeRemaining}
            </motion.div>
          </motion.div>
        )}

        {/* Match Details */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 py-3 md:py-4 border-t border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">
              Venue
            </p>
            <p className="text-xs md:text-sm lg:text-base font-semibold text-foreground leading-snug">
              {match.venue}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">
              League
            </p>
            <p className="text-xs md:text-sm lg:text-base font-semibold text-foreground leading-snug">
              {match.league}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => navigate(`/agent/match/${match.id}`)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 text-xs md:text-sm lg:text-base py-2 md:py-2.5 lg:py-3"
          >
            {match.status === "live" ? (
              <>
                <Play className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                Log Event
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                Prepare for Match
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};

export default LiveMatchCard;
