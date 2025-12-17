import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
    variant?: "rect" | "circle" | "text";
}

const Skeleton = ({
    className = "",
    variant = "rect",
}: SkeletonProps) => {
    const baseClass = "bg-gradient-to-r from-secondary to-secondary/50 animate-pulse rounded";

    const variants = {
        rect: baseClass,
        circle: `${baseClass} rounded-full`,
        text: `${baseClass} h-4 w-full`,
    };

    return (
        <motion.div
            className={`${variants[variant]} ${className}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
    );
};

// Welcome Card Skeleton
export const WelcomeCardSkeleton = () => (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-32" />
    </div>
);

// Stat Card Skeleton
export const StatCardSkeleton = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-3">
        <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
    </div>
);

// Match Card Skeleton
export const MatchCardSkeleton = () => (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border space-y-6">
        <Skeleton className="h-6 w-1/2" />

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-16 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>

        <Skeleton className="h-10 w-full rounded-lg" />
    </div>
);

// Event List Skeleton
export const EventListSkeleton = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                </div>
            ))}
        </div>
    </div>
);

export default Skeleton;
