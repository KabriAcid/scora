import { useState } from "react";
import { motion } from "framer-motion";
import { Repeat2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { matchDetailsData } from "@/data/matchDetails";
import { SubstitutionSelector } from "./SubstitutionSelector";
import type { Player } from "@/data/matchDetails";
import type { MatchEvent } from "@/shared/types/agent";

// ─── Position Sort Priority ───────────────────────────────────────────────────
// Lower number = appears first. Attackers first, GK last.
const POSITION_PRIORITY: Record<string, number> = {
  // Strikers / Forwards
  ST: 1,
  CF: 1,
  FW: 1,
  // Attacking / Wide
  LW: 2,
  RW: 2,
  SS: 2,
  CAM: 2,
  // Central Midfield
  CM: 3,
  MF: 3,
  AM: 3,
  // Defensive Midfield
  CDM: 4,
  DM: 4,
  // Fullbacks / Defenders
  RB: 5,
  LB: 5,
  CB: 5,
  RWB: 5,
  LWB: 5,
  DF: 5,
  // Goalkeeper
  GK: 6,
};

const getPositionPriority = (pos?: string): number =>
  pos ? (POSITION_PRIORITY[pos.toUpperCase()] ?? 3) : 3;

interface PlayerRosterQuickActionsProps {
  matchId: string;
  activeTeam: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  currentMinute: number;
  events: MatchEvent[];
  onEventLogged: (event: MatchEvent) => void;
  onSelectTeam: (team: string) => void;
}

const eventTypes = [
  { type: "goal", icon: "/images/event-goal.svg", label: "Goal" },
  {
    type: "yellow_card",
    icon: "/images/event-yellow-card.svg",
    label: "Yellow",
  },
  { type: "red_card", icon: "/images/event-red-card.svg", label: "Red" },
  { type: "penalty", icon: "/images/event-penalty.svg", label: "Penalty" },
  { type: "corner", icon: "/images/event-corner.svg", label: "Corner" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const playerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const PlayerRosterQuickActions = ({
  matchId,
  activeTeam,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  currentMinute,
  events,
  onEventLogged,
  onSelectTeam,
}: PlayerRosterQuickActionsProps) => {
  const [showSubSheet, setShowSubSheet] = useState(false);
  const [substitutedPlayers, setSubstitutedPlayers] = useState<{
    out: Set<string>;
    in: Set<string>;
  }>({ out: new Set(), in: new Set() });

  // Build per-player card counts from the logged events for the active team
  const cardCounts = events.reduce<
    Record<string, { yellow: number; red: number }>
  >((acc, e) => {
    if (e.team !== activeTeam) return acc;
    if (e.type === "yellow_card") {
      acc[e.player] = {
        ...(acc[e.player] ?? { yellow: 0, red: 0 }),
        yellow: (acc[e.player]?.yellow ?? 0) + 1,
      };
    } else if (e.type === "red_card") {
      acc[e.player] = {
        ...(acc[e.player] ?? { yellow: 0, red: 0 }),
        red: (acc[e.player]?.red ?? 0) + 1,
      };
    }
    return acc;
  }, {});
  // Extract numeric ID from matchId (e.g., "match-1" -> "1")
  const numericMatchId = matchId?.replace("match-", "") || "";
  const matchDetail = matchDetailsData[numericMatchId];

  // Debug: log if matchDetail is found
  if (!matchDetail) {
    return (
      <Card className="p-4 bg-card/50">
        <p className="text-sm text-muted-foreground">
          No match data found for ID: {matchId} (numeric: {numericMatchId})
        </p>
      </Card>
    );
  }

  const isHomeTeam = activeTeam === homeTeam;
  const teamLineup = isHomeTeam ? matchDetail.homeTeam : matchDetail.awayTeam;
  const teamLogo = isHomeTeam ? homeTeamLogo : awayTeamLogo;

  // Debug: check if team names match
  if (!isHomeTeam && activeTeam !== awayTeam) {
    return (
      <Card className="p-4 bg-card/50">
        <p className="text-sm text-muted-foreground">
          Team mismatch: activeTeam={activeTeam}, home={homeTeam}, away=
          {awayTeam}
        </p>
      </Card>
    );
  }

  // Sort lineup: attackers first, GK last
  const sortedLineup = [...teamLineup.lineup].sort(
    (a, b) => getPositionPriority(a.position) - getPositionPriority(b.position),
  );

  const handleQuickAction = (player: Player, eventType: string) => {
    const newEvent: MatchEvent = {
      id: `event-${Date.now()}`,
      type: eventType as MatchEvent["type"],
      player: player.name,
      team: activeTeam,
      minute: currentMinute,
      timestamp: new Date(),
    };

    onEventLogged(newEvent);

    // Show toast feedback with SVG icon
    const eventConfig = eventTypes.find((e) => e.type === eventType);
    const eventLabel = eventConfig?.label || eventType;
    const eventIcon = eventConfig?.icon || "/images/event-goal.svg";

    toast.success(
      <div className="flex items-center gap-2">
        <img src={eventIcon} alt={eventLabel} className="w-4 h-4" />
        <span>
          {eventLabel} - {player.name} ({activeTeam})
        </span>
      </div>,
      { duration: 2000 },
    );
  };

  const handleSubstitutionRecorded = (
    event: MatchEvent,
    playerIn: Player,
    playerOut: Player,
  ) => {
    onEventLogged(event);

    // Update substituted players tracking
    const newOutSet = new Set(substitutedPlayers.out);
    const newInSet = new Set(substitutedPlayers.in);
    newOutSet.add(playerOut.id);
    newInSet.add(playerIn.id);

    setSubstitutedPlayers({ out: newOutSet, in: newInSet });
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10">
      {/* Fixed Header with Team Tabs */}
      <div className="mb-4 flex gap-2 sticky top-0 z-20 bg-card -mx-4 px-4 py-2 -mt-4">
        {/* Home Team Tab */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectTeam(homeTeam)}
          className={`flex-1 p-2 rounded-lg border-2 transition-all ${
            activeTeam === homeTeam
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <img
            src={homeTeamLogo}
            alt={homeTeam}
            className="w-8 h-8 object-contain mx-auto mb-0.5"
          />
          <p className="text-xs font-semibold">{homeTeam}</p>
        </motion.button>

        {/* Away Team Tab */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectTeam(awayTeam)}
          className={`flex-1 p-2 rounded-lg border-2 transition-all ${
            activeTeam === awayTeam
              ? "border-accent bg-accent/10"
              : "border-border hover:border-accent/50"
          }`}
        >
          <img
            src={awayTeamLogo}
            alt={awayTeam}
            className="w-8 h-8 object-contain mx-auto mb-0.5"
          />
          <p className="text-xs font-semibold">{awayTeam}</p>
        </motion.button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <img
          src={teamLogo}
          alt={activeTeam}
          className="w-10 h-10 object-contain"
          onError={(e) => {
            console.error("Logo failed to load:", teamLogo);
            e.currentTarget.src = "/images/placeholder-logo.svg";
          }}
        />
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {activeTeam}
          </h3>
          <p className="text-xs text-muted-foreground">
            Formation: {teamLineup.formation}
          </p>
        </div>
      </div>

      {/* Scrollable player list */}
      <div className="overflow-y-auto max-h-[500px] pr-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              On Pitch
            </p>
            <motion.div className="space-y-2">
              {sortedLineup.map((player) => {
                const cards = cardCounts[player.name];
                const yellowCount = cards?.yellow ?? 0;
                const redCount = cards?.red ?? 0;
                const isDismissed = redCount > 0 || yellowCount >= 2;

                return (
                  <motion.div
                    key={player.id}
                    variants={playerVariants}
                    className={`p-3 rounded-lg transition-colors ${
                      isDismissed
                        ? "bg-destructive/10 border border-destructive/20"
                        : "bg-secondary/40 hover:bg-secondary/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          #{player.number} {player.name}
                          {player.position && (
                            <span className="text-xs text-muted-foreground ml-1">
                              ({player.position})
                            </span>
                          )}
                        </p>
                        {/* Card pip indicators */}
                        {(yellowCount > 0 || redCount > 0) && (
                          <div className="flex items-center gap-0.5 ml-1">
                            {Array.from({ length: yellowCount }).map((_, i) => (
                              <span
                                key={`y-${i}`}
                                className="inline-block w-2.5 h-3.5 rounded-[2px] bg-yellow-400 shadow-sm"
                                title="Yellow card"
                              />
                            ))}
                            {Array.from({ length: redCount }).map((_, i) => (
                              <span
                                key={`r-${i}`}
                                className="inline-block w-2.5 h-3.5 rounded-[2px] bg-red-500 shadow-sm"
                                title="Red card"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {eventTypes.map((event) => {
                        // Once a pip indicator is showing for that card type, the pip
                        // already acts as the icon — don't duplicate it inside the button.
                        const hideBtnIcon =
                          (event.type === "yellow_card" && yellowCount > 0) ||
                          (event.type === "red_card" && redCount > 0);

                        return (
                          <Button
                            key={event.type}
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleQuickAction(player, event.type)
                            }
                            className="text-xs h-8 px-2 gap-1 hover:bg-primary hover:text-primary-foreground"
                            title={event.label}
                          >
                            {!hideBtnIcon && (
                              <img
                                src={event.icon}
                                alt={event.label}
                                className="w-3 h-3"
                              />
                            )}
                            {event.label}
                          </Button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sticky footer — always visible, outside scroll */}
      <div className="pt-3 mt-2 border-t border-border/60">
        <Button
          variant="outline"
          className="w-full gap-2 text-xs font-semibold"
          onClick={() => setShowSubSheet(true)}
        >
          <Repeat2 className="w-4 h-4" />
          Make Substitution
          {substitutedPlayers.out.size > 0 && (
            <span className="ml-auto bg-primary/15 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {substitutedPlayers.out.size}
            </span>
          )}
        </Button>
      </div>

      {/* Substitution Sheet */}
      <Sheet open={showSubSheet} onOpenChange={setShowSubSheet}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md flex flex-col gap-0 p-0"
        >
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Repeat2 className="w-4 h-4 text-primary" />
              Make Substitution
            </SheetTitle>
            <SheetDescription className="text-xs">
              {activeTeam} · Minute {currentMinute}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-5 pt-4 pb-5">
            <SubstitutionSelector
              team={activeTeam}
              onPitch={sortedLineup.filter(
                (p) => !substitutedPlayers.out.has(p.id),
              )}
              offPitch={teamLineup.substitutes.filter(
                (p) => !substitutedPlayers.in.has(p.id),
              )}
              currentMinute={currentMinute}
              onSubstitutionRecorded={handleSubstitutionRecorded}
              onClose={() => setShowSubSheet(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
};
