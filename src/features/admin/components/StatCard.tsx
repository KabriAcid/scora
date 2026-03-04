import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export type StatColorScheme = "primary" | "accent" | "success" | "warning";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend?: { value: number; direction: "up" | "down" };
  colorScheme?: StatColorScheme;
  onClick?: () => void;
}

const schemeClasses: Record<StatColorScheme, { icon: string; ring: string }> = {
  primary: {
    icon: "bg-primary/10 text-primary",
    ring: "hover:ring-primary/20",
  },
  accent: { icon: "bg-accent/10 text-accent", ring: "hover:ring-accent/20" },
  success: {
    icon: "bg-success/10 text-success",
    ring: "hover:ring-success/20",
  },
  warning: {
    icon: "bg-yellow-500/10 text-yellow-600",
    ring: "hover:ring-yellow-500/20",
  },
};

export const StatCard = ({
  icon,
  label,
  value,
  trend,
  colorScheme = "primary",
  onClick,
}: StatCardProps) => {
  const scheme = schemeClasses[colorScheme];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "bg-card rounded-xl border border-border p-5 shadow-sm transition-all",
        onClick && "cursor-pointer ring-2 ring-transparent hover:shadow-md",
        onClick && scheme.ring,
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0",
            scheme.icon,
          )}
        >
          {icon}
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              trend.direction === "up" ? "text-success" : "text-destructive",
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {trend.value}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-foreground tabular-nums">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
      </div>
    </motion.div>
  );
};
