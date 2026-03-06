import { useState } from "react";
import { Plus, Layers, Calendar, CheckCircle2, Clock, Trophy, CalendarDays } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { topLeagues } from "@/data/adminMockData";
import { EmptyState } from "../components/EmptyState";
import { SeasonModal } from "../components/leagues/SeasonModal";
import type { SeasonFormData } from "../components/leagues/SeasonModal";
import { cn } from "@/shared/utils/cn";

// ─── Mock season data ─────────────────────────────────────────────────────────

interface Season {
    id: string;
    label: string;
    leagueId: string;
    startDate: string;
    endDate: string;
    teams: number;
    fixtures: number;
    completed: number;
    status: "Active" | "Upcoming" | "Completed";
}

const mockSeasons: Season[] = [
    {
        id: "s1",
        label: "2024/25",
        leagueId: "l1",
        startDate: "Sep 2024",
        endDate: "May 2025",
        teams: 16,
        fixtures: 60,
        completed: 48,
        status: "Active",
    },
    {
        id: "s2",
        label: "2023/24",
        leagueId: "l1",
        startDate: "Sep 2023",
        endDate: "May 2024",
        teams: 16,
        fixtures: 60,
        completed: 60,
        status: "Completed",
    },
    {
        id: "s3",
        label: "2025/26",
        leagueId: "l1",
        startDate: "Sep 2025",
        endDate: "May 2026",
        teams: 16,
        fixtures: 60,
        completed: 0,
        status: "Upcoming",
    },
];

// ─── Season Card ──────────────────────────────────────────────────────────────

const SeasonCard = ({ season }: { season: Season }) => {
    const pct =
        season.fixtures > 0
            ? Math.round((season.completed / season.fixtures) * 100)
            : 0;

    const statusStyles: Record<Season["status"], string> = {
        Active: "text-emerald-500",
        Upcoming: "text-primary",
        Completed: "text-muted-foreground",
    };

    const StatusIcon =
        season.status === "Completed"
            ? CheckCircle2
            : season.status === "Active"
                ? Clock
                : Calendar;

    return (
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3 hover:border-primary/30 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-sm font-bold text-foreground">{season.label}</p>
                    <p className="text-xs text-muted-foreground">
                        {season.startDate} – {season.endDate}
                    </p>
                </div>
                <div
                    className={cn(
                        "flex items-center gap-1 text-[11px] font-semibold",
                        statusStyles[season.status]
                    )}
                >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {season.status}
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-secondary/50 rounded-lg py-2">
                    <p className="text-sm font-bold text-foreground">{season.teams}</p>
                    <p className="text-[10px] text-muted-foreground">Teams</p>
                </div>
                <div className="bg-secondary/50 rounded-lg py-2">
                    <p className="text-sm font-bold text-foreground">{season.fixtures}</p>
                    <p className="text-[10px] text-muted-foreground">Fixtures</p>
                </div>
                <div className="bg-secondary/50 rounded-lg py-2">
                    <p className="text-sm font-bold text-foreground">{pct}%</p>
                    <p className="text-[10px] text-muted-foreground">Done</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Fixtures completed</span>
                    <span>
                        {season.completed}/{season.fixtures}
                    </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const LeagueSeasonsPage = () => {
    const [selectedLeague, setSelectedLeague] = useState(topLeagues[0]?.id ?? "");
    const [seasons, setSeasons] = useState<Season[]>(mockSeasons);
    const [modalOpen, setModalOpen] = useState(false);

    const league = topLeagues.find((l) => l.id === selectedLeague);
    const filteredSeasons = seasons.filter((s) => s.leagueId === selectedLeague);

    const handleSave = (data: SeasonFormData) => {
        const newSeason: Season = {
            id: `s-${Date.now()}`,
            label: data.label,
            leagueId: selectedLeague,
            startDate: `${data.startMonth} ${data.startYear}`,
            endDate: `${data.endMonth} ${data.endYear}`,
            teams: data.teams,
            fixtures: 0,
            completed: 0,
            status: data.status,
        };
        setSeasons((prev) => [newSeason, ...prev]);
    };

    return (
        <AdminLayout>
            <div className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Layers className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">Seasons</h1>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Manage seasons for each league
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-primary-foreground text-xs font-semibold rounded-xl hover:bg-accent/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Season
                    </button>
                </div>

                {/* League selector */}
                <div className="flex flex-col gap-1.5 max-w-xs">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Trophy className="w-3 h-3" /> League
                    </label>
                    <select
                        value={selectedLeague}
                        onChange={(e) => setSelectedLeague(e.target.value)}
                        className="h-9 px-3 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                        {topLeagues.map((l) => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* League info strip */}
                {league && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Trophy className="w-3.5 h-3.5 text-primary" />
                        <span className="font-semibold text-foreground">{league.name}</span>
                        <span>·</span>
                        <CalendarDays className="w-3 h-3" />
                        <span>{league.state}</span>
                        <span>·</span>
                        <span>{league.teams} teams</span>
                    </div>
                )}

                {/* Season cards / empty */}
                {filteredSeasons.length === 0 ? (
                    <EmptyState
                        icon={<Layers className="w-7 h-7" />}
                        title="No seasons yet"
                        description="Create the first season to set up fixtures and standings."
                        action={{ label: "New Season", onClick: () => setModalOpen(true) }}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSeasons.map((s) => (
                            <SeasonCard key={s.id} season={s} />
                        ))}
                    </div>
                )}

                {/* Modal */}
                <SeasonModal
                    leagueName={league?.name ?? ""}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />
            </div>
        </AdminLayout>
    );
};

export default LeagueSeasonsPage;
