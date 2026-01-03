import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { Player } from "@/data/matchDetails";
import type { MatchEvent } from "@/shared/types/agent";

interface SubstitutionSelectorProps {
    team: string;
    onPitch: Player[];
    offPitch: Player[];
    currentMinute: number;
    onSubstitutionRecorded: (event: MatchEvent, playerIn: Player, playerOut: Player) => void;
    onClose: () => void;
}

export const SubstitutionSelector = ({
    team,
    onPitch,
    offPitch,
    currentMinute,
    onSubstitutionRecorded,
    onClose,
}: SubstitutionSelectorProps) => {
    const [selectedOut, setSelectedOut] = useState<Player | null>(null);
    const [selectedIn, setSelectedIn] = useState<Player | null>(null);

    const handleConfirmSubstitution = () => {
        if (!selectedOut || !selectedIn) {
            toast.error("Please select both a player to remove and a player to bring in");
            return;
        }

        const newEvent: MatchEvent = {
            id: `event-${Date.now()}`,
            type: "substitution",
            player: `${selectedOut.name} → ${selectedIn.name}`,
            team: team,
            minute: currentMinute,
            timestamp: new Date(),
        };

        onSubstitutionRecorded(newEvent, selectedIn, selectedOut);

        toast.success(
            <div className="flex items-center gap-2">
                <img src="/images/event-substitution.svg" alt="Sub" className="w-4 h-4" />
                <span>Sub: {selectedOut.name} → {selectedIn.name}</span>
            </div>,
            { duration: 2000 }
        );

        // Reset selections
        setSelectedOut(null);
        setSelectedIn(null);
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="relative"
            >
                <Card className="p-4 bg-card/50 border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-foreground">Substitution</h3>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={onClose}
                            className="h-6 w-6 p-0 hover:bg-destructive/20"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Main Grid: On Pitch vs Off Pitch */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* On Pitch Players (Left) */}
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                On Pitch
                            </p>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                {onPitch.map((player) => (
                                    <motion.button
                                        key={player.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedOut(player)}
                                        className={`w-full p-2 rounded-lg text-left text-xs transition-all border-2 ${selectedOut?.id === player.id
                                                ? "border-destructive bg-destructive/20"
                                                : "border-border hover:border-destructive/50 hover:bg-destructive/5"
                                            }`}
                                    >
                                        <p className="font-semibold text-foreground">
                                            #{player.number} {player.name}
                                        </p>
                                        {player.position && (
                                            <p className="text-xs text-muted-foreground">{player.position}</p>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Off Pitch Players (Right) */}
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Subs
                            </p>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                {offPitch.map((player) => (
                                    <motion.button
                                        key={player.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedIn(player)}
                                        className={`w-full p-2 rounded-lg text-left text-xs transition-all border-2 ${selectedIn?.id === player.id
                                                ? "border-primary bg-primary/20"
                                                : "border-border hover:border-primary/50 hover:bg-primary/5"
                                            }`}
                                    >
                                        <p className="font-semibold text-foreground">
                                            #{player.number} {player.name}
                                        </p>
                                        {player.position && (
                                            <p className="text-xs text-muted-foreground">{player.position}</p>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visual Connection */}
                    {selectedOut && selectedIn && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg"
                        >
                            <p className="text-xs text-center">
                                <span className="font-semibold text-destructive">{selectedOut.name}</span>
                                <span className="text-muted-foreground"> → </span>
                                <span className="font-semibold text-primary">{selectedIn.name}</span>
                            </p>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleConfirmSubstitution}
                            disabled={!selectedOut || !selectedIn}
                            className="flex-1"
                        >
                            Confirm Sub
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
};
