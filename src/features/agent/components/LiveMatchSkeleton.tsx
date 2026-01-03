import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Skeleton loader for LiveMatchHeader
 */
export const LiveMatchHeaderSkeleton = () => (
    <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2">
        <div className="flex items-center justify-between gap-4 md:gap-8">
            <div className="flex flex-col items-center gap-3 flex-1">
                <Skeleton className="w-16 h-16 md:w-24 md:h-24 rounded" />
                <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-12 w-20 md:h-16 md:w-24" />
            </div>
            <div className="flex flex-col items-center gap-3 flex-1">
                <Skeleton className="w-16 h-16 md:w-24 md:h-24 rounded" />
                <Skeleton className="h-6 w-24" />
            </div>
        </div>
    </Card>
);

/**
 * Skeleton loader for MatchControlPanel
 */
export const MatchControlPanelSkeleton = () => (
    <Card className="p-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-20" />
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-20" />
                </div>
            </div>
        </div>
    </Card>
);

/**
 * Skeleton loader for TeamSelector
 */
export const TeamSelectorSkeleton = () => (
    <Card className="p-4 md:p-6">
        <Skeleton className="h-4 w-24 mb-4" />
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
        </div>
    </Card>
);

/**
 * Skeleton loader for EventTypeButtons
 */
export const EventTypeButtonsSkeleton = () => (
    <Card className="p-4 md:p-6">
        <Skeleton className="h-4 w-32 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
        </div>
    </Card>
);

/**
 * Skeleton loader for MatchTimeline
 */
export const MatchTimelineSkeleton = () => (
    <Card className="p-6">
        <Skeleton className="h-6 w-40 mb-6" />
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                    <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-4 w-8" />
                </div>
            ))}
        </div>
    </Card>
);

/**
 * Skeleton loader for Stats Card
 */
export const StatsSkeleton = () => (
    <Card className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                </div>
            ))}
        </div>
    </Card>
);

/**
 * Skeleton loader for QuickActions Card
 */
export const QuickActionsSkeleton = () => (
    <Card className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
            ))}
        </div>
    </Card>
);

/**
 * Complete LiveMatchPage skeleton loader
 */
export const LiveMatchPageSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-6 md:space-y-8"
        >
            {/* Header Skeleton */}
            <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-24" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-16 rounded-full" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                </div>
            </motion.div>

            {/* Match Header Skeleton */}
            <motion.div variants={itemVariants}>
                <LiveMatchHeaderSkeleton />
            </motion.div>

            {/* Control Panel Skeleton */}
            <motion.div variants={itemVariants}>
                <MatchControlPanelSkeleton />
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div variants={itemVariants}>
                        <TeamSelectorSkeleton />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <EventTypeButtonsSkeleton />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <MatchTimelineSkeleton />
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <motion.div variants={itemVariants}>
                        <StatsSkeleton />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <QuickActionsSkeleton />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    </div>
);
