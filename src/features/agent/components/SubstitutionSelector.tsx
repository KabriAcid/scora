import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

        setSelectedOut(null);
        setSelectedIn(null);
        onClose();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Column headers */}
            <div className="grid grid-cols-2 gap-3 mb-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    On Pitch — coming off
                </p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Bench — coming on
                </p>
            </div>

            {/* Two-column player grid */}
            <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto mb-4">
                {/* On Pitch */}
                <div className="space-y-2">
                    {onPitch.map((player) => (
                        <motion.button
                            key={player.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedOut(player)}
                            className={`w-full p-2 rounded-lg text-left text-xs transition-all border-2 ${
                                selectedOut?.id === player.id
                                    ? "border-destructive bg-destructive/15"
                                    : "border-border hover:border-destructive/50 hover:bg-destructive/5"
                            }`}
                        >
                            <p className="font-semibold text-foreground">
                                #{player.number} {player.name}
                            </p>
                            {player.position && (
                                <p className="text-[10px] text-muted-foreground">{player.position}</p>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Off Pitch / Subs */}
                <div className="space-y-2">
                    {offPitch.map((player) => (
                        <motion.button
                            key={player.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedIn(player)}
                            className={`w-full p-2 rounded-lg text-left text-xs transition-all border-2 ${
                                selectedIn?.id === player.id
                                    ? "border-primary bg-primary/15"
                                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                            }`}
                        >
                            <p className="font-semibold text-foreground">
                                #{player.number} {player.name}
                            </p>
                            {player.position && (
                                <p className="text-[10px] text-muted-foreground">{player.position}</p>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Selection preview */}
            <AnimatePresence>
                {(selectedOut || selectedIn) && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="mb-4 p-3 bg-muted/60 border border-border rounded-lg"
                    >
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <span className={`font-semibold ${
                                selectedOut ? "text-destructive" : "text-muted-foreground"
                            }`}>
                                {selectedOut ? selectedOut.name : "Select player off"}
                            </span>
                            <span className="text-muted-foreground">⇄</span>
                            <span className={`font-semibold ${
                                selectedIn ? "text-primary" : "text-muted-foreground"
                            }`}>
                                {selectedIn ? selectedIn.name : "Select player on"}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => { setSelectedOut(null); setSelectedIn(null); onClose(); }}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirmSubstitution}
                    disabled={!selectedOut || !selectedIn}
                    className="flex-1"
                >
                    Confirm Sub
                </Button>
            </div>
        </div>
    );
};

