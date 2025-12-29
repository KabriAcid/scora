import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Target, Activity, AlertCircle } from "lucide-react";
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
                return <Target className="w-5 h-5 text-success" />;
            case "yellow":
                return <div className="w-3 h-4 bg-yellow-500 rounded-sm" />;
            case "red":
                return <div className="w-3 h-4 bg-destructive rounded-sm" />;
            case "substitution":
                return <Activity className="w-5 h-5 text-primary" />;
            default:
                return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
        }
    };

    return (
        <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {events.map((event, index) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: event.team === "home" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <Card
                        className={`p-4 ${event.team === "home" ? "mr-8" : "ml-8"}`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary shrink-0">
                                {getEventIcon(event.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs">
                                        {event.time}
                                    </Badge>
                                    <span className="font-semibold text-sm">
                                        {event.player}
                                    </span>
                                </div>
                                {event.description && (
                                    <p className="text-xs text-muted-foreground">
                                        {event.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
};
