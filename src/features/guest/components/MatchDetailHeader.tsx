import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MatchDetailHeaderProps {
    league: string;
    onBack: () => void;
}

export const MatchDetailHeader = ({ league, onBack }: MatchDetailHeaderProps) => {
    return (
        <motion.div
            className="flex items-center justify-between p-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
            >
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-base font-semibold text-primary-foreground">{league}</h1>
            <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
            >
                <MoreVertical className="w-5 h-5" />
            </Button>
        </motion.div>
    );
};
