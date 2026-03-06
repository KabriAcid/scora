import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, type Variants } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  BarChart3,
  Users,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = () => (
  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
);

// ─── Feature bullets (hero) ───────────────────────────────────────────────────

const features = [
  {
    icon: <Users className="w-4 h-4" />,
    text: "Manage players, teams & leagues",
  },
  {
    icon: <Calendar className="w-4 h-4" />,
    text: "Schedule & control all fixtures",
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    text: "Full platform oversight & stats",
  },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const heroVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // TODO: replace with real auth call
      console.log("Admin login:", data);
      await new Promise((r) => setTimeout(r, 1200));
      navigate(ROUTES.ADMIN.DASHBOARD);
    } catch {
      toast.error("Login failed", {
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* ── Hero ── */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex flex-col justify-center items-center p-14 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground relative overflow-hidden"
        >
          {/* Decorative rings */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-primary-foreground/10" />
            <div className="absolute -bottom-24 -left-16 w-96 h-96 rounded-full border border-primary-foreground/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary-foreground/5" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-sm w-full"
          >
            {/* Icon + title */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-bold mb-3 leading-tight">
                Admin Portal
              </h1>
              <p className="text-primary-foreground/70 text-base leading-relaxed">
                Central control hub for the Scora platform — leagues, teams,
                players, fixtures and agents.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="space-y-3.5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="text-accent flex-shrink-0">{f.icon}</span>
                  <span className="text-sm text-primary-foreground/80">
                    {f.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-10 text-xs text-primary-foreground/40"
            >
              Scora · Admin access only · Unauthorized access is prohibited
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ── Form ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center items-center p-6 sm:p-12 bg-background"
        >
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <motion.div
              variants={itemVariants}
              className="flex lg:hidden items-center justify-center gap-2 mb-8"
            >
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Scora</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-1.5">
                Admin Login
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to access the admin portal
              </p>
            </motion.div>

            {/* Card */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 shadow-lg border-border/50">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email Address
                          </Label>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="admin@scora.app"
                                disabled={isLoading}
                                className="pl-9 border-2 border-border/60 focus:border-primary transition-colors"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label
                            htmlFor="password"
                            className="text-sm font-medium"
                          >
                            Password
                          </Label>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                disabled={isLoading}
                                className="pl-9 pr-10 border-2 border-border/60 focus:border-primary transition-colors"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                disabled={isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full font-semibold mt-2"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Spinner />
                          <span>Signing in…</span>
                        </div>
                      ) : (
                        "Sign In to Admin"
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              <button
                onClick={() => navigate("/")}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Back to Homepage
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
