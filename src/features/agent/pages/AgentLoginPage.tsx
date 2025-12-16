import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

// Validation schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .min(1, "Password is required"),
    rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AgentLoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            console.log("Login attempt:", data);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // TODO: Store auth token and user data
            // For now, just redirect to agent dashboard
            navigate("/agent/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            form.setError("root", { message: "Login failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const heroVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Hero Section - Hidden on mobile */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                    className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden"
                >
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-primary-foreground"></div>
                        <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full border-2 border-primary-foreground"></div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-10 text-center max-w-md"
                    >
                        {/* Logo/Icon */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-6">
                                <Shield className="w-10 h-10 text-accent" />
                            </div>
                            <h1 className="text-5xl font-bold mb-4">Live Agent Hub</h1>
                            <p className="text-lg text-primary-foreground/80">
                                Real-time match event recording platform for professional agents
                            </p>
                        </motion.div>

                        {/* Features highlight */}
                        <motion.div variants={itemVariants} className="space-y-4 mt-12">
                            <div className="flex items-center gap-3 text-sm">
                                <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>Lightning-fast event logging</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>Secure agent verification</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>Live match synchronization</span>
                            </div>
                        </motion.div>

                        {/* Footer text */}
                        <motion.p
                            variants={itemVariants}
                            className="mt-12 text-sm text-primary-foreground/60"
                        >
                            Bringing grassroots football to digital life
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Login Form Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="flex flex-col justify-center items-center p-6 sm:p-12 bg-background"
                >
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <h2 className="text-3xl font-bold text-foreground mb-2">
                                Agent Login
                            </h2>
                            <p className="text-muted-foreground">
                                Access your live match dashboard
                            </p>
                        </motion.div>

                        {/* Card with form */}
                        <motion.div variants={itemVariants}>
                            <Card className="p-8 bg-card shadow-lg border-border/50">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >
                                        {/* Error message */}
                                        {form.formState.errors.root && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
                                            >
                                                {form.formState.errors.root.message}
                                            </motion.div>
                                        )}

                                        {/* Email field */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label htmlFor="email" className="text-sm font-medium">
                                                        Email Address
                                                    </Label>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                                            <Input
                                                                id="email"
                                                                placeholder="agent@scora.ng"
                                                                type="email"
                                                                disabled={isLoading}
                                                                className="pl-10 bg-input border-border/50 focus:border-accent focus:ring-accent/20 transition-colors"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Password field */}
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label htmlFor="password" className="text-sm font-medium">
                                                        Password
                                                    </Label>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                                            <Input
                                                                id="password"
                                                                placeholder="••••••••"
                                                                type={showPassword ? "text" : "password"}
                                                                disabled={isLoading}
                                                                className="pl-10 pr-10 bg-input border-border/50 focus:border-accent focus:ring-accent/20 transition-colors"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                disabled={isLoading}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOff className="w-5 h-5" />
                                                                ) : (
                                                                    <Eye className="w-5 h-5" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Remember me & Forgot password */}
                                        <div className="flex items-center justify-between">
                                            <FormField
                                                control={form.control}
                                                name="rememberMe"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                id="remember"
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                                disabled={isLoading}
                                                            />
                                                        </FormControl>
                                                        <Label
                                                            htmlFor="remember"
                                                            className="text-sm font-normal cursor-pointer"
                                                        >
                                                            Remember me
                                                        </Label>
                                                    </FormItem>
                                                )}
                                            />
                                            <a
                                                href="#forgot"
                                                className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>

                                        {/* Submit button */}
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 transition-all duration-200 hover:shadow-lg"
                                        >
                                            {isLoading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                    }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                                                    <span>Signing in...</span>
                                                </motion.div>
                                            ) : (
                                                "Sign In"
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </Card>
                        </motion.div>

                        {/* Sign up link */}
                        <motion.div variants={itemVariants} className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <a
                                    href="#signup"
                                    className="text-accent hover:text-accent/80 font-semibold transition-colors"
                                >
                                    Request access
                                </a>
                            </p>
                        </motion.div>

                        {/* Footer */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground"
                        >
                            <p>By signing in, you agree to our Terms of Service</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AgentLoginPage;
