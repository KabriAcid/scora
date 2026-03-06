import { useState } from "react";
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
    TrendingUp,
    Target,
    Activity,
    Award,
    Goal,
    CreditCard,
    ArrowLeftRight,
    AlertTriangle,
    CornerDownLeft,
    CheckCircle2,
    ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AgentLayout from "@/components/layout/AgentLayout";
import { cn } from "@/shared/utils/cn";
import {
    mockAgentStats,
    mockAgentProfile,
    mockMonthlyActivity,
    mockEventBreakdown,
    mockMatchPerformances,
} from "@/data/agentMockData";

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── KPI cards config ──────────────────────────────────────────────────────────

const KPI_CARDS = [
    {
        label: "Matches Logged",
        value: mockAgentStats.matchesLogged,
        suffix: "",
        icon: Target,
        iconClass: "text-primary",
        bgClass: "bg-primary/10",
        trend: "+3 this month",
        trendUp: true,
    },
    {
        label: "Events Recorded",
        value: mockAgentStats.eventsRecorded,
        suffix: "",
        icon: Activity,
        iconClass: "text-accent",
        bgClass: "bg-accent/10",
        trend: "+32 this month",
        trendUp: true,
    },
    {
        label: "Accuracy Rate",
        value: mockAgentStats.accuracyRate,
        suffix: "%",
        icon: Award,
        iconClass: "text-yellow-500",
        bgClass: "bg-yellow-500/10",
        trend: "All-time best",
        trendUp: true,
    },
    {
        label: "Avg Events / Match",
        value: parseFloat((mockAgentStats.eventsRecorded / mockAgentStats.matchesLogged).toFixed(1)),
        suffix: "",
        icon: TrendingUp,
        iconClass: "text-green-500",
        bgClass: "bg-green-500/10",
        trend: "Industry avg: 7.2",
        trendUp: true,
    },
];

// ── Event icon map ────────────────────────────────────────────────────────────

const EVENT_ICON_MAP: Record<string, React.ElementType> = {
    "Goals": Goal,
    "Yellow Cards": CreditCard,
    "Red Cards": AlertTriangle,
    "Substitutions": ArrowLeftRight,
    "Fouls": AlertTriangle,
    "Corners": CornerDownLeft,
};

// ── Accuracy badge ─────────────────────────────────────────────────────────────

const AccuracyBadge = ({ score }: { score: number }) => {
    if (score === 100)
        return (
            <Badge className="text-[10px] bg-green-500/15 text-green-600 border-green-500/25 font-semibold gap-1">
                <CheckCircle2 className="w-3 h-3" /> Perfect
            </Badge>
        );
    if (score >= 97)
        return (
            <Badge className="text-[10px] bg-primary/15 text-primary border-primary/25 font-semibold">
                Excellent
            </Badge>
        );
    return (
        <Badge className="text-[10px] bg-accent/15 text-accent border-accent/25 font-semibold">
            Good
        </Badge>
    );
};

// ── Custom tooltip for bar chart ──────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string; color: string }[]; label?: string }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2 text-xs space-y-1">
            <p className="font-semibold text-foreground">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} style={{ color: p.color }}>
                    {p.dataKey === "matches" ? "Matches" : "Events"}: <span className="font-bold">{p.value}</span>
                </p>
            ))}
        </div>
    );
};

// ── Period selector ───────────────────────────────────────────────────────────

const PERIODS = ["Last 6 months", "This season", "All time"] as const;
type Period = typeof PERIODS[number];

// ── Page ──────────────────────────────────────────────────────────────────────

