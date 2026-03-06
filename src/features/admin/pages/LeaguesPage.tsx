import { useState, useMemo } from "react";
import { Plus, Trophy } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { topLeagues } from "@/data/adminMockData";
import type { LeagueSummary } from "@/data/adminMockData";
import { LeagueFilters } from "../components/leagues/LeagueFilters";
import type { LeagueFilterState } from "../components/leagues/LeagueFilters";
import { LeagueRow } from "../components/leagues/LeagueRow";
import { LeagueModal } from "../components/leagues/LeagueModal";
import { EmptyState } from "../components/EmptyState";

// ─── Page ─────────────────────────────────────────────────────────────────────

const LeaguesPage = () => {
  // ── State ────────────────────────────────────────────────────────────────────
  const [leagues, setLeagues] = useState<LeagueSummary[]>(topLeagues);
  const [filters, setFilters] = useState<LeagueFilterState>({
    search: "",
    state: "All States",
    status: "All",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<LeagueSummary | undefined>();

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return leagues.filter((l) => {
      const matchesSearch =
        !filters.search ||
        l.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        l.state.toLowerCase().includes(filters.search.toLowerCase());
      const matchesState =
        filters.state === "All States" || l.state === filters.state;
      const matchesStatus =
        filters.status === "All" || l.status === filters.status;
      return matchesSearch && matchesState && matchesStatus;
    });
  }, [leagues, filters]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(undefined);
    setModalOpen(true);
  };

  const openEdit = (league: LeagueSummary) => {
    setEditTarget(league);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setLeagues((prev) => prev.filter((l) => l.id !== id));
    toast.success("League removed");
  };

  const handleSave = (data: {
    name: string;
    state: string;
    season: string;
    teams: number;
    status: "Active" | "Upcoming" | "Completed";
  }) => {
    if (editTarget) {
      setLeagues((prev) =>
        prev.map((l) =>
          l.id === editTarget.id
            ? { ...l, name: data.name, state: data.state, teams: data.teams, status: data.status }
            : l
        )
      );
    } else {
      const newLeague: LeagueSummary = {
        id: `l-${Date.now()}`,
        name: data.name,
        state: data.state,
        teams: data.teams,
        fixtures: 0,
        completed: 0,
        status: data.status,
      };
      setLeagues((prev) => [newLeague, ...prev]);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <div className="px-4 py-5 md:px-5 md:py-6 space-y-6 max-w-5xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Leagues</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage competitions and their configurations
              </p>
            </div>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-primary-foreground text-xs font-semibold rounded-xl hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New League
          </button>
        </div>

        {/* Filters */}
        <LeagueFilters
          filters={filters}
          onChange={setFilters}
          totalCount={leagues.length}
          filteredCount={filtered.length}
        />

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="flex items-center gap-4 px-4 py-2.5 border-b border-border bg-secondary/30">
            <p className="flex-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              League
            </p>
            <p className="hidden sm:block w-12 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
              Teams
            </p>
            <p className="hidden md:block w-32 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Progress
            </p>
            <p className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </p>
            <div className="w-8" />
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Trophy className="w-7 h-7" />}
              title="No leagues found"
              description={
                filters.search || filters.state !== "All States" || filters.status !== "All"
                  ? "Try adjusting your filters to see more results."
                  : "Get started by creating your first league."
              }
              action={
                filters.search || filters.state !== "All States" || filters.status !== "All"
                  ? undefined
                  : { label: "Create League", onClick: openCreate }
              }
            />
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((league) => (
                <LeagueRow
                  key={league.id}
                  league={league}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <LeagueModal
          mode={editTarget ? "edit" : "create"}
          league={editTarget}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
};

export default LeaguesPage;
