import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/shared/utils/cn";
import { NIGERIAN_STATES } from "./LeagueFilters";
import type { LeagueSummary } from "@/data/adminMockData";

// ─── Schema ───────────────────────────────────────────────────────────────────

const leagueSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    state: z
        .string()
        .min(1, "Please select a state")
        .refine((v) => v !== "All States", { message: "Please select a state" }),
    season: z.string().trim().min(1, "Season is required"),
    teams: z.coerce
        .number({ invalid_type_error: "Must be a number" })
        .int()
        .min(2, "At least 2 teams")
        .max(64, "Max 64 teams"),
    status: z.enum(["Active", "Upcoming", "Completed"]),
});

type LeagueFormData = z.infer<typeof leagueSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface LeagueModalProps {
    mode: "create" | "edit";
    league?: LeagueSummary;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: LeagueFormData) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const LeagueModal = ({
    mode,
    league,
    isOpen,
    onClose,
    onSave,
}: LeagueModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LeagueFormData>({
        resolver: zodResolver(leagueSchema),
        mode: "onTouched",
        defaultValues: {
            name: league?.name ?? "",
            state: league?.state ?? "",
            season: "",
            teams: league?.teams ?? 10,
            status: league?.status ?? "Upcoming",
        },
    });

    // Sync defaults when league changes (edit mode)
    useEffect(() => {
        if (mode === "edit" && league) {
            reset({
                name: league.name,
                state: league.state,
                season: "",
                teams: league.teams,
                status: league.status,
            });
        } else if (mode === "create") {
            reset({ name: "", state: "", season: "", teams: 10, status: "Upcoming" });
        }
    }, [league, mode, reset]);

    const onSubmit = (data: LeagueFormData) => {
        onSave(data);
        toast.success(
            mode === "create" ? "League created successfully" : "League updated"
        );
        onClose();
    };

    const stateOptions = NIGERIAN_STATES.filter((s) => s !== "All States");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Trophy className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-foreground">
                                            {mode === "create" ? "New League" : "Edit League"}
                                        </h2>
                                        <p className="text-xs text-muted-foreground">
                                            {mode === "create"
                                                ? "Fill in the details to create a league"
                                                : `Editing: ${league?.name}`}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        League Name
                                    </label>
                                    <input
                                        {...register("name")}
                                        placeholder="e.g. Kano State Premier League"
                                        className={cn(
                                            "w-full h-9 px-3 text-sm bg-secondary border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition",
                                            errors.name
                                                ? "border-destructive focus:ring-destructive/30"
                                                : "border-border focus:ring-primary/30"
                                        )}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-destructive">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* State */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        State
                                    </label>
                                    <select
                                        {...register("state")}
                                        className={cn(
                                            "w-full h-9 px-3 text-sm bg-secondary border rounded-lg text-foreground focus:outline-none focus:ring-2 transition",
                                            errors.state
                                                ? "border-destructive focus:ring-destructive/30"
                                                : "border-border focus:ring-primary/30"
                                        )}
                                    >
                                        <option value="">Select a state</option>
                                        {stateOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && (
                                        <p className="text-xs text-destructive">
                                            {errors.state.message}
                                        </p>
                                    )}
                                </div>

                                {/* Season + Teams (2 col) */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-foreground">
                                            Season
                                        </label>
                                        <input
                                            {...register("season")}
                                            placeholder="e.g. 2025/26"
                                            className={cn(
                                                "w-full h-9 px-3 text-sm bg-secondary border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition",
                                                errors.season
                                                    ? "border-destructive focus:ring-destructive/30"
                                                    : "border-border focus:ring-primary/30"
                                            )}
                                        />
                                        {errors.season && (
                                            <p className="text-xs text-destructive">
                                                {errors.season.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-foreground">
                                            Teams
                                        </label>
                                        <input
                                            {...register("teams")}
                                            type="number"
                                            min={2}
                                            max={64}
                                            className={cn(
                                                "w-full h-9 px-3 text-sm bg-secondary border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition",
                                                errors.teams
                                                    ? "border-destructive focus:ring-destructive/30"
                                                    : "border-border focus:ring-primary/30"
                                            )}
                                        />
                                        {errors.teams && (
                                            <p className="text-xs text-destructive">
                                                {errors.teams.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Status
                                    </label>
                                    <div className="flex gap-2">
                                        {(["Upcoming", "Active", "Completed"] as const).map((s) => (
                                            <label
                                                key={s}
                                                className="flex items-center gap-1.5 cursor-pointer"
                                            >
                                                <input
                                                    {...register("status")}
                                                    type="radio"
                                                    value={s}
                                                    className="accent-primary"
                                                />
                                                <span className="text-xs font-medium">{s}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 rounded-lg text-xs font-semibold bg-secondary text-foreground hover:bg-muted transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                                    >
                                        {mode === "create" ? "Create League" : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
