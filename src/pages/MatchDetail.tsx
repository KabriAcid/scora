import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamLineup } from "@/components/TeamLineup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, Target, Activity } from "lucide-react";

interface MatchDetailProps {
  onBack: () => void;
}

export const MatchDetail = ({ onBack }: MatchDetailProps) => {
  const homeLineup = [
    { name: "Goalkeeper", number: 1, position: { x: 50, y: 85 } },
    { name: "Defender 1", number: 2, position: { x: 20, y: 65 } },
    { name: "Defender 2", number: 5, position: { x: 40, y: 70 } },
    { name: "Defender 3", number: 6, position: { x: 60, y: 70 } },
    { name: "Defender 4", number: 3, position: { x: 80, y: 65 } },
    { name: "Midfielder 1", number: 8, position: { x: 30, y: 45 } },
    { name: "Midfielder 2", number: 10, position: { x: 70, y: 45 } },
    { name: "Forward 1", number: 7, position: { x: 25, y: 25 } },
    { name: "Forward 2", number: 9, position: { x: 50, y: 20 } },
    { name: "Forward 3", number: 11, position: { x: 75, y: 25 } },
  ];

  const awayLineup = [
    { name: "Goalkeeper", number: 1, position: { x: 50, y: 15 } },
    { name: "Defender 1", number: 2, position: { x: 20, y: 35 } },
    { name: "Defender 2", number: 5, position: { x: 40, y: 30 } },
    { name: "Defender 3", number: 6, position: { x: 60, y: 30 } },
    { name: "Defender 4", number: 3, position: { x: 80, y: 35 } },
    { name: "Midfielder 1", number: 8, position: { x: 30, y: 55 } },
    { name: "Midfielder 2", number: 10, position: { x: 70, y: 55 } },
    { name: "Forward 1", number: 7, position: { x: 25, y: 75 } },
    { name: "Forward 2", number: 9, position: { x: 50, y: 80 } },
    { name: "Forward 3", number: 11, position: { x: 75, y: 75 } },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="p-6 text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Premier League</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-primary-foreground/70 mb-2">Stamford Bridge</p>
          <Badge className="bg-success text-success-foreground mb-4">LIVE</Badge>
        </div>

        {/* Score */}
        <div className="flex items-center justify-center gap-8 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-2 font-bold text-2xl text-foreground">
              CHE
            </div>
            <span className="text-sm font-medium">Chelsea</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-5xl font-bold">1</span>
            <span className="text-3xl text-primary-foreground/50">:</span>
            <span className="text-5xl font-bold">1</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-2 font-bold text-2xl text-foreground">
              MUN
            </div>
            <span className="text-sm font-medium">Man Utd</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Tabs defaultValue="lineups" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="lineups">Lineups</TabsTrigger>
            <TabsTrigger value="h2h">H2H</TabsTrigger>
          </TabsList>

          <TabsContent value="lineups" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                Chelsea
              </h3>
              <TeamLineup players={homeLineup} color="blue" />
              <div className="mt-3 text-sm text-muted-foreground text-center">
                Formation: 4-4-2
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                Manchester United
              </h3>
              <TeamLineup players={awayLineup} color="red" />
              <div className="mt-3 text-sm text-muted-foreground text-center">
                Formation: 4-4-2
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="stats">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stat Bar Component */}
              {[
                { label: "Possession", home: 58, away: 42 },
                { label: "Shots", home: 12, away: 8 },
                { label: "Shots on Target", home: 5, away: 3 },
                { label: "Corners", home: 7, away: 4 },
                { label: "Fouls", home: 11, away: 14 },
                { label: "Yellow Cards", home: 2, away: 3 },
                { label: "Passes", home: 432, away: 318 },
                { label: "Pass Accuracy", home: 85, away: 78 },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">{stat.home}{stat.label.includes("Accuracy") ? "%" : ""}</span>
                      <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
                      <span className="text-sm font-semibold">{stat.away}{stat.label.includes("Accuracy") ? "%" : ""}</span>
                    </div>
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-secondary">
                      <motion.div
                        className="bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
                      />
                      <motion.div
                        className="bg-red-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="summary">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Match Events */}
              {[
                { time: "12'", team: "home", type: "goal", player: "Mason Mount", description: "Assisted by Kai Havertz" },
                { time: "23'", team: "away", type: "yellow", player: "Bruno Fernandes", description: "Foul" },
                { time: "38'", team: "away", type: "goal", player: "Marcus Rashford", description: "Penalty kick" },
                { time: "45'", team: "home", type: "yellow", player: "Jorginho", description: "Tactical foul" },
                { time: "67'", team: "home", type: "substitution", player: "Christian Pulisic ↔ Hakim Ziyech", description: "" },
                { time: "72'", team: "away", type: "yellow", player: "Casemiro", description: "Unsporting behavior" },
                { time: "81'", team: "away", type: "substitution", player: "Anthony Martial ↔ Jadon Sancho", description: "" },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: event.team === "home" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className={`p-4 ${event.team === "home" ? "mr-8" : "ml-8"}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary shrink-0">
                        {event.type === "goal" && <Target className="w-5 h-5 text-success" />}
                        {event.type === "yellow" && <div className="w-4 h-5 bg-yellow-500 rounded-sm" />}
                        {event.type === "substitution" && <Activity className="w-5 h-5 text-accent" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{event.time}</Badge>
                          <span className="font-semibold text-sm">{event.player}</span>
                        </div>
                        {event.description && (
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="h2h">
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
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 text-center">Last 5 Meetings</h3>
                  <div className="flex justify-around items-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">2</div>
                      <div className="text-xs text-muted-foreground">Chelsea Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-muted-foreground mb-1">1</div>
                      <div className="text-xs text-muted-foreground">Draws</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-1">2</div>
                      <div className="text-xs text-muted-foreground">Man Utd Wins</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Previous Matches */}
              <div>
                <h3 className="font-semibold mb-3">Previous Results</h3>
                <div className="space-y-3">
                  {[
                    { date: "Mar 2024", home: "Man Utd", away: "Chelsea", homeScore: 2, awayScore: 1, competition: "Premier League" },
                    { date: "Nov 2023", home: "Chelsea", away: "Man Utd", homeScore: 3, awayScore: 1, competition: "Premier League" },
                    { date: "May 2023", home: "Man Utd", away: "Chelsea", homeScore: 1, awayScore: 1, competition: "FA Cup" },
                    { date: "Feb 2023", home: "Chelsea", away: "Man Utd", homeScore: 0, awayScore: 2, competition: "Premier League" },
                    { date: "Oct 2022", home: "Man Utd", away: "Chelsea", homeScore: 1, awayScore: 2, competition: "Premier League" },
                  ].map((match, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">{match.date}</span>
                          <Badge variant="secondary" className="text-xs">{match.competition}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm font-medium">{match.home}</span>
                          </div>
                          <div className="flex items-center gap-3 mx-4">
                            <span className={`font-bold ${match.homeScore > match.awayScore ? "text-foreground" : "text-muted-foreground"}`}>
                              {match.homeScore}
                            </span>
                            <span className="text-muted-foreground">-</span>
                            <span className={`font-bold ${match.awayScore > match.homeScore ? "text-foreground" : "text-muted-foreground"}`}>
                              {match.awayScore}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-1 justify-end">
                            <span className="text-sm font-medium">{match.away}</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};
