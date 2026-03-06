import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MatchEvent } from "@/shared/types/agent";

interface MatchPhotoCaptureProps {
    matchId: string | undefined;
    activeTeam: string;
    currentMinute: number;
    onEventLogged: (event: MatchEvent) => void;
}

export const MatchPhotoCapture = ({
    matchId: _matchId, // TODO: used in POST /api/matches/:id/media when backend ready
    activeTeam,
    currentMinute,
    onEventLogged,
}: MatchPhotoCaptureProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<{ url: string; minute: number }[]>(
        [],
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const minute = currentMinute;

        setPreviews((prev) => [{ url, minute }, ...prev]);

        const event: MatchEvent = {
            id: crypto.randomUUID(),
            type: "photo",
            player: "Match Photo",
            team: activeTeam,
            minute,
            timestamp: new Date(),
            photoUrl: url,
            // TODO: upload file and replace blob URL with CDN URL
            // await fetch(`/api/matches/${_matchId}/media`, { method: "POST", body: formData })
        };

        onEventLogged(event);

        // Reset so the same file can be re-selected
        e.currentTarget.value = "";
    };

    return (
        <Card className="p-4 bg-card/50 border-none shadow-xl">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Match Photos
                </h2>
                {previews.length > 0 && (
                    <span className="text-xs text-muted-foreground tabular-nums">
                        {previews.length} captured
                    </span>
                )}
            </div>

            {/* Hidden file input — capture="environment" opens rear camera on mobile */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                {...{ capture: "environment" }}
                className="hidden"
                onChange={handleFileChange}
            />

            <Button
                variant="outline"
                onClick={() => inputRef.current?.click()}
                className="w-full gap-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors"
            >
                <Camera className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Take / Upload Photo</span>
            </Button>

            <AnimatePresence>
                {previews.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 grid grid-cols-4 gap-2">
                            <AnimatePresence initial={false}>
                                {previews.map(({ url, minute }, i) => (
                                    <motion.div
                                        key={url}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.85 }}
                                        transition={{ duration: 0.2, delay: i === 0 ? 0 : 0 }}
                                        className="relative group"
                                    >
                                        <img
                                            src={url}
                                            alt={`match photo ${minute}'`}
                                            className="w-full aspect-square object-cover rounded-lg border border-border"
                                        />
                                        <span className="absolute bottom-0.5 right-0.5 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                                            {minute}'
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {previews.length === 0 && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground/50 py-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Photos will appear here
                </div>
            )}
        </Card>
    );
};
