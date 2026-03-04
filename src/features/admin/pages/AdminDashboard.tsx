import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Calendar,
  UserCheck,
  Trophy,
  Building2,
  ArrowRight,
  Plus,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { StatCard } from "@/features/admin/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  adminOverviewStats,
  recentAdminActivity,
  type ActivityItem,
} from "@/data/adminMockData";
import { ROUTES } from "@/shared/config/routes";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const entityIcon: Record<ActivityItem["entityType"], React.ReactNode> = {
  player: <Users className="w-4 h-4" />,
  team: <Shield className="w-4 h-4" />,
  fixture: <Calendar className="w-4 h-4" />,
  agent: <UserCheck className="w-4 h-4" />,
  league: <Trophy className="w-4 h-4" />,
  stadium: <Building2 className="w-4 h-4" />,
};

const actionColor: Record<ActivityItem["action"], string> = {
  Created: "text-success",
  Updated: "text-primary",
  Deleted: "text-destructive",
  Assigned: "text-accent",
};

// ─── Static config ────────────────────────────────────────────────────────────

const quickActions = [
  {
    label: "Add Player",
    icon: <Users className="w-5 h-5" />,
    path: ROUTES.ADMIN.PLAYERS,
  },
  {
    label: "Add Team",
    icon: <Shield className="w-5 h-5" />,
    path: ROUTES.ADMIN.TEAMS,
  },
  {
    label: "Schedule Fixture",
    icon: <Calendar className="w-5 h-5" />,
    path: ROUTES.ADMIN.FIXTURES,
  },
  {
    label: "Manage Agents",
    icon: <UserCheck className="w-5 h-5" />,
    path: ROUTES.ADMIN.AGENTS,
  },
];

const allSections = [
  {
    label: "Leagues",
    icon: <Trophy className="w-4 h-4" />,
    path: ROUTES.ADMIN.LEAGUES,
  },
  {
    label: "Stadiums",
    icon: <Building2 className="w-4 h-4" />,
    path: ROUTES.ADMIN.STADIUMS,
  },
  {
    label: "Settings",
    icon: <Plus className="w-4 h-4" />,
    path: ROUTES.ADMIN.SETTINGS,
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <PageHeader
            title="Dashboard"
            subtitle="Welcome back, Admin — here's what's happening."
            action={
              <Button size="sm" onClick={() => navigate(ROUTES.ADMIN.PLAYERS)}>
                <Plus className="w-4 h-4 mr-1.5" />
                Add Player
              </Button>
            }
          />
        </motion.div>

        {/* KPI cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Total Players"
            value={adminOverviewStats.totalPlayers}
            trend={{ value: 8, direction: "up" }}
            colorScheme="primary"
            onClick={() => navigate(ROUTES.ADMIN.PLAYERS)}
          />
          <StatCard
            icon={<Shield className="w-5 h-5" />}
            label="Teams"
            value={adminOverviewStats.totalTeams}
            colorScheme="accent"
            onClick={() => navigate(ROUTES.ADMIN.TEAMS)}
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="Upcoming Fixtures"
            value={adminOverviewStats.upcomingFixtures}
            trend={{ value: 5, direction: "up" }}
            colorScheme="success"
            onClick={() => navigate(ROUTES.ADMIN.FIXTURES)}
          />
          <StatCard
            icon={<UserCheck className="w-5 h-5" />}
            label="Active Agents"
            value={adminOverviewStats.activeAgents}
            colorScheme="warning"
            onClick={() => navigate(ROUTES.ADMIN.AGENTS)}
          />
        </motion.div>

        {/* Content grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6"
        >
          {/* Recent activity */}
          <Card className="p-5 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Recent Activity
              </h2>
              <span className="text-xs text-muted-foreground">Last 24 h</span>
            </div>
            <div className="space-y-1">
              {recentAdminActivity.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ backgroundColor: "hsl(var(--secondary))" }}
                  className="flex items-center gap-3 p-2.5 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
                    {entityIcon[item.entityType]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      <span
                        className={`font-semibold ${actionColor[item.action]}`}
                      >
                        {item.action}
                      </span>{" "}
                      {item.entity}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.entityType}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {relativeTime(item.time)}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Right column */}
          <div className="space-y-4">
            {/* Quick actions */}
            <Card className="p-5 border border-border shadow-sm">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((qa) => (
                  <motion.button
                    key={qa.path}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(qa.path)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-secondary/40 hover:bg-secondary transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      {qa.icon}
                    </div>
                    <span className="text-xs font-semibold text-foreground leading-tight text-center">
                      {qa.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </Card>

            {/* All sections nav */}
            <Card className="p-5 border border-border shadow-sm">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                All Sections
              </h2>
              <div className="space-y-0.5">
                {allSections.map((s) => (
                  <button
                    key={s.path}
                    onClick={() => navigate(s.path)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary text-sm transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-foreground">
                      <span className="text-muted-foreground">{s.icon}</span>
                      {s.label}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
