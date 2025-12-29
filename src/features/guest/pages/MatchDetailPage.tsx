
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchDetailHeader } from "@/features/guest/components/MatchDetailHeader";
import { MatchDetailScore } from "@/features/guest/components/MatchDetailScore";
import { MatchLineups } from "@/features/guest/components/MatchLineups";
import { MatchSummary } from "@/features/guest/components/MatchSummary";
import { MatchH2H } from "@/features/guest/components/MatchH2H";
import { MatchStatsTab } from "@/features/guest/components/MatchStatsTab";
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
      <div className="min-h-screen bg-background">
        <div
          className="p-6 pb-8"
          style={{ background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
            <Skeleton className="h-5 w-32 bg-white/20" />
            <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
          </div>
          <div className="text-center space-y-3">
            <Skeleton className="h-4 w-32 mx-auto bg-white/20" />
            <Skeleton className="h-3 w-20 mx-auto bg-white/20" />
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-16 h-16 rounded-full bg-white/90" />
                <Skeleton className="h-4 w-16 bg-white/20" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 bg-white/20" />
                <Skeleton className="h-8 w-4 bg-white/20" />
                <Skeleton className="h-12 w-12 bg-white/20" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-16 h-16 rounded-full bg-white/90" />
                <Skeleton className="h-4 w-16 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
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
      className="min-h-screen bg-background pb-20"
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
      <div className="px-4 -mt-[20vh] relative z-10">
        <Card className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          <MatchDetailScore
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            status={match.status}
            stadium={match.stadium}
            week={match.week}
            matchTime={match.matchTime}
          />
        </Card>

        {/* Content Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs defaultValue="lineups" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-card">
              <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
              <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
              <TabsTrigger value="lineups" className="text-xs">Lineups</TabsTrigger>
              <TabsTrigger value="h2h" className="text-xs">H2H</TabsTrigger>
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
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Lineup information not available</p>
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
    </motion.div>
  );
};

export default MatchDetail;
