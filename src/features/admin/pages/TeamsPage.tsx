import { useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Plus,
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { teamSummaries } from "@/data/adminMockData";
import type { TeamSummary } from "@/data/adminMockData";
import { TeamFilters } from "../components/teams/TeamFilters";
import type { TeamFilterState } from "../components/teams/TeamFilters";
import { TeamRow } from "../components/teams/TeamRow";
import { TeamModal } from "../components/teams/TeamModal";
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

const TeamsPage = () => {
  // ── State ───────────────────────────────────────────────────────────────────
  const [teams, setTeams] = useState<TeamSummary[]>(teamSummaries);
  const [filters, setFilters] = useState<TeamFilterState>({
    search: "",
    state: "All States",
    status: "All",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamSummary | undefined>();

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return teams.filter((t) => {
      const matchesSearch =
        !filters.search ||
        t.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.shortCode.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.league.toLowerCase().includes(filters.search.toLowerCase());
      const matchesState =
        filters.state === "All States" || t.state === filters.state;
      const matchesStatus =
        filters.status === "All" || t.status === filters.status;
      return matchesSearch && matchesState && matchesStatus;
    });
  }, [teams, filters]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(undefined);
    setModalOpen(true);
  };

  const openEdit = (team: TeamSummary) => {
    setEditTarget(team);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
    toast.success("Team removed");
  };

  const handleSave = (data: {
    name: string;
    shortCode: string;
    state: string;
    league: string;
    players: number;
    status: "Active" | "Inactive" | "Suspended";
  }) => {
    if (editTarget) {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === editTarget.id
            ? {
                ...t,
                name: data.name,
                shortCode: data.shortCode,
                state: data.state,
                league: data.league,
                players: data.players,
                status: data.status,
              }
            : t,
        ),
      );
    } else {
      const newTeam: TeamSummary = {
        id: `t-${Date.now()}`,
        name: data.name,
        shortCode: data.shortCode,
        state: data.state,
        league: data.league,
        players: data.players,
        wins: 0,
        draws: 0,
        losses: 0,
        status: data.status,
      };
      setTeams((prev) => [newTeam, ...prev]);
    }
  };

  // ── KPI stats ──────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: teams.length,
      active: teams.filter((t) => t.status === "Active").length,
      inactive: teams.filter((t) => t.status === "Inactive").length,
      suspended: teams.filter((t) => t.status === "Suspended").length,
    }),
    [teams],
  );

  const isFiltered =
    !!filters.search ||
    filters.state !== "All States" ||
    filters.status !== "All";

  // ── Render ─────────────────────────────────────────────────────────────────
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
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">
                  Admin · Clubs
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Teams
              </h1>
              <p className="text-xs text-white/60">
                {stats.total} club{stats.total !== 1 ? "s" : ""} registered ·{" "}
                {stats.active} active
              </p>
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                {stats.active > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400/20 text-emerald-300">
                    {stats.active} Active
                  </span>
                )}
                {stats.suspended > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-400/20 text-red-300">
                    {stats.suspended} Suspended
                  </span>
                )}
                {stats.inactive > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/50">
                    {stats.inactive} Inactive
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-accent text-white text-xs font-bold rounded-xl shadow-lg shadow-accent/30 hover:bg-accent/90 active:scale-95 transition-all flex-shrink-0"
            >
              <Plus className="w-4 h-4" /> New Team
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
                icon: Shield,
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
                label: "Inactive",
                value: stats.inactive,
                icon: XCircle,
                color: "text-muted-foreground",
                bg: "bg-muted",
              },
              {
                label: "Suspended",
                value: stats.suspended,
                icon: AlertTriangle,
                color: "text-destructive",
                bg: "bg-destructive/10",
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
              <TeamFilters
                filters={filters}
                onChange={setFilters}
                totalCount={teams.length}
                filteredCount={filtered.length}
              />
            </div>

            {/* Column headers */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-9 flex-shrink-0" />
              <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Team
              </p>
              <p className="hidden sm:block w-14 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                Players
              </p>
              <p className="hidden md:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Record
              </p>
              <p className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </p>
              <div className="w-8" />
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<Shield className="w-7 h-7" />}
                title="No teams found"
                description={
                  isFiltered
                    ? "Try adjusting your filters."
                    : "Get started by registering your first team."
                }
                action={
                  isFiltered
                    ? undefined
                    : { label: "New Team", onClick: openCreate }
                }
              />
            ) : (
              <div className="divide-y divide-border/60">
                {filtered.map((team) => (
                  <TeamRow
                    key={team.id}
                    team={team}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <TeamModal
        mode={editTarget ? "edit" : "create"}
        team={editTarget}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </AdminLayout>
  );
};

export default TeamsPage;
