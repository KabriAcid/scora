import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchControlPanelProps {
    isMatchActive: boolean;
    matchStatus: "scheduled" | "live" | "completed";
    formattedTime: string;
    onStart: () => void;
    onPause: () => void;
    onEnd: () => void;
}

const MatchControlPanel = ({
    isMatchActive,
    matchStatus,
    formattedTime,
    onStart,
    onPause,
    onEnd,
}: MatchControlPanelProps) => {
    return (
        <Card className="p-4 md:p-6 shadow-lg border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                {/* Left Section - Title & Status */}
                <div className="flex items-center gap-3 md:gap-4">
                    <h2 className="text-lg md:text-xl font-bold text-foreground">
                        Match Controls
                    </h2>
                    {isMatchActive && (
                        <motion.div
                            className="w-3 h-3 rounded-full bg-green-500"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            title="Live"
                        />
                    )}
                </div>

                {/* Right Section - Timer & Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                    {/* Match Time Display */}
                    <div className="flex items-center justify-center bg-primary/10 rounded-lg px-4 py-2 md:py-3">
                        <div className="text-2xl md:text-3xl font-mono font-bold text-primary">
                            {formattedTime}
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex gap-2 md:gap-3 flex-wrap justify-center sm:justify-end">
                        {!isMatchActive && matchStatus !== "live" && (
                            <Button
                                onClick={onStart}
                                className="gap-2 text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5"
                                size="sm"
                            >
                                <Play className="w-4 h-4" />
                                <span className="hidden sm:inline">Start</span>
                            </Button>
                        )}
                        {isMatchActive && (
                            <Button
                                onClick={onPause}
                                variant="outline"
                                className="gap-2 text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5"
                                size="sm"
                            >
                                <Pause className="w-4 h-4" />
                                <span className="hidden sm:inline">Pause</span>
                            </Button>
                        )}
                        <Button
                            onClick={onEnd}
                            variant="destructive"
                            className="gap-2 text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5"
                            size="sm"
                        >
                            <Square className="w-4 h-4" />
                            <span className="hidden sm:inline">End</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MatchControlPanel;
