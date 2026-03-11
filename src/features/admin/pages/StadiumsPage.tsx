import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import {
  Layers,
  Plus,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Trophy,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { stadiumSummaries, type StadiumSummary } from "@/data/adminMockData";
import { StadiumRow } from "@/features/admin/components/stadiums/StadiumRow";
import {
  StadiumFilters,
  type SurfaceFilter,
  type StadiumStatusFilter,
} from "@/features/admin/components/stadiums/StadiumFilters";
import { StadiumModal } from "@/features/admin/components/stadiums/StadiumModal";
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

const StadiumsPage = () => {
  const [stadiums, setStadiums] = useState<StadiumSummary[]>(stadiumSummaries);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All States");
  const [surface, setSurface] = useState<SurfaceFilter>("All");
  const [status, setStatus] = useState<StadiumStatusFilter>("All");
  const [modal, setModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    stadium?: StadiumSummary;
  }>({ open: false, mode: "create" });

  const stats = useMemo(
    () => ({
      total: stadiums.length,
      active: stadiums.filter((s) => s.status === "Active").length,
      renovation: stadiums.filter((s) => s.status === "Under Renovation")
        .length,
      inactive: stadiums.filter((s) => s.status === "Inactive").length,
      totalCapacity: stadiums.reduce((acc, s) => acc + s.capacity, 0),
    }),
    [stadiums],
  );

  const largest = useMemo(
    () =>
      stadiums.reduce(
        (best, s) => (s.capacity > best.capacity ? s : best),
        stadiums[0],
      ),
    [stadiums],
  );

  const filtered = useMemo(
    () =>
      stadiums.filter((s) => {
        if (
          search &&
          !s.name.toLowerCase().includes(search.toLowerCase()) &&
          !s.city.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        if (state !== "All States" && s.state !== state) return false;
        if (surface !== "All" && s.surface !== surface) return false;
        if (status !== "All" && s.status !== status) return false;
        return true;
      }),
    [stadiums, search, state, surface, status],
  );

  const openCreate = () => setModal({ open: true, mode: "create" });
  const openEdit = (stadium: StadiumSummary) =>
    setModal({ open: true, mode: "edit", stadium });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleSave = (data: Omit<StadiumSummary, "id" | "fixturesHosted">) => {
    if (modal.mode === "create") {
      setStadiums((prev) => [
        { ...data, id: `s${Date.now()}`, fixturesHosted: 0 },
        ...prev,
      ]);
    } else if (modal.stadium) {
      setStadiums((prev) =>
        prev.map((s) => (s.id === modal.stadium!.id ? { ...s, ...data } : s)),
      );
    }
  };

  const handleDelete = (id: string) =>
    setStadiums((prev) => prev.filter((s) => s.id !== id));

  const kpis = [
    {
      label: "Total Venues",
      value: stats.total,
      icon: Layers,
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
      label: "Renovation",
      value: stats.renovation,
      icon: AlertTriangle,
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
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">
                  Admin · Venues
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Stadiums
              </h1>
              <p className="text-xs text-white/60 max-w-xs">
                {stats.total} venues · {stats.totalCapacity.toLocaleString()}{" "}
                total capacity
              </p>
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                {[
                  {
                    label: "Active",
                    count: stats.active,
                    color: "bg-emerald-400/20 text-emerald-300",
                  },
                  {
                    label: "Renovation",
                    count: stats.renovation,
                    color: "bg-yellow-400/20 text-yellow-300",
                  },
                  {
                    label: "Inactive",
                    count: stats.inactive,
                    color: "bg-white/10 text-white/50",
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
              <Plus className="w-4 h-4" /> Add Stadium
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

          {/* ── Largest Venue Callout ───────────────────────────────────── */}
          {largest && (
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-accent/70 uppercase tracking-wider">
                      Largest Venue
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {largest.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {largest.homeTeam} · {largest.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Users className="w-3.5 h-3.5 text-accent" />
                      <span className="text-lg font-extrabold text-foreground">
                        {largest.capacity.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Capacity
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-extrabold text-foreground">
                      {largest.fixturesHosted}
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      Fixtures Hosted
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
              <StadiumFilters
                search={search}
                state={state}
                surface={surface}
                status={status}
                count={filtered.length}
                onSearch={setSearch}
                onState={setState}
                onSurface={setSurface}
                onStatus={setStatus}
              />
            </div>

            {/* Column headers */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/30">
              <div className="w-9 flex-shrink-0" />
              <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Stadium
              </p>
              <p className="hidden md:block w-36 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Home Team
              </p>
              <p className="hidden sm:block w-24 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                Capacity
              </p>
              <p className="hidden md:block w-20 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                Fixtures
              </p>
              <p className="hidden lg:block w-28 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Surface
              </p>
              <p className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </p>
              <div className="w-8" />
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<Layers className="w-7 h-7" />}
                title="No stadiums found"
                description={
                  search ||
                  state !== "All States" ||
                  surface !== "All" ||
                  status !== "All"
                    ? "Try adjusting your filters."
                    : "Add your first venue to get started."
                }
                action={
                  !search &&
                  state === "All States" &&
                  surface === "All" &&
                  status === "All"
                    ? { label: "Add Stadium", onClick: openCreate }
                    : undefined
                }
              />
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((stadium) => (
                  <StadiumRow
                    key={stadium.id}
                    stadium={stadium}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <StadiumModal
        mode={modal.mode}
        stadium={modal.stadium}
        isOpen={modal.open}
        onClose={closeModal}
        onSave={handleSave}
      />
    </AdminLayout>
  );
};

export default StadiumsPage;
