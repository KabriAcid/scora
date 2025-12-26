import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold block">Match Controls</h2>
                    <Badge variant={isMatchActive ? "success" : "secondary"}>
                        {isMatchActive ? "LIVE" : "PAUSED"}
                    </Badge>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-mono font-bold">
                        {formattedTime}
                    </div>
                    <div className="flex gap-3">
                        {!isMatchActive && matchStatus !== "live" && (
                            <Button onClick={onStart} className="gap-2">
                                <Play className="w-4 h-4" />
                                Start
                            </Button>
                        )}
                        {isMatchActive && (
                            <Button onClick={onPause} variant="outline" className="gap-2">
                                <Pause className="w-4 h-4" />
                                Pause
                            </Button>
                        )}
                        <Button onClick={onEnd} variant="destructive" className="gap-2">
                            <Square className="w-4 h-4" />
                            End
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MatchControlPanel;
