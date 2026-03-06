import { MoreVertical, Pencil, Trash2, ExternalLink, MapPin, Users2, CheckCircle2, Clock, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/shared/utils/cn";
import type { LeagueSummary } from "@/data/adminMockData";
import { ROUTES } from "@/shared/config/routes";

// ─── Status badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: LeagueSummary["status"] }) => {
    const styles: Record<LeagueSummary["status"], string> = {
        Active: "bg-emerald-500/10 text-emerald-500",
        Upcoming: "bg-primary/10 text-primary",
        Completed: "bg-muted-foreground/15 text-muted-foreground",
    };
    const Icon = status === "Active" ? Zap : status === "Upcoming" ? Clock : CheckCircle2;
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold",
                styles[status]
            )}
        >
            {status === "Active" ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ) : (
                <Icon className="w-3 h-3" />
            )}
            {status}
        </span>
    );
};

// ─── Progress bar ─────────────────────────────────────────────────────────────

const ProgressBar = ({ value, max }: { value: number; max: number }) => {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div className="flex items-center gap-2 min-w-0">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden min-w-[64px]">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className="text-[11px] text-muted-foreground flex-shrink-0">
                {value}/{max}
            </span>
        </div>
    );
};

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
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false);
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

// ─── LeagueRow ────────────────────────────────────────────────────────────────

interface LeagueRowProps {
    league: LeagueSummary;
    onEdit: (league: LeagueSummary) => void;
    onDelete: (id: string) => void;
}

export const LeagueRow = ({ league, onEdit, onDelete }: LeagueRowProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/40 transition-colors rounded-xl group">
            {/* Name + state */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                    {league.name}
                </p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {league.state}
                </p>
            </div>

            {/* Teams */}
            <div className="hidden sm:flex flex-col items-center gap-0.5 w-12">
                <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Users2 className="w-3.5 h-3.5 text-muted-foreground" />
                    {league.teams}
                </span>
                <span className="text-[10px] text-muted-foreground">Teams</span>
            </div>

            {/* Progress */}
            <div className="hidden md:block w-32">
                <ProgressBar value={league.completed} max={league.fixtures} />
            </div>

            {/* Status */}
            <div className="hidden sm:block">
                <StatusBadge status={league.status} />
            </div>

            {/* Actions */}
            <ActionsMenu
                onEdit={() => onEdit(league)}
                onDelete={() => onDelete(league.id)}
                onView={() => navigate(ROUTES.ADMIN.LEAGUES_STANDINGS)}
            />
        </div>
    );
};
