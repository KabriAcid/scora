import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    Clock,
    MapPin,
    Play,
    Radio,
    CalendarDays,
    ChevronRight,
    Star,
    Trophy,
    AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AgentLayout from "@/components/layout/AgentLayout";
import { mockAssignedMatches, mockAgentStats, AssignedMatch } from "@/data/agentMockData";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/utils/cn";

// ─── helpers ────────────────────────────────────────────────────────────────

const formatMatchTime = (date: Date): string => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const absDiff = Math.abs(diff);
    const mins = Math.floor(absDiff / 60000);
    const hours = Math.floor(absDiff / 3600000);
    const days = Math.floor(absDiff / 86400000);

    if (diff < 0) {
        // past
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    } else {
        // future
        if (mins < 60) return `in ${mins}m`;
        if (hours < 24) return `in ${hours}h`;
        return `in ${days}d`;
    }
};

const formatKickoff = (date: Date): string =>
    date.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });

const formatDateLabel = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    return date.toLocaleDateString("en-NG", { weekday: "short", month: "short", day: "numeric" });
};

const statusOrder = { live: 0, scheduled: 1, completed: 2 };

const statusConfig: Record<
    AssignedMatch["status"],
    { label: string; icon: React.ReactNode; badgeCls: string; dotCls: string }
> = {
    live: {
        label: "LIVE",
        icon: <Radio className="w-3 h-3" />,
        badgeCls: "bg-green-500/15 text-green-600 dark:text-green-400 border-0",
        dotCls: "bg-green-500 animate-pulse",
    },
    scheduled: {
        label: "UPCOMING",
        icon: <Clock className="w-3 h-3" />,
        badgeCls: "bg-accent/10 text-accent border-0",
        dotCls: "bg-accent",
    },
    completed: {
        label: "FT",
        icon: <CheckCircle2 className="w-3 h-3" />,
        badgeCls: "bg-muted text-muted-foreground border-0",
        dotCls: "bg-muted-foreground",
    },
};

type Filter = "all" | "live" | "scheduled" | "completed";

const filters: { key: Filter; label: string; icon?: React.ReactNode }[] = [
    { key: "all", label: "All" },
    { key: "live", label: "Live", icon: <Radio className="w-3 h-3" /> },
    { key: "scheduled", label: "Upcoming", icon: <Clock className="w-3 h-3" /> },
    { key: "completed", label: "Finished", icon: <CheckCircle2 className="w-3 h-3" /> },
];

// ─── Match Card ──────────────────────────────────────────────────────────────

interface MatchCardProps {
    match: AssignedMatch;
    index: number;
}

