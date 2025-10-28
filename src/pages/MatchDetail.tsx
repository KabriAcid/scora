import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamLineup } from "@/components/TeamLineup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div 
        className="p-6 text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
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
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs defaultValue="lineups" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="lineups">Lineups</TabsTrigger>
            <TabsTrigger value="h2h">H2H</TabsTrigger>
          </TabsList>

          <TabsContent value="lineups" className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                Chelsea
              </h3>
              <TeamLineup players={homeLineup} color="blue" />
              <div className="mt-3 text-sm text-muted-foreground text-center">
                Formation: 4-4-2
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                Manchester United
              </h3>
              <TeamLineup players={awayLineup} color="red" />
              <div className="mt-3 text-sm text-muted-foreground text-center">
                Formation: 4-4-2
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">Match statistics will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="summary">
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">Match summary will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="h2h">
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">Head to head statistics will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
