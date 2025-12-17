import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Target, AlertTriangle, Users, CornerDownRight } from "lucide-react";

interface EventTypeButtonsProps {
    onSelectEventType: (type: string) => void;
    activeEventType: string | null;
}

const eventTypes = [
    { type: "goal", label: "Goal", icon: Target, color: "bg-green-500 hover:bg-green-600" },
    { type: "yellow_card", label: "Yellow", icon: AlertTriangle, color: "bg-yellow-500 hover:bg-yellow-600" },
    { type: "red_card", label: "Red Card", icon: AlertTriangle, color: "bg-red-600 hover:bg-red-700" },
    { type: "substitution", label: "Sub", icon: Users, color: "bg-blue-500 hover:bg-blue-600" },
    { type: "foul", label: "Foul", icon: AlertTriangle, color: "bg-orange-500 hover:bg-orange-600" },
    { type: "corner", label: "Corner", icon: CornerDownRight, color: "bg-purple-500 hover:bg-purple-600" },
    { type: "offside", label: "Offside", icon: AlertTriangle, color: "bg-gray-500 hover:bg-gray-600" },
    { type: "injury", label: "Injury", icon: AlertTriangle, color: "bg-red-700 hover:bg-red-800" },
];

const EventTypeButtons = ({ onSelectEventType, activeEventType }: EventTypeButtonsProps) => {
    return (
        <Card className="p-4 md:p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">EVENT TYPE</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {eventTypes.map(({ type, label, icon: Icon, color }) => (
                    <motion.button
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectEventType(type)}
                        className={`p-3 md:p-4 rounded-lg text-white font-semibold flex flex-col items-center gap-2 transition-all ${activeEventType === type
                                ? `${color} ring-2 ring-offset-2 ring-white`
                                : `${color} opacity-80`
                            }`}
                    >
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        <span className="text-xs md:text-sm">{label}</span>
                    </motion.button>
                ))}
            </div>
        </Card>
    );
};

export default EventTypeButtons;
