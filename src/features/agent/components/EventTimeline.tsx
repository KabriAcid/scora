import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getEventIconPath, getEventTitle } from "@/shared/utils/eventIcons";
import type { MatchEvent } from "@/shared/types/agent";

interface EventTimelineProps {
  events: MatchEvent[];
  homeTeam: string;
  awayTeam: string;
  onRemoveEvent?: (eventId: string) => void;
  readOnly?: boolean;
}

export const EventTimeline = ({
  events,
  homeTeam,
  awayTeam,
  onRemoveEvent,
  readOnly = false,
}: EventTimelineProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleRemove = (eventId: string) => {
    setActiveId(null);
    onRemoveEvent?.(eventId);
  };

  if (!events || events.length === 0) {
    return (
      <Card className="p-6 bg-card/50">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
          Match Timeline
        </h2>
        <div className="text-center py-12 text-muted-foreground">
          <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No match events recorded</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 border-none shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Match Timeline
        </h2>
        {readOnly && (
          <span className="text-[10px] font-medium text-muted-foreground/60 bg-muted px-2 py-0.5 rounded-full">
            Review mode
          </span>
        )}
      </div>
      <motion.div
        ref={containerRef}
        className="relative py-4 flex flex-col-reverse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Center Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        <div className="space-y-8">
          <AnimatePresence initial={false}>
            {events.map((event, index) => {
              const isHomeTeamEvent = event.team === homeTeam;
              const isActive = activeId === event.id;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isHomeTeamEvent ? -20 : 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="relative"
                >
                  {/* Event Icon on Center Line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <button
                      onClick={() =>
                        !readOnly && setActiveId(isActive ? null : event.id)
                      }
                      className={`flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 shadow-lg transition-colors ${
                        readOnly
                          ? "border-border cursor-default"
                          : isActive
                            ? "border-destructive ring-2 ring-destructive/30"
                            : "border-border hover:border-primary/60 cursor-pointer"
                      }`}
                      title={
                        readOnly
                          ? getEventTitle(event.type)
                          : "Click to remove event"
                      }
                    >
                      <img
                        src={getEventIconPath(event.type)}
                        alt={getEventTitle(event.type)}
                        className="w-5 h-5 pointer-events-none"
                      />
                    </button>

                    {/* Remove tooltip — only when not in readOnly mode */}
                    <AnimatePresence>
                      {!readOnly && isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-30"
                        >
                          <button
                            onClick={() => handleRemove(event.id)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold shadow-xl whitespace-nowrap hover:bg-destructive/90 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-destructive" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {isHomeTeamEvent ? (
                    // Home Team Event (Left Side)
                    <div className="w-1/2 flex justify-end pr-10">
                      <div className="space-y-1 text-right">
                        <div className="text-sm font-bold text-green-400">
                          {event.minute}'
                        </div>
                        <div className="font-semibold text-sm text-foreground">
                          {event.player}
                        </div>
                        <span className="text-xs block text-muted-foreground">
                          {getEventTitle(event.type)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Away Team Event (Right Side)
                    <div className="w-1/2 ml-auto flex justify-start pl-10">
                      <div className="space-y-1 text-left">
                        <div className="text-sm font-bold text-green-400">
                          {event.minute}'
                        </div>
                        <div className="font-semibold text-sm text-foreground">
                          {event.player}
                        </div>
                        <span className="text-xs block text-muted-foreground">
                          {getEventTitle(event.type)}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </Card>
  );
};
