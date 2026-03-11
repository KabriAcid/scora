import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/shared/utils/cn";
import type { FixtureSummary } from "@/data/adminMockData";

const fixtureSchema = z.object({
  homeTeam: z.string().trim().min(2, "Home team required"),
  awayTeam: z.string().trim().min(2, "Away team required"),
  league: z.string().trim().min(2, "League required"),
  stadium: z.string().trim().min(2, "Stadium required"),
  date: z.string().trim().min(1, "Date required"),
  time: z.string().trim().min(1, "Time required"),
  week: z.string().trim().min(1, "Week required"),
  agentAssigned: z.string().nullable(),
  status: z.enum(["Scheduled", "Live", "Completed", "Postponed"]),
});

type FixtureFormData = z.infer<typeof fixtureSchema>;

interface FixtureModalProps {
  mode: "create" | "edit";
  fixture?: FixtureSummary;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FixtureFormData) => void;
}

export const FixtureModal = ({
  mode,
  fixture,
  isOpen,
  onClose,
  onSave,
}: FixtureModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FixtureFormData>({
    resolver: zodResolver(fixtureSchema),
    mode: "onTouched",
    defaultValues: {
      homeTeam: "",
      awayTeam: "",
      league: "",
      stadium: "",
      date: "",
      time: "15:00",
      week: "MD1",
      agentAssigned: null,
      status: "Scheduled",
    },
  });

  useEffect(() => {
    if (mode === "edit" && fixture) {
      reset({
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
        league: fixture.league,
        stadium: fixture.stadium,
        date: fixture.date,
        time: fixture.time,
        week: fixture.week,
        agentAssigned: fixture.agentAssigned,
        status: fixture.status,
      });
    } else {
      reset({
        homeTeam: "",
        awayTeam: "",
        league: "",
        stadium: "",
        date: "",
        time: "15:00",
        week: "MD1",
        agentAssigned: null,
        status: "Scheduled",
      });
    }
  }, [fixture, mode, reset]);

  const onSubmit = (data: FixtureFormData) => {
    onSave(data);
    toast.success(mode === "create" ? "Fixture scheduled" : "Fixture updated");
    onClose();
  };

  const field = (err: boolean) =>
    cn(
      "w-full px-3 py-2 text-xs bg-secondary border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors",
      err
        ? "border-destructive focus:ring-destructive/50"
        : "border-border focus:ring-primary/50",
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            key="md"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto pointer-events-auto">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-foreground">
                      {mode === "create" ? "Schedule Fixture" : "Edit Fixture"}
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      {mode === "create"
                        ? "Create a new match fixture"
                        : "Update fixture details"}
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

              <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Home Team
                    </label>
                    <input
                      {...register("homeTeam")}
                      placeholder="e.g. Kano Pillars"
                      className={field(!!errors.homeTeam)}
                    />
                    {errors.homeTeam && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.homeTeam.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Away Team
                    </label>
                    <input
                      {...register("awayTeam")}
                      placeholder="e.g. Rangers Intl"
                      className={field(!!errors.awayTeam)}
                    />
                    {errors.awayTeam && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.awayTeam.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    League
                  </label>
                  <input
                    {...register("league")}
                    placeholder="e.g. Northern Premier League"
                    className={field(!!errors.league)}
                  />
                  {errors.league && (
                    <p className="text-[10px] text-destructive mt-1">
                      {errors.league.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    Stadium
                  </label>
                  <input
                    {...register("stadium")}
                    placeholder="e.g. Sani Abacha Stadium"
                    className={field(!!errors.stadium)}
                  />
                  {errors.stadium && (
                    <p className="text-[10px] text-destructive mt-1">
                      {errors.stadium.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Date
                    </label>
                    <input
                      {...register("date")}
                      placeholder="e.g. Sat 15 Mar"
                      className={field(!!errors.date)}
                    />
                    {errors.date && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Kick-off Time
                    </label>
                    <input
                      {...register("time")}
                      placeholder="e.g. 15:00"
                      className={field(!!errors.time)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Matchday
                    </label>
                    <input
                      {...register("week")}
                      placeholder="e.g. MD12"
                      className={field(!!errors.week)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Status
                    </label>
                    <select
                      {...register("status")}
                      className={field(!!errors.status)}
                    >
                      <option>Scheduled</option>
                      <option>Live</option>
                      <option>Completed</option>
                      <option>Postponed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    Assigned Agent (optional)
                  </label>
                  <input
                    {...register("agentAssigned")}
                    placeholder="e.g. Umar Farouk"
                    className={field(false)}
                  />
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-xs font-semibold bg-secondary text-foreground rounded-xl hover:bg-secondary/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-xs font-semibold bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
                  >
                    {mode === "create" ? "Schedule Fixture" : "Save Changes"}
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
