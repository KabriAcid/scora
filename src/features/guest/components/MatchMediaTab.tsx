import { useMemo } from "react";
import { motion } from "framer-motion";
import { Camera, Clock, ImageOff } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { MatchMediaEntry, MediaPhase } from "@/data/matchDetails";

interface MatchMediaTabProps {
  media: MatchMediaEntry[];
  matchStatus?: "upcoming" | "live" | "finished";
}

// ─── Phase config ─────────────────────────────────────────────────────────────

const PHASE_CONFIG: Record<
  MediaPhase,
  { label: string; dotColor: string; badgeClass: string }
> = {
  "pre-match": {
    label: "Pre-Match",
    dotColor: "bg-primary",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
  },
  "in-match": {
    label: "In-Match",
    dotColor: "bg-green-500",
    badgeClass: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  "post-match": {
    label: "Post-Match",
    dotColor: "bg-accent",
    badgeClass: "bg-accent/10 text-accent border-accent/20",
  },
};

const PHASE_ORDER: MediaPhase[] = ["pre-match", "in-match", "post-match"];

// ─── MediaCard ────────────────────────────────────────────────────────────────

const MediaCard = ({
  entry,
  index,
}: {
  entry: MatchMediaEntry;
  index: number;
}) => {
  const cfg = PHASE_CONFIG[entry.phase];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm"
    >
      {/* Photo */}
      <div className="relative">
        <img
          src={entry.photoUrl}
          alt={entry.label}
          className="w-full aspect-video object-cover"
          loading="lazy"
        />

        {/* Phase badge over image */}
        <span
          className={cn(
            "absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm",
            cfg.badgeClass,
          )}
        >
          {entry.phase === "in-match" && entry.minute != null
            ? `${entry.minute}'`
            : cfg.label}
        </span>
      </div>

      {/* Caption row */}
      <div className="px-3.5 py-3 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <Camera className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground leading-snug">
            {entry.label}
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

// ─── Phase section ────────────────────────────────────────────────────────────

const PhaseSection = ({
  phase,
  entries,
  startIndex,
}: {
  phase: MediaPhase;
  entries: MatchMediaEntry[];
  startIndex: number;
}) => {
  const cfg = PHASE_CONFIG[phase];

  return (
    <section className="space-y-3">
      {/* Section divider */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "w-2 h-2 rounded-full flex-shrink-0",
            cfg.dotColor,
          )}
        />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {cfg.label}
        </span>
        <div className="flex-1 h-px bg-border/60" />
        <span className="text-xs text-muted-foreground tabular-nums">
          {entries.length} photo{entries.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <MediaCard key={entry.id} entry={entry} index={startIndex + i} />
        ))}
      </div>
    </section>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export const MatchMediaTab = ({ media, matchStatus }: MatchMediaTabProps) => {
  // Group by phase, preserving PHASE_ORDER
  const grouped = useMemo(() => {
    const map: Partial<Record<MediaPhase, MatchMediaEntry[]>> = {};
    for (const entry of media) {
      if (!map[entry.phase]) map[entry.phase] = [];
      map[entry.phase]!.push(entry);
    }
    return map;
  }, [media]);

  if (media.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <ImageOff className="w-6 h-6 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {matchStatus === "upcoming"
            ? "Media will appear here once the agent uploads pre-match photos."
            : "No photos have been uploaded for this match yet."}
        </p>
      </motion.div>
    );
  }

  // Walk through phases in order, accumulating a global card index for stagger
  let cursor = 0;
  const sections: JSX.Element[] = [];

  for (const phase of PHASE_ORDER) {
    const entries = grouped[phase];
    if (!entries || entries.length === 0) continue;
    sections.push(
      <PhaseSection
        key={phase}
        phase={phase}
        entries={entries}
        startIndex={cursor}
      />,
    );
    cursor += entries.length;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {sections}
    </motion.div>
  );
};
