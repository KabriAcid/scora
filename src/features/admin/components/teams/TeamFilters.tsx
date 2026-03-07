import { Search, MapPin, LayoutList, Zap, PowerOff, ShieldAlert } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Nigerian states ──────────────────────────────────────────────────────────

export const NIGERIAN_STATES = [
    "All States",
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
    "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa",
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
    "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

// ─── Types ────────────────────────────────────────────────────────────────────

export type TeamStatus = "All" | "Active" | "Inactive" | "Suspended";

export interface TeamFilterState {
    search: string;
    state: string;
    status: TeamStatus;
}

// ─── Status icon map ──────────────────────────────────────────────────────────

const STATUS_ICONS: Record<TeamStatus, React.ReactNode> = {
    All: <LayoutList className="w-3 h-3" />,
    Active: <Zap className="w-3 h-3" />,
    Inactive: <PowerOff className="w-3 h-3" />,
    Suspended: <ShieldAlert className="w-3 h-3" />,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface TeamFiltersProps {
    filters: TeamFilterState;
    onChange: (filters: TeamFilterState) => void;
    totalCount: number;
    filteredCount: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TeamFilters = ({
    filters,
    onChange,
    totalCount,
    filteredCount,
}: TeamFiltersProps) => {
    const STATUS_OPTIONS: TeamStatus[] = ["All", "Active", "Inactive", "Suspended"];

    const set = <K extends keyof TeamFilterState>(key: K, value: TeamFilterState[K]) =>
        onChange({ ...filters, [key]: value });

    return (
        <div className="space-y-3">
            {/* Search + state row */}
            <div className="flex items-center gap-2 flex-wrap">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search teams…"
                        value={filters.search}
                        onChange={(e) => set("search", e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                </div>

                {/* State select */}
                <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                    <select
                        value={filters.state}
                        onChange={(e) => set("state", e.target.value)}
                        className="pl-7 pr-7 py-2 text-xs bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none cursor-pointer"
                    >
                        {NIGERIAN_STATES.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Count badge */}
                <span className="ml-auto text-[11px] text-muted-foreground flex-shrink-0">
                    {filteredCount === totalCount
                        ? `${totalCount} teams`
                        : `${filteredCount} of ${totalCount}`}
                </span>
            </div>

            {/* Status pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
                {STATUS_OPTIONS.map((s) => (
                    <button
                        key={s}
                        onClick={() => set("status", s)}
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
            </div>
        </div>
    );
};
