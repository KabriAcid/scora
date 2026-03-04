import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MatchPhase } from "./MatchControlPanel";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatKey =
  | "shots"
  | "shotsOnTarget"
  | "corners"
  | "fouls"
  | "offsides"
  | "passes";

export interface TeamStats {
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  offsides: number;
  passes: number;
}

export interface LiveStatsState {
  home: TeamStats;
  away: TeamStats;
  possession: { home: number; away: number };
}

const defaultTeamStats = (): TeamStats => ({
  shots: 0,
  shotsOnTarget: 0,
  corners: 0,
  fouls: 0,
  offsides: 0,
  passes: 0,
});

const STAT_CONFIG: { key: StatKey; label: string }[] = [
  { key: "shots",         label: "Shots"           },
  { key: "shotsOnTarget", label: "Shots on Target"  },
  { key: "corners",       label: "Corners"          },
  { key: "fouls",         label: "Fouls"            },
  { key: "offsides",      label: "Offsides"         },
  { key: "passes",        label: "Passes"           },
];

// ─── Stat Row ─────────────────────────────────────────────────────────────────

interface StatRowProps {
  label: string;
  homeVal: number;
  awayVal: number;
  onAdjust: (team: "home" | "away", delta: 1 | -1) => void;
  isActive: boolean;
}

const StatRow = ({
  label,
  homeVal,
  awayVal,
  onAdjust,
  isActive,
}: StatRowProps) => {
  const total = homeVal + awayVal || 1;
  const homePct = Math.round((homeVal / total) * 100);
  const awayPct = 100 - homePct;

  return (
    <div className="space-y-2">
      {/* Values + Buttons row */}
      <div className="flex items-center gap-1">
        {/* Home: value | – | + */}
        <div className="flex items-center gap-1 flex-1 justify-end">
          <span className="text-sm font-bold w-5 text-right tabular-nums text-foreground">
            {homeVal}
          </span>
          <div className="flex gap-0.5">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onAdjust("home", -1)}
              disabled={!isActive || homeVal === 0}
              className="h-5 w-5 rounded-sm text-muted-foreground hover:text-destructive disabled:opacity-30"
            >
              <Minus className="w-2.5 h-2.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onAdjust("home", 1)}
              disabled={!isActive}
              className="h-5 w-5 rounded-sm text-muted-foreground hover:text-primary disabled:opacity-30"
            >
              <Plus className="w-2.5 h-2.5" />
            </Button>
          </div>
        </div>

        {/* Stat label */}
        <span className="w-28 flex-shrink-0 text-center text-[11px] text-muted-foreground font-medium leading-tight">
          {label}
        </span>

        {/* Away: + | – | value */}
        <div className="flex items-center gap-1 flex-1 justify-start">
          <div className="flex gap-0.5">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onAdjust("away", 1)}
              disabled={!isActive}
              className="h-5 w-5 rounded-sm text-muted-foreground hover:text-accent disabled:opacity-30"
            >
              <Plus className="w-2.5 h-2.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onAdjust("away", -1)}
              disabled={!isActive || awayVal === 0}
              className="h-5 w-5 rounded-sm text-muted-foreground hover:text-destructive disabled:opacity-30"
            >
              <Minus className="w-2.5 h-2.5" />
            </Button>
          </div>
          <span className="text-sm font-bold w-5 tabular-nums text-foreground">
            {awayVal}
          </span>
        </div>
      </div>

      {/* Comparison bar — absolute bars grow inward from each side */}
      <div className="relative h-1.5 rounded-full overflow-hidden bg-muted">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary rounded-full"
          animate={{ width: `${homePct}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 bg-accent rounded-full"
          animate={{ width: `${awayPct}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface LiveMatchStatsProps {
  homeTeam: string;
  awayTeam: string;
  matchPhase: MatchPhase;
}

export const LiveMatchStats = ({
  homeTeam,
  awayTeam,
  matchPhase,
}: LiveMatchStatsProps) => {
  const isActive = matchPhase === "first_half" || matchPhase === "second_half";

  const [stats, setStats] = useState<LiveStatsState>({
    home: defaultTeamStats(),
    away: defaultTeamStats(),
    possession: { home: 50, away: 50 },
  });

  // adjust — updates stat count and recomputes possession inline from pass totals
  const adjust = useCallback(
    (team: "home" | "away", stat: StatKey, delta: 1 | -1) => {
      setStats((prev) => {
        const updatedTeam = {
          ...prev[team],
          [stat]: Math.max(0, prev[team][stat] + delta),
        };
        const next = { ...prev, [team]: updatedTeam };

        // Recompute possession from cumulative pass counts on every change
        const totalPasses = next.home.passes + next.away.passes;
        const homePoss =
          totalPasses === 0
            ? 50
            : Math.min(
                95,
                Math.max(5, Math.round((next.home.passes / totalPasses) * 100)),
              );
        return {
          ...next,
          possession: { home: homePoss, away: 100 - homePoss },
        };
      });
    },
    [],
  );

  return (
    <Card className="p-4 md:p-5 bg-card/50 border-none shadow-xl">
      {/* Team name header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold text-primary uppercase tracking-wide truncate max-w-[80px]">
          {homeTeam}
        </span>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-muted-foreground" />
          <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Match Stats
          </h2>
        </div>
        <span className="text-[11px] font-bold text-accent uppercase tracking-wide truncate max-w-[80px] text-right">
          {awayTeam}
        </span>
      </div>

      {/* Possession */}
      <div className="mb-4 pb-4 border-b border-border/40">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-primary tabular-nums">
            {stats.possession.home}%
          </span>
          <span className="text-muted-foreground text-[11px] font-medium">
            Possession
          </span>
          <span className="font-bold text-accent tabular-nums">
            {stats.possession.away}%
          </span>
        </div>
        <div className="relative h-2 rounded-full overflow-hidden bg-muted">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
            animate={{ width: `${stats.possession.home}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-accent rounded-full"
            animate={{ width: `${stats.possession.away}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground/60 text-center mt-1">
          Based on pass count · updates in real time
        </p>
      </div>

      {/* Stat rows */}
      <div className="space-y-3.5">
        {STAT_CONFIG.map(({ key, label }) => (
          <StatRow
            key={key}
            label={label}
            homeVal={stats.home[key]}
            awayVal={stats.away[key]}
            onAdjust={(team, delta) => adjust(team, key, delta)}
            isActive={isActive}
          />
        ))}
      </div>

      {!isActive && (
        <p className="text-[10px] text-muted-foreground/50 text-center mt-4">
          Stats logging enabled during active halves
        </p>
      )}
    </Card>
  );
};
