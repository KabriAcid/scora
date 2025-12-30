import { useState, useEffect } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/match/MatchCard";
import { MatchListItem } from "@/components/match/MatchListItem";
import { Navigation } from "@/components/common/Navigation";
import { DateSelector } from "@/components/calendar/DateSelector";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/Logo";
import { getFeaturedMatch, getTodayMatches } from "@/data/matches";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading matches
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  const handleDateChange = (date: Date) => {
    setLoading(true);
    setSelectedDate(date);
  };

  // Get matches from API data
  const featuredMatch = getFeaturedMatch();
  const todayMatchesList = getTodayMatches();

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
          <Logo />
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Search className="w-5 h-5" />
            </Button>
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

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 space-y-6"
      >
        {/* Featured Match */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-gray-800 font-semibold">
              Live Matches
            </h2>
          </div>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="py-5 bg-card/50 border-border/50">
                  <div className="flex items-center justify-between px-4">
                    {/* Home Team Skeleton */}
                    <div className="flex flex-col items-center flex-1 gap-2">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-10" />
                    </div>

                    {/* Score Skeleton */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-6 w-3" />
                        <Skeleton className="h-9 w-9" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>

                    {/* Away Team Skeleton */}
                    <div className="flex flex-col items-center flex-1 gap-2">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <MatchCard
                homeTeam={featuredMatch.homeTeam.responsiveName}
                awayTeam={featuredMatch.awayTeam.responsiveName}
                homeScore={featuredMatch.homeScore}
                awayScore={featuredMatch.awayScore}
                status={featuredMatch.status}
                stadium={featuredMatch.stadium}
                week={featuredMatch.week}
                matchTime={featuredMatch.matchTime}
                homeLogo={featuredMatch.homeTeam.badgeUrl}
                awayLogo={featuredMatch.awayTeam.badgeUrl}
                variant="dark"
                onClick={() => handleMatchClick(featuredMatch.id)}
              />
            )}
          </AnimatePresence>
        </section>

        {/* Today's Matches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-gray-800 font-semibold">
              Today's Matches
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => navigate("/calendar")}
            >
              View All →
            </Button>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {loading ? (
                <>
                  {[1, 2, 3].map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-4 bg-card/50 border-border/50">
                        <div className="flex items-center justify-between">
                          {/* Home Team */}
                          <div className="flex items-center gap-3 flex-1">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                          </div>

                          {/* Score */}
                          <div className="flex items-center gap-2 mx-4">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-4 w-2" />
                            <Skeleton className="h-6 w-6" />
                          </div>

                          {/* Away Team */}
                          <div className="flex items-center gap-3 flex-1 justify-end">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="w-8 h-8 rounded-full" />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </>
              ) : (
                <>
                  {todayMatchesList.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <MatchListItem
                        homeTeam={match.homeTeam.responsiveName}
                        awayTeam={match.awayTeam.responsiveName}
                        homeScore={match.homeScore}
                        awayScore={match.awayScore}
                        status={match.status}
                        homeLogo={match.homeTeam.badgeUrl}
                        awayLogo={match.awayTeam.badgeUrl}
                        time={match.time || match.matchTime}
                        onClick={() => handleMatchClick(match.id)}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
