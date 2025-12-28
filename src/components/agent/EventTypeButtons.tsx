import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface EventTypeButtonsProps {
    onSelectEventType: (type: string) => void;
    activeEventType: string | null;
}

// Custom SVG icon paths for each event type
const eventTypes = [
    { type: "goal", icon: "/images/event-goal.png", title: "Goal" },
    { type: "yellow_card", icon: "/images/event-yellow-card.svg", title: "Yellow Card" },
    { type: "red_card", icon: "/images/event-red-card.svg", title: "Red Card" },
    { type: "substitution", icon: "/images/event-substitution.svg", title: "Substitution" },
    { type: "foul", icon: "/images/event-foul.svg", title: "Foul" },
    { type: "corner", icon: "/images/event-corner.svg", title: "Corner" },
    { type: "offside", icon: "/images/event-offside.svg", title: "Offside" },
    { type: "injury", icon: "/images/event-injury.svg", title: "Injury" },
];

const EventTypeButtons = ({ onSelectEventType, activeEventType }: EventTypeButtonsProps) => {
    return (
        <Card className="p-4 md:p-6 shadow-lg border border-border">
            <h3 className="text-xs md:text-sm font-bold text-muted-foreground mb-4 md:mb-5 uppercase tracking-wide">
                Select Event
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3">
                {eventTypes.map(({ type, icon, title }) => {
                    const isActive = activeEventType === type;

                    return (
                        <motion.button
                            key={type}
                            whileHover={{ scale: 1.12, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onSelectEventType(type)}
                            title={title}
                            className={`relative p-3 md:p-5 rounded-lg transition-all duration-200 flex items-center justify-center group ${isActive
                                    ? "bg-primary/20 border-2 border-primary shadow-md"
                                    : "bg-secondary/40 border-2 border-transparent hover:bg-secondary/60 hover:border-primary/30"
                                }`}
                        >
                            {/* SVG Icon with dynamic color */}
                            <div className={`w-6 h-6 md:w-7 md:h-7 transition-all duration-200 flex items-center justify-center`}>
                                <img
                                    src={icon}
                                    alt={title}
                                    className={`w-full h-full transition-all duration-200 ${isActive
                                            ? "brightness-0 saturate-200 invert"
                                            : "brightness-75 group-hover:brightness-90"
                                        }`}
                                />
                            </div>

                            {/* Active indicator dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -bottom-0.5 md:bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </Card>
    );
};

export default EventTypeButtons;
