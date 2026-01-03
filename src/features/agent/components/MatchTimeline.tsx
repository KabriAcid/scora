import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEventIconPath } from "@/shared/utils/eventIcons";

interface MatchEvent {
  id: string;
  type:
    | "goal"
    | "yellow_card"
    | "red_card"
    | "substitution"
    | "foul"
    | "corner"
    | "offside"
    | "injury";
  player: string;
  team: string;
  minute: number;
  description?: string;
  timestamp: Date;
}

interface MatchTimelineProps {
  events: MatchEvent[];
}

const MatchTimeline = ({ events }: MatchTimelineProps) => {
  return (
    <Card className="p-6 md:p-8 shadow-lg border border-border">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-6 md:mb-8">
        Match Timeline
      </h2>
      <div className="space-y-2 md:space-y-3">
        <AnimatePresence>
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 md:py-12 text-muted-foreground"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 opacity-40">
                <img
                  src={getEventIconPath("goal")}
                  alt="No events"
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm md:text-base">No events logged yet</p>
            </motion.div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-secondary/40 dark:bg-secondary/30 rounded-lg hover:bg-secondary/60 dark:hover:bg-secondary/50 transition-all duration-200 border border-transparent hover:border-primary/20"
              >
                <div className="flex-shrink-0 bg-primary/10 p-2 md:p-2.5 rounded-lg flex items-center justify-center">
                  <img
                    src={getEventIconPath(event.type)}
                    alt={event.type}
                    className="w-5 h-5 md:w-6 md:h-6"
                    style={{ filter: "var(--icon-filter, invert(0.4))" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm md:text-base text-foreground truncate">
                      {event.player}
                    </span>
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {event.team}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {event.description ||
                      event.type.replace(/_/g, " ").charAt(0).toUpperCase() +
                        event.type.replace(/_/g, " ").slice(1)}
                  </p>
                </div>
                <div className="text-sm md:text-base font-mono font-bold text-primary flex-shrink-0">
                  {event.minute}'
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default MatchTimeline;
