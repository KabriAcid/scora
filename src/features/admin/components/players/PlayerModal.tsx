import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/shared/utils/cn";
import { NIGERIAN_STATES } from "../teams/TeamFilters";
import type { PlayerSummary } from "@/data/adminMockData";

// ─── Schema ───────────────────────────────────────────────────────────────────

const playerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  number: z.coerce.number().int().min(1).max(99, "Between 1 and 99"),
  position: z.enum(["GK", "DEF", "MID", "FWD"]),
  team: z.string().trim().min(2, "Team name required"),
  league: z.string().trim().min(2, "League required"),
  state: z
    .string()
    .min(1)
    .refine((v) => v !== "All States", { message: "Select a state" }),
  age: z.coerce.number().int().min(15).max(45),
  status: z.enum(["Active", "Injured", "Suspended"]),
});

type PlayerFormData = z.infer<typeof playerSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface PlayerModalProps {
  mode: "create" | "edit";
  player?: PlayerSummary;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PlayerFormData) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PlayerModal = ({
  mode,
  player,
  isOpen,
  onClose,
  onSave,
}: PlayerModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      number: 10,
      position: "MID",
      team: "",
      league: "",
      state: "",
      age: 22,
      status: "Active",
    },
  });

  useEffect(() => {
    if (mode === "edit" && player) {
      reset({
        name: player.name,
        number: player.number,
        position: player.position,
        team: player.team,
        league: player.league,
        state: player.state,
        age: player.age,
        status: player.status,
      });
    } else if (mode === "create") {
      reset({
        name: "",
        number: 10,
        position: "MID",
        team: "",
        league: "",
        state: "",
        age: 22,
        status: "Active",
      });
    }
  }, [player, mode, reset]);

  const onSubmit = (data: PlayerFormData) => {
    onSave(data);
    toast.success(mode === "create" ? "Player registered" : "Player updated");
    onClose();
  };

  const stateOptions = NIGERIAN_STATES.filter((s) => s !== "All States");

  const field = (hasError: boolean) =>
    cn(
      "w-full px-3 py-2 text-xs bg-secondary border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors",
      hasError
        ? "border-destructive focus:ring-destructive/50"
        : "border-border focus:ring-primary/50",
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-foreground">
                      {mode === "create" ? "Register Player" : "Edit Player"}
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      {mode === "create"
                        ? "Add a new player to the registry"
                        : "Update player details"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {/* Name */}
                  <div className="col-span-2">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      placeholder="e.g. Ibrahim Musa"
                      className={field(!!errors.name)}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  {/* Number */}
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Shirt #
                    </label>
                    <input
                      type="number"
                      {...register("number")}
                      className={field(!!errors.number)}
                    />
                    {errors.number && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.number.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Position */}
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Position
                    </label>
                    <select
                      {...register("position")}
                      className={field(!!errors.position)}
                    >
                      {["GK", "DEF", "MID", "FWD"].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  {/* Age */}
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      {...register("age")}
                      className={field(!!errors.age)}
                    />
                    {errors.age && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Team */}
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    Team
                  </label>
                  <input
                    {...register("team")}
                    placeholder="e.g. Kano Pillars FC"
                    className={field(!!errors.team)}
                  />
                  {errors.team && (
                    <p className="text-[10px] text-destructive mt-1">
                      {errors.team.message}
                    </p>
                  )}
                </div>

                {/* League */}
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    League
                  </label>
                  <input
                    {...register("league")}
                    placeholder="e.g. Kano State League"
                    className={field(!!errors.league)}
                  />
                  {errors.league && (
                    <p className="text-[10px] text-destructive mt-1">
                      {errors.league.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* State */}
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      State
                    </label>
                    <select
                      {...register("state")}
                      className={field(!!errors.state)}
                    >
                      <option value="">Select state…</option>
                      {stateOptions.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  {/* Status */}
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Status
                    </label>
                    <select
                      {...register("status")}
                      className={field(!!errors.status)}
                    >
                      <option>Active</option>
                      <option>Injured</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-xs font-semibold bg-secondary text-foreground rounded-xl hover:bg-secondary/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    {mode === "create" ? "Register Player" : "Save Changes"}
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
