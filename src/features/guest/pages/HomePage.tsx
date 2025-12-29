import { useState, useEffect } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/match/MatchCard";
import { MatchListItem } from "@/components/match/MatchListItem";
import { Navigation } from "@/components/common/Navigation";
import { DateSelector } from "@/components/calendar/DateSelector";
import { HomeSkeleton } from "@/features/guest/components/HomeSkeleton";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/Logo";

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

  const featuredMatch = {
    id: "1",
    homeTeam: "Chelsea",
    awayTeam: "Man Utd",
    homeScore: 1,
    awayScore: 1,
    status: "live" as const,
    stadium: "Stamford Bridge",
    week: "Week 10",
    matchTime: "90+4",
    variant: "dark" as const,
  };

  const liveMatches = [
    {
      id: "2",
      homeTeam: "N Forest",
      awayTeam: "Liverpool",
      homeScore: 0,
      awayScore: 3,
      status: "live" as const,
    },
    {
      id: "3",
      homeTeam: "Man City",
      awayTeam: "Brighton",
      homeScore: 2,
      awayScore: 1,
      status: "live" as const,
    },
    {
      id: "4",
      homeTeam: "Wolves",
      awayTeam: "Leicester",
      homeScore: 1,
      awayScore: 0,
      status: "live" as const,
    },
  ];

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
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Menu className="w-5 h-5" />
          </Button>
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
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HomeSkeleton />
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 space-y-6"
          >
            {/* Featured Match */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm text-gray-800 font-semibold">
                  Live Matches
                </h2>
              </div>
              <MatchCard
                {...featuredMatch}
                onClick={() => handleMatchClick(featuredMatch.id)}
              />
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
                  className="text-primary hover:text-primary/80"
                >
                  View All →
                </Button>
              </div>
              <div className="space-y-3">
                {liveMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MatchListItem
                      {...match}
                      onClick={() => handleMatchClick(match.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
