import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, UserCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/shared/utils/cn";
import { NIGERIAN_STATES } from "../teams/TeamFilters";
import type { AgentSummary } from "@/data/adminMockData";

const agentSchema = z.object({
  name: z.string().trim().min(3, "Full name required"),
  agentCode: z.string().trim().min(3, "Agent code required").toUpperCase(),
  state: z
    .string()
    .min(1)
    .refine((v) => v !== "All States", { message: "Select a state" }),
  matchesLogged: z.coerce.number().int().min(0),
  accuracy: z.coerce.number().min(0).max(100),
  status: z.enum(["Active", "Inactive", "Pending"]),
});

type AgentFormData = z.infer<typeof agentSchema>;

interface AgentModalProps {
  mode: "create" | "edit";
  agent?: AgentSummary;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AgentFormData) => void;
}

export const AgentModal = ({
  mode,
  agent,
  isOpen,
  onClose,
  onSave,
}: AgentModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      agentCode: "",
      state: "",
      matchesLogged: 0,
      accuracy: 100,
      status: "Pending",
    },
  });

  useEffect(() => {
    if (mode === "edit" && agent) {
      reset({
        name: agent.name,
        agentCode: agent.agentCode,
        state: agent.state,
        matchesLogged: agent.matchesLogged,
        accuracy: agent.accuracy,
        status: agent.status,
      });
    } else {
      reset({
        name: "",
        agentCode: "",
        state: "",
        matchesLogged: 0,
        accuracy: 100,
        status: "Pending",
      });
    }
  }, [agent, mode, reset]);

  const onSubmit = (data: AgentFormData) => {
    onSave(data);
    toast.success(mode === "create" ? "Agent registered" : "Agent updated");
    onClose();
  };

  const stateOptions = NIGERIAN_STATES.filter((s) => s !== "All States");
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
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UserCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-foreground">
                      {mode === "create" ? "Register Agent" : "Edit Agent"}
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      {mode === "create"
                        ? "Add a new field agent"
                        : "Update agent details"}
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
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    placeholder="e.g. Abdullahi Musa"
                    className={field(!!errors.name)}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-destructive mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Agent Code
                    </label>
                    <input
                      {...register("agentCode")}
                      placeholder="e.g. AGT-001"
                      className={field(!!errors.agentCode)}
                    />
                    {errors.agentCode && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.agentCode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      State
                    </label>
                    <select
                      {...register("state")}
                      className={field(!!errors.state)}
                    >
                      <option value="">Select…</option>
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
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Matches Logged
                    </label>
                    <input
                      type="number"
                      {...register("matchesLogged")}
                      className={field(!!errors.matchesLogged)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Accuracy (%)
                    </label>
                    <input
                      type="number"
                      {...register("accuracy")}
                      className={field(!!errors.accuracy)}
                    />
                    {errors.accuracy && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.accuracy.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className={field(!!errors.status)}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                  </select>
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
                    {mode === "create" ? "Register Agent" : "Save Changes"}
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
