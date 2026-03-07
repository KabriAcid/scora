import { useState, useMemo } from "react";
import { BarChart3, Trophy, TrendingUp, Search, ArrowUpDown } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { teamSummaries } from "@/data/adminMockData";
import type { TeamSummary } from "@/data/adminMockData";
import { cn } from "@/shared/utils/cn";
import { EmptyState } from "../components/EmptyState";

// ─── Derived stats ────────────────────────────────────────────────────────────

interface TeamStats extends TeamSummary {
    played: number;
    points: number;
    winRate: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDiff: number;
}

function deriveStats(t: TeamSummary): TeamStats {
    const played = t.wins + t.draws + t.losses;
    const points = t.wins * 3 + t.draws;
    const winRate = played > 0 ? Math.round((t.wins / played) * 100) : 0;
    // Pseudo goal data so the table isn't all zeros
    const seed = parseInt(t.id.replace(/\D/g, "") || "1", 10);
    const goalsFor = t.wins * 2 + t.draws + seed;
    const goalsAgainst = t.losses * 2 + Math.floor(seed / 2);
    return {
        ...t,
        played,
        points,
        winRate,
        goalsFor,
        goalsAgainst,
        goalDiff: goalsFor - goalsAgainst,
    };
}

// ─── Sort key type ────────────────────────────────────────────────────────────

type SortKey = "points" | "wins" | "winRate" | "played" | "goalDiff" | "goalsFor";

// ─── Mini progress bar ────────────────────────────────────────────────────────

