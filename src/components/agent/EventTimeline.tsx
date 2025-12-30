import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getEventIconPath, getEventTitle } from "@/shared/utils/eventIcons";
import type { MatchEvent } from "@/shared/types/agent";

interface EventTimelineProps {
  events: MatchEvent[];
  homeTeam: string;
  awayTeam: string;
}

export const EventTimeline = ({
  events,
  homeTeam,
  awayTeam,
}: EventTimelineProps) => {
  if (!events || events.length === 0) {
    return (
      <Card className="p-6 bg-card/50">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Match Timeline</h2>
        <div className="text-center py-12 text-muted-foreground">
          <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No match events yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Match Timeline</h2>
      <motion.div
        className="relative py-4 flex flex-col-reverse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Center Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        <div className="space-y-8">
          {events.map((event, index) => {
            const isHomeTeamEvent = event.team === homeTeam;

            return (
              <motion.div
                key={event.id}
                initial={{
                  opacity: 0,
                  x: isHomeTeamEvent ? -20 : 20,
                  y: 10,
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="relative"
              >
                {/* Event Icon on Center Line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-border shadow-lg">
                    <img
                      src={event.type === "penalty" ? "/images/event-penalty.svg" : getEventIconPath(event.type)}
                      alt={getEventTitle(event.type)}
                      className="w-5 h-5"
                    />
                  </div>
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
        </div>
      </motion.div>
    </Card>
  );
};
