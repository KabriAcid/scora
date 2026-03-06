import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ImageIcon, Images, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PhotoPreview {
    id: string;
    url: string;
    minute: number;
}

interface MatchPhotoCaptureProps {
    matchId: string | undefined;
    currentMinute: number;
}

export const MatchPhotoCapture = ({
    matchId: _matchId, // TODO: used in POST /api/matches/:id/media when backend ready
    currentMinute,
}: MatchPhotoCaptureProps) => {
    // Two separate inputs: one forces the device camera, one opens the gallery/picker
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<PhotoPreview[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const id = crypto.randomUUID();

        setPreviews((prev) => [{ id, url, minute: currentMinute }, ...prev]);

        // TODO: upload file and replace blob URL with CDN URL
        // await fetch(`/api/matches/${_matchId}/media`, { method: "POST", body: formData })

        // Reset so the same file can be re-selected
        e.currentTarget.value = "";
    };

    const handleRemove = (id: string) => {
        setPreviews((prev) => {
            const target = prev.find((p) => p.id === id);
            if (target) URL.revokeObjectURL(target.url); // free memory
            return prev.filter((p) => p.id !== id);
        });
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

            {/*
        Camera input — capture="environment" bypasses the gallery and opens
        the device’s rear camera directly on mobile.
      */}
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
            />

            {/*
        Gallery input — no capture attribute, so the OS shows the full
        media picker (gallery + files) on both mobile and desktop.
      */}
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1 gap-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors"
                >
                    <Camera className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Camera</span>
                </Button>
                <Button
                    variant="outline"
                    onClick={() => galleryInputRef.current?.click()}
                    className="flex-1 gap-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                    <Images className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Gallery</span>
                </Button>
            </div>

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
                                {previews.map(({ id, url, minute }) => (
                                    <motion.div
                                        key={id}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.85 }}
                                        transition={{ duration: 0.2 }}
                                        className="relative group"
                                    >
                                        <img
                                            src={url}
                                            alt={`match photo ${minute}'`}
                                            className="w-full aspect-square object-cover rounded-lg border border-border"
                                        />
                                        {/* Minute stamp */}
                                        <span className="absolute bottom-0.5 right-0.5 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                                            {minute}'
                                        </span>
                                        {/* Remove button — visible on hover */}
                                        <button
                                            onClick={() => handleRemove(id)}
                                            className="absolute top-0.5 left-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                                            title="Remove photo"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
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