const WinRateBar = ({ value }: { value: number }) => (
    <div className="flex items-center gap-2 min-w-0">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden min-w-[40px]">
            <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${value}%` }}
            />
        </div>
        <span className="text-[11px] text-muted-foreground flex-shrink-0 w-8 text-right">
            {value}%
        </span>
    </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const TeamStatsPage = () => {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("points");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const allStats = useMemo(() => teamSummaries.map(deriveStats), []);

    const sorted = useMemo(() => {
        const q = search.toLowerCase();
        const list = q
            ? allStats.filter(
                (t) =>
                    t.name.toLowerCase().includes(q) ||
                    t.league.toLowerCase().includes(q) ||
                    t.state.toLowerCase().includes(q)
            )
            : [...allStats];

        list.sort((a, b) => {
            const diff = a[sortKey] - b[sortKey];
            return sortDir === "desc" ? -diff : diff;
        });
        return list;
    }, [allStats, search, sortKey, sortDir]);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "desc" ? "asc" : "desc"));
        } else {
            setSortKey(key);
            setSortDir("desc");
        }
    };

    const SortHeader = ({
        label,
        colKey,
        className,
    }: {
        label: string;
        colKey: SortKey;
        className?: string;
    }) => (
        <button
            onClick={() => toggleSort(colKey)}
            className={cn(
                "flex items-center gap-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
                sortKey === colKey && "text-foreground",
                className
            )}
        >
            {label}
            <ArrowUpDown
                className={cn(
                    "w-3 h-3 flex-shrink-0",
                    sortKey === colKey ? "text-primary" : "text-muted-foreground/50"
                )}
            />
        </button>
    );

    return (
        <AdminLayout>
            <div className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-foreground">Team Statistics</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Performance overview across all clubs
                        </p>
                    </div>
                </div>

                {/* Top stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        {
                            label: "Most Wins",
                            icon: <Trophy className="w-4 h-4 text-amber-500" />,
                            bg: "bg-amber-500/10",
                            value: [...allStats].sort((a, b) => b.wins - a.wins)[0]?.name ?? "—",
                            sub: `${[...allStats].sort((a, b) => b.wins - a.wins)[0]?.wins ?? 0} wins`,
                        },
                        {
                            label: "Top Points",
                            icon: <BarChart3 className="w-4 h-4 text-primary" />,
                            bg: "bg-primary/10",
                            value: [...allStats].sort((a, b) => b.points - a.points)[0]?.name ?? "—",
                            sub: `${[...allStats].sort((a, b) => b.points - a.points)[0]?.points ?? 0} pts`,
                        },
                        {
                            label: "Best Win Rate",
                            icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
                            bg: "bg-emerald-500/10",
                            value: [...allStats].sort((a, b) => b.winRate - a.winRate)[0]?.name ?? "—",
                            sub: `${[...allStats].sort((a, b) => b.winRate - a.winRate)[0]?.winRate ?? 0}%`,
                        },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="bg-card border border-border rounded-2xl px-4 py-3.5"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className={cn(
                                        "w-7 h-7 rounded-lg flex items-center justify-center",
                                        card.bg
                                    )}
                                >
                                    {card.icon}
                                </div>
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    {card.label}
                                </span>
                            </div>
                            <p className="text-sm font-bold text-foreground truncate">{card.value}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{card.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search teams…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                </div>

                {/* Stats table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    {/* Table header */}
                    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/30">
                        <p className="w-6 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                            #
                        </p>
                        <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Team
                        </p>
                        <SortHeader label="Pld" colKey="played" className="w-8 justify-center" />
                        <SortHeader label="W" colKey="wins" className="w-6 justify-center hidden sm:flex" />
                        <p className="hidden sm:block w-6 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            D
                        </p>
                        <p className="hidden sm:block w-6 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            L
                        </p>
                        <SortHeader label="GD" colKey="goalDiff" className="hidden md:flex w-8 justify-center" />
                        <SortHeader label="Pts" colKey="points" className="w-8 justify-center" />
                        <SortHeader label="Win%" colKey="winRate" className="hidden md:flex w-28 justify-start" />
                    </div>

                    {/* Rows */}
                    {sorted.length === 0 ? (
                        <EmptyState
                            icon={<BarChart3 className="w-7 h-7" />}
                            title="No teams found"
                            description="Try adjusting your search."
                        />
                    ) : (
                        <div className="divide-y divide-border/60">
                            {sorted.map((team, i) => (
                                <div
                                    key={team.id}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors"
                                >
                                    {/* Rank */}
                                    <span
                                        className={cn(
                                            "w-6 text-center text-xs font-bold",
                                            i === 0
                                                ? "text-amber-500"
                                                : i === 1
                                                    ? "text-muted-foreground"
                                                    : i === 2
                                                        ? "text-amber-700"
                                                        : "text-muted-foreground/60"
                                        )}
                                    >
                                        {i + 1}
                                    </span>

                                    {/* Name */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-foreground truncate">
                                            {team.name}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground truncate">
                                            {team.league}
                                        </p>
                                    </div>

                                    {/* Played */}
                                    <span className="w-8 text-center text-xs text-muted-foreground">
                                        {team.played}
                                    </span>

                                    {/* W / D / L */}
                                    <span className="hidden sm:block w-6 text-center text-xs font-semibold text-emerald-600">
                                        {team.wins}
                                    </span>
                                    <span className="hidden sm:block w-6 text-center text-xs text-muted-foreground">
                                        {team.draws}
                                    </span>
                                    <span className="hidden sm:block w-6 text-center text-xs text-destructive/80">
                                        {team.losses}
                                    </span>

                                    {/* GD */}
                                    <span
                                        className={cn(
                                            "hidden md:block w-8 text-center text-xs font-semibold",
                                            team.goalDiff > 0
                                                ? "text-emerald-600"
                                                : team.goalDiff < 0
                                                    ? "text-destructive"
                                                    : "text-muted-foreground"
                                        )}
                                    >
                                        {team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}
                                    </span>

                                    {/* Pts */}
                                    <span className="w-8 text-center text-xs font-bold text-foreground">
                                        {team.points}
                                    </span>

                                    {/* Win rate bar */}
                                    <div className="hidden md:block w-28">
                                        <WinRateBar value={team.winRate} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default TeamStatsPage;
