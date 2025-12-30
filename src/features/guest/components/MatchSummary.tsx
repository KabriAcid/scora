import { motion } from "framer-motion";
import { Target, Activity, AlertCircle, ArrowLeftRight } from "lucide-react";
import { MatchEvent } from "@/data/matchDetails";

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

  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
      case "penalty":
        return <Target className="w-5 h-5 text-green-400" />;
      case "yellow":
        return <div className="w-3 h-4 bg-yellow-500 rounded-sm" />;
      case "red":
        return <div className="w-3 h-4 bg-destructive rounded-sm" />;
      case "substitution":
        return <ArrowLeftRight className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case "goal":
        return "Goal";
      case "penalty":
        return "Penalty";
      case "yellow":
        return "Yellow Card";
      case "red":
        return "Red Card";
      case "substitution":
        return "Substitution";
      default:
        return "Event";
    }
  };

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
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: event.team === "home" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative"
          >
            {/* Event Icon on Center Line */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center justify-center p-2 rounded-full shadow-xl">
                {getEventIcon(event.type)}
              </div>
            </div>

            {event.team === "home" ? (
              // Home Team Event (Left Side)
              <div className="flex items-center justify-end pr-8">
                <div className="text-right space-y-1 max-w-[45%]">
                  <div className="text-sm font-bold text-left text-green-400">
                    {event.time}
                  </div>
                  <div className="font-semibold text-left text-sm truncate">
                    {event.player}
                  </div>
                  <span
                    className="text-xs block text-left text-muted-foreground"
                  >
                    {getEventLabel(event.type)}
                  </span>
                </div>
              </div>
            ) : (
              // Away Team Event (Right Side)
              <div className="flex items-center pl-8">
                <div className="text-left space-y-1 max-w-[45%]">
                  <div className="text-sm font-bold text-right text-green-400">
                    {event.time}
                  </div>
                  <div className="font-semibold text-right text-sm truncate">
                    {event.player}
                  </div>
                  <span
                    className="text-xs block text-right text-muted-foreground"
                  >
                    {getEventLabel(event.type)}
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
