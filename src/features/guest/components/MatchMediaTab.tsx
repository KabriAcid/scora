import { motion } from "framer-motion";
import { Camera, Clock, ImageOff } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { SLOT_CONFIG } from "@/data/matchDetails";
import type { MatchMediaEntry, MediaSlot } from "@/data/matchDetails";

interface MatchMediaTabProps {
    media: MatchMediaEntry[];
    matchStatus?: "upcoming" | "live" | "finished";
}

// ─── Single card ──────────────────────────────────────────────────────────────

const MediaCard = ({
    entry,
    index,
}: {
    entry: MatchMediaEntry;
    index: number;
}) => {
    const cfg = SLOT_CONFIG[entry.slot as MediaSlot];

    return (
        <motion.article
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm"
        >
            {/* Photo */}
            <div className="relative">
                <img
                    src={entry.photoUrl}
                    alt={cfg.label}
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                />
                {/* Auto badge — derived from slot */}
                <span
                    className={cn(
                        "absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm",
                        cfg.badgeClass,
                    )}
                >
                    {cfg.badge}
                </span>
            </div>

            {/* Caption row — auto label + timestamp */}
            <div className="px-3.5 py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <Camera className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                    <p className="text-sm font-semibold text-foreground truncate">
                        {cfg.label}
                    </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 text-[11px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {entry.postedAt}
                </div>
            </div>
        </motion.article>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────

export const MatchMediaTab = ({ media, matchStatus }: MatchMediaTabProps) => {
    // Sort by slot (1 → 2 → 3) to guarantee sequential order
    const sorted = [...media].sort((a, b) => a.slot - b.slot);

    if (sorted.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center px-4"
            >
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <ImageOff className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                    {matchStatus === "upcoming"
                        ? "Pre-match photos will appear here once the field agent uploads them."
                        : "No match photos have been uploaded yet."}
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
        >
            {/* Slot progress indicator */}
            <div className="flex items-center justify-center gap-6 py-1">
                {([1, 2, 3] as MediaSlot[]).map((slot) => {
                    const filled = sorted.some((e) => e.slot === slot);
                    const cfg = SLOT_CONFIG[slot];
                    return (
                        <div key={slot} className="flex flex-col items-center gap-1.5">
                            <div
                                className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-all",
                                    filled
                                        ? cn(cfg.badgeClass.split(" ")[0], "border-0")
                                        : "bg-muted border border-border",
                                )}
                            />
                            <span className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                                {cfg.badge}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Flat sequential feed */}
            {sorted.map((entry, i) => (
                <MediaCard key={entry.id} entry={entry} index={i} />
            ))}
        </motion.div>
    );
};
