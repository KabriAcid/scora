import {
  MoreHorizontal,
  Pencil,
  Trash2,
  MapPin,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/utils/cn";
import type { FixtureSummary } from "@/data/adminMockData";

const statusStyles: Record<
  FixtureSummary["status"],
  { badge: string; dot: string }
> = {
  Scheduled: { badge: "bg-primary/10 text-primary", dot: "bg-primary" },
  Live: {
    badge: "bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500 animate-pulse",
  },
  Completed: {
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  Postponed: {
    badge: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
};

interface FixtureRowProps {
  fixture: FixtureSummary;
  onEdit: (fixture: FixtureSummary) => void;
  onDelete: (id: string) => void;
}

export const FixtureRow = ({ fixture, onEdit, onDelete }: FixtureRowProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { badge, dot } = statusStyles[fixture.status];
  const hasScore = fixture.homeScore !== null && fixture.awayScore !== null;

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 transition-colors group">
      {/* Status dot */}
      <div className="w-9 flex items-center justify-center flex-shrink-0">
        <div className={cn("w-2 h-2 rounded-full", dot)} />
      </div>

      {/* Match info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs font-semibold text-foreground">
            {fixture.homeTeam}
            {hasScore && (
              <span className="mx-1.5 font-extrabold text-foreground">
                {fixture.homeScore} – {fixture.awayScore}
              </span>
            )}
            {!hasScore && (
              <span className="mx-1.5 text-muted-foreground font-normal">
                vs
              </span>
            )}
            {fixture.awayTeam}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-[10px] text-muted-foreground">
            {fixture.league}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-[10px] text-muted-foreground">
            {fixture.week}
          </span>
        </div>
      </div>

      {/* Date / Time */}
      <div className="hidden md:flex flex-col items-center w-24 gap-0.5 text-center">
        <span className="text-[11px] font-semibold text-foreground">
          {fixture.date}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {fixture.time}
        </span>
      </div>

      {/* Stadium */}
      <div className="hidden lg:flex items-center gap-1 w-36 min-w-0">
        <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        <span className="text-[11px] text-muted-foreground truncate">
          {fixture.stadium}
        </span>
      </div>

      {/* Agent */}
      <div className="hidden sm:flex items-center gap-1 w-28 min-w-0">
        <UserCircle2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        {fixture.agentAssigned ? (
          <span className="text-[11px] text-foreground truncate">
            {fixture.agentAssigned}
          </span>
        ) : (
          <span className="text-[11px] text-yellow-500 font-semibold">
            Unassigned
          </span>
        )}
      </div>

      {/* Status badge */}
      <div className="hidden sm:block">
        <span
          className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
            badge,
          )}
        >
          {fixture.status}
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
                  onEdit(fixture);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-secondary transition-colors text-foreground"
              >
                <Pencil className="w-3.5 h-3.5 text-muted-foreground" /> Edit
                Fixture
              </button>
              <button
                onClick={() => {
                  onDelete(fixture.id);
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
