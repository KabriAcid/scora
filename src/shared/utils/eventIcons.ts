/**
 * Event Type Icons Configuration
 * Centralized configuration for all match event icons used across the application
 */

export interface EventTypeConfig {
  type: string;
  icon: string;
  title: string;
  color?: string;
}

export const EVENT_ICONS: Record<string, EventTypeConfig> = {
  goal: {
    type: "goal",
    icon: "/images/event-goal.svg",
    title: "Goal",
    color: "text-green-400",
  },
  penalty: {
    type: "penalty",
    icon: "/images/event-goal.svg",
    title: "Penalty",
    color: "text-green-400",
  },
  yellow_card: {
    type: "yellow_card",
    icon: "/images/event-yellow-card.svg",
    title: "Yellow Card",
    color: "text-yellow-500",
  },
  yellow: {
    type: "yellow",
    icon: "/images/event-yellow-card.svg",
    title: "Yellow Card",
    color: "text-yellow-500",
  },
  red_card: {
    type: "red_card",
    icon: "/images/event-red-card.svg",
    title: "Red Card",
    color: "text-red-600",
  },
  red: {
    type: "red",
    icon: "/images/event-red-card.svg",
    title: "Red Card",
    color: "text-red-600",
  },
  substitution: {
    type: "substitution",
    icon: "/images/event-substitution.svg",
    title: "Substitution",
    color: "text-blue-600",
  },
  foul: {
    type: "foul",
    icon: "/images/event-foul.svg",
    title: "Foul",
    color: "text-orange-500",
  },
  corner: {
    type: "corner",
    icon: "/images/event-corner.svg",
    title: "Corner",
    color: "text-blue-400",
  },
  offside: {
    type: "offside",
    icon: "/images/event-offside.svg",
    title: "Offside",
    color: "text-purple-500",
  },
  injury: {
    type: "injury",
    icon: "/images/event-injury.svg",
    title: "Injury",
    color: "text-red-500",
  },
};

// Array of available event types for event logging
export const EVENT_TYPES: EventTypeConfig[] = [
  EVENT_ICONS.goal,
  EVENT_ICONS.yellow_card,
  EVENT_ICONS.red_card,
  EVENT_ICONS.substitution,
  EVENT_ICONS.foul,
  EVENT_ICONS.corner,
  EVENT_ICONS.offside,
  EVENT_ICONS.injury,
];

/**
 * Get event icon configuration by type
 * @param type - Event type string
 * @returns EventTypeConfig or undefined if not found
 */
export const getEventIcon = (type: string): EventTypeConfig | undefined => {
  return EVENT_ICONS[type];
};

/**
 * Get event icon path by type
 * @param type - Event type string
 * @returns Icon path string or default icon
 */
export const getEventIconPath = (type: string): string => {
  return EVENT_ICONS[type]?.icon || "/images/event-goal.svg";
};

/**
 * Get event title by type
 * @param type - Event type string
 * @returns Event title string
 */
export const getEventTitle = (type: string): string => {
  return EVENT_ICONS[type]?.title || "Event";
};

/**
 * Get event color by type
 * @param type - Event type string
 * @returns Tailwind color class
 */
export const getEventColor = (type: string): string => {
  return EVENT_ICONS[type]?.color || "text-muted-foreground";
};
