import { useState } from "react";
import { ListOrdered, Trophy, MapPin, CalendarDays } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { topLeagues } from "@/data/adminMockData";
import { EmptyState } from "../components/EmptyState";
import { cn } from "@/shared/utils/cn";

// ─── Mock standings data ───────────────────────────────────────────────────────

interface StandingRow {
    pos: number;
    team: string;
    p: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    pts: number;
}

const mockStandings: StandingRow[] = [
    { pos: 1, team: "Kano Pillars", p: 28, w: 18, d: 6, l: 4, gf: 52, ga: 22, pts: 60 },
    { pos: 2, team: "Remo Stars", p: 28, w: 16, d: 7, l: 5, gf: 44, ga: 24, pts: 55 },
    { pos: 3, team: "Enyimba FC", p: 28, w: 14, d: 8, l: 6, gf: 41, ga: 29, pts: 50 },
    { pos: 4, team: "Rangers Int'l", p: 28, w: 13, d: 9, l: 6, gf: 38, ga: 27, pts: 48 },
    { pos: 5, team: "Heartland FC", p: 28, w: 12, d: 7, l: 9, gf: 35, ga: 31, pts: 43 },
    { pos: 6, team: "Sunshine Stars", p: 28, w: 10, d: 10, l: 8, gf: 32, ga: 30, pts: 40 },
    { pos: 7, team: "Wikki Tourists", p: 28, w: 9, d: 8, l: 11, gf: 28, ga: 33, pts: 35 },
    { pos: 8, team: "Lobi Stars", p: 28, w: 8, d: 9, l: 11, gf: 26, ga: 34, pts: 33 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const LeagueStandingsPage = () => {
    const [selectedLeague, setSelectedLeague] = useState(topLeagues[0]?.id ?? "");
    const [selectedSeason, setSelectedSeason] = useState("2024/25");

    const league = topLeagues.find((l) => l.id === selectedLeague);
    const hasData = !!league && mockStandings.length > 0;

    return (
        <AdminLayout>
            <div className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ListOrdered className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-foreground">Standings</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            View league table for any competition and season
                        </p>
                    </div>
                </div>

                {/* Selectors */}
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
                            className="h-9 px-3 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition min-w-[120px]"
                        >
                            {["2024/25", "2023/24", "2022/23"].map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    {/* Title strip */}
                    <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        <p className="text-sm font-semibold text-foreground">
                            {league?.name ?? "—"}{" "}
                            <span className="text-muted-foreground font-normal">
                                · {selectedSeason}
                            </span>
                        </p>
                    </div>

                    {!hasData ? (
                        <EmptyState
                            icon={<ListOrdered className="w-7 h-7" />}
                            title="No standings available"
                            description="Select a league and season to view the standings table."
                        />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="bg-secondary/30 text-muted-foreground">
                                        <th className="px-4 py-2.5 text-left font-semibold w-8">#</th>
                                        <th className="px-4 py-2.5 text-left font-semibold">Team</th>
                                        <th className="px-3 py-2.5 text-center font-semibold">P</th>
                                        <th className="px-3 py-2.5 text-center font-semibold">W</th>
                                        <th className="px-3 py-2.5 text-center font-semibold">D</th>
                                        <th className="px-3 py-2.5 text-center font-semibold">L</th>
                                        <th className="px-3 py-2.5 text-center font-semibold">GF</th>
                                        <th className="px-3 py-2.5 text-center font-semibold">GA</th>
                                        <th className="px-3 py-2.5 text-center font-semibold">GD</th>
                                        <th className="px-3 py-2.5 text-center font-semibold w-12">
                                            Pts
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {mockStandings.map((row) => (
                                        <tr
                                            key={row.pos}
                                            className={cn(
                                                "hover:bg-secondary/30 transition-colors",
                                                row.pos <= 2 && "bg-primary/5",
                                                row.pos >= mockStandings.length - 1 && "bg-destructive/5"
                                            )}
                                        >
                                            <td className="px-4 py-3 text-muted-foreground font-medium">
                                                {row.pos}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-foreground">
                                                {row.team}
                                            </td>
                                            <td className="px-3 py-3 text-center text-muted-foreground">
                                                {row.p}
                                            </td>
                                            <td className="px-3 py-3 text-center text-foreground">
                                                {row.w}
                                            </td>
                                            <td className="px-3 py-3 text-center text-muted-foreground">
                                                {row.d}
                                            </td>
                                            <td className="px-3 py-3 text-center text-muted-foreground">
                                                {row.l}
                                            </td>
                                            <td className="px-3 py-3 text-center text-muted-foreground">
                                                {row.gf}
                                            </td>
                                            <td className="px-3 py-3 text-center text-muted-foreground">
                                                {row.ga}
                                            </td>
                                            <td className="px-3 py-3 text-center text-muted-foreground">
                                                {row.gf - row.ga > 0
                                                    ? `+${row.gf - row.ga}`
                                                    : row.gf - row.ga}
                                            </td>
                                            <td className="px-3 py-3 text-center font-bold text-foreground">
                                                {row.pts}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Legend */}
                            <div className="px-4 py-3 border-t border-border flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-primary/20" />
                                    <span className="text-[10px] text-muted-foreground">
                                        Promotion zone
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-destructive/20" />
                                    <span className="text-[10px] text-muted-foreground">
                                        Relegation zone
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default LeagueStandingsPage;
