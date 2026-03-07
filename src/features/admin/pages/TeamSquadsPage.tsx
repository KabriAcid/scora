import { useState, useMemo } from "react";
import { Search, BookUser, Users, MapPin, Trophy, ChevronDown, ChevronRight } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { teamSummaries } from "@/data/adminMockData";
import type { TeamSummary } from "@/data/adminMockData";
import { cn } from "@/shared/utils/cn";
import { EmptyState } from "../components/EmptyState";

// ─── Mock squad roster (shared across teams for demo) ─────────────────────────

const POSITIONS = ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LW", "RW", "ST"] as const;
type Position = (typeof POSITIONS)[number];

interface Player {
    id: string;
    name: string;
    position: Position;
    number: number;
    age: number;
}

function generateSquad(teamId: string, count: number): Player[] {
    const names = [
        "Musa Ibrahim", "Umar Sani", "Lawal Bello", "Aliyu Hassan", "Yusuf Garba",
        "Ahmed Salisu", "Idris Kabir", "Abubakar Tukur", "Bashir Danladi", "Suleiman Haruna",
        "Abdullahi Faruk", "Ibrahim Maikano", "Haliru Musa", "Tijani Bako", "Yakubu Sha'aba",
        "Nuhu Rambo", "Rabiu Gargo", "Sani Kakaki", "Kabiru Rafin", "Aminu Dogon",
        "Sadiq Wanka", "Lawali Gobir", "Rabi'u Zauro", "Tanimu Kwana", "Muhammed Yari",
    ];
    return Array.from({ length: count }, (_, i) => ({
        id: `${teamId}-p${i + 1}`,
        name: names[i % names.length],
        position: POSITIONS[i % POSITIONS.length],
        number: i + 1,
        age: 18 + Math.floor(Math.random() * 14),
    }));
}

// ─── Position badge colors ─────────────────────────────────────────────────────

const POS_COLORS: Record<Position, string> = {
    GK: "bg-amber-500/10 text-amber-600",
    CB: "bg-blue-500/10 text-blue-600",
    LB: "bg-blue-500/10 text-blue-600",
    RB: "bg-blue-500/10 text-blue-600",
    CDM: "bg-emerald-500/10 text-emerald-600",
    CM: "bg-emerald-500/10 text-emerald-600",
    CAM: "bg-purple-500/10 text-purple-600",
    LW: "bg-destructive/10 text-destructive",
    RW: "bg-destructive/10 text-destructive",
    ST: "bg-destructive/10 text-destructive",
};

// ─── Squad card ───────────────────────────────────────────────────────────────

interface SquadCardProps {
    team: TeamSummary;
}

const SquadCard = ({ team }: SquadCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const players = useMemo(() => generateSquad(team.id, team.players), [team.id, team.players]);
    const preview = players.slice(0, 5);

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Card header */}
            <button
                onClick={() => setExpanded((v) => !v)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 transition-colors text-left"
            >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{team.shortCode}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{team.name}</p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {team.state}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Trophy className="w-3 h-3" />
                            {team.league}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Users className="w-3 h-3" />
                            {team.players} players
                        </span>
                    </div>
                </div>

                {/* Chevron */}
                {expanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
            </button>

            {/* Player list */}
            {expanded && (
                <div className="border-t border-border">
                    {/* Column headers */}
                    <div className="flex items-center gap-3 px-4 py-2 bg-secondary/30">
                        <p className="w-8 text-[10px] font-semibold text-muted-foreground uppercase">#</p>
                        <p className="flex-1 text-[10px] font-semibold text-muted-foreground uppercase">
                            Name
                        </p>
                        <p className="w-12 text-[10px] font-semibold text-muted-foreground uppercase text-center">
                            Pos
                        </p>
                        <p className="w-10 text-[10px] font-semibold text-muted-foreground uppercase text-center">
                            Age
                        </p>
                    </div>
                    <div className="divide-y divide-border/40">
                        {players.map((p) => (
                            <div
                                key={p.id}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/30 transition-colors"
                            >
                                <span className="w-8 text-xs font-mono text-muted-foreground">
                                    {p.number}
                                </span>
                                <span className="flex-1 text-xs font-medium text-foreground truncate">
                                    {p.name}
                                </span>
                                <span
                                    className={cn(
                                        "w-12 text-center text-[11px] font-semibold px-1.5 py-0.5 rounded-full",
                                        POS_COLORS[p.position]
                                    )}
                                >
                                    {p.position}
                                </span>
                                <span className="w-10 text-center text-xs text-muted-foreground">
                                    {p.age}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Collapsed preview */}
            {!expanded && (
                <div className="border-t border-border px-4 py-2.5 flex items-center gap-2">
                    {preview.map((p) => (
                        <span
                            key={p.id}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium"
                            title={p.name}
                        >
                            {p.position}
                        </span>
                    ))}
                    {team.players > 5 && (
                        <span className="text-[10px] text-muted-foreground">
                            +{team.players - 5} more
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const TeamSquadsPage = () => {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (!search) return teamSummaries;
        const q = search.toLowerCase();
        return teamSummaries.filter(
            (t) =>
                t.name.toLowerCase().includes(q) ||
                t.state.toLowerCase().includes(q) ||
                t.league.toLowerCase().includes(q)
        );
    }, [search]);

    return (
        <AdminLayout>
            <div className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BookUser className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-foreground">Squads</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Browse and manage team rosters
                        </p>
                    </div>
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

                {/* Cards */}
                {filtered.length === 0 ? (
                    <EmptyState
                        icon={<BookUser className="w-7 h-7" />}
                        title="No teams found"
                        description="Try adjusting your search."
                    />
                ) : (
                    <div className="space-y-3">
                        {filtered.map((team) => (
                            <SquadCard key={team.id} team={team} />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default TeamSquadsPage;
