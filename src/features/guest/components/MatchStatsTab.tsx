import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MatchStat } from "@/data/matchDetails";
import { BarChart3 } from "lucide-react";

interface MatchStatsTabProps {
  stats: MatchStat[];
}

export const MatchStatsTab = ({ stats }: MatchStatsTabProps) => {
  if (!stats || stats.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No statistics available yet</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="p-4 border-0 shadow-none">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">
                {stat.home}
                {stat.isPercentage ? "%" : ""}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </span>
              <span className="text-sm font-semibold">
                {stat.away}
                {stat.isPercentage ? "%" : ""}
              </span>
            </div>
            <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-secondary">
              <motion.div
                className="bg-blue-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${(stat.home / (stat.home + stat.away)) * 100}%`,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05 + 0.2,
                }}
              />
              <motion.div
                className="bg-red-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${(stat.away / (stat.home + stat.away)) * 100}%`,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05 + 0.2,
                }}
              />
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
