import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Trophy, Award, AlertCircle, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/common/Navigation";
import { cn } from "@/shared/utils/cn";
import {
  getStatsByCategory,
  StatCategory,
  PlayerStat,
} from "@/data/playerStats";

// ─── filter config ────────────────────────────────────────────────────────────

const LEAGUES = [
  { id: "premier-league", label: "Premier League" },
  { id: "katsina-cup", label: "Katsina Cup" },
  { id: "northern-championship", label: "Northern Champ." },
];

const SEASONS = ["2024/25", "2023/24", "2022/23", "2021/22"];

interface StatTab {
  id: StatCategory | "all";
  label: string;
  icon?: React.ElementType;
}

const tabs: StatTab[] = [
  { id: "scorers", label: "Top Scorers", icon: Trophy },
  { id: "assists", label: "Assists", icon: Award },
  { id: "red", label: "Red Cards", icon: AlertCircle },
  { id: "yellow", label: "Yellow Cards", icon: AlertCircle },
  { id: "cleansheets", label: "Clean Sheets" },
];

// ─── skeleton ─────────────────────────────────────────────────────────────────

const StatItemSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-3 p-4 bg-card/50 rounded-xl"
  >
    <Skeleton className="h-4 w-5 rounded" />
    <Skeleton className="h-8 w-8 rounded-full" />
    <div className="flex-1 space-y-1.5">
      <Skeleton className="h-3.5 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
    <Skeleton className="h-5 w-8 rounded" />
  </motion.div>
);

// ─── stat item ────────────────────────────────────────────────────────────────

const StatItem = ({
  player,
  index,
  category,
}: {
  player: PlayerStat;
  index: number;
  category: StatCategory | "all";
}) => {
  const getStatColor = () => {
    if (category === "scorers" || category === "assists") return "text-primary";
    if (category === "red") return "text-destructive";
    if (category === "yellow") return "text-yellow-500";
    if (category === "cleansheets") return "text-primary";
    return "text-primary";
  };

  const isTop3 = index < 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ backgroundColor: "hsl(var(--secondary))" }}
      className="flex items-center gap-3 px-4 py-3 bg-card/50 rounded-xl cursor-pointer transition-colors"
    >
      {/* Position */}
      <span
        className="text-xs font-medium w-5 text-center flex-shrink-0 text-muted-foreground/50"
      >
        {index + 1}
      </span>

      {/* Team Badge */}
      <img
        src={player.teamBadge}
        alt={player.teamName}
        className="w-7 h-7 object-contain flex-shrink-0"
      />

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-semibold truncate", isTop3 ? "text-foreground" : "text-foreground/90")}>
          {player.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">{player.teamName}</p>
      </div>

      {/* Stat Value */}
      <span className={cn("text-sm font-bold tabular-nums flex-shrink-0", getStatColor())}>
        {player.value}
      </span>
    </motion.div>
  );
};

// ─── page ─────────────────────────────────────────────────────────────────────

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState<StatCategory | "all">("scorers");
  const [activeLeague, setActiveLeague] = useState(LEAGUES[0].id);
  const [activeSeason, setActiveSeason] = useState(SEASONS[0]);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [seasonOpen, setSeasonOpen] = useState(false);
  const leagueRef = useRef<HTMLDivElement>(null);
  const seasonRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (leagueRef.current && !leagueRef.current.contains(e.target as Node)) setLeagueOpen(false);
      if (seasonRef.current && !seasonRef.current.contains(e.target as Node)) setSeasonOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const [stats, setStats] = useState<PlayerStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [navTab, setNavTab] = useState("stats");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setStats(getStatsByCategory(activeTab as StatCategory));
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [activeTab, activeLeague, activeSeason]);

  const getCategoryTitle = () => tabs.find((t) => t.id === activeTab)?.label ?? "Top Scorers";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="px-4 pt-4 pb-3 space-y-3">
          {/* Title row */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Player Statistics</h1>
              <p className="text-xs text-muted-foreground">All Nigerian Leagues</p>
            </div>
          </div>

          {/* League + Season filters */}
          <div className="flex items-center gap-2">
            {/* League dropdown */}
            <div className="relative flex-1" ref={leagueRef}>
              <button
                onClick={() => { setLeagueOpen((o) => !o); setSeasonOpen(false); }}
                className="w-full flex items-center justify-between gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-card text-muted-foreground hover:bg-card/80 transition-colors"
              >
                <span className="truncate">{LEAGUES.find(l => l.id === activeLeague)?.label}</span>
                <motion.span animate={{ rotate: leagueOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
              </button>
              <AnimatePresence>
                {leagueOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-1 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden min-w-full"
                  >
                    {LEAGUES.map((league) => (
                      <button
                        key={league.id}
                        onClick={() => { setActiveLeague(league.id); setLeagueOpen(false); }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs font-medium transition-colors",
                          league.id === activeLeague
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        {league.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Season dropdown */}
            <div className="relative flex-shrink-0" ref={seasonRef}>
              <button
                onClick={() => { setSeasonOpen((o) => !o); setLeagueOpen(false); }}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-card text-muted-foreground hover:bg-card/80 transition-colors whitespace-nowrap"
              >
                {activeSeason}
                <motion.span animate={{ rotate: seasonOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
              </button>
              <AnimatePresence>
                {seasonOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden min-w-[100px]"
                  >
                    {SEASONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setActiveSeason(s); setSeasonOpen(false); }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs font-medium transition-colors",
                          s === activeSeason
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground shadow"
                    : "bg-card text-muted-foreground hover:bg-accent/20"
                )}
              >
                {tab.icon && <tab.icon className="w-3 h-3" />}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="p-4">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">{getCategoryTitle()}</h2>
          <p className="text-xs text-muted-foreground">{activeSeason} · {LEAGUES.find(l => l.id === activeLeague)?.label}</p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {[...Array(10)].map((_, i) => (
                <StatItemSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeTab + activeLeague + activeSeason}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {stats.map((player, index) => (
                <StatItem
                  key={player.id}
                  player={player}
                  index={index}
                  category={activeTab}
                />
              ))}

              {stats.length === 0 && (
                <Card className="p-8 text-center bg-card/50 border-border/50">
                  <p className="text-sm text-muted-foreground">No data available</p>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navigation activeTab={navTab} onTabChange={setNavTab} />
    </div>
  );
};

export default StatsPage;
