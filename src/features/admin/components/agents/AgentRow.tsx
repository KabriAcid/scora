import { MoreHorizontal, Pencil, Trash2, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/utils/cn";
import type { AgentSummary } from "@/data/adminMockData";

const statusStyles: Record<
  AgentSummary["status"],
  { badge: string; dot: string }
> = {
  Active: {
    badge: "bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500 animate-pulse",
  },
  Inactive: {
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  Pending: { badge: "bg-yellow-500/10 text-yellow-500", dot: "bg-yellow-500" },
};

interface AgentRowProps {
  agent: AgentSummary;
  onEdit: (agent: AgentSummary) => void;
  onDelete: (id: string) => void;
}

export const AgentRow = ({ agent, onEdit, onDelete }: AgentRowProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { badge, dot } = statusStyles[agent.status];
  const initials = agent.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const accuracyColor =
    agent.accuracy >= 90
      ? "text-emerald-500"
      : agent.accuracy >= 75
        ? "text-yellow-500"
        : "text-destructive";

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/40 transition-colors group">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-[11px] font-bold text-primary">{initials}</span>
      </div>

      {/* Name + code + state */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs font-semibold text-foreground truncate">
            {agent.name}
          </p>
          <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold tracking-wider">
            {agent.agentCode}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground truncate">
          {agent.state}
        </p>
      </div>

      {/* Matches logged */}
      <div className="hidden md:flex flex-col items-center w-20 gap-0.5">
        <div className="flex items-center gap-1">
          <UserCircle2 className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">
            {agent.matchesLogged}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">matches</span>
      </div>

      {/* Accuracy */}
      <div className="hidden md:flex flex-col items-center w-16 gap-0.5">
        <span className={cn("text-xs font-bold tabular-nums", accuracyColor)}>
          {agent.accuracy}%
        </span>
        <span className="text-[10px] text-muted-foreground">accuracy</span>
      </div>

      {/* Status */}
      <div className="hidden sm:flex items-center gap-1.5 min-w-[90px]">
        <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dot)} />
        <span
          className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded-full",
            badge,
          )}
        >
          {agent.status}
        </span>
      </div>

      {/* Actions */}
      <div className="relative w-8">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 top-9 z-20 bg-card border border-border rounded-xl shadow-lg min-w-[130px] py-1 overflow-hidden">
              <button
                onClick={() => {
                  onEdit(agent);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-secondary transition-colors text-foreground"
              >
                <Pencil className="w-3.5 h-3.5 text-muted-foreground" /> Edit
                Agent
              </button>
              <button
                onClick={() => {
                  onDelete(agent.id);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-destructive/10 transition-colors text-destructive"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
