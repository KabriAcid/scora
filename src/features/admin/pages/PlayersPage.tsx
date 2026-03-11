import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Users,
  Plus,
  TrendingUp,
  Activity,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import AdminLayout from "@/components/layout/AdminLayout";
import { playerSummaries } from "@/data/adminMockData";
import type { PlayerSummary } from "@/data/adminMockData";
import { PlayerFilters } from "../components/players/PlayerFilters";
import type { PlayerFilterState } from "../components/players/PlayerFilters";
import { PlayerRow } from "../components/players/PlayerRow";
import { PlayerModal } from "../components/players/PlayerModal";
import { EmptyState } from "../components/EmptyState";

// ─── Animation ────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// ─── KPI card ────────────────────────────────────────────────────────────────

const KpiCard = ({
  icon,
  label,
  value,
  sub,
  iconClass,
  bgClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub?: string;
  iconClass: string;
  bgClass: string;
}) => (
  <Card className="p-4 border-none shadow-sm bg-card flex items-center gap-3">
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bgClass}`}
    >
      <span className={iconClass}>{icon}</span>
    </div>
    <div className="min-w-0">
      <p className="text-xl font-bold text-foreground tabular-nums leading-none">
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
      {sub && (
        <p className="text-[10px] text-muted-foreground/70 mt-0.5">{sub}</p>
      )}
    </div>
  </Card>
);

// ─── Position colour map ──────────────────────────────────────────────────────

const POS_BAR: Record<PlayerSummary["position"], string> = {
  GK: "bg-yellow-500",
  DEF: "bg-primary",
  MID: "bg-accent",
  FWD: "bg-destructive",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const PlayersPage = () => {
  const [players, setPlayers] = useState<PlayerSummary[]>(playerSummaries);
  const [filters, setFilters] = useState<PlayerFilterState>({
    search: "",
    position: "All",
    status: "All",
    state: "All States",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<PlayerSummary | undefined>();

  const kpi = useMemo(
    () => ({
      total: players.length,
      active: players.filter((p) => p.status === "Active").length,
      injured: players.filter((p) => p.status === "Injured").length,
      suspended: players.filter((p) => p.status === "Suspended").length,
      topScorer: [...players].sort((a, b) => b.goals - a.goals)[0],
      posCounts: (
        ["GK", "DEF", "MID", "FWD"] as PlayerSummary["position"][]
      ).map((pos) => ({
        pos,
        count: players.filter((p) => p.position === pos).length,
      })),
    }),
    [players],
  );

  const filtered = useMemo(
    () =>
      players.filter((p) => {
        const q = filters.search.toLowerCase();
        return (
          (!q ||
            p.name.toLowerCase().includes(q) ||
            p.team.toLowerCase().includes(q)) &&
          (filters.position === "All" || p.position === filters.position) &&
          (filters.status === "All" || p.status === filters.status) &&
          (filters.state === "All States" || p.state === filters.state)
        );
      }),
    [players, filters],
  );

  const openCreate = () => {
    setEditTarget(undefined);
    setModalOpen(true);
  };
  const openEdit = (p: PlayerSummary) => {
    setEditTarget(p);
    setModalOpen(true);
  };
  const handleDelete = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    toast.success("Player removed");
  };
  const handleSave = (data: {
    name: string;
    number: number;
    position: "GK" | "DEF" | "MID" | "FWD";
    team: string;
    league: string;
    state: string;
    age: number;
    status: "Active" | "Injured" | "Suspended";
  }) => {
    if (editTarget) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === editTarget.id ? { ...p, ...data } : p)),
      );
    } else {
      setPlayers((prev) => [
        {
          id: `p-${Date.now()}`,
          ...data,
          goals: 0,
          assists: 0,
          appearances: 0,
        },
        ...prev,
      ]);
    }
  };

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen"
      >
        {/* ── Hero banner ──────────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="relative bg-gradient-to-r from-primary via-primary/95 to-primary/80 px-5 pt-7 pb-20 overflow-hidden"
        >
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-primary-foreground/10" />
          <div className="absolute -right-8 top-4 w-40 h-40 rounded-full border border-primary-foreground/10" />
          <div className="absolute left-1/2 bottom-0 w-96 h-32 bg-primary-foreground/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-widest">
                    Registry
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  Players
                </h1>
                <p className="text-primary-foreground/70 text-sm mt-1">
                  {kpi.total} registered · {kpi.active} active · {kpi.injured}{" "}
                  injured
                </p>
              </div>
              <button
                onClick={openCreate}
                className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white text-xs font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/30 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Register Player
              </button>
            </div>

            {/* Position distribution */}
            <div className="mt-5 flex items-center gap-4">
              {kpi.posCounts.map(({ pos, count }) => (
                <div key={pos} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-sm ${POS_BAR[pos]}`} />
                  <span className="text-xs text-primary-foreground/80 font-medium">
                    {pos}
                  </span>
                  <span className="text-xs font-bold text-primary-foreground tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Content (floats over banner bottom) ──────────────────────────── */}
        <div className="px-4 py-0 md:px-5 max-w-5xl mx-auto -mt-12 pb-8 space-y-4">
          {/* KPI strip */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <KpiCard
              icon={<Users className="w-5 h-5" />}
              label="Total Players"
              value={kpi.total}
              bgClass="bg-primary/10"
              iconClass="text-primary"
            />
            <KpiCard
              icon={<Activity className="w-5 h-5" />}
              label="Active"
              value={kpi.active}
              sub={`${Math.round((kpi.active / kpi.total) * 100)}% of total`}
              bgClass="bg-emerald-500/10"
              iconClass="text-emerald-600"
            />
            <KpiCard
              icon={<HeartPulse className="w-5 h-5" />}
              label="Injured"
              value={kpi.injured}
              bgClass="bg-yellow-500/10"
              iconClass="text-yellow-600"
            />
            <KpiCard
              icon={<ShieldAlert className="w-5 h-5" />}
              label="Suspended"
              value={kpi.suspended}
              bgClass="bg-destructive/10"
              iconClass="text-destructive"
            />
          </motion.div>

          {/* Top scorer callout */}
          {kpi.topScorer && (
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-sm bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 p-4 flex items-center gap-4 flex-wrap">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0 shadow-md shadow-accent/20">
                  <span className="text-xs font-extrabold text-white">
                    {kpi.topScorer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-accent uppercase tracking-widest">
                    ⚽ Top Scorer
                  </span>
                  <p className="text-sm font-bold text-foreground truncate">
                    {kpi.topScorer.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {kpi.topScorer.team}
                  </p>
                </div>
                <div className="flex items-center gap-5 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-foreground tabular-nums leading-none">
                      {kpi.topScorer.goals}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Goals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-foreground tabular-nums leading-none">
                      {kpi.topScorer.assists}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Assists</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600">
                      {kpi.topScorer.appearances} apps
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Filters + table */}
          <motion.div variants={itemVariants} className="space-y-3">
            <PlayerFilters
              filters={filters}
              onChange={setFilters}
              totalCount={players.length}
              filteredCount={filtered.length}
            />

            <Card className="border-none shadow-sm bg-card overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/30">
                <div className="w-10 flex-shrink-0" />
                <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Player
                </p>
                <p className="hidden md:block w-20 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  State
                </p>
                <p className="hidden sm:block w-8 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                  Age
                </p>
                <p className="hidden lg:block w-32 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Stats
                </p>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </p>
                <div className="w-8" />
              </div>

              {filtered.length === 0 ? (
                <EmptyState
                  icon={<Users className="w-7 h-7" />}
                  title="No players found"
                  description={
                    filters.search ||
                    filters.position !== "All" ||
                    filters.status !== "All"
                      ? "Try adjusting your filters."
                      : "Register your first player to get started."
                  }
                  action={
                    filters.search ||
                    filters.position !== "All" ||
                    filters.status !== "All"
                      ? undefined
                      : { label: "Register Player", onClick: openCreate }
                  }
                />
              ) : (
                <div className="divide-y divide-border/60">
                  {filtered.map((player) => (
                    <PlayerRow
                      key={player.id}
                      player={player}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        <PlayerModal
          mode={editTarget ? "edit" : "create"}
          player={editTarget}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      </motion.div>
    </AdminLayout>
  );
};

export default PlayersPage;
