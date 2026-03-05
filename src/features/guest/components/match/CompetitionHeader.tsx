import { ChevronRight } from "lucide-react";
import { Competition } from "@/data/matches";
import { motion } from "framer-motion";

interface CompetitionHeaderProps {
    competition: Competition;
    isExpanded?: boolean;
    onToggle?: () => void;
}

export const CompetitionHeader = ({
    competition,
    isExpanded = true,
    onToggle,
}: CompetitionHeaderProps) => {
    return (
        <button
            onClick={onToggle}
            className="flex items-center justify-between w-full py-3 px-4 bg-card/30 hover:bg-card/40 transition-colors rounded-lg group"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-background rounded-lg text-xl">
                    {competition.icon}
                </div>
                <div className="text-left">
                    <h3 className="text-sm font-semibold text-foreground">
                        {competition.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{competition.region}</p>
                </div>
            </div>
            <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground group-hover:text-foreground"
            >
                <ChevronRight className="w-5 h-5" />
            </motion.div>
        </button>
    );
};
