import { Search } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export type FixtureStatusFilter =
  | "All"
  | "Scheduled"
  | "Live"
  | "Completed"
  | "Postponed";

interface FixtureFiltersProps {
  search: string;
  league: string;
  status: FixtureStatusFilter;
  count: number;
  leagues: string[];
  onSearch: (v: string) => void;
  onLeague: (v: string) => void;
  onStatus: (v: FixtureStatusFilter) => void;
}

const STATUSES: FixtureStatusFilter[] = [
  "All",
  "Scheduled",
  "Live",
  "Completed",
  "Postponed",
];

const statusColor: Record<FixtureStatusFilter, string> = {
  All: "bg-secondary text-foreground border-border",
  Scheduled: "bg-primary/10 text-primary border-primary/20",
  Live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Completed: "bg-muted text-muted-foreground border-border",
  Postponed: "bg-destructive/10 text-destructive border-destructive/20",
};

export const FixtureFilters = ({
  search,
  league,
  status,
  count,
  leagues,
  onSearch,
  onLeague,
  onStatus,
}: FixtureFiltersProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search teams, stadium…"
          className="w-full pl-8 pr-3 py-2 text-xs bg-secondary border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <select
        value={league}
        onChange={(e) => onLeague(e.target.value)}
        className="px-3 py-2 text-xs bg-secondary border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground cursor-pointer"
      >
        <option value="All Leagues">All Leagues</option>
        {leagues.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>
      <span className="ml-auto text-[11px] text-muted-foreground font-medium">
        {count} fixture{count !== 1 ? "s" : ""}
      </span>
    </div>

    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pr-1">
        Status:
      </span>
      {STATUSES.map((s) => (
        <button
          key={s}
          onClick={() => onStatus(s)}
          className={cn(
            "px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-all flex items-center gap-1",
            status === s
              ? statusColor[s]
              : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary",
          )}
        >
          {s === "Live" && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          )}
          {s}
        </button>
      ))}
    </div>
  </div>
);
