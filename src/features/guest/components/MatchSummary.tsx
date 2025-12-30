import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { MatchEvent } from "@/data/matchDetails";
import { getEventIconPath, getEventTitle } from "@/shared/utils/eventIcons";

interface MatchSummaryProps {
  events: MatchEvent[];
}

export const MatchSummary = ({ events }: MatchSummaryProps) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No match events yet</p>
      </div>
    );
  }

  return (
    <motion.div
      className="relative py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Center Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border border-gray-100 -translate-x-1/2" />

      <div className="space-y-8">
        {[...events].reverse().map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: event.team === "home" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative"
          >
            {/* Event Icon on Center Line */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-border shadow-lg">
                <img
                  src={getEventIconPath(event.type)}
                  alt={getEventTitle(event.type)}
                  className="w-5 h-5"
                />
              </div>
            </div>

            {event.team === "home" ? (
              // Home Team Event (Right Side) - Text aligned right to be close to timeline
              <div className="flex items-center justify-start pl-8">
                <div className="space-y-1 max-w-[45%] text-right">
                  <div className="text-sm font-bold text-green-400">
                    {event.time}'
                  </div>
                  <div className="font-semibold text-sm truncate">
                    {event.player}
                  </div>
                  <span className="text-xs block text-muted-foreground">
                    {getEventTitle(event.type)}
                  </span>
                </div>
              </div>
            ) : (
              // Away Team Event (Left Side) - Text aligned left to be close to timeline
              <div className="flex items-center justify-end pr-8">
                <div className="space-y-1 max-w-[45%] text-left">
                  <div className="text-sm font-bold text-green-400">
                    {event.time}'
                  </div>
                  <div className="font-semibold text-sm truncate">
                    {event.player}
                  </div>
                  <span className="text-xs block text-muted-foreground">
                    {getEventTitle(event.type)}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