const MatchCard = ({ match, index }: MatchCardProps) => {
    const navigate = useNavigate();
    const cfg = statusConfig[match.status];
    const isLive = match.status === "live";
    const isCompleted = match.status === "completed";
    const dateLabel = formatDateLabel(match.startTime);

    const hasScores = match.homeScore !== undefined && match.awayScore !== undefined;
    const homeWon = hasScores && match.homeScore! > match.awayScore!;
    const awayWon = hasScores && match.awayScore! > match.homeScore!;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
        >
            <Card
                className={cn(
                    "group relative overflow-hidden transition-all duration-200 cursor-pointer",
                    "border border-border/60 hover:border-primary/30 hover:shadow-md",
                    isLive && "border-green-500/30 bg-green-500/[0.03] hover:border-green-500/50"
                )}
                onClick={() =>
                    isLive
                        ? navigate(`/agent/match/${match.id}`)
                        : undefined
                }
            >
                {/* Live accent bar */}
                {isLive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-green-500 rounded-l-xl" />
                )}

                <div className="p-4 sm:p-5">
                    {/* Top row: league chip + date + status badge */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 min-w-0">
                            <Trophy className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs text-muted-foreground font-medium truncate">
                                {match.league}
                            </span>
                            <span className="text-muted-foreground/40 text-xs">·</span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                                {dateLabel}
                            </span>
                        </div>
                        <Badge
                            className={cn(
                                "flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-2",
                                cfg.badgeCls
                            )}
                        >
                            {isLive ? (
                                <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dotCls)} />
                            ) : (
                                cfg.icon
                            )}
                            {cfg.label}
                        </Badge>
                    </div>

                    {/* Match row: home — score/time — away */}
                    <div className="flex items-center gap-3">
                        {/* Home team */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                            <img
                                src={match.homeTeamLogo}
                                alt={match.homeTeam}
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
                            />
                            <span
                                className={cn(
                                    "text-sm sm:text-base font-semibold truncate",
                                    homeWon ? "text-foreground" : isCompleted ? "text-muted-foreground" : "text-foreground"
                                )}
                            >
                                {match.homeTeam}
                            </span>
                        </div>

                        {/* Score / kickoff */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-0.5 px-2">
                            {hasScores ? (
                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "text-xl sm:text-2xl font-bold tabular-nums",
                                            homeWon ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {match.homeScore}
                                    </span>
                                    <span className="text-muted-foreground/50 text-lg font-light">—</span>
                                    <span
                                        className={cn(
                                            "text-xl sm:text-2xl font-bold tabular-nums",
                                            awayWon ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {match.awayScore}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <span className="text-sm sm:text-base font-bold text-foreground tabular-nums">
                                        {formatKickoff(match.startTime)}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                        {formatMatchTime(match.startTime)}
                                    </span>
                                </div>
                            )}
                            {isLive && (
                                <span className="text-[10px] font-bold text-green-500 tracking-wide">
                                    LIVE
                                </span>
                            )}
                        </div>

                        {/* Away team */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 justify-end">
                            <span
                                className={cn(
                                    "text-sm sm:text-base font-semibold truncate text-right",
                                    awayWon ? "text-foreground" : isCompleted ? "text-muted-foreground" : "text-foreground"
                                )}
                            >
                                {match.awayTeam}
                            </span>
                            <img
                                src={match.awayTeamLogo}
                                alt={match.awayTeam}
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
                            />
                        </div>
                    </div>

                    {/* Bottom row: venue + action */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs text-muted-foreground truncate">{match.venue}</span>
                        </div>

                        {isLive ? (
                            <Button
                                size="sm"
                                className="gap-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground h-7 px-3 rounded-lg flex-shrink-0"
                            >
                                <Play className="w-3 h-3" />
                                Log Events
                            </Button>
                        ) : match.status === "scheduled" ? (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Awaiting start</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                                <span>Completed</span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

// ─── Stats summary bar ───────────────────────────────────────────────────────

const SummaryBar = () => {
    const total = mockAssignedMatches.length;
    const live = mockAssignedMatches.filter((m) => m.status === "live").length;
    const upcoming = mockAssignedMatches.filter((m) => m.status === "scheduled").length;
    const done = mockAssignedMatches.filter((m) => m.status === "completed").length;

    const stats = [
        { label: "Total", value: total, icon: <Star className="w-4 h-4" />, cls: "text-foreground" },
        { label: "Live", value: live, icon: <Radio className="w-4 h-4" />, cls: "text-green-500" },
        { label: "Upcoming", value: upcoming, icon: <Clock className="w-4 h-4" />, cls: "text-accent" },
        { label: "Finished", value: done, icon: <CheckCircle2 className="w-4 h-4" />, cls: "text-muted-foreground" },
    ];

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {stats.map((s, i) => (
                <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                >
                    <Card className="p-3 sm:p-4 text-center border-border/60">
                        <div className={cn("flex justify-center mb-1", s.cls)}>{s.icon}</div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground tabular-nums">
                            {s.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            {s.label}
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

const AssignedMatchesPage = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState<Filter>("all");

    const filtered = useMemo(() => {
        const list =
            activeFilter === "all"
                ? mockAssignedMatches
                : mockAssignedMatches.filter((m) => m.status === activeFilter);
        return [...list].sort(
            (a, b) => statusOrder[a.status] - statusOrder[b.status]
        );
    }, [activeFilter]);

    const liveMatch = mockAssignedMatches.find((m) => m.status === "live");

    return (
        <AgentLayout>
            <div className="min-h-screen bg-background">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start justify-between gap-4"
                    >
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                                Assigned Matches
                            </h1>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {mockAssignedMatches.length} match
                                {mockAssignedMatches.length !== 1 ? "es" : ""} assigned to you
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-xs flex-shrink-0"
                            onClick={() => navigate(ROUTES.AGENT.CALENDAR)}
                        >
                            <CalendarDays className="w-3.5 h-3.5" />
                            Calendar
                        </Button>
                    </motion.div>

                    {/* Live match banner */}
                    <AnimatePresence>
                        {liveMatch && (
                            <motion.div
                                key="live-banner"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div
                                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-4 sm:p-5 cursor-pointer group"
                                    onClick={() => navigate(`/agent/match/${liveMatch.id}`)}
                                >
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-2 border-white" />
                                        <div className="absolute -bottom-8 right-12 w-24 h-24 rounded-full border border-white" />
                                    </div>
                                    <div className="relative z-10 flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                                                    Match In Progress
                                                </span>
                                            </div>
                                            <p className="text-sm sm:text-base font-bold text-white truncate">
                                                {liveMatch.homeTeam}{" "}
                                                <span className="text-white/70 font-normal">
                                                    {liveMatch.homeScore} — {liveMatch.awayScore}
                                                </span>{" "}
                                                {liveMatch.awayTeam}
                                            </p>
                                            <p className="text-xs text-white/70 mt-0.5 flex items-center gap-1">
                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                {liveMatch.venue}
                                            </p>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="gap-1.5 bg-white text-primary hover:bg-white/90 font-bold text-xs flex-shrink-0 h-8 px-3 rounded-lg"
                                        >
                                            <Play className="w-3 h-3" />
                                            Log Events
                                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Summary stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <SummaryBar />
                    </motion.div>

                    {/* Filter pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide"
                    >
                        {filters.map((f) => {
                            const count =
                                f.key === "all"
                                    ? mockAssignedMatches.length
                                    : mockAssignedMatches.filter((m) => m.status === f.key).length;
                            return (
                                <motion.button
                                    key={f.key}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveFilter(f.key)}
                                    className={cn(
                                        "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                                        activeFilter === f.key
                                            ? "bg-accent text-accent-foreground shadow-sm"
                                            : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                                    )}
                                >
                                    {f.icon}
                                    {f.label}
                                    <span
                                        className={cn(
                                            "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                                            activeFilter === f.key
                                                ? "bg-accent-foreground/20 text-accent-foreground"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        {count}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Match list */}
                    <AnimatePresence mode="wait">
                        {filtered.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-16 text-center gap-3"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                                    <Star className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium text-foreground">No matches found</p>
                                <p className="text-xs text-muted-foreground max-w-xs">
                                    There are no{" "}
                                    {activeFilter !== "all" ? activeFilter : ""}{" "}
                                    matches in your assignment list.
                                </p>
                                {activeFilter !== "all" && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs mt-1"
                                        onClick={() => setActiveFilter("all")}
                                    >
                                        View all matches
                                    </Button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeFilter}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                            >
                                {filtered.map((match, i) => (
                                    <MatchCard key={match.id} match={match} index={i} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-xs text-muted-foreground pb-4"
                    >
                        Showing {filtered.length} of {mockAssignedMatches.length} assignments ·{" "}
                        <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate(ROUTES.AGENT.CALENDAR)}>
                            View full calendar
                        </span>
                    </motion.p>
                </div>
            </div>
        </AgentLayout>
    );
};

export default AssignedMatchesPage;

