import { motion } from "framer-motion";
import { BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuickActionsProps {
    onStatistics?: () => void;
    onSettings?: () => void;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const QuickActions = ({ onStatistics, onSettings }: QuickActionsProps) => {
    const actions = [
        { icon: BarChart3, label: "Statistics", onClick: onStatistics },
        { icon: Settings, label: "Settings", onClick: onSettings },
    ];

    return (
        <motion.div variants={itemVariants}>
            <Card className="p-6 md:p-8 shadow-lg border border-border">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
                    Quick Actions
                </h3>
                <div className="space-y-3">
                    {actions.map((action, index) => {
                        const IconComponent = action.icon;
                        return (
                            <motion.div
                                key={action.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    onClick={action.onClick}
                                    variant="outline"
                                    className="w-full justify-start gap-3 h-auto py-3 md:py-3.5 px-4 md:px-5 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                                >
                                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                                    <span className="text-sm md:text-base font-medium">{action.label}</span>
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
            </Card>
        </motion.div>
    );
};

export default QuickActions;
