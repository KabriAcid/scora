import {
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  MapPin,
  Users,
  Layers,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/utils/cn";
import type { StadiumSummary } from "@/data/adminMockData";

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<StadiumSummary["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-500",
  "Under Renovation": "bg-yellow-500/10 text-yellow-500",
  Inactive: "bg-muted-foreground/15 text-muted-foreground",
};
const STATUS_DOT: Record<StadiumSummary["status"], string> = {
  Active: "bg-emerald-500 animate-pulse",
  "Under Renovation": "bg-yellow-500",
  Inactive: "bg-muted-foreground",
};

const StatusBadge = ({ status }: { status: StadiumSummary["status"] }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold",
      STATUS_STYLES[status],
    )}
  >
    <span
      className={cn(
        "w-1.5 h-1.5 rounded-full flex-shrink-0",
        STATUS_DOT[status],
      )}
    />
    {status}
  </span>
);

// ─── Surface badge ────────────────────────────────────────────────────────────

const SurfaceBadge = ({ surface }: { surface: StadiumSummary["surface"] }) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
      surface === "Natural Grass"
        ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20"
        : "bg-primary/5 text-primary border-primary/20",
    )}
  >
    {surface === "Natural Grass" ? "🌿" : "🔵"} {surface}
  </span>
);

// ─── Actions ─────────────────────────────────────────────────────────────────

interface ActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionsMenu = ({ onEdit, onDelete }: ActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-xl z-20 min-w-[140px] p-1 animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-secondary rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View
          </button>
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-secondary rounded-lg transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <div className="my-1 h-px bg-border" />
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      )}
    </div>
  );
};

// ─── StadiumRow ───────────────────────────────────────────────────────────────

interface StadiumRowProps {
  stadium: StadiumSummary;
  onEdit: (s: StadiumSummary) => void;
  onDelete: (id: string) => void;
}

export const StadiumRow = ({ stadium, onEdit, onDelete }: StadiumRowProps) => (
  <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 transition-colors group">
    {/* Icon */}
    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
      <Layers className="w-4 h-4 text-accent" />
    </div>

    {/* Name + location */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground truncate leading-tight">
        {stadium.name}
      </p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        <p className="text-[11px] text-muted-foreground truncate">
          {stadium.city}, {stadium.state}
        </p>
      </div>
    </div>

    {/* Home team — hidden on small */}
    <p className="hidden md:block text-xs text-muted-foreground flex-shrink-0 max-w-[140px] truncate">
      {stadium.homeTeam}
    </p>

    {/* Capacity */}
    <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
      <Users className="w-3 h-3 text-muted-foreground" />
      <span className="text-xs font-semibold text-foreground tabular-nums">
        {stadium.capacity.toLocaleString()}
      </span>
    </div>

    {/* Fixtures hosted */}
    <div className="hidden md:block text-center flex-shrink-0 w-16">
      <p className="text-sm font-bold text-foreground tabular-nums leading-none">
        {stadium.fixturesHosted}
      </p>
      <p className="text-[10px] text-muted-foreground">fixtures</p>
    </div>

    {/* Surface — hidden on mobile */}
    <div className="hidden lg:block flex-shrink-0">
      <SurfaceBadge surface={stadium.surface} />
    </div>

    {/* Status */}
    <div className="flex-shrink-0">
      <StatusBadge status={stadium.status} />
    </div>

    <ActionsMenu
      onEdit={() => onEdit(stadium)}
      onDelete={() => onDelete(stadium.id)}
    />
  </div>
);
