import { useState } from "react";
import { CalendarDays, Circle, CheckCircle2, Clock, AlertTriangle, Trophy, MapPin, LayoutList, Zap } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { topLeagues } from "@/data/adminMockData";
import { EmptyState } from "../components/EmptyState";
import { cn } from "@/shared/utils/cn";

// ─── Mock fixture data ────────────────────────────────────────────────────────

interface Fixture {
    id: string;
    leagueId: string;
    season: string;
    matchday: number;
    homeTeam: string;
    awayTeam: string;
    date: string;
    venue: string;
    score?: { home: number; away: number };
    status: "Completed" | "Scheduled" | "Live" | "Postponed";
}

const mockFixtures: Fixture[] = [
    {
        id: "f1",
        leagueId: "l1",
        season: "2024/25",
        matchday: 29,
        homeTeam: "Kano Pillars",
        awayTeam: "Remo Stars",
        date: "Sat 15 Mar 2025, 16:00",
        venue: "Sani Abacha Stadium",
        status: "Scheduled",
    },
    {
        id: "f2",
        leagueId: "l1",
        season: "2024/25",
        matchday: 28,
        homeTeam: "Enyimba FC",
        awayTeam: "Rangers Int'l",
        date: "Sat 8 Mar 2025, 16:00",
        venue: "Enyimba Int'l Stadium",
        score: { home: 2, away: 1 },
        status: "Completed",
    },
    {
        id: "f3",
        leagueId: "l1",
        season: "2024/25",
        matchday: 28,
        homeTeam: "Heartland FC",
        awayTeam: "Lobi Stars",
        date: "Sun 9 Mar 2025, 14:00",
        venue: "Dan Anyiam Stadium",
        score: { home: 0, away: 0 },
        status: "Completed",
    },
    {
        id: "f4",
        leagueId: "l1",
        season: "2024/25",
        matchday: 29,
        homeTeam: "Wikki Tourists",
        awayTeam: "Sunshine Stars",
        date: "Sat 15 Mar 2025, 14:00",
        venue: "Pantami Stadium",
        status: "Postponed",
    },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyles: Record<Fixture["status"], string> = {
    Completed: "bg-muted/60 text-muted-foreground",
    Scheduled: "bg-primary/10 text-primary",
    Live: "bg-emerald-500/10 text-emerald-500",
    Postponed: "bg-destructive/10 text-destructive",
};

// ─── Fixture row ──────────────────────────────────────────────────────────────

const FixtureRow = ({ fixture }: { fixture: Fixture }) => (
    <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 transition-colors">
        {/* Matchday */}
        <div className="hidden sm:flex flex-col items-center w-10 flex-shrink-0">
            <span className="text-[10px] text-muted-foreground leading-none">MD</span>
            <span className="text-sm font-bold text-foreground">{fixture.matchday}</span>
        </div>

        {/* Teams */}
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground truncate">
                    {fixture.homeTeam}
                </span>
                {fixture.score ? (
                    <span className="text-xs font-bold bg-secondary px-2 py-0.5 rounded flex-shrink-0">
                        {fixture.score.home} – {fixture.score.away}
                    </span>
                ) : (
                    <span className="text-xs text-muted-foreground flex-shrink-0">vs</span>
                )}
                <span className="text-sm font-semibold text-foreground truncate">
                    {fixture.awayTeam}
                </span>
            </div>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                <CalendarDays className="w-3 h-3 flex-shrink-0" />
                {fixture.date}
                <span className="mx-0.5">·</span>
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {fixture.venue}
            </p>
        </div>

        {/* Status */}
        <span
            className={cn(
                "hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0",
                statusStyles[fixture.status]
            )}
        >
            {fixture.status === "Live" && <Circle className="w-2 h-2 fill-emerald-500 animate-pulse" />}
            {fixture.status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
            {fixture.status === "Scheduled" && <Clock className="w-3 h-3" />}
            {fixture.status === "Postponed" && <AlertTriangle className="w-3 h-3" />}
            {fixture.status}
        </span>
    </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const LeagueFixturesPage = () => {
    const [selectedLeague, setSelectedLeague] = useState(topLeagues[0]?.id ?? "");
    const [selectedSeason, setSelectedSeason] = useState("2024/25");
    const [statusFilter, setStatusFilter] = useState<"All" | Fixture["status"]>("All");

    const allFixtures = mockFixtures.filter(
        (f) => f.leagueId === selectedLeague && f.season === selectedSeason
    );
    const filtered =
        statusFilter === "All"
            ? allFixtures
            : allFixtures.filter((f) => f.status === statusFilter);

    const league = topLeagues.find((l) => l.id === selectedLeague);

    return (
        <AdminLayout>
            <div className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CalendarDays className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-foreground">Fixtures</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Browse and manage match schedule by league and season
                        </p>
                    </div>
                </div>

                {/* Selectors row */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> League
                        </label>
                        <select
                            value={selectedLeague}
                            onChange={(e) => setSelectedLeague(e.target.value)}
                            className="h-9 px-3 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition min-w-[200px]"
                        >
                            {topLeagues.map((l) => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" /> Season
                        </label>
                        <select
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(e.target.value)}
                            className="h-9 px-3 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                        >
                            {["2024/25", "2023/24", "2022/23"].map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Status pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    {(["All", "Scheduled", "Live", "Completed", "Postponed"] as const).map(
                        (s) => {
                            const icon =
                                s === "All" ? <LayoutList className="w-3 h-3" /> :
                                    s === "Scheduled" ? <Clock className="w-3 h-3" /> :
                                        s === "Live" ? <Zap className="w-3 h-3" /> :
                                            s === "Completed" ? <CheckCircle2 className="w-3 h-3" /> :
                                                <AlertTriangle className="w-3 h-3" />;
                            return (
                                <button
                                    key={s}
                                    onClick={() => setStatusFilter(s)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
                                        statusFilter === s
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    {icon}
                                    {s}
                                </button>
                            );
                        }
                    )}
                </div>

                {/* Fixture list */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    {/* Title */}
                    <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-foreground">
                            {league?.name ?? "—"}{" "}
                            <span className="text-muted-foreground font-normal">
                                · {selectedSeason}
                            </span>
                        </p>
                    </div>

                    {filtered.length === 0 ? (
                        <EmptyState
                            icon={<CalendarDays className="w-7 h-7" />}
                            title="No fixtures found"
                            description={
                                statusFilter !== "All"
                                    ? `No ${statusFilter.toLowerCase()} fixtures for this selection.`
                                    : "No fixtures exist for this league and season yet."
                            }
                        />
                    ) : (
                        <div className="divide-y divide-border">
                            {filtered.map((f) => (
                                <FixtureRow key={f.id} fixture={f} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default LeagueFixturesPage;
