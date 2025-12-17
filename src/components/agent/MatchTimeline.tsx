import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, AlertTriangle, Users, CornerDownRight } from "lucide-react";

interface MatchEvent {
    id: string;
    type: "goal" | "yellow_card" | "red_card" | "substitution" | "foul" | "corner" | "offside" | "injury";
    player: string;
    team: string;
    minute: number;
    description?: string;
    timestamp: Date;
}

interface MatchTimelineProps {
    events: MatchEvent[];
}

const eventIcons = {
    goal: <Target className="w-5 h-5 text-green-500" />,
    yellow_card: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    red_card: <AlertTriangle className="w-5 h-5 text-red-600" />,
    substitution: <Users className="w-5 h-5 text-blue-500" />,
    foul: <AlertTriangle className="w-5 h-5 text-orange-500" />,
    corner: <CornerDownRight className="w-5 h-5 text-purple-500" />,
    offside: <AlertTriangle className="w-5 h-5 text-gray-500" />,
    injury: <AlertTriangle className="w-5 h-5 text-red-700" />,
};

const MatchTimeline = ({ events }: MatchTimelineProps) => {
    return (
        <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Match Timeline</h2>
            <div className="space-y-3">
                <AnimatePresence>
                    {events.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No events logged yet
                        </div>
                    ) : (
                        events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    {eventIcons[event.type]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{event.player}</span>
                                        <Badge variant="outline" className="text-xs">
                                            {event.team}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {event.description || event.type.replace('_', ' ')}
                                    </p>
                                </div>
                                <div className="text-sm font-mono font-bold">
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
