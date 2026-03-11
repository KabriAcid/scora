import { Search } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { NIGERIAN_STATES } from "../teams/TeamFilters";

export type SurfaceFilter = "All" | "Natural Grass" | "Artificial Turf";
export type StadiumStatusFilter =
  | "All"
  | "Active"
  | "Under Renovation"
  | "Inactive";

interface StadiumFiltersProps {
  search: string;
  state: string;
  surface: SurfaceFilter;
  status: StadiumStatusFilter;
  count: number;
  onSearch: (v: string) => void;
  onState: (v: string) => void;
  onSurface: (v: SurfaceFilter) => void;
  onStatus: (v: StadiumStatusFilter) => void;
}

const SURFACES: SurfaceFilter[] = ["All", "Natural Grass", "Artificial Turf"];
const STATUSES: StadiumStatusFilter[] = [
  "All",
  "Active",
  "Under Renovation",
  "Inactive",
];

const surfaceColor: Record<SurfaceFilter, string> = {
  All: "bg-secondary text-foreground border-border",
  "Natural Grass": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Artificial Turf": "bg-sky-500/10 text-sky-400 border-sky-400/20",
};
const statusColor: Record<StadiumStatusFilter, string> = {
  All: "bg-secondary text-foreground border-border",
  Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Under Renovation": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Inactive: "bg-muted text-muted-foreground border-border",
};

export const StadiumFilters = ({
  search,
  state,
  surface,
  status,
  count,
  onSearch,
  onState,
  onSurface,
  onStatus,
}: StadiumFiltersProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search stadiums…"
          className="w-full pl-8 pr-3 py-2 text-xs bg-secondary border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <select
        value={state}
        onChange={(e) => onState(e.target.value)}
        className="px-3 py-2 text-xs bg-secondary border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground cursor-pointer"
      >
        {NIGERIAN_STATES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <span className="ml-auto text-[11px] text-muted-foreground font-medium">
        {count} venue{count !== 1 ? "s" : ""}
      </span>
    </div>

    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pr-1">
          Surface:
        </span>
        {SURFACES.map((s) => (
          <button
            key={s}
            onClick={() => onSurface(s)}
            className={cn(
              "px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-all",
              surface === s
                ? surfaceColor[s]
                : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="w-px h-4 bg-border" />
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pr-1">
          Status:
        </span>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatus(s)}
            className={cn(
              "px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-all",
              status === s
                ? statusColor[s]
                : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary",
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  </div>
);