const AgentStatsPage = () => {
    const [activePeriod, setActivePeriod] = useState<Period>("Last 6 months");

    const totalEvents = mockEventBreakdown.reduce((s, e) => s + e.count, 0);

    return (
        <AgentLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 py-6 md:py-8 px-4 md:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto space-y-6"
                >
                    {/* ── Page header ── */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-foreground">
                                My Stats
                            </h1>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {mockAgentProfile.agentCode} · Active since{" "}
                                {mockAgentProfile.joinDate.toLocaleDateString("en-NG", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        {/* Period tabs */}
                        <div className="flex gap-1 bg-muted rounded-lg p-1">
                            {PERIODS.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setActivePeriod(p)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                                        activePeriod === p
                                            ? "bg-card text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── KPI cards ── */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                    >
                        {KPI_CARDS.map((kpi) => (
                            <Card key={kpi.label} className="p-4 border-none shadow-md bg-card">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", kpi.bgClass)}>
                                        <kpi.icon className={cn("w-4 h-4", kpi.iconClass)} />
                                    </div>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">
                                    {kpi.value}{kpi.suffix}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 font-medium">{kpi.label}</p>
                                <p className={cn(
                                    "text-[11px] mt-1.5 font-medium",
                                    kpi.trendUp ? "text-green-500" : "text-destructive"
                                )}>
                                    {kpi.trend}
                                </p>
                            </Card>
                        ))}
                    </motion.div>

                    {/* ── Charts row ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

                        {/* Monthly activity bar chart — 3 cols */}
                        <motion.div variants={itemVariants} className="lg:col-span-3">
                            <Card className="p-5 border-none shadow-md bg-card h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-sm font-semibold text-foreground">Monthly Activity</h2>
                                        <p className="text-xs text-muted-foreground">Matches & events over time</p>
                                    </div>
                                    <div className="flex gap-3 text-[11px] text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" />
                                            Events
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
                                            Matches
                                        </span>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={mockMonthlyActivity} barGap={4}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="hsl(var(--border))"
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                                            axisLine={false}
                                            tickLine={false}
                                            width={28}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
                                        <Bar
                                            dataKey="events"
                                            fill="hsl(var(--primary))"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={24}
                                        />
                                        <Bar
                                            dataKey="matches"
                                            fill="hsl(var(--accent))"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={24}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </motion.div>

                        {/* Event breakdown — 2 cols */}
                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <Card className="p-5 border-none shadow-md bg-card h-full">
                                <div className="mb-4">
                                    <h2 className="text-sm font-semibold text-foreground">Event Breakdown</h2>
                                    <p className="text-xs text-muted-foreground">{totalEvents} total events logged</p>
                                </div>
                                <div className="space-y-3">
                                    {mockEventBreakdown.map((e) => {
                                        const Icon = EVENT_ICON_MAP[e.type] ?? Activity;
                                        const pct = Math.round((e.count / totalEvents) * 100);
                                        return (
                                            <div key={e.type}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">{e.type}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-xs font-semibold tabular-nums">{e.count}</span>
                                                        <span className="text-[10px] text-muted-foreground w-7 text-right">{pct}%</span>
                                                    </div>
                                                </div>
                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: e.color }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* ── Match history ── */}
                    <motion.div variants={itemVariants}>
                        <Card className="border-none shadow-md bg-card overflow-hidden">
                            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-semibold text-foreground">Recent Match Log</h2>
                                    <p className="text-xs text-muted-foreground">Your last {mockMatchPerformances.length} assignments</p>
                                </div>
                                <button className="text-xs text-accent hover:text-accent/80 font-medium flex items-center gap-0.5 transition-colors">
                                    View all <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="divide-y divide-border">
                                {mockMatchPerformances.map((m, idx) => (
                                    <motion.div
                                        key={m.id}
                                        variants={itemVariants}
                                        custom={idx}
                                        className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/30 transition-colors"
                                    >
                                        {/* Date */}
                                        <div className="w-16 text-center flex-shrink-0 hidden sm:block">
                                            <p className="text-[11px] font-medium text-foreground">
                                                {new Date(m.date).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground">{new Date(m.date).getFullYear()}</p>
                                        </div>

                                        {/* Teams */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate">
                                                {m.homeTeam} <span className="text-muted-foreground font-normal">vs</span> {m.awayTeam}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground">{m.league}</p>
                                        </div>

                                        {/* Event count pills */}
                                        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                                <Goal className="w-3.5 h-3.5" />{m.goals}
                                            </span>
                                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                                <CreditCard className="w-3.5 h-3.5" />{m.cards}
                                            </span>
                                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                                <ArrowLeftRight className="w-3.5 h-3.5" />{m.substitutions}
                                            </span>
                                        </div>

                                        {/* Total events */}
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm font-bold text-foreground tabular-nums">{m.totalEvents}</p>
                                            <p className="text-[10px] text-muted-foreground">events</p>
                                        </div>

                                        {/* Accuracy badge */}
                                        <div className="flex-shrink-0">
                                            <AccuracyBadge score={m.accuracyScore} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* ── Achievement shelf ── */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-sm font-semibold text-foreground mb-3">Achievements</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { icon: "🏅", title: "First Match", desc: "Logged your first match", earned: true },
                                { icon: "⚡", title: "Speed Logger", desc: "5+ events in under 5 min", earned: true },
                                { icon: "🎯", title: "Sharpshooter", desc: "100% accuracy on 3 matches", earned: true },
                                { icon: "📅", title: "25 Matches", desc: "Log 25 total matches", earned: false, progress: 24, total: 25 },
                            ].map((ach) => (
                                <Card
                                    key={ach.title}
                                    className={cn(
                                        "p-4 border-none shadow-sm text-center transition-all",
                                        ach.earned ? "bg-card" : "bg-muted/30 opacity-60 grayscale"
                                    )}
                                >
                                    <div className="text-2xl mb-2">{ach.icon}</div>
                                    <p className="text-xs font-semibold text-foreground">{ach.title}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{ach.desc}</p>
                                    {!ach.earned && ach.progress !== undefined && (
                                        <div className="mt-2">
                                            <div className="h-1 bg-border rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${(ach.progress / ach.total!) * 100}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-muted-foreground mt-0.5">{ach.progress}/{ach.total}</p>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </AgentLayout>
    );
};

export default AgentStatsPage;
