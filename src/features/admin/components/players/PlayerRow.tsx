import { MoreVertical, Pencil, Trash2, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/utils/cn";
import type { PlayerSummary } from "@/data/adminMockData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const POSITION_STYLES: Record<PlayerSummary["position"], string> = {
  GK: "bg-yellow-500/15 text-yellow-600 ring-yellow-500/20",
  DEF: "bg-primary/10 text-primary ring-primary/20",
  MID: "bg-accent/10 text-accent ring-accent/20",
  FWD: "bg-destructive/10 text-destructive ring-destructive/20",
};

const STATUS_STYLES: Record<PlayerSummary["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-500",
  Injured: "bg-yellow-500/10 text-yellow-500",
  Suspended: "bg-destructive/10 text-destructive",
};

const STATUS_DOT: Record<PlayerSummary["status"], string> = {
  Active: "bg-emerald-500 animate-pulse",
  Injured: "bg-yellow-500",
  Suspended: "bg-destructive",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const PositionBadge = ({
  position,
}: {
  position: PlayerSummary["position"];
}) => (
  <span
    className={cn(
      "inline-flex items-center justify-center w-9 h-7 rounded-lg text-[11px] font-extrabold ring-1",
      POSITION_STYLES[position],
    )}
  >
    {position}
  </span>
);

const StatusBadge = ({ status }: { status: PlayerSummary["status"] }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold",
      STATUS_STYLES[status],
    )}
  >
    <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_DOT[status])} />
    {status}
  </span>
);

const StatPill = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) => (
  <div
    className={cn(
      "flex flex-col items-center px-2.5 py-1.5 rounded-lg bg-secondary",
      accent,
    )}
  >
    <span className="text-sm font-bold text-foreground tabular-nums leading-none">
      {value}
    </span>
    <span className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wide">
      {label}
    </span>
  </div>
);

// ─── Actions dropdown ─────────────────────────────────────────────────────────

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
            <ExternalLink className="w-3.5 h-3.5" /> View Profile
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

// ─── PlayerRow ────────────────────────────────────────────────────────────────

interface PlayerRowProps {
  player: PlayerSummary;
  onEdit: (p: PlayerSummary) => void;
  onDelete: (id: string) => void;
}

export const PlayerRow = ({ player, onEdit, onDelete }: PlayerRowProps) => (
  <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 transition-colors group">
    {/* Position + number */}
    <div className="flex flex-col items-center gap-1 w-10 flex-shrink-0">
      <PositionBadge position={player.position} />
      <span className="text-[10px] text-muted-foreground font-bold">
        #{player.number}
      </span>
    </div>

    {/* Avatar + name */}
    <div className="flex items-center gap-2.5 flex-1 min-w-0">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 shadow-sm">
        <span className="text-[11px] font-bold text-primary-foreground">
          {player.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate leading-tight">
          {player.name}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {player.team}
        </p>
      </div>
    </div>

    {/* State — hidden on mobile */}
    <p className="hidden md:block text-xs text-muted-foreground w-20 truncate flex-shrink-0">
      {player.state}
    </p>

    {/* Age — hidden on small */}
    <p className="hidden sm:block text-xs text-muted-foreground w-8 text-center flex-shrink-0">
      {player.age}y
    </p>

    {/* Stats — hidden on small */}
    <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
      <StatPill label="G" value={player.goals} />
      <StatPill label="A" value={player.assists} />
      <StatPill label="Apps" value={player.appearances} />
    </div>

    {/* Status */}
    <div className="flex-shrink-0">
      <StatusBadge status={player.status} />
    </div>

    {/* Actions */}
    <ActionsMenu
      onEdit={() => onEdit(player)}
      onDelete={() => onDelete(player.id)}
    />
  </div>
);
