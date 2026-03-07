import {
    MoreVertical,
    Pencil,
    Trash2,
    ExternalLink,
    MapPin,
    Users,
    Trophy,
    Zap,
    PowerOff,
    ShieldAlert,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/utils/cn";
import type { TeamSummary } from "@/data/adminMockData";

// ─── Status badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: TeamSummary["status"] }) => {
    const styles: Record<TeamSummary["status"], string> = {
        Active: "bg-emerald-500/10 text-emerald-500",
        Inactive: "bg-muted-foreground/15 text-muted-foreground",
        Suspended: "bg-destructive/10 text-destructive",
    };
    const iconMap: Record<TeamSummary["status"], React.ReactNode> = {
        Active: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />,
        Inactive: <PowerOff className="w-3 h-3" />,
        Suspended: <ShieldAlert className="w-3 h-3" />,
    };
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold",
                styles[status]
            )}
        >
            {iconMap[status]}
            {status}
        </span>
    );
};

// ─── Record pill ──────────────────────────────────────────────────────────────

const RecordPill = ({ wins, draws, losses }: { wins: number; draws: number; losses: number }) => (
    <div className="flex items-center gap-1 text-[11px] font-semibold">
        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">{wins}W</span>
        <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{draws}D</span>
        <span className="px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">{losses}L</span>
    </div>
);

// ─── Actions dropdown ─────────────────────────────────────────────────────────

interface ActionsMenuProps {
    onEdit: () => void;
    onDelete: () => void;
    onView: () => void;
}

const ActionsMenu = ({ onEdit, onDelete, onView }: ActionsMenuProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
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
                        onClick={() => { onView(); setOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View
                    </button>
                    <button
                        onClick={() => { onEdit(); setOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                    </button>
                    <div className="my-1 h-px bg-border" />
                    <button
                        onClick={() => { onDelete(); setOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

// ─── TeamRow ──────────────────────────────────────────────────────────────────

interface TeamRowProps {
    team: TeamSummary;
    onEdit: (team: TeamSummary) => void;
    onDelete: (id: string) => void;
}

export const TeamRow = ({ team, onEdit, onDelete }: TeamRowProps) => {
    return (
        <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/40 transition-colors rounded-xl group">
            {/* Initials avatar */}
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-bold text-primary">{team.shortCode}</span>
            </div>

            {/* Name + state + league */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{team.name}</p>
                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {team.state}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Trophy className="w-3 h-3 flex-shrink-0" />
                        {team.league}
                    </span>
                </div>
            </div>

            {/* Players */}
            <div className="hidden sm:flex flex-col items-center gap-0.5 w-14">
                <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    {team.players}
                </span>
                <span className="text-[10px] text-muted-foreground">Players</span>
            </div>

            {/* Record */}
            <div className="hidden md:block">
                <RecordPill wins={team.wins} draws={team.draws} losses={team.losses} />
            </div>

            {/* Status */}
            <div className="hidden sm:block">
                <StatusBadge status={team.status} />
            </div>

            {/* Actions */}
            <ActionsMenu
                onView={() => {}}
                onEdit={() => onEdit(team)}
                onDelete={() => onDelete(team.id)}
            />
        </div>
    );
};
