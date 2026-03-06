import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/common/Navigation";
import {
  calendarMatchesData,
  pastCalendarMatchesData,
  CalendarMatch,
} from "@/data/calendarMatches";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CompactMatchItem } from "@/features/guest/components/match/CompactMatchItem";

interface MatchGroup {
  date: string;
  matches: CalendarMatch[];
}

const CalendarMatchItemSkeleton = () => (
  <div className="flex items-center gap-3 py-3 px-4">
    <Skeleton className="w-12 h-8 rounded" />
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <Skeleton className="w-6 h-10" />
    <Skeleton className="w-5 h-5" />
  </div>
);

const CalendarPage = () => {
  const [matchweek, setMatchweek] = useState(10);
  const [loading, setLoading] = useState(true);
  const [matchGroups, setMatchGroups] = useState<MatchGroup[]>([]);
  const [currentDateRange, setCurrentDateRange] = useState(
    "Sat 2 Jan - Mon 4 Jan"
  );
  const [activeTab, setActiveTab] = useState("calendar");

  const loadMatches = (week: number) => {
    setLoading(true);
    setTimeout(() => {
      const data = week < 10 ? pastCalendarMatchesData : calendarMatchesData;
      if (week < 10) {
        setCurrentDateRange("Sat 26 Feb - Mon 28 Feb");
      } else {
        setCurrentDateRange("Sat 2 Jan - Mon 4 Jan");
      }

      const groupedMatches = data.reduce((acc, match) => {
        const date = match.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(match);
        return acc;
      }, {} as Record<string, CalendarMatch[]>);

      const groups: MatchGroup[] = Object.keys(groupedMatches).map((date) => ({
        date: date,
        matches: groupedMatches[date],
      }));
      setMatchGroups(groups);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    loadMatches(matchweek);
  }, [matchweek]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="p-4">
          {/* League Info */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold">Premier League</span>
          </div>

          {/* Matchweek Navigation */}
          <div className="flex items-center justify-between bg-card/50 rounded-2xl p-2">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMatchweek((w) => Math.max(1, w - 1))}
                className="rounded-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              key={matchweek}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-bold text-lg">Matchweek {matchweek}</h1>
              <p className="text-xs text-muted-foreground">
                {currentDateRange}
              </p>
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMatchweek((w) => Math.min(38, w + 1))}
                className="rounded-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>
                {matchGroups.reduce(
                  (acc, g) =>
                    acc +
                    g.matches.filter((m) => m.status === "finished").length,
                  0
                )}{" "}
                Completed
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>
                {matchGroups.reduce(
                  (acc, g) =>
                    acc +
                    g.matches.filter((m) => m.status === "scheduled").length,
                  0
                )}{" "}
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="p-4 space-y-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[1, 2].map((_, groupIndex) => (
                <div key={groupIndex}>
                  <Skeleton className="h-5 w-32 mb-2 ml-1" />
                  <Card className="bg-card/50 border-border/50 overflow-hidden">
                    {[1, 2, 3].map((_, i) => (
                      <CalendarMatchItemSkeleton key={i} />
                    ))}
                  </Card>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {matchGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  {/* Date Header */}
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-3 h-3 text-primary" />
                    </div>
                    <h2 className="font-bold text-sm text-foreground">
                      {group.date}
                    </h2>
                  </div>

                  {/* Matches Card */}
                  <Card className="bg-card/50 border-none overflow-hidden">
                    {group.matches.map((match, matchIndex) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: matchIndex * 0.05 }}
                      >
                        <CompactMatchItem
                          homeTeam={match.homeTeam.responsiveName}
                          awayTeam={match.awayTeam.responsiveName}
                          homeLogo={match.homeLogo}
                          awayLogo={match.awayLogo}
                          homeScore={match.homeScore}
                          awayScore={match.awayScore}
                          status={match.status === "scheduled" ? "upcoming" : match.status}
                          time={match.time}
                        />
                      </motion.div>
                    ))}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Spacer Info */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-muted-foreground pt-4"
          >
            <p>All times shown in your local timezone</p>
          </motion.div>
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default CalendarPage;
