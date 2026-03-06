import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronDown, Images, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn";
import { SLOT_CONFIG, MediaSlot } from "@/data/matchDetails";

const ALL_SLOTS: MediaSlot[] = [1, 2, 3];

interface SlotPhoto {
    id: string;
    url: string;
}

interface MatchPhotoCaptureProps {
    matchId: string | undefined;
}

export const MatchPhotoCapture = ({
    matchId: _matchId,
}: MatchPhotoCaptureProps) => {
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const pendingSlotRef = useRef<MediaSlot | null>(null);

    const [isOpen, setIsOpen] = useState(true);
    const [slots, setSlots] = useState<Record<MediaSlot, SlotPhoto | null>>({
        1: null,
        2: null,
        3: null,
    });

    const openUpload = (slot: MediaSlot, mode: "camera" | "gallery") => {
        pendingSlotRef.current = slot;
        if (mode === "camera") {
            cameraInputRef.current?.click();
        } else {
            galleryInputRef.current?.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const slot = pendingSlotRef.current;
        const file = e.currentTarget.files?.[0];
        if (!file || slot === null) return;

        const url = URL.createObjectURL(file);
        const id = crypto.randomUUID();

        setSlots((prev) => ({ ...prev, [slot]: { id, url } }));

        e.currentTarget.value = "";
        pendingSlotRef.current = null;
    };

    const handleRemove = (slot: MediaSlot) => {
        setSlots((prev) => {
            const existing = prev[slot];
            if (existing) URL.revokeObjectURL(existing.url);
            return { ...prev, [slot]: null };
        });
    };

    const filledCount = ALL_SLOTS.filter((s) => slots[s] !== null).length;

    return (
        <Card className="p-4 bg-card/50 border-none shadow-xl">
            {/* Collapsible header */}
            <button
                onClick={() => setIsOpen((o) => !o)}
                className="flex items-center justify-between w-full mb-0 group"
            >
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Match Photos
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground tabular-nums">
                        {filledCount} / {ALL_SLOTS.length}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3">
                            <div className="flex gap-1.5 mb-4">
                                {ALL_SLOTS.map((slot) => (
                                    <div
                                        key={slot}
                                        className={cn(
                                            "h-1 flex-1 rounded-full transition-colors duration-300",
                                            slots[slot] ? "bg-primary" : "bg-muted"
                                        )}
                                    />
                                ))}
                            </div>

                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <input
                                ref={galleryInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <div className="flex flex-col gap-3">
                                {ALL_SLOTS.map((slot) => {
                                    const config = SLOT_CONFIG[slot];
                                    const photo = slots[slot];

                                    return (
                                        <motion.div
                                            key={slot}
                                            layout
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: (slot - 1) * 0.05 }}
                                        >
                                            {photo ? (
                                                <div className="relative rounded-xl overflow-hidden border border-border group aspect-video bg-muted">
                                                    <img
                                                        src={photo.url}
                                                        alt={config.label}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                    <span
                                                        className={cn(
                                                            "absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                                                            config.badgeClass
                                                        )}
                                                    >
                                                        {config.badge}
                                                    </span>
                                                    <button
                                                        onClick={() => handleRemove(slot)}
                                                        className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                                                        title="Remove photo"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="rounded-xl border border-dashed border-border bg-muted/20 p-3">
                                                    <div className="flex items-center gap-2 mb-2.5">
                                                        <span
                                                            className={cn(
                                                                "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                                                                config.badgeClass
                                                            )}
                                                        >
                                                            {config.badge}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {config.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => openUpload(slot, "camera")}
                                                            className="flex-1 gap-1.5 h-8 border-primary/30 hover:border-primary hover:bg-primary/5"
                                                        >
                                                            <Camera className="w-3.5 h-3.5 text-primary" />
                                                            <span className="text-xs">Camera</span>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => openUpload(slot, "gallery")}
                                                            className="flex-1 gap-1.5 h-8 hover:border-primary/40 hover:bg-primary/5"
                                                        >
                                                            <Images className="w-3.5 h-3.5 text-muted-foreground" />
                                                            <span className="text-xs">Gallery</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};