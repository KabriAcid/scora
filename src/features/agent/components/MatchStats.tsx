import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface MatchStatsProps {
    homeScore: number;
    awayScore: number;
    eventsCount: number;
    matchTime: string;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MatchStats = ({ homeScore, awayScore, eventsCount, matchTime }: MatchStatsProps) => {
    const stats = [
        { label: "Score", value: `${homeScore} - ${awayScore}` },
        { label: "Events Logged", value: eventsCount.toString() },
        { label: "Match Time", value: matchTime },
    ];

    return (
        <motion.div variants={itemVariants}>
            <Card className="p-6 md:p-8 shadow-lg border border-border bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
                    Match Stats
                </h3>
                <div className="space-y-3 md:space-y-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-white/50 dark:bg-secondary/50 hover:bg-white/70 dark:hover:bg-secondary/70 transition-colors"
                        >
                            <span className="text-sm md:text-base text-muted-foreground font-medium">
                                {stat.label}
                            </span>
                            <span className="text-base md:text-lg font-bold text-foreground">
                                {stat.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
};

export default MatchStats;
