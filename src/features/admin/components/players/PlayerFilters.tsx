import { Search, Layers, MapPin } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { NIGERIAN_STATES } from "../teams/TeamFilters";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PlayerPosition = "All" | "GK" | "DEF" | "MID" | "FWD";
export type PlayerStatus = "All" | "Active" | "Injured" | "Suspended";

export interface PlayerFilterState {
  search: string;
  position: PlayerPosition;
  status: PlayerStatus;
  state: string;
}

// ─── Pill sets ────────────────────────────────────────────────────────────────

const POSITIONS: PlayerPosition[] = ["All", "GK", "DEF", "MID", "FWD"];

const POSITION_COLORS: Record<PlayerPosition, string> = {
  All: "bg-secondary text-foreground border-border",
  GK: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  DEF: "bg-primary/10 text-primary border-primary/20",
  MID: "bg-accent/10 text-accent border-accent/20",
  FWD: "bg-destructive/10 text-destructive border-destructive/20",
};

const POSITION_ACTIVE: Record<PlayerPosition, string> = {
  All: "bg-foreground text-background border-foreground",
  GK: "bg-yellow-500 text-white border-yellow-500",
  DEF: "bg-primary text-primary-foreground border-primary",
  MID: "bg-accent text-white border-accent",
  FWD: "bg-destructive text-white border-destructive",
};

const STATUSES: PlayerStatus[] = ["All", "Active", "Injured", "Suspended"];

const STATUS_COLORS: Record<PlayerStatus, string> = {
  All: "bg-secondary text-foreground border-border",
  Active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Injured: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Suspended: "bg-destructive/10 text-destructive border-destructive/20",
};
const STATUS_ACTIVE: Record<PlayerStatus, string> = {
  All: "bg-foreground text-background border-foreground",
  Active: "bg-emerald-500 text-white border-emerald-500",
  Injured: "bg-yellow-500 text-white border-yellow-500",
  Suspended: "bg-destructive text-white border-destructive",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface PlayerFiltersProps {
  filters: PlayerFilterState;
  onChange: (f: PlayerFilterState) => void;
  totalCount: number;
  filteredCount: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PlayerFilters = ({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: PlayerFiltersProps) => {
  const set = <K extends keyof PlayerFilterState>(
    key: K,
    value: PlayerFilterState[K],
  ) => onChange({ ...filters, [key]: value });

  const stateOptions = NIGERIAN_STATES;

  return (
    <div className="space-y-3">
      {/* Row 1 — search + state */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search players, teams…"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          />
        </div>

        {/* State */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={filters.state}
            onChange={(e) => set("state", e.target.value)}
            className="pl-8 pr-7 py-2 text-xs bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none transition-colors"
          >
            {stateOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Count badge */}
        <span className="ml-auto text-[11px] text-muted-foreground flex items-center gap-1">
          <Layers className="w-3 h-3" />
          {filteredCount !== totalCount
            ? `${filteredCount} of ${totalCount}`
            : `${totalCount} players`}
        </span>
      </div>

      {/* Row 2 — position pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-medium text-muted-foreground mr-1">
          Position:
        </span>
        {POSITIONS.map((pos) => (
          <button
            key={pos}
            onClick={() => set("position", pos)}
            className={cn(
              "px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all",
              filters.position === pos
                ? POSITION_ACTIVE[pos]
                : POSITION_COLORS[pos],
            )}
          >
            {pos}
          </button>
        ))}

        <div className="h-4 w-px bg-border mx-1" />

        <span className="text-[11px] font-medium text-muted-foreground mr-1">
          Status:
        </span>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => set("status", s)}
            className={cn(
              "px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all",
              filters.status === s ? STATUS_ACTIVE[s] : STATUS_COLORS[s],
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
