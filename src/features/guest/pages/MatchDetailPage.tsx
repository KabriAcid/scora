import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchDetailHeader } from "@/features/guest/components/MatchDetailHeader";
import { MatchCard } from "@/features/guest/components/match/MatchCard";
import { MatchLineups } from "@/features/guest/components/MatchLineups";
import { MatchSummary } from "@/features/guest/components/MatchSummary";
import { MatchH2H } from "@/features/guest/components/MatchH2H";
import { MatchStatsTab } from "@/features/guest/components/MatchStatsTab";
import { MatchStandingsTable } from "@/features/guest/components/MatchStandingsTable";
import { Navigation } from "@/components/common/Navigation";
import { getMatchById } from "@/data/matches";
import { getMatchDetails } from "@/data/matchDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const MatchDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const match = id ? getMatchById(id) : undefined;
  const matchDetails = id ? getMatchDetails(id) : undefined;

  // Loading state
  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-background pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Purple Gradient Background */}
        <div
          className="relative h-[30vh] min-h-[200px]"
          style={{ background: "var(--gradient-primary)" }}
        >
          <MatchDetailHeader league="Loading..." onBack={() => navigate(-1)} />
        </div>

        {/* White Match Card with Skeletons */}
        <div className="px-4 -mt-[20vh] relative z-10 mb-6">
          <Card className="bg-card rounded-xl shadow-lg p-6">
            <div className="text-center space-y-4">
              <Skeleton className="h-4 w-32 mx-auto bg-muted" />
              <Skeleton className="h-3 w-24 mx-auto bg-muted" />
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="w-16 h-16 rounded-full bg-muted" />
                  <Skeleton className="h-4 w-20 bg-muted" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 bg-muted" />
                  <Skeleton className="h-6 w-3 bg-muted" />
                  <Skeleton className="h-10 w-10 bg-muted" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="w-16 h-16 rounded-full bg-muted" />
                  <Skeleton className="h-4 w-20 bg-muted" />
                </div>
              </div>
            </div>
          </Card>

          {/* Real Tabs with Skeleton Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6"
          >
            <Tabs defaultValue="lineups" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger
                  value="stats"
                  className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  Stats
                </TabsTrigger>
                <TabsTrigger
                  value="summary"
                  className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="lineups"
                  className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  Lineups
                </TabsTrigger>
                <TabsTrigger
                  value="table"
                  className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  Table
                </TabsTrigger>
                <TabsTrigger
                  value="h2h"
                  className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  H2H
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lineups">
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full bg-muted" />
                  <Skeleton className="h-48 w-full bg-muted" />
                  <Skeleton className="h-32 w-full bg-muted" />
                </div>
              </TabsContent>

              <TabsContent value="stats">
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full bg-muted" />
                  <Skeleton className="h-24 w-full bg-muted" />
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div className="space-y-4">
                  <Skeleton className="h-40 w-full bg-muted" />
                </div>
              </TabsContent>

              <TabsContent value="table">
                <div className="space-y-4">
                  <Skeleton className="h-64 w-full bg-muted" />
                </div>
              </TabsContent>

              <TabsContent value="h2h">
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full bg-muted" />
                  <Skeleton className="h-32 w-full bg-muted" />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Error state - match not found
  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-xl font-semibold mb-2">Match Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The match you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")}>Go to Homepage</Button>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Purple Gradient Background - Takes 30% of viewport */}
      <div
        className="relative h-[30vh] min-h-[200px]"
        style={{ background: "var(--gradient-primary)" }}
      >
        <MatchDetailHeader
          league={matchDetails?.league || "Premier League"}
          onBack={() => navigate(-1)}
        />
      </div>

      {/* White Match Card - Overlaps Purple Background */}
      <div className="px-4 -mt-[20vh] relative z-10 mb-6">
        <MatchCard
          homeTeam={match.homeTeam.responsiveName}
          awayTeam={match.awayTeam.responsiveName}
          homeScore={match.homeScore}
          awayScore={match.awayScore}
          status={match.status}
          stadium={match.stadium}
          week={match.week}
          matchTime={match.matchTime}
          homeLogo={match.homeTeam.badgeUrl}
          awayLogo={match.awayTeam.badgeUrl}
          variant="light"
        />

        {/* Content Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6"
        >
          <Tabs defaultValue="lineups" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger
                value="stats"
                className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                Stats
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="lineups"
                className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                Lineups
              </TabsTrigger>
              <TabsTrigger
                value="table"
                className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                Table
              </TabsTrigger>
              <TabsTrigger
                value="h2h"
                className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                H2H
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <MatchStatsTab stats={matchDetails?.stats || []} />
            </TabsContent>

            <TabsContent value="summary">
              <MatchSummary events={matchDetails?.events || []} />
            </TabsContent>

            <TabsContent value="lineups">
              {matchDetails?.homeTeam && matchDetails?.awayTeam ? (
                <MatchLineups
                  homeTeam={matchDetails.homeTeam}
                  awayTeam={matchDetails.awayTeam}
                  homeTeamName={match.homeTeam.responsiveName}
                  awayTeamName={match.awayTeam.responsiveName}
                  homeTeamLogo={match.homeTeam.badgeUrl}
                  awayTeamLogo={match.awayTeam.badgeUrl}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Lineup information not available</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="table">
              {matchDetails?.standings ? (
                <MatchStandingsTable
                  homeTeamStanding={matchDetails.standings.homeTeamStanding}
                  awayTeamStanding={matchDetails.standings.awayTeamStanding}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Standings data not available</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="h2h">
              {matchDetails?.h2h ? (
                <MatchH2H
                  homeWins={matchDetails.h2h.homeWins}
                  draws={matchDetails.h2h.draws}
                  awayWins={matchDetails.h2h.awayWins}
                  previousMatches={matchDetails.h2h.previousMatches}
                  homeTeamName={match.homeTeam.responsiveName}
                  awayTeamName={match.awayTeam.responsiveName}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Head-to-head data not available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </motion.div>
  );
};

export default MatchDetail;
