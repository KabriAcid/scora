import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const HomeSkeleton = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Featured Match Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-24" />
        </div>
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-6 w-4" />
                <Skeleton className="h-10 w-10" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </Card>
      </section>

      {/* Today's Matches Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-card/50 border-border/50">
                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div className="flex items-center gap-3 flex-1">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2 mx-4">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-4 w-2" />
                    <Skeleton className="h-6 w-6" />
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
