import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface EventLoggingFormProps {
    homeTeam: string;
    awayTeam: string;
    activeTeam: string | null;
    eventType: string | null;
    currentMinute: number;
    onSubmit: (data: {
        player: string;
        team: string;
        description?: string;
        type: string;
    }) => void;
    onClose: () => void;
}

const EventLoggingForm = ({
    homeTeam,
    awayTeam,
    activeTeam,
    eventType,
    currentMinute,
    onSubmit,
    onClose,
}: EventLoggingFormProps) => {
    const [player, setPlayer] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeTeam || !eventType || !player.trim()) return;

        onSubmit({
            player: player.trim(),
            team: activeTeam,
            description: description.trim(),
            type: eventType,
        });

        // Reset form
        setPlayer("");
        setDescription("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
        >
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold">Log Event</h3>
                        <p className="text-sm text-muted-foreground">
                            {eventType?.replace('_', ' ')} • {activeTeam} • {currentMinute}'
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="player" className="text-sm">
                            Player Name
                        </Label>
                        <Input
                            id="player"
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                            placeholder="Enter player name..."
                            required
                            className="mt-1"
                        />
                    </div>

                    {["substitution", "corner"].includes(eventType || "") && (
                        <div>
                            <Label htmlFor="description" className="text-sm">
                                Details (Optional)
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Additional details..."
                                rows={2}
                                className="mt-1"
                            />
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={!player.trim()}
                        >
                            Log Event
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </motion.div>
    );
};

export default EventLoggingForm;
