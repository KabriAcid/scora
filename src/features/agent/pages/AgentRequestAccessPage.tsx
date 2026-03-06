import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    MessageSquare,
    CheckCircle2,
    ClipboardList,
    UserCheck,
    GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// ── Constants ────────────────────────────────────────────────────────────────

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
    "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara",
];

const ROLES = [
    "Match Reporter / Correspondent",
    "Club Secretary / Administrator",
    "Match Official / Referee Assessor",
    "Football Association Staff",
    "Sports Journalist / Media",
    "League Coordinator",
    "Other",
];

const EXPERIENCE_OPTIONS = [
    { value: "lt1", label: "Less than 1 year" },
    { value: "1-3", label: "1 – 3 years" },
    { value: "3-5", label: "3 – 5 years" },
    { value: "5-10", label: "5 – 10 years" },
    { value: "gt10", label: "10 + years" },
];

const REFERRAL_OPTIONS = [
    "Football Association",
    "League Official",
    "A colleague / friend",
    "Social media",
    "Internet search",
    "Other",
];

// ── Zod schema ────────────────────────────────────────────────────────────────

const requestSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters"),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address"),
    phone: z
        .string()
        .trim()
        .regex(
            /^(\+?234|0)[789]\d{9}$/,
            "Enter a valid Nigerian phone number (e.g. 08012345678)"
        ),
    state: z.string().min(1, "Please select your state"),
    association: z
        .string()
        .trim()
        .min(2, "Enter the name of your club or association"),
    role: z.string().min(1, "Please select your primary role"),
    experience: z.string().min(1, "Please select your experience level"),
    statement: z
        .string()
        .trim()
        .min(50, "Please write at least 50 characters")
        .max(600, "Keep it under 600 characters"),
    referral: z.string().min(1, "Please let us know how you heard about us"),
    agreeTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms to continue" }),
    }),
    agreeAccuracy: z.literal(true, {
        errorMap: () => ({ message: "You must confirm the information is accurate" }),
    }),
});

type RequestFormValues = z.infer<typeof requestSchema>;

// ── Sub-components ────────────────────────────────────────────────────────────

const Spinner = () => (
    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
);

