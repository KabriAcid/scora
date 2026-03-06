import { Search, X, MapPin, LayoutList, Zap, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Nigerian states shortlist (expand as needed) ─────────────────────────────
export const NIGERIAN_STATES = [
    "All States",
    "Kano",
    "Kaduna",
    "Katsina",
    "Gombe",
    "Jigawa",
    "Bauchi",
    "Borno",
    "Niger",
    "Sokoto",
    "Zamfara",
] as const;

export const STATUS_OPTIONS = ["All", "Active", "Upcoming", "Completed"] as const;

const STATUS_ICONS: Record<typeof STATUS_OPTIONS[number], React.ReactNode> = {
    All: <LayoutList className="w-3 h-3" />,
    Active: <Zap className="w-3 h-3" />,
    Upcoming: <Clock className="w-3 h-3" />,
    Completed: <CheckCircle2 className="w-3 h-3" />,
};

export interface LeagueFilterState {
    search: string;
    state: string;
    status: string;
}

interface LeagueFiltersProps {
    filters: LeagueFilterState;
    onChange: (next: LeagueFilterState) => void;
    totalCount: number;
    filteredCount: number;
}

export const LeagueFilters = ({
    filters,
    onChange,
    totalCount,
    filteredCount,
}: LeagueFiltersProps) => {
    const set = (partial: Partial<LeagueFilterState>) =>
        onChange({ ...filters, ...partial });

    const hasActiveFilters =
        filters.search !== "" ||
        filters.state !== "All States" ||
        filters.status !== "All";

    const reset = () =>
        onChange({ search: "", state: "All States", status: "All" });

    return (
        <div className="space-y-3">
            {/* Top row: search + selects */}
            <div className="flex flex-col sm:flex-row gap-2">
                {/* Search */}
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search leagues…"
                        value={filters.search}
                        onChange={(e) => set({ search: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 h-9 text-sm bg-secondary border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                    {filters.search && (
                        <button
                            onClick={() => set({ search: "" })}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* State dropdown */}
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    <select
                        value={filters.state}
                        onChange={(e) => set({ state: e.target.value })}
                        className="h-9 pl-8 pr-3 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition min-w-[140px]"
                    >
                        {NIGERIAN_STATES.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Status pills + count */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                    {STATUS_OPTIONS.map((s) => (
                        <button
                            key={s}
                            onClick={() => set({ status: s })}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
                                filters.status === s
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {STATUS_ICONS[s]}
                            {s}
                        </button>
                    ))}

                    {hasActiveFilters && (
                        <button
                            onClick={reset}
                            className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                        >
                            <X className="w-3 h-3" />
                            Clear
                        </button>
                    )}
                </div>

                <p className="text-xs text-muted-foreground">
                    {filteredCount === totalCount
                        ? `${totalCount} league${totalCount !== 1 ? "s" : ""}`
                        : `${filteredCount} of ${totalCount}`}
                </p>
            </div>
        </div>
    );
};
