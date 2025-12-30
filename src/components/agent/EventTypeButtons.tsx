import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { EVENT_TYPES } from "@/shared/utils/eventIcons";

interface EventTypeButtonsProps {
  onSelectEventType: (type: string) => void;
  activeEventType: string | null;
}

const EventTypeButtons = ({
  onSelectEventType,
  activeEventType,
}: EventTypeButtonsProps) => {
  return (
    <Card className="p-4 md:p-6 shadow-lg border border-border">
      <h3 className="text-xs md:text-sm font-bold text-muted-foreground mb-4 md:mb-5 uppercase tracking-wide">
        Select Event
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3">
        {EVENT_TYPES.map(({ type, icon, title }) => {
          const isActive = activeEventType === type;

          return (
            <motion.button
              key={type}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelectEventType(type)}
              title={title}
              className={`relative p-3 md:p-5 rounded-lg transition-all duration-200 flex items-center justify-center group ${
                isActive
                  ? "bg-primary/20 border-2 border-primary shadow-md"
                  : "bg-secondary/40 border-2 border-transparent hover:bg-secondary/60 hover:border-primary/30"
              }`}
            >
              {/* SVG Icon with dynamic color */}
              <div
                className={`w-6 h-6 md:w-7 md:h-7 transition-all duration-200 flex items-center justify-center`}
              >
                <img
                  src={icon}
                  alt={title}
                  className={`w-full h-full transition-all duration-200`}
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
