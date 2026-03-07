import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/shared/utils/cn";
import { NIGERIAN_STATES } from "./TeamFilters";
import type { TeamSummary } from "@/data/adminMockData";

// ─── Schema ───────────────────────────────────────────────────────────────────

const teamSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    shortCode: z
        .string()
        .trim()
        .min(2, "At least 2 characters")
        .max(4, "Max 4 characters")
        .toUpperCase(),
    state: z
        .string()
        .min(1, "Please select a state")
        .refine((v) => v !== "All States", { message: "Please select a state" }),
    league: z.string().trim().min(2, "League name is required"),
    players: z.coerce
        .number({ invalid_type_error: "Must be a number" })
        .int()
        .min(1, "At least 1 player")
        .max(50, "Max 50 players"),
    status: z.enum(["Active", "Inactive", "Suspended"]),
});

type TeamFormData = z.infer<typeof teamSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface TeamModalProps {
    mode: "create" | "edit";
    team?: TeamSummary;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: TeamFormData) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TeamModal = ({ mode, team, isOpen, onClose, onSave }: TeamModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TeamFormData>({
        resolver: zodResolver(teamSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            shortCode: "",
            state: "",
            league: "",
            players: 16,
            status: "Active",
        },
    });

    useEffect(() => {
        if (mode === "edit" && team) {
            reset({
                name: team.name,
                shortCode: team.shortCode,
                state: team.state,
                league: team.league,
                players: team.players,
                status: team.status,
            });
        } else if (mode === "create") {
            reset({ name: "", shortCode: "", state: "", league: "", players: 16, status: "Active" });
        }
    }, [team, mode, reset]);

    const onSubmit = (data: TeamFormData) => {
        onSave(data);
        toast.success(mode === "create" ? "Team created successfully" : "Team updated");
        onClose();
    };

    const stateOptions = NIGERIAN_STATES.filter((s) => s !== "All States");

    const fieldClass = (hasError: boolean) =>
        cn(
            "w-full px-3 py-2 text-xs bg-secondary border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors",
            hasError
                ? "border-destructive focus:ring-destructive/50"
                : "border-border focus:ring-primary/50"
        );

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
                        <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border sticky top-0 bg-card z-10">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-foreground">
                                            {mode === "create" ? "New Team" : "Edit Team"}
                                        </h2>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">
                                            {mode === "create"
                                                ? "Register a new club"
                                                : "Update team details"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">
                                        Team Name <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        {...register("name")}
                                        placeholder="e.g. Kano Pillars FC"
                                        className={fieldClass(!!errors.name)}
                                    />
                                    {errors.name && (
                                        <p className="text-[11px] text-destructive">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Short code + state row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            Short Code <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            {...register("shortCode")}
                                            placeholder="e.g. KPL"
                                            maxLength={4}
                                            className={cn(fieldClass(!!errors.shortCode), "uppercase")}
                                        />
                                        {errors.shortCode && (
                                            <p className="text-[11px] text-destructive">
                                                {errors.shortCode.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            State <span className="text-destructive">*</span>
                                        </label>
                                        <select
                                            {...register("state")}
                                            className={fieldClass(!!errors.state)}
                                        >
                                            <option value="">Select state</option>
                                            {stateOptions.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.state && (
                                            <p className="text-[11px] text-destructive">
                                                {errors.state.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* League */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">
                                        League <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        {...register("league")}
                                        placeholder="e.g. Kano State League"
                                        className={fieldClass(!!errors.league)}
                                    />
                                    {errors.league && (
                                        <p className="text-[11px] text-destructive">
                                            {errors.league.message}
                                        </p>
                                    )}
                                </div>

                                {/* Players + status row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            Squad Size <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            {...register("players")}
                                            type="number"
                                            min={1}
                                            max={50}
                                            className={fieldClass(!!errors.players)}
                                        />
                                        {errors.players && (
                                            <p className="text-[11px] text-destructive">
                                                {errors.players.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            Status <span className="text-destructive">*</span>
                                        </label>
                                        <select
                                            {...register("status")}
                                            className={fieldClass(!!errors.status)}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Suspended">Suspended</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-xs font-semibold rounded-xl bg-secondary text-foreground hover:bg-muted transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 text-xs font-semibold rounded-xl bg-accent text-primary-foreground hover:bg-accent/90 transition-colors disabled:opacity-50"
                                    >
                                        {mode === "create" ? "Create Team" : "Save Changes"}
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
