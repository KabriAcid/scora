import { Search } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { NIGERIAN_STATES } from "../teams/TeamFilters";

export type AgentStatusFilter = "All" | "Active" | "Inactive" | "Pending";

interface AgentFiltersProps {
  search: string;
  state: string;
  status: AgentStatusFilter;
  count: number;
  onSearch: (v: string) => void;
  onState: (v: string) => void;
  onStatus: (v: AgentStatusFilter) => void;
}

const STATUSES: AgentStatusFilter[] = ["All", "Active", "Inactive", "Pending"];

const statusColor: Record<AgentStatusFilter, string> = {
  All: "bg-secondary text-foreground border-border",
  Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Inactive: "bg-muted text-muted-foreground border-border",
  Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

export const AgentFilters = ({
  search,
  state,
  status,
  count,
  onSearch,
  onState,
  onStatus,
}: AgentFiltersProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search agents…"
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
        {count} agent{count !== 1 ? "s" : ""}
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
);