const SectionHeading = ({
    icon: Icon,
    label,
}: {
    icon: React.ElementType;
    label: string;
}) => (
    <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center flex-shrink-0">
            <Icon className="w-3.5 h-3.5 text-accent" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
        </span>
        <div className="flex-1 h-px bg-border" />
    </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const AgentRequestAccessPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<RequestFormValues>({
        resolver: zodResolver(requestSchema),
        mode: "onTouched",
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            state: "",
            association: "",
            role: "",
            experience: "",
            statement: "",
            referral: "",
            agreeTerms: undefined as unknown as true,
            agreeAccuracy: undefined as unknown as true,
        },
    });

    const statementValue = form.watch("statement") ?? "";

    const onSubmit = async (_data: RequestFormValues) => {
        setIsSubmitting(true);
        try {
            // TODO: POST /api/agent/request-access
            await new Promise((resolve) => setTimeout(resolve, 1800));
            toast.success("Application submitted!", {
                description:
                    "We'll review your request and get back to you within 2–3 working days.",
            });
            navigate("/agent/login");
        } catch {
            toast.error("Submission failed", {
                description: "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Animations ──
    const heroVariants = useMemo<Variants>(
        () => ({
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
        }),
        []
    );
    const containerVariants = useMemo<Variants>(
        () => ({
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
        }),
        []
    );
    const itemVariants = useMemo<Variants>(
        () => ({
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        }),
        []
    );

    // ── What happens next steps (hero) ──
    const nextSteps = [
        {
            icon: ClipboardList,
            title: "Application review",
            desc: "Our team reviews your details and football background.",
        },
        {
            icon: UserCheck,
            title: "Verification",
            desc: "We verify your association credentials with the relevant body.",
        },
        {
            icon: GraduationCap,
            title: "Onboarding",
            desc: "Approved agents receive login credentials and a brief orientation.",
        },
    ];

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* ── Hero panel ── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                    className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden"
                >
                    {/* Decorative circles */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-primary-foreground" />
                        <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full border-2 border-primary-foreground" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-primary-foreground/40" />
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-10 max-w-md w-full"
                    >
                        <motion.div variants={itemVariants} className="mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-6">
                                <User className="w-10 h-10 text-accent" />
                            </div>
                            <h1 className="text-3xl xl:text-4xl font-bold mb-3 leading-tight">
                                Become a Field Agent
                            </h1>
                            <p className="text-base text-primary-foreground/75">
                                Verified agents are the backbone of real-time grassroots football data across Nigeria.
                            </p>
                        </motion.div>

                        {/* What happens next */}
                        <motion.div variants={itemVariants}>
                            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
                                What happens after you apply
                            </p>
                            <div className="space-y-5">
                                {nextSteps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <step.icon className="w-4 h-4 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {i + 1}. {step.title}
                                            </p>
                                            <p className="text-xs text-primary-foreground/60 mt-0.5">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="mt-12 text-xs text-primary-foreground/50"
                        >
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/agent/login")}
                                className="text-accent cursor-pointer hover:text-accent/80 font-semibold transition-colors"
                            >
                                Sign in here
                            </span>
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* ── Form panel ── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="flex flex-col justify-start items-center p-6 sm:p-10 bg-background overflow-y-auto"
                >
                    <div className="w-full max-w-lg py-8">

                        {/* Page header */}
                        <motion.div variants={itemVariants} className="mb-7">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                                Request Access
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Fill in the form below. All fields are required unless stated otherwise.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="p-5 sm:p-7 bg-card shadow-lg border-border/50">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-7"
                                    >

                                        {/* ── Personal details ── */}
                                        <div>
                                            <SectionHeading icon={User} label="Personal details" />
                                            <div className="space-y-4">

                                                <FormField
                                                    control={form.control}
                                                    name="fullName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm">Full Name</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                                                    <Input
                                                                        placeholder="e.g. Aminu Bello"
                                                                        disabled={isSubmitting}
                                                                        className="pl-9 text-sm"
                                                                        {...field}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-xs" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-sm">Email</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                                                        <Input
                                                                            type="email"
                                                                            placeholder="you@example.com"
                                                                            disabled={isSubmitting}
                                                                            className="pl-9 text-sm"
                                                                            {...field}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="phone"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-sm">Phone Number</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                                                        <Input
                                                                            type="tel"
                                                                            placeholder="08012345678"
                                                                            disabled={isSubmitting}
                                                                            className="pl-9 text-sm"
                                                                            {...field}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── Professional background ── */}
                                        <div>
                                            <SectionHeading icon={Briefcase} label="Professional background" />
                                            <div className="space-y-4">

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="state"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-sm">State</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    value={field.value}
                                                                    disabled={isSubmitting}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger className="text-sm">
                                                                            <MapPin className="w-4 h-4 text-muted-foreground mr-1 flex-shrink-0" />
                                                                            <SelectValue placeholder="Select state" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {NIGERIAN_STATES.map((s) => (
                                                                            <SelectItem key={s} value={s} className="text-sm">
                                                                                {s}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="experience"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-sm">Years in football</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    value={field.value}
                                                                    disabled={isSubmitting}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger className="text-sm">
                                                                            <SelectValue placeholder="Select range" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {EXPERIENCE_OPTIONS.map((o) => (
                                                                            <SelectItem key={o.value} value={o.value} className="text-sm">
                                                                                {o.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="association"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm">Club / Association</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="e.g. Kano State Football Association"
                                                                    disabled={isSubmitting}
                                                                    className="text-sm"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-xs" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="role"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm">Primary role</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                                disabled={isSubmitting}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="text-sm">
                                                                        <SelectValue placeholder="What best describes you?" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {ROLES.map((r) => (
                                                                        <SelectItem key={r} value={r} className="text-sm">
                                                                            {r}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage className="text-xs" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* ── Statement ── */}
                                        <div>
                                            <SectionHeading icon={MessageSquare} label="Your statement" />
                                            <div className="space-y-4">

                                                <FormField
                                                    control={form.control}
                                                    name="statement"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm">
                                                                Why do you want to be an agent?
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Briefly describe your motivation and what you hope to contribute to grassroots football coverage…"
                                                                    rows={4}
                                                                    disabled={isSubmitting}
                                                                    className="resize-none text-sm leading-relaxed"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <div className="flex justify-between items-center mt-1">
                                                                <FormMessage className="text-xs" />
                                                                <span
                                                                    className={`text-[11px] ml-auto tabular-nums ${statementValue.length > 550
                                                                            ? "text-destructive"
                                                                            : "text-muted-foreground"
                                                                        }`}
                                                                >
                                                                    {statementValue.length} / 600
                                                                </span>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="referral"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm">How did you hear about Scora?</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                                disabled={isSubmitting}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="text-sm">
                                                                        <SelectValue placeholder="Select one" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {REFERRAL_OPTIONS.map((o) => (
                                                                        <SelectItem key={o} value={o} className="text-sm">
                                                                            {o}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage className="text-xs" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* ── Agreements ── */}
                                        <div>
                                            <SectionHeading icon={CheckCircle2} label="Declaration" />
                                            <div className="space-y-3">

                                                <FormField
                                                    control={form.control}
                                                    name="agreeTerms"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-start gap-3">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value === true}
                                                                    onCheckedChange={(v) =>
                                                                        field.onChange(v === true ? true : undefined)
                                                                    }
                                                                    disabled={isSubmitting}
                                                                    className="mt-0.5"
                                                                />
                                                            </FormControl>
                                                            <div>
                                                                <Label className="text-sm font-normal cursor-pointer leading-relaxed">
                                                                    I have read and agree to the{" "}
                                                                    <span
                                                                        onClick={() => window.open("/terms", "_blank")}
                                                                        className="text-accent hover:underline cursor-pointer"
                                                                    >
                                                                        Terms of Service
                                                                    </span>{" "}
                                                                    and understand Scora's data practices.
                                                                </Label>
                                                                <FormMessage className="text-xs mt-0.5" />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="agreeAccuracy"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-start gap-3">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value === true}
                                                                    onCheckedChange={(v) =>
                                                                        field.onChange(v === true ? true : undefined)
                                                                    }
                                                                    disabled={isSubmitting}
                                                                    className="mt-0.5"
                                                                />
                                                            </FormControl>
                                                            <div>
                                                                <Label className="text-sm font-normal cursor-pointer leading-relaxed">
                                                                    I confirm that all information provided is accurate and I am authorised to represent the organisation listed above.
                                                                </Label>
                                                                <FormMessage className="text-xs mt-0.5" />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* ── Submit ── */}
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full font-semibold py-2.5"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <Spinner />
                                                    <span>Submitting…</span>
                                                </div>
                                            ) : (
                                                "Submit Application"
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
                            Already have credentials?{" "}
                            <span
                                onClick={() => navigate("/agent/login")}
                                className="text-accent hover:text-accent/80 font-semibold transition-colors cursor-pointer"
                            >
                                Sign in
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AgentRequestAccessPage;
