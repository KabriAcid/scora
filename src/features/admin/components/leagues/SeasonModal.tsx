import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/shared/utils/cn";

// ─── Schema ───────────────────────────────────────────────────────────────────

const seasonSchema = z
    .object({
        label: z
            .string()
            .trim()
            .min(1, "Season label is required")
            .regex(/^\d{4}\/\d{2,4}$/, 'Format must be e.g. 2025/26'),
        startMonth: z.string().min(1, "Start month is required"),
        startYear: z.coerce
            .number({ invalid_type_error: "Required" })
            .int()
            .min(2020)
            .max(2099),
        endMonth: z.string().min(1, "End month is required"),
        endYear: z.coerce
            .number({ invalid_type_error: "Required" })
            .int()
            .min(2020)
            .max(2099),
        teams: z.coerce
            .number({ invalid_type_error: "Must be a number" })
            .int()
            .min(2, "At least 2 teams")
            .max(64, "Max 64 teams"),
        status: z.enum(["Active", "Upcoming", "Completed"]),
    })
    .refine(
        (d) =>
            d.startYear < d.endYear ||
            (d.startYear === d.endYear &&
                MONTHS.indexOf(d.startMonth) < MONTHS.indexOf(d.endMonth)),
        { message: "End date must be after start date", path: ["endMonth"] }
    );

export type SeasonFormData = z.infer<typeof seasonSchema>;

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface SeasonModalProps {
    leagueName: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: SeasonFormData) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SeasonModal = ({
    leagueName,
    isOpen,
    onClose,
    onSave,
}: SeasonModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SeasonFormData>({
        resolver: zodResolver(seasonSchema),
        mode: "onTouched",
        defaultValues: {
            label: "",
            startMonth: "Sep",
            startYear: new Date().getFullYear(),
            endMonth: "May",
            endYear: new Date().getFullYear() + 1,
            teams: 16,
            status: "Upcoming",
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                label: "",
                startMonth: "Sep",
                startYear: new Date().getFullYear(),
                endMonth: "May",
                endYear: new Date().getFullYear() + 1,
                teams: 16,
                status: "Upcoming",
            });
        }
    }, [isOpen, reset]);

    const onSubmit = (data: SeasonFormData) => {
        onSave(data);
        toast.success("Season created successfully");
        onClose();
    };

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
                                        <Layers className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-foreground">
                                            New Season
                                        </h2>
                                        <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                                            {leagueName}
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
                                {/* Season label */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Season Label
                                    </label>
                                    <input
                                        {...register("label")}
                                        placeholder="e.g. 2025/26"
                                        className={cn(
                                            "w-full h-9 px-3 text-sm bg-secondary border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition",
                                            errors.label
                                                ? "border-destructive focus:ring-destructive/30"
                                                : "border-border focus:ring-primary/30"
                                        )}
                                    />
                                    {errors.label && (
                                        <p className="text-xs text-destructive">{errors.label.message}</p>
                                    )}
                                </div>

                                {/* Start date */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Start Date
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            {...register("startMonth")}
                                            className={cn(
                                                "h-9 px-3 text-sm bg-secondary border rounded-lg text-foreground focus:outline-none focus:ring-2 transition",
                                                errors.startMonth
                                                    ? "border-destructive focus:ring-destructive/30"
                                                    : "border-border focus:ring-primary/30"
                                            )}
                                        >
                                            {MONTHS.map((m) => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                        <input
                                            {...register("startYear")}
                                            type="number"
                                            placeholder="2025"
                                            className={cn(
                                                "h-9 px-3 text-sm bg-secondary border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition",
                                                errors.startYear
                                                    ? "border-destructive focus:ring-destructive/30"
                                                    : "border-border focus:ring-primary/30"
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* End date */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        End Date
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            {...register("endMonth")}
                                            className={cn(
                                                "h-9 px-3 text-sm bg-secondary border rounded-lg text-foreground focus:outline-none focus:ring-2 transition",
                                                errors.endMonth
                                                    ? "border-destructive focus:ring-destructive/30"
                                                    : "border-border focus:ring-primary/30"
                                            )}
                                        >
                                            {MONTHS.map((m) => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                        <input
                                            {...register("endYear")}
                                            type="number"
                                            placeholder="2026"
                                            className={cn(
                                                "h-9 px-3 text-sm bg-secondary border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition",
                                                errors.endYear
                                                    ? "border-destructive focus:ring-destructive/30"
                                                    : "border-border focus:ring-primary/30"
                                            )}
                                        />
                                    </div>
                                    {errors.endMonth && (
                                        <p className="text-xs text-destructive">{errors.endMonth.message}</p>
                                    )}
                                </div>

                                {/* Teams */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Number of Teams
                                    </label>
                                    <input
                                        {...register("teams")}
                                        type="number"
                                        min={2}
                                        max={64}
                                        className={cn(
                                            "w-full h-9 px-3 text-sm bg-secondary border rounded-lg focus:outline-none focus:ring-2 transition",
                                            errors.teams
                                                ? "border-destructive focus:ring-destructive/30"
                                                : "border-border focus:ring-primary/30"
                                        )}
                                    />
                                    {errors.teams && (
                                        <p className="text-xs text-destructive">{errors.teams.message}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground">
                                        Status
                                    </label>
                                    <div className="flex gap-3">
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
                                        Create Season
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
