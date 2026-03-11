import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import {
  Calendar,
  Plus,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { fixtureSummaries, type FixtureSummary } from "@/data/adminMockData";
import { FixtureRow } from "@/features/admin/components/fixtures/FixtureRow";
import {
  FixtureFilters,
  type FixtureStatusFilter,
} from "@/features/admin/components/fixtures/FixtureFilters";
import { FixtureModal } from "@/features/admin/components/fixtures/FixtureModal";
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

const FixturesPage = () => {
  const [fixtures, setFixtures] = useState<FixtureSummary[]>(fixtureSummaries);
  const [search, setSearch] = useState("");
  const [league, setLeague] = useState("All Leagues");
  const [status, setStatus] = useState<FixtureStatusFilter>("All");
  const [modal, setModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    fixture?: FixtureSummary;
  }>({ open: false, mode: "create" });

  const stats = useMemo(
    () => ({
      total: fixtures.length,
      scheduled: fixtures.filter((f) => f.status === "Scheduled").length,
      live: fixtures.filter((f) => f.status === "Live").length,
      completed: fixtures.filter((f) => f.status === "Completed").length,
      postponed: fixtures.filter((f) => f.status === "Postponed").length,
      unassigned: fixtures.filter(
        (f) => !f.agentAssigned && f.status === "Scheduled",
      ).length,
    }),
    [fixtures],
  );

  const leagues = useMemo(
    () => [...new Set(fixtures.map((f) => f.league))],
    [fixtures],
  );
  const nextFixture = useMemo(
    () =>
      fixtures.find((f) => f.status === "Scheduled") ??
      fixtures.find((f) => f.status === "Live"),
    [fixtures],
  );
  const liveFixtures = useMemo(
    () => fixtures.filter((f) => f.status === "Live"),
    [fixtures],
  );

  const filtered = useMemo(
    () =>
      fixtures.filter((f) => {
        if (
          search &&
          !f.homeTeam.toLowerCase().includes(search.toLowerCase()) &&
          !f.awayTeam.toLowerCase().includes(search.toLowerCase()) &&
          !f.stadium.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        if (league !== "All Leagues" && f.league !== league) return false;
        if (status !== "All" && f.status !== status) return false;
        return true;
      }),
    [fixtures, search, league, status],
  );

  const openCreate = () => setModal({ open: true, mode: "create" });
  const openEdit = (fixture: FixtureSummary) =>
    setModal({ open: true, mode: "edit", fixture });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleSave = (
    data: Omit<FixtureSummary, "id" | "homeScore" | "awayScore">,
  ) => {
    if (modal.mode === "create") {
      setFixtures((prev) => [
        { ...data, id: `f${Date.now()}`, homeScore: null, awayScore: null },
        ...prev,
      ]);
    } else if (modal.fixture) {
      setFixtures((prev) =>
        prev.map((f) => (f.id === modal.fixture!.id ? { ...f, ...data } : f)),
      );
    }
  };

  const handleDelete = (id: string) =>
    setFixtures((prev) => prev.filter((f) => f.id !== id));

  const kpis = [
    {
      label: "Total",
      value: stats.total,
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Scheduled",
      value: stats.scheduled,
      icon: Clock,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Live",
      value: stats.live,
      icon: Zap,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
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
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">
                  Admin · Match Schedule
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Fixtures
              </h1>
              <p className="text-xs text-white/60 max-w-xs">
                {stats.total} fixtures scheduled
                {stats.unassigned > 0 && (
                  <>
                    {" "}
                    ·{" "}
                    <span className="text-yellow-300 font-semibold">
                      {stats.unassigned} unassigned
                    </span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                {[
                  {
                    label: "Live",
                    count: stats.live,
                    color: "bg-emerald-400/20 text-emerald-300",
                  },
                  {
                    label: "Scheduled",
                    count: stats.scheduled,
                    color: "bg-white/15 text-white/80",
                  },
                  {
                    label: "Postponed",
                    count: stats.postponed,
                    color: "bg-red-400/20 text-red-300",
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
              <Plus className="w-4 h-4" /> Schedule Fixture
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
                className={`bg-card border rounded-2xl p-4 shadow-sm ${label === "Live" && stats.live > 0 ? "border-emerald-500/30" : "border-border"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {label}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${color} ${label === "Live" && stats.live > 0 ? "animate-pulse" : ""}`}
                    />
                  </div>
                </div>
                <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Live / Next Fixture Callout ─────────────────────────────── */}
          {(liveFixtures.length > 0 || nextFixture) && (
            <motion.div
              variants={itemVariants}
              className={`bg-gradient-to-r border rounded-2xl p-4 ${liveFixtures.length > 0 ? "from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 border-emerald-500/20" : "from-primary/5 via-primary/10 to-primary/5 border-primary/20"}`}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${liveFixtures.length > 0 ? "bg-emerald-500/15" : "bg-primary/15"}`}
                  >
                    {liveFixtures.length > 0 ? (
                      <Zap className="w-5 h-5 text-emerald-500 animate-pulse" />
                    ) : (
                      <Calendar className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-wider ${liveFixtures.length > 0 ? "text-emerald-500/70" : "text-primary/70"}`}
                    >
                      {liveFixtures.length > 0
                        ? `${liveFixtures.length} Live Now`
                        : "Next Fixture"}
                    </p>
                    {liveFixtures.length > 0 ? (
                      <div className="space-y-0.5">
                        {liveFixtures.map((f) => (
                          <p
                            key={f.id}
                            className="text-sm font-bold text-foreground"
                          >
                            {f.homeTeam}{" "}
                            <span className="text-emerald-500 font-extrabold">
                              {f.homeScore ?? 0} – {f.awayScore ?? 0}
                            </span>{" "}
                            {f.awayTeam}
                          </p>
                        ))}
                      </div>
                    ) : (
                      nextFixture && (
                        <p className="text-sm font-bold text-foreground">
                          {nextFixture.homeTeam} vs {nextFixture.awayTeam}
                        </p>
                      )
                    )}
                    {nextFixture && liveFixtures.length === 0 && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">
                          {nextFixture.stadium} · {nextFixture.date}{" "}
                          {nextFixture.time}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {stats.unassigned > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-yellow-500">
                      {stats.unassigned} fixture
                      {stats.unassigned > 1 ? "s" : ""} need an agent
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Filters + Table ─────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="bg-card border-none shadow-sm rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <FixtureFilters
                search={search}
                league={league}
                status={status}
                count={filtered.length}
                leagues={leagues}
                onSearch={setSearch}
                onLeague={setLeague}
                onStatus={setStatus}
              />
            </div>

            {/* Column headers */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-9 flex-shrink-0" />
              <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Match
              </p>
              <p className="hidden md:block w-24 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                Date / Time
              </p>
              <p className="hidden lg:block w-36 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Stadium
              </p>
              <p className="hidden sm:block w-28 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Agent
              </p>
              <p className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </p>
              <div className="w-8" />
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<Calendar className="w-7 h-7" />}
                title="No fixtures found"
                description={
                  search || league !== "All Leagues" || status !== "All"
                    ? "Try adjusting your filters."
                    : "Schedule your first fixture to get started."
                }
                action={
                  !search && league === "All Leagues" && status === "All"
                    ? { label: "Schedule Fixture", onClick: openCreate }
                    : undefined
                }
              />
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((fixture) => (
                  <FixtureRow
                    key={fixture.id}
                    fixture={fixture}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <FixtureModal
        mode={modal.mode}
        fixture={modal.fixture}
        isOpen={modal.open}
        onClose={closeModal}
        onSave={handleSave}
      />
    </AdminLayout>
  );
};

export default FixturesPage;
