import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Users,
  Shield,
  Calendar,
  UserCheck,
  Trophy,
  Building2,
  Plus,
  Radio,
  Clock,
  AlertCircle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { StatCard } from "@/features/admin/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  adminOverviewStats,
  recentAdminActivity,
  monthlyTrends,
  fixtureStatusBreakdown,
  topLeagues,
  agentSummaries,
  type ActivityItem,
} from "@/data/adminMockData";
import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/utils/cn";

//  Helpers 

function relativeTime(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const entityIcon: Record<ActivityItem["entityType"], React.ReactNode> = {
  player: <Users className="w-3.5 h-3.5" />,
  team: <Shield className="w-3.5 h-3.5" />,
  fixture: <Calendar className="w-3.5 h-3.5" />,
  agent: <UserCheck className="w-3.5 h-3.5" />,
  league: <Trophy className="w-3.5 h-3.5" />,
  stadium: <Building2 className="w-3.5 h-3.5" />,
};

const actionColor: Record<ActivityItem["action"], string> = {
  Created: "text-green-500",
  Updated: "text-primary",
  Deleted: "text-destructive",
  Assigned: "text-accent",
};

const actionBg: Record<ActivityItem["action"], string> = {
  Created: "bg-green-500/10",
  Updated: "bg-primary/10",
  Deleted: "bg-destructive/10",
  Assigned: "bg-accent/10",
};

//  Animation variants 

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

//  Custom Tooltip 

const ChartTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number; dataKey: string; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2 text-xs space-y-1">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.dataKey === "players" ? "Players" : "Fixtures"}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

//  Quick Actions config 

const quickActions = [
  { label: "Add Player", icon: Users, path: ROUTES.ADMIN.PLAYERS, iconClass: "text-primary", bgClass: "bg-primary/10" },
  { label: "Add Team", icon: Shield, path: ROUTES.ADMIN.TEAMS, iconClass: "text-accent", bgClass: "bg-accent/10" },
  { label: "Schedule Fixture", icon: Calendar, path: ROUTES.ADMIN.FIXTURES, iconClass: "text-green-500", bgClass: "bg-green-500/10" },
  { label: "Manage Agents", icon: UserCheck, path: ROUTES.ADMIN.AGENTS, iconClass: "text-yellow-500", bgClass: "bg-yellow-500/10" },
];

//  Dashboard 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalFixtures = fixtureStatusBreakdown.reduce((s, f) => s + f.count, 0);

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-7xl mx-auto"
      >
        {/*  Page header  */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {today}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {adminOverviewStats.liveMatches > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-green-600">
                  {adminOverviewStats.liveMatches} Live
                </span>
              </div>
            )}
            <Button size="sm" onClick={() => navigate(ROUTES.ADMIN.PLAYERS)}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add Player
            </Button>
          </div>
        </motion.div>

        {/*  KPI Cards  */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
            trend={{ value: 4, direction: "up" }}
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

        {/*  Secondary stat strip  */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Active Leagues", value: adminOverviewStats.totalLeagues, icon: Trophy, iconClass: "text-primary", bgClass: "bg-primary/10", path: ROUTES.ADMIN.LEAGUES },
            { label: "Stadiums", value: adminOverviewStats.totalStadiums, icon: Building2, iconClass: "text-accent", bgClass: "bg-accent/10", path: ROUTES.ADMIN.STADIUMS },
            { label: "Live Now", value: adminOverviewStats.liveMatches, icon: Radio, iconClass: "text-green-500", bgClass: "bg-green-500/10", path: ROUTES.ADMIN.FIXTURES },
            { label: "Pending Agents", value: adminOverviewStats.pendingAgents, icon: AlertCircle, iconClass: "text-yellow-500", bgClass: "bg-yellow-500/10", path: ROUTES.ADMIN.AGENTS },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => navigate(s.path)}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:shadow-sm transition-all group text-left"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", s.bgClass)}>
                <s.icon className={cn("w-4 h-4", s.iconClass)} />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground tabular-nums leading-none">{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </motion.div>

        {/*  Charts row  */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Monthly trends  3 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Card className="p-5 border-none shadow-md bg-card h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Platform Growth</h2>
                  <p className="text-xs text-muted-foreground">Player registrations & fixtures  last 6 months</p>
                </div>
                <div className="flex gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" /> Players
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" /> Fixtures
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyTrends} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
                  <Bar dataKey="players" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={20} />
                  <Bar dataKey="fixtures" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Fixture Status  2 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="p-5 border-none shadow-md bg-card h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-foreground">Fixture Status</h2>
                <p className="text-xs text-muted-foreground">{totalFixtures} total fixtures</p>
              </div>
              <div className="space-y-3.5 flex-1">
                {fixtureStatusBreakdown.map((f) => {
                  const pct = Math.round((f.count / totalFixtures) * 100);
                  return (
                    <div key={f.status}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">{f.status}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold tabular-nums text-foreground">{f.count}</span>
                          <span className="text-[10px] text-muted-foreground w-6 text-right">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: f.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => navigate(ROUTES.ADMIN.FIXTURES)}
                className="mt-4 text-xs text-accent hover:text-accent/80 font-medium flex items-center gap-1 transition-colors"
              >
                View all fixtures <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Card>
          </motion.div>
        </div>

        {/*  Main content row  */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Active Leagues  3 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Card className="border-none shadow-md bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Active Leagues</h2>
                  <p className="text-xs text-muted-foreground">Season progress overview</p>
                </div>
                <button
                  onClick={() => navigate(ROUTES.ADMIN.LEAGUES)}
                  className="text-xs text-accent hover:text-accent/80 font-medium flex items-center gap-0.5 transition-colors"
                >
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="divide-y divide-border">
                {topLeagues.map((league) => {
                  const progress = Math.round((league.completed / league.fixtures) * 100);
                  return (
                    <motion.div
                      key={league.id}
                      whileHover={{ backgroundColor: "hsl(var(--secondary))" }}
                      className="px-5 py-3.5 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground truncate">{league.name}</p>
                            <Badge
                              className={cn(
                                "text-[10px] px-1.5 py-0 flex-shrink-0 border",
                                league.status === "Active" && "bg-green-500/10 text-green-600 border-green-500/20",
                                league.status === "Completed" && "bg-muted text-muted-foreground border-border",
                                league.status === "Upcoming" && "bg-accent/10 text-accent border-accent/20",
                              )}
                            >
                              {league.status}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground">{league.state}  {league.teams} teams</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-foreground tabular-nums">{league.completed}/{league.fixtures}</p>
                          <p className="text-[10px] text-muted-foreground">fixtures</p>
                        </div>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                          className={cn("h-full rounded-full", progress === 100 ? "bg-muted-foreground" : "bg-primary")}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Right column  2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-md bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
                  <span className="text-[11px] text-muted-foreground">Last 24h</span>
                </div>
                <div className="divide-y divide-border/60">
                  {recentAdminActivity.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors">
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", actionBg[item.action])}>
                        <span className={actionColor[item.action]}>
                          {entityIcon[item.entityType]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground truncate">
                          <span className={cn("font-semibold", actionColor[item.action])}>{item.action}</span>{" "}
                          {item.entity}
                        </p>
                        <p className="text-[10px] text-muted-foreground capitalize">{item.entityType}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{relativeTime(item.time)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card className="p-4 border-none shadow-md bg-card">
                <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {quickActions.map((qa) => (
                    <motion.button
                      key={qa.path}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(qa.path)}
                      className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary transition-all"
                    >
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", qa.bgClass)}>
                        <qa.icon className={cn("w-4 h-4", qa.iconClass)} />
                      </div>
                      <span className="text-[11px] font-semibold text-foreground leading-tight text-center">{qa.label}</span>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/*  Top Agents strip  */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Top Agents</h2>
                <p className="text-xs text-muted-foreground">Ranked by matches logged</p>
              </div>
              <button
                onClick={() => navigate(ROUTES.ADMIN.AGENTS)}
                className="text-xs text-accent hover:text-accent/80 font-medium flex items-center gap-0.5 transition-colors"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {agentSummaries.map((agent, idx) => (
                <div key={agent.id} className="px-5 py-4 flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">
                        {agent.name.split(" ").map((n: string) => n[0]).join("")}
                      </span>
                    </div>
                    {idx === 0 && (
                      <span className="absolute -top-1 -right-1 text-[10px]"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{agent.name}</p>
                    <p className="text-[10px] text-muted-foreground">{agent.code}  {agent.state}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Calendar className="w-3 h-3" /> {agent.matchesLogged}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> {agent.accuracy}%
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "text-[9px] px-1.5 flex-shrink-0 border",
                      agent.status === "Active"
                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                        : "bg-muted text-muted-foreground border-border"
                    )}
                  >
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
