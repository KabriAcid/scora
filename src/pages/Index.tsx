import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/MatchCard";
import { MatchListItem } from "@/components/MatchListItem";
import { Navigation } from "@/components/Navigation";
import { DateSelector } from "@/components/DateSelector";
import { MatchDetail } from "./MatchDetail";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDate, setSelectedDate] = useState(17);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const featuredMatch = {
    id: "1",
    homeTeam: "Chelsea",
    awayTeam: "Man Utd",
    homeScore: 1,
    awayScore: 1,
    status: "live" as const,
    league: "Premier League",
  };

  const liveMatches = [
    { id: "2", homeTeam: "N Forest", awayTeam: "Liverpool", homeScore: 0, awayScore: 3, status: "live" as const },
    { id: "3", homeTeam: "Man City", awayTeam: "Brighton", homeScore: 2, awayScore: 1, status: "live" as const },
    { id: "4", homeTeam: "Wolves", awayTeam: "Leicester", homeScore: 1, awayScore: 0, status: "live" as const },
  ];

  if (selectedMatch) {
    return <MatchDetail onBack={() => setSelectedMatch(null)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Liveuy</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Oct 11, 2022</span>
          </div>
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Featured Match */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Live Match</h2>
          </div>
          <MatchCard
            {...featuredMatch}
            onClick={() => setSelectedMatch(featuredMatch.id)}
          />
        </section>

        {/* Today's Matches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Today Match</h2>
            <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
              View All →
            </Button>
          </div>
          <div className="space-y-3">
            {liveMatches.map((match) => (
              <MatchListItem
                key={match.id}
                {...match}
                onClick={() => setSelectedMatch(match.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
