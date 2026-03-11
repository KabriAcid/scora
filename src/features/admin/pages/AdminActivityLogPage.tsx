import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Users,
  Shield,
  Calendar,
  UserCheck,
  Trophy,
  Building2,
  Plus,
  Pencil,
  Trash2,
  Link2,
  Search,
  X,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { recentAdminActivity, type ActivityItem } from "@/data/adminMockData";
import { cn } from "@/shared/utils/cn";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(date: Date): string {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return "Yesterday";
  return `${Math.floor(diff / 86400)}d ago`;
}

function dayLabel(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffDays = Math.floor(
    (now.setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)) / 86_400_000,
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

const entityIcon: Record<ActivityItem["entityType"], React.ReactNode> = {
  player: <Users className="w-3.5 h-3.5" />,
  team: <Shield className="w-3.5 h-3.5" />,
  fixture: <Calendar className="w-3.5 h-3.5" />,
  agent: <UserCheck className="w-3.5 h-3.5" />,
  league: <Trophy className="w-3.5 h-3.5" />,
  stadium: <Building2 className="w-3.5 h-3.5" />,
};

const actionIcon: Record<ActivityItem["action"], React.ReactNode> = {
  Created: <Plus className="w-3 h-3" />,
  Updated: <Pencil className="w-3 h-3" />,
  Deleted: <Trash2 className="w-3 h-3" />,
  Assigned: <Link2 className="w-3 h-3" />,
};

const actionColor: Record<ActivityItem["action"], string> = {
  Created: "text-emerald-500",
  Updated: "text-primary",
  Deleted: "text-destructive",
  Assigned: "text-accent",
};

const actionBg: Record<ActivityItem["action"], string> = {
  Created: "bg-emerald-500/10",
  Updated: "bg-primary/10",
  Deleted: "bg-destructive/10",
  Assigned: "bg-accent/10",
};

const entityTypeColor: Record<ActivityItem["entityType"], string> = {
  player: "bg-blue-500/10    text-blue-400",
  team: "bg-violet-500/10  text-violet-400",
  fixture: "bg-amber-500/10   text-amber-400",
  agent: "bg-pink-500/10    text-pink-400",
  league: "bg-emerald-500/10 text-emerald-400",
  stadium: "bg-orange-500/10  text-orange-400",
};

// ─── Tab config ───────────────────────────────────────────────────────────────

type FilterTab = "all" | ActivityItem["action"] | ActivityItem["entityType"];

const actionTabs: { id: ActivityItem["action"]; label: string }[] = [
  { id: "Created", label: "Created" },
  { id: "Updated", label: "Updated" },
  { id: "Deleted", label: "Deleted" },
  { id: "Assigned", label: "Assigned" },
];

const entityTabs: { id: ActivityItem["entityType"]; label: string }[] = [
  { id: "player", label: "Players" },
  { id: "team", label: "Teams" },
  { id: "fixture", label: "Fixtures" },
  { id: "agent", label: "Agents" },
  { id: "league", label: "Leagues" },
  { id: "stadium", label: "Stadiums" },
];

// ─── Motion ───────────────────────────────────────────────────────────────────

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, x: -16, transition: { duration: 0.18 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminActivityLogPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");

  // KPIs
  const total = recentAdminActivity.length;
  const created = recentAdminActivity.filter(
    (a) => a.action === "Created",
  ).length;
  const updated = recentAdminActivity.filter(
    (a) => a.action === "Updated",
  ).length;
  const deleted = recentAdminActivity.filter(
    (a) => a.action === "Deleted",
  ).length;

  // Filtered list
  const filtered = useMemo(() => {
    let list = [...recentAdminActivity];

    if (activeTab !== "all") {
      const isAction = actionTabs.some((t) => t.id === activeTab);
      if (isAction) {
        list = list.filter((a) => a.action === activeTab);
      } else {
        list = list.filter((a) => a.entityType === activeTab);
      }
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.entity.toLowerCase().includes(q) ||
          a.entityType.toLowerCase().includes(q) ||
          a.action.toLowerCase().includes(q),
      );
    }

    return list;
  }, [activeTab, search]);

  // Group by day
  const grouped = useMemo(() => {
    const map = new Map<string, ActivityItem[]>();
    for (const item of filtered) {
      const label = dayLabel(item.time);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(item);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background pb-10">
        {/* ── Hero banner ─────────────────────────────────────────────────── */}
        <div className="relative bg-gradient-to-r from-primary via-primary/95 to-primary/80 px-5 pt-7 pb-20 overflow-hidden">
          {/* decorative rings */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -top-4  -right-4  w-36 h-36 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-white/[0.03] blur-2xl pointer-events-none" />

          <div className="relative flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">
                Activity Log
              </h1>
              <p className="text-sm text-white/70 mt-0.5">
                Full history of admin actions
              </p>
            </div>
          </div>
        </div>

        {/* ── KPI strip ───────────────────────────────────────────────────── */}
        <div className="px-4 -mt-12 grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "Total Events", value: total, color: "text-foreground" },
            { label: "Created", value: created, color: "text-emerald-500" },
            { label: "Updated", value: updated, color: "text-primary" },
            { label: "Deleted", value: deleted, color: "text-destructive" },
          ].map((kpi) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-card rounded-2xl px-3 py-3 shadow-sm border border-border/40 text-center"
            >
              <p className={cn("text-xl font-bold", kpi.color)}>{kpi.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                {kpi.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Main content card ────────────────────────────────────────────── */}
        <div className="px-4 space-y-4">
          <div className="bg-card rounded-2xl border-none shadow-sm overflow-hidden">
            {/* Search bar */}
            <div className="px-4 pt-4 pb-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by entity name, type or action…"
                  className="w-full pl-9 pr-9 py-2.5 text-sm bg-muted/50 border border-border/60 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/60 transition"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Action filter tabs */}
            <div className="px-4 pt-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                By Action
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <TabPill
                  active={activeTab === "all"}
                  label="All"
                  count={total}
                  onClick={() => setActiveTab("all")}
                />
                {actionTabs.map((t) => (
                  <TabPill
                    key={t.id}
                    active={activeTab === t.id}
                    label={t.label}
                    count={
                      recentAdminActivity.filter((a) => a.action === t.id)
                        .length
                    }
                    onClick={() => setActiveTab(t.id)}
                  />
                ))}
              </div>
            </div>

            {/* Entity filter tabs */}
            <div className="px-4 pt-3 pb-3 border-b border-border">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                By Entity Type
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {entityTabs.map((t) => (
                  <TabPill
                    key={t.id}
                    active={activeTab === t.id}
                    label={t.label}
                    count={
                      recentAdminActivity.filter((a) => a.entityType === t.id)
                        .length
                    }
                    onClick={() => setActiveTab(t.id)}
                  />
                ))}
              </div>
            </div>

            {/* List */}
            <AnimatePresence mode="popLayout">
              {grouped.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 gap-3 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    No activity found
                  </p>
                  <p className="text-xs text-muted-foreground max-w-[200px]">
                    Try adjusting your search or filters
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab + search}
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {grouped.map(([day, items]) => (
                    <div key={day}>
                      {/* Day separator */}
                      <div className="px-4 py-2.5 flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {day}
                        </span>
                        <div className="flex-1 h-px bg-border/60" />
                        <span className="text-[10px] text-muted-foreground">
                          {items.length} event{items.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Activity rows */}
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          variants={itemVariants}
                          className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors"
                        >
                          {/* Entity icon bubble */}
                          <div
                            className={cn(
                              "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                              actionBg[item.action],
                            )}
                          >
                            <span className={actionColor[item.action]}>
                              {entityIcon[item.entityType]}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">
                              {item.entity}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {/* Action badge */}
                              <span
                                className={cn(
                                  "inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md",
                                  actionBg[item.action],
                                  actionColor[item.action],
                                )}
                              >
                                {actionIcon[item.action]}
                                {item.action}
                              </span>
                              {/* Entity type chip */}
                              <span
                                className={cn(
                                  "text-[10px] font-medium px-1.5 py-0.5 rounded-md capitalize",
                                  entityTypeColor[item.entityType],
                                )}
                              >
                                {item.entityType}
                              </span>
                            </div>
                          </div>

                          {/* Timestamp */}
                          <span className="text-[10px] text-muted-foreground flex-shrink-0">
                            {relativeTime(item.time)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// ─── TabPill ─────────────────────────────────────────────────────────────────

function TabPill({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
      <span
        className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
          active
            ? "bg-white/20 text-white"
            : "bg-background/80 text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}
