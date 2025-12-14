import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Trophy, Award, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/common/Navigation";
import { cn } from "@/shared/utils/cn";
import {
  getStatsByCategory,
  StatCategory,
  PlayerStat,
} from "@/data/playerStats";

interface StatTab {
  id: StatCategory | "all";
  label: string;
  icon?: React.ElementType;
}

const tabs: StatTab[] = [
  { id: "all", label: "All" },
  { id: "scorers", label: "Top Scorers", icon: Trophy },
  { id: "assists", label: "Assists", icon: Award },
  { id: "red", label: "Red Cards", icon: AlertCircle },
  { id: "yellow", label: "Yellow Cards", icon: AlertCircle },
  { id: "cleansheets", label: "Clean Sheets" },
];

const StatItemSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-3 p-4 bg-card/50 rounded-xl"
  >
    <Skeleton className="h-5 w-6 rounded" />
    <Skeleton className="h-8 w-8 rounded-full" />
    <div className="flex-1 space-y-1">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
    <Skeleton className="h-6 w-8" />
  </motion.div>
);

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
    if (category === "scorers" || category === "assists")
      return "text-success";
    if (category === "red") return "text-destructive";
    if (category === "yellow") return "text-yellow-500";
    if (category === "cleansheets") return "text-primary";
    return "text-primary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--accent)/0.1)" }}
      className="flex items-center gap-3 p-4 bg-card/50 rounded-xl cursor-pointer transition-colors"
    >
      {/* Position */}
      <span
        className={cn(
          "text-sm font-bold w-6",
          index < 3 ? "text-primary" : "text-muted-foreground"
        )}
      >
        {index + 1}
      </span>

      {/* Team Badge */}
      <motion.img
        whileHover={{ scale: 1.1, rotate: 5 }}
        src={player.teamBadge}
        alt={player.teamName}
        className="w-8 h-8 object-contain flex-shrink-0"
      />

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{player.name}</p>
        <p className="text-xs text-muted-foreground">{player.teamName}</p>
      </div>

      {/* Stat Value */}
      <div className={cn("text-lg font-bold", getStatColor())}>
        {player.value}
      </div>
    </motion.div>
  );
};

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState<StatCategory | "all">("all");
  const [stats, setStats] = useState<PlayerStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [navTab, setNavTab] = useState("stats");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (activeTab === "all") {
        setStats(getStatsByCategory("scorers"));
      } else {
        setStats(getStatsByCategory(activeTab as StatCategory));
      }
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const getCategoryTitle = () => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab?.label || "Top Scorers";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Player Statistics</h1>
              <p className="text-xs text-muted-foreground">2024/25 Season</p>
            </div>
          </div>

          {/* Horizontal Scrollable Tabs */}
          <div className="relative -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-muted-foreground hover:bg-card/80"
                  )}
                >
                  {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h2 className="text-base font-bold text-foreground">
            {getCategoryTitle()}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Leading performers of the season
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <StatItemSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                  <p className="text-muted-foreground">No data available</p>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats Card */}
        {!loading && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Card className="p-4 bg-card/50 border-border/50">
              <h3 className="text-sm font-semibold mb-3">
                {getCategoryTitle()} - Top 3
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {stats.slice(0, 3).map((player, i) => (
                  <div key={player.id} className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {player.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {player.name}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </main>

      <Navigation activeTab={navTab} onTabChange={setNavTab} />
    </div>
  );
};

export default StatsPage;
