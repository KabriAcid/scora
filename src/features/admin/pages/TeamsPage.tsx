import { useState, useMemo } from "react";
import { Plus, Shield } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { teamSummaries } from "@/data/adminMockData";
import type { TeamSummary } from "@/data/adminMockData";
import { TeamFilters } from "../components/teams/TeamFilters";
import type { TeamFilterState } from "../components/teams/TeamFilters";
import { TeamRow } from "../components/teams/TeamRow";
import { TeamModal } from "../components/teams/TeamModal";
import { EmptyState } from "../components/EmptyState";

// ─── Page ─────────────────────────────────────────────────────────────────────

const TeamsPage = () => {
    // ── State ───────────────────────────────────────────────────────────────────
    const [teams, setTeams] = useState<TeamSummary[]>(teamSummaries);
    const [filters, setFilters] = useState<TeamFilterState>({
        search: "",
        state: "All States",
        status: "All",
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<TeamSummary | undefined>();

    // ── Filtered list ──────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        return teams.filter((t) => {
            const matchesSearch =
                !filters.search ||
                t.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                t.shortCode.toLowerCase().includes(filters.search.toLowerCase()) ||
                t.league.toLowerCase().includes(filters.search.toLowerCase());
            const matchesState =
                filters.state === "All States" || t.state === filters.state;
            const matchesStatus =
                filters.status === "All" || t.status === filters.status;
            return matchesSearch && matchesState && matchesStatus;
        });
    }, [teams, filters]);

    // ── Handlers ───────────────────────────────────────────────────────────────
    const openCreate = () => {
        setEditTarget(undefined);
        setModalOpen(true);
    };

    const openEdit = (team: TeamSummary) => {
        setEditTarget(team);
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setTeams((prev) => prev.filter((t) => t.id !== id));
        toast.success("Team removed");
    };

    const handleSave = (data: {
        name: string;
        shortCode: string;
        state: string;
        league: string;
        players: number;
        status: "Active" | "Inactive" | "Suspended";
    }) => {
        if (editTarget) {
            setTeams((prev) =>
                prev.map((t) =>
                    t.id === editTarget.id
                        ? {
                            ...t,
                            name: data.name,
                            shortCode: data.shortCode,
                            state: data.state,
                            league: data.league,
                            players: data.players,
                            status: data.status,
                        }
                        : t
                )
            );
        } else {
            const newTeam: TeamSummary = {
                id: `t-${Date.now()}`,
                name: data.name,
                shortCode: data.shortCode,
                state: data.state,
                league: data.league,
                players: data.players,
                wins: 0,
                draws: 0,
                losses: 0,
                status: data.status,
            };
            setTeams((prev) => [newTeam, ...prev]);
        }
    };

    const isFiltered =
        !!filters.search ||
        filters.state !== "All States" ||
        filters.status !== "All";

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <AdminLayout>
            <div className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-5xl mx-auto">
                {/* Page header */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">Teams</h1>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Manage clubs, assign leagues and build squads
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-primary-foreground text-xs font-semibold rounded-xl hover:bg-accent/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Team
                    </button>
                </div>

                {/* Filters */}
                <TeamFilters
                    filters={filters}
                    onChange={setFilters}
                    totalCount={teams.length}
                    filteredCount={filtered.length}
                />

                {/* Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    {/* Table header */}
                    <div className="flex items-center gap-4 px-4 py-2.5 border-b border-border bg-secondary/30">
                        <div className="w-9 flex-shrink-0" />
                        <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Team
                        </p>
                        <p className="hidden sm:block w-14 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
                            Players
                        </p>
                        <p className="hidden md:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Record
                        </p>
                        <p className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Status
                        </p>
                        <div className="w-8" />
                    </div>

                    {/* Rows */}
                    {filtered.length === 0 ? (
                        <EmptyState
                            icon={<Shield className="w-7 h-7" />}
                            title="No teams found"
                            description={
                                isFiltered
                                    ? "Try adjusting your filters to see more results."
                                    : "Get started by registering your first team."
                            }
                            action={
                                isFiltered
                                    ? undefined
                                    : { label: "New Team", onClick: openCreate }
                            }
                        />
                    ) : (
                        <div className="divide-y divide-border/60 px-2 py-1">
                            {filtered.map((team) => (
                                <TeamRow
                                    key={team.id}
                                    team={team}
                                    onEdit={openEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <TeamModal
                mode={editTarget ? "edit" : "create"}
                team={editTarget}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
            />
        </AdminLayout>
    );
};

export default TeamsPage;
