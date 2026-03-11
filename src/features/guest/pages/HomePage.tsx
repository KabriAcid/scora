import { useState, useEffect } from "react";
import {
  Search,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompactMatchItem } from "@/features/guest/components/match/CompactMatchItem";
import { CompetitionHeader } from "@/features/guest/components/match/CompetitionHeader";
import { MatchCard } from "@/features/guest/components/match/MatchCard";
import { Navigation } from "@/components/common/Navigation";
import { DateSelector } from "@/features/guest/components/calendar/DateSelector";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/Logo";
import { getMatchesByCompetition, getLiveMatches } from "@/data/matches";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const [expandedCompetitions, setExpandedCompetitions] = useState<Set<string>>(
    new Set(),
  );
  const liveMatches = getLiveMatches();
  const [liveIndex, setLiveIndex] = useState(0);

  const goToPrev = () =>
    setLiveIndex((i) => (i - 1 + liveMatches.length) % liveMatches.length);
  const goToNext = () => setLiveIndex((i) => (i + 1) % liveMatches.length);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    if (info.offset.x < -50) goToNext();
    else if (info.offset.x > 50) goToPrev();
  };

  useEffect(() => {
    // Simulate loading matches
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  useEffect(() => {
    // Expand all competitions on initial load
    const matchesByComp = getMatchesByCompetition();
    const allCompIds = Array.from(matchesByComp.keys()).map((comp) => comp.id);
    setExpandedCompetitions(new Set(allCompIds));
  }, []);

  const handleDateChange = (date: Date) => {
    setLoading(true);
    setSelectedDate(date);
  };

  const toggleCompetition = (competitionId: string) => {
    setExpandedCompetitions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(competitionId)) {
        newSet.delete(competitionId);
      } else {
        newSet.add(competitionId);
      }
      return newSet;
    });
  };

  // Get matches grouped by competition
  const matchesByCompetition = getMatchesByCompetition();

  const handleMatchClick = (matchId: string) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="flex items-center justify-between p-4">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => navigate("/agent")}
              title="Agent Login"
            >
              <User className="w-5 h-5" />
            </Button>
            <button
              onClick={() => navigate("/admin/login")}
              title="Admin Portal"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="px-4 pb-4">
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      </motion.header>

      {/* Live Match Slider */}
      {liveMatches.length > 0 && (
        <div className="px-4 pt-4 pb-1">
          {/* Section label */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-green-500 animate-pulse" />
              <span className="text-sm font-bold text-foreground">
                Live Now
              </span>
              <span className="text-xs font-semibold bg-green-500/15 text-green-600 rounded-full px-2 py-0.5">
                {liveMatches.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={goToPrev}
                className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={goToNext}
                className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={liveIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              >
                <MatchCard
                  homeTeam={liveMatches[liveIndex].homeTeam.responsiveName}
                  awayTeam={liveMatches[liveIndex].awayTeam.responsiveName}
                  homeLogo={liveMatches[liveIndex].homeTeam.badgeUrl}
                  awayLogo={liveMatches[liveIndex].awayTeam.badgeUrl}
                  homeScore={liveMatches[liveIndex].homeScore}
                  awayScore={liveMatches[liveIndex].awayScore}
                  status="live"
                  stadium={liveMatches[liveIndex].stadium}
                  week={liveMatches[liveIndex].week}
                  matchTime={liveMatches[liveIndex].matchTime}
                  homeRedCards={liveMatches[liveIndex].homeRedCards}
                  awayRedCards={liveMatches[liveIndex].awayRedCards}
                  variant="dark"
                  onClick={() =>
                    navigate(`/match/${liveMatches[liveIndex].id}`)
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          {liveMatches.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {liveMatches.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLiveIndex(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === liveIndex
                      ? "w-5 h-1.5 bg-primary"
                      : "w-1.5 h-1.5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 space-y-4"
      >
        {loading ? (
          // Loading Skeletons
          <>
            {[1, 2].map((_, compIndex) => (
              <div key={`comp-skeleton-${compIndex}`} className="space-y-3">
                {/* Competition Header Skeleton */}
                <Card className="p-4 bg-card/50 border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-lg" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="w-5 h-5" />
                  </div>
                </Card>

                {/* Match Skeletons */}
                {[1, 2].map((_, matchIndex) => (
                  <motion.div
                    key={`match-skeleton-${compIndex}-${matchIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: matchIndex * 0.05 }}
                  >
                    <Card className="p-4 bg-card/50 border-border/50">
                      <div className="flex items-center gap-3">
                        {/* Time Skeleton */}
                        <Skeleton className="w-12 h-8" />

                        {/* Teams Skeleton */}
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

                        {/* Score Skeleton */}
                        <div className="space-y-2">
                          <Skeleton className="w-6 h-6" />
                          <Skeleton className="w-6 h-6" />
                        </div>

                        {/* Arrow Skeleton */}
                        <Skeleton className="w-5 h-5" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ))}
          </>
        ) : (
          // Competitions and Matches
          <>
            {Array.from(matchesByCompetition.entries()).map(
              ([competition, matches], compIndex) => (
                <motion.section
                  key={competition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: compIndex * 0.1 }}
                  className="space-y-3"
                >
                  {/* Competition Header */}
                  <CompetitionHeader
                    competition={competition}
                    isExpanded={expandedCompetitions.has(competition.id)}
                    onToggle={() => toggleCompetition(competition.id)}
                  />

                  {/* Matches List */}
                  <AnimatePresence>
                    {expandedCompetitions.has(competition.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {matches.map((match, matchIndex) => (
                          <motion.div
                            key={match.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: matchIndex * 0.05 }}
                          >
                            <CompactMatchItem
                              homeTeam={match.homeTeam.responsiveName}
                              awayTeam={match.awayTeam.responsiveName}
                              homeLogo={match.homeTeam.badgeUrl}
                              awayLogo={match.awayTeam.badgeUrl}
                              homeScore={match.homeScore}
                              awayScore={match.awayScore}
                              status={match.status}
                              time={match.time}
                              matchTime={match.matchTime}
                              homeRedCards={match.homeRedCards}
                              awayRedCards={match.awayRedCards}
                              onClick={() => handleMatchClick(match.id)}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.section>
              ),
            )}
          </>
        )}
      </motion.main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
