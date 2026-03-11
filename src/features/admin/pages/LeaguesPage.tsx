import { useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { Plus, Trophy, CheckCircle2, Clock, Archive } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { topLeagues } from "@/data/adminMockData";
import type { LeagueSummary } from "@/data/adminMockData";
import { LeagueFilters } from "../components/leagues/LeagueFilters";
import type { LeagueFilterState } from "../components/leagues/LeagueFilters";
import { LeagueRow } from "../components/leagues/LeagueRow";
import { LeagueModal } from "../components/leagues/LeagueModal";
import { EmptyState } from "../components/EmptyState";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const LeaguesPage = () => {
  // ── State ────────────────────────────────────────────────────────────────────
  const [leagues, setLeagues] = useState<LeagueSummary[]>(topLeagues);
  const [filters, setFilters] = useState<LeagueFilterState>({
    search: "",
    state: "All States",
    status: "All",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<LeagueSummary | undefined>();

  // ── KPI stats ──────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: leagues.length,
      active: leagues.filter((l) => l.status === "Active").length,
      upcoming: leagues.filter((l) => l.status === "Upcoming").length,
      completed: leagues.filter((l) => l.status === "Completed").length,
    }),
    [leagues],
  );

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return leagues.filter((l) => {
      const matchesSearch =
        !filters.search ||
        l.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        l.state.toLowerCase().includes(filters.search.toLowerCase());
      const matchesState =
        filters.state === "All States" || l.state === filters.state;
      const matchesStatus =
        filters.status === "All" || l.status === filters.status;
      return matchesSearch && matchesState && matchesStatus;
    });
  }, [leagues, filters]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(undefined);
    setModalOpen(true);
  };

  const openEdit = (league: LeagueSummary) => {
    setEditTarget(league);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setLeagues((prev) => prev.filter((l) => l.id !== id));
    toast.success("League removed");
  };

  const handleSave = (data: {
    name: string;
    state: string;
    season: string;
    teams: number;
    status: "Active" | "Upcoming" | "Completed";
  }) => {
    if (editTarget) {
      setLeagues((prev) =>
        prev.map((l) =>
          l.id === editTarget.id
            ? {
                ...l,
                name: data.name,
                state: data.state,
                teams: data.teams,
                status: data.status,
              }
            : l,
        ),
      );
    } else {
      const newLeague: LeagueSummary = {
        id: `l-${Date.now()}`,
        name: data.name,
        state: data.state,
        teams: data.teams,
        fixtures: 0,
        completed: 0,
        status: data.status,
      };
      setLeagues((prev) => [newLeague, ...prev]);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        {/* Hero Banner */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary/80 px-5 pt-7 pb-20 md:px-8 md:pt-8"
        >
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute top-4 right-24 w-24 h-24 rounded-full border border-white/10" />
          <div className="absolute top-2 right-8 w-40 h-40 rounded-full border border-white/5" />
          <div className="relative z-10 flex items-start justify-between gap-4 max-w-5xl">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">
                  Admin · Competitions
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Leagues
              </h1>
              <p className="text-xs text-white/60">
                {stats.total} competition{stats.total !== 1 ? "s" : ""} ·{" "}
                {stats.active} active
              </p>
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                {stats.active > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400/20 text-emerald-300">
                    {stats.active} Active
                  </span>
                )}
                {stats.upcoming > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-400/20 text-yellow-300">
                    {stats.upcoming} Upcoming
                  </span>
                )}
                {stats.completed > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/50">
                    {stats.completed} Completed
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-accent text-white text-xs font-bold rounded-xl shadow-lg shadow-accent/30 hover:bg-accent/90 active:scale-95 transition-all flex-shrink-0"
            >
              <Plus className="w-4 h-4" /> New League
            </button>
          </div>
        </motion.div>

        <div className="px-4 md:px-8 max-w-5xl mx-auto w-full space-y-5 -mt-12 pb-8">
          {/* KPI Strip */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {[
              {
                label: "Total",
                value: stats.total,
                icon: Trophy,
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Active",
                value: stats.active,
                icon: CheckCircle2,
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
              },
              {
                label: "Upcoming",
                value: stats.upcoming,
                icon: Clock,
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
              },
              {
                label: "Completed",
                value: stats.completed,
                icon: Archive,
                color: "text-muted-foreground",
                bg: "bg-muted",
              },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {label}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                  </div>
                </div>
                <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
              </div>
            ))}
          </motion.div>

          {/* Filters + Table */}
          <motion.div
            variants={itemVariants}
            className="bg-card border-none shadow-sm rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <LeagueFilters
                filters={filters}
                onChange={setFilters}
                totalCount={leagues.length}
                filteredCount={filtered.length}
              />
            </div>

            {/* Column headers */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-b border-border bg-secondary/30">
              <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                League
              </p>
              <p className="hidden sm:block w-12 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                Teams
              </p>
              <p className="hidden md:block w-32 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Progress
              </p>
              <p className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </p>
              <div className="w-8" />
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<Trophy className="w-7 h-7" />}
                title="No leagues found"
                description={
                  filters.search ||
                  filters.state !== "All States" ||
                  filters.status !== "All"
                    ? "Try adjusting your filters."
                    : "Get started by creating your first league."
                }
                action={
                  filters.search ||
                  filters.state !== "All States" ||
                  filters.status !== "All"
                    ? undefined
                    : { label: "Create League", onClick: openCreate }
                }
              />
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((league) => (
                  <LeagueRow
                    key={league.id}
                    league={league}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <LeagueModal
        mode={editTarget ? "edit" : "create"}
        league={editTarget}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </AdminLayout>
  );
};

export default LeaguesPage;
