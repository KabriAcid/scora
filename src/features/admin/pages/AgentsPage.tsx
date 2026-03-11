import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import {
  UserCircle2,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { agentSummaries, type AgentSummary } from "@/data/adminMockData";
import { AgentRow } from "@/features/admin/components/agents/AgentRow";
import {
  AgentFilters,
  type AgentStatusFilter,
} from "@/features/admin/components/agents/AgentFilters";
import { AgentModal } from "@/features/admin/components/agents/AgentModal";
import { EmptyState } from "@/features/admin/components/EmptyState";

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

const AgentsPage = () => {
  const [agents, setAgents] = useState<AgentSummary[]>(agentSummaries);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All States");
  const [status, setStatus] = useState<AgentStatusFilter>("All");
  const [modal, setModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    agent?: AgentSummary;
  }>({ open: false, mode: "create" });

  const stats = useMemo(
    () => ({
      total: agents.length,
      active: agents.filter((a) => a.status === "Active").length,
      inactive: agents.filter((a) => a.status === "Inactive").length,
      pending: agents.filter((a) => a.status === "Pending").length,
      avgAccuracy: agents
        .filter((a) => a.status === "Active")
        .reduce((acc, a, _, arr) => acc + a.accuracy / arr.length, 0),
    }),
    [agents],
  );

  const topAgent = useMemo(
    () =>
      agents
        .filter((a) => a.status === "Active")
        .reduce(
          (best, a) => (a.matchesLogged > best.matchesLogged ? a : best),
          agents.find((a) => a.status === "Active") ?? agents[0],
        ),
    [agents],
  );

  const filtered = useMemo(
    () =>
      agents.filter((a) => {
        if (
          search &&
          !a.name.toLowerCase().includes(search.toLowerCase()) &&
          !a.agentCode.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        if (state !== "All States" && a.state !== state) return false;
        if (status !== "All" && a.status !== status) return false;
        return true;
      }),
    [agents, search, state, status],
  );

  const openCreate = () => setModal({ open: true, mode: "create" });
  const openEdit = (agent: AgentSummary) =>
    setModal({ open: true, mode: "edit", agent });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleSave = (data: Omit<AgentSummary, "id">) => {
    if (modal.mode === "create") {
      setAgents((prev) => [{ ...data, id: `a${Date.now()}` }, ...prev]);
    } else if (modal.agent) {
      setAgents((prev) =>
        prev.map((a) => (a.id === modal.agent!.id ? { ...a, ...data } : a)),
      );
    }
  };

  const handleDelete = (id: string) =>
    setAgents((prev) => prev.filter((a) => a.id !== id));

  const kpis = [
    {
      label: "Total Agents",
      value: stats.total,
      icon: UserCircle2,
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
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      icon: XCircle,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        {/* ── Hero Banner ─────────────────────────────────────────────── */}
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
                  <UserCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">
                  Admin · Field Agents
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Agents
              </h1>
              <p className="text-xs text-white/60 max-w-xs">
                {stats.total} registered ·{" "}
                {stats.pending > 0 && (
                  <span className="text-yellow-300 font-semibold">
                    {stats.pending} awaiting approval
                  </span>
                )}
              </p>
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                {[
                  {
                    label: "Active",
                    count: stats.active,
                    color: "bg-emerald-400/20 text-emerald-300",
                  },
                  {
                    label: "Pending",
                    count: stats.pending,
                    color: "bg-yellow-400/20 text-yellow-300",
                  },
                  {
                    label: "Avg Accuracy",
                    count: `${stats.avgAccuracy.toFixed(0)}%`,
                    color: "bg-white/15 text-white/80",
                  },
                ].map(({ label, count, color }) => (
                  <span
                    key={label}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${color}`}
                  >
                    {count} {label}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-accent text-white text-xs font-bold rounded-xl shadow-lg shadow-accent/30 hover:bg-accent/90 active:scale-95 transition-all flex-shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Agent
            </button>
          </div>
        </motion.div>

        <div className="px-4 md:px-8 max-w-5xl mx-auto w-full space-y-5 -mt-12 pb-8">
          {/* ── KPI Strip ──────────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {kpis.map(({ label, value, icon: Icon, color, bg }) => (
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

          {/* ── Top Agent Callout ───────────────────────────────────────── */}
          {topAgent && (
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider">
                      Top Performer
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {topAgent.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {topAgent.agentCode} · {topAgent.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-lg font-extrabold text-foreground">
                      {topAgent.matchesLogged}
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      Matches Logged
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-extrabold text-emerald-500">
                      {topAgent.accuracy}%
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      Accuracy
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Filters + Table ─────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="bg-card border-none shadow-sm rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <AgentFilters
                search={search}
                state={state}
                status={status}
                count={filtered.length}
                onSearch={setSearch}
                onState={setState}
                onStatus={setStatus}
              />
            </div>

            {/* Column headers */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-9 flex-shrink-0" />
              <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Agent
              </p>
              <p className="hidden md:block w-20 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                Matches
              </p>
              <p className="hidden md:block w-16 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                Accuracy
              </p>
              <p className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </p>
              <div className="w-8" />
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<UserCircle2 className="w-7 h-7" />}
                title="No agents found"
                description={
                  search || state !== "All States" || status !== "All"
                    ? "Try adjusting your filters."
                    : "Register your first field agent."
                }
                action={
                  !search && state === "All States" && status === "All"
                    ? { label: "Add Agent", onClick: openCreate }
                    : undefined
                }
              />
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((agent) => (
                  <AgentRow
                    key={agent.id}
                    agent={agent}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <AgentModal
        mode={modal.mode}
        agent={modal.agent}
        isOpen={modal.open}
        onClose={closeModal}
        onSave={handleSave}
      />
    </AdminLayout>
  );
};

export default AgentsPage;
