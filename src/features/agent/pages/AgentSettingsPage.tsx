import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Lock,
    Bell,
    Shield,
    Camera,
    Eye,
    EyeOff,
    Pencil,
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Badge as BadgeIcon,
    LogOut,
    AlertTriangle,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AgentLayout from "@/components/layout/AgentLayout";
import { mockAgentProfile, mockAgentStats } from "@/data/agentMockData";
import { cn } from "@/shared/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "profile" | "security" | "notifications";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatJoinDate = (d: Date) =>
    d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionTitle = ({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {children}
        </h3>
        {action}
    </div>
);

interface InputRowProps {
    label: string;
    value: string;
    onChange?: (v: string) => void;
    type?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    hint?: string;
    suffix?: React.ReactNode;
    placeholder?: string;
    name?: string;
    id?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: string;
    required?: boolean;
    minLength?: number;
}

const InputRow = ({
    label,
    value,
    onChange,
    type = "text",
    disabled = false,
    icon,
    hint,
    suffix,
    placeholder,
    name,
    id,
    inputMode,
    autoComplete,
    required,
    minLength,
}: InputRowProps) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="text-xs font-semibold text-muted-foreground block">
            {label}
            {required && <span className="text-accent ml-0.5">*</span>}
        </label>
        <div
            className={cn(
                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-colors",
                disabled
                    ? "bg-secondary/50 border-border/40 cursor-not-allowed opacity-60"
                    : "bg-background border-border hover:border-primary/40 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20"
            )}
        >
            {icon && (
                <span className="text-muted-foreground flex-shrink-0 w-4 h-4">{icon}</span>
            )}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                inputMode={inputMode}
                autoComplete={autoComplete}
                required={required}
                minLength={minLength}
                onChange={(e) => onChange?.(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 min-w-0 disabled:cursor-not-allowed"
            />
            {suffix}
        </div>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
);

// ─── Toggle row ───────────────────────────────────────────────────────────────

interface ToggleRowProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}

const ToggleRow = ({ label, description, checked, onChange }: ToggleRowProps) => (
    <div className="flex items-start justify-between gap-4 py-3.5">
        <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                "flex-shrink-0 relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                checked ? "bg-accent" : "bg-border"
            )}
        >
            <span
                className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                    checked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    </div>
);

// ─── Profile tab ─────────────────────────────────────────────────────────────

const ProfileTab = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(mockAgentProfile.name);
    const [phone, setPhone] = useState(mockAgentProfile.phone);
    const [region, setRegion] = useState("Katsina State, Nigeria");
    const [saving, setSaving] = useState(false);

    const handleCancel = () => {
        setName(mockAgentProfile.name);
        setPhone(mockAgentProfile.phone);
        setRegion("Katsina State, Nigeria");
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!name.trim()) { toast.error("Full name is required."); return; }
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setIsEditing(false);
            toast.success("Profile updated", {
                description: "Your personal information has been saved.",
            });
        }, 1000);
    };

    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
        >
            {/* Personal info */}
            <Card className="p-5 sm:p-6 border-border/60 space-y-4">
                <SectionTitle
                    action={
                        isEditing ? (
                            <button type="button" onClick={handleCancel}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-3.5 h-3.5" />Cancel
                            </button>
                        ) : (
                            <button type="button" onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 font-semibold transition-colors">
                                <Pencil className="w-3.5 h-3.5" />Edit
                            </button>
                        )
                    }
                >
                    Personal Information
                </SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputRow
                        id="profile-name" name="fullName"
                        label="Full Name" value={name} onChange={setName}
                        disabled={!isEditing}
                        icon={<User className="w-4 h-4" />}
                        placeholder="Enter full name"
                        autoComplete="name" required
                    />
                    <InputRow
                        id="profile-email" name="email"
                        label="Email Address" value={mockAgentProfile.email}
                        disabled type="email"
                        icon={<Mail className="w-4 h-4" />}
                        autoComplete="email"
                        hint="Managed by your administrator"
                    />
                    <InputRow
                        id="profile-phone" name="phone"
                        label="Phone Number" value={phone} onChange={setPhone}
                        disabled={!isEditing}
                        type="tel" inputMode="numeric"
                        icon={<Phone className="w-4 h-4" />}
                        placeholder="+234 800 000 0000"
                        autoComplete="tel"
                    />
                    <InputRow
                        id="profile-region" name="region"
                        label="Region" value={region} onChange={setRegion}
                        disabled={!isEditing}
                        icon={<MapPin className="w-4 h-4" />}
                        placeholder="State / Region"
                        autoComplete="address-level1"
                    />
                </div>

                <AnimatePresence>
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex justify-end pt-1 overflow-hidden"
                        >
                            <Button onClick={handleSave} disabled={saving}
                                className="gap-2 text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground">
                                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {saving ? "Saving…" : "Save Changes"}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/* Read-only account info */}
            <Card className="p-5 sm:p-6 border-border/60 space-y-4">
                <SectionTitle>Account Details</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputRow
                        id="profile-agentcode" name="agentCode"
                        label="Agent Code"
                        value={mockAgentProfile.agentCode}
                        disabled
                        icon={<BadgeIcon className="w-4 h-4" />}
                        hint="Assigned by administrator — cannot be changed"
                        autoComplete="off"
                    />
                    <InputRow
                        id="profile-joindate" name="joinDate"
                        label="Member Since"
                        value={formatJoinDate(mockAgentProfile.joinDate)}
                        disabled
                        icon={<Calendar className="w-4 h-4" />}
                        autoComplete="off"
                    />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border/40">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Account Status</p>
                        <p className="text-sm font-semibold text-foreground capitalize mt-0.5">
                            {mockAgentProfile.status}
                        </p>
                    </div>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Active
                    </span>
                </div>
            </Card>

            {/* Stats snapshot */}
            <Card className="p-5 sm:p-6 border-border/60">
                <SectionTitle>Performance Snapshot</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: "Matches Logged", value: mockAgentStats.matchesLogged },
                        { label: "Events Recorded", value: mockAgentStats.eventsRecorded },
                        { label: "Accuracy Rate", value: `${mockAgentStats.accuracyRate}%` },
                        { label: "Monthly Score", value: `${mockAgentStats.monthlyPerformance}%` },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="text-center p-3 rounded-xl bg-secondary/50 border border-border/40"
                        >
                            <p className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">
                                {s.value}
                            </p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-tight">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
};

// ─── Security tab ─────────────────────────────────────────────────────────────

const SecurityTab = () => {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const strengthScore = (() => {
        if (!next) return 0;
        let score = 0;
        if (next.length >= 8) score++;
        if (/[A-Z]/.test(next)) score++;
        if (/[0-9]/.test(next)) score++;
        if (/[^A-Za-z0-9]/.test(next)) score++;
        return score;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthScore];
    const strengthColor = ["", "bg-red-500", "bg-yellow-400", "bg-accent", "bg-green-500"][strengthScore];

    const handleSave = () => {
        setError("");
        if (!current) { setError("Please enter your current password."); return; }
        if (next.length < 8) { setError("New password must be at least 8 characters."); return; }
        if (next !== confirm) { setError("Passwords do not match."); return; }
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setCurrent(""); setNext(""); setConfirm("");
            toast.success("Password updated", {
                description: "Your password has been changed successfully.",
            });
        }, 1100);
    };

    const EyeToggle = ({ show, toggle, label }: { show: boolean; toggle: () => void; label: string }) => (
        <button
            type="button"
            aria-label={show ? `Hide ${label}` : `Show ${label}`}
            onClick={toggle}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
    );

    return (
        <motion.div
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
        >
            <Card className="p-5 sm:p-6 border-border/60 space-y-4">
                <SectionTitle>Change Password</SectionTitle>

                <InputRow
                    id="pwd-current" name="currentPassword"
                    label="Current Password" value={current} onChange={setCurrent}
                    type={showCurrent ? "text" : "password"}
                    icon={<Lock className="w-4 h-4" />}
                    placeholder="Enter current password"
                    autoComplete="current-password" required
                    suffix={<EyeToggle show={showCurrent} toggle={() => setShowCurrent((v) => !v)} label="current password" />}
                />

                <div className="space-y-1.5">
                    <InputRow
                        id="pwd-new" name="newPassword"
                        label="New Password" value={next} onChange={setNext}
                        type={showNext ? "text" : "password"}
                        icon={<Lock className="w-4 h-4" />}
                        placeholder="At least 8 characters"
                        autoComplete="new-password" required minLength={8}
                        suffix={<EyeToggle show={showNext} toggle={() => setShowNext((v) => !v)} label="new password" />}
                    />
                    {next && (
                        <div className="flex items-center gap-2 pt-0.5">
                            <div className="flex gap-1 flex-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1 flex-1 rounded-full transition-all duration-300",
                                            i <= strengthScore ? strengthColor : "bg-border"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-medium text-muted-foreground w-10 text-right">
                                {strengthLabel}
                            </span>
                        </div>
                    )}
                </div>

                <InputRow
                    id="pwd-confirm" name="confirmPassword"
                    label="Confirm New Password" value={confirm} onChange={setConfirm}
                    type={showConfirm ? "text" : "password"}
                    icon={<Lock className="w-4 h-4" />}
                    placeholder="Re-enter new password"
                    autoComplete="new-password" required
                    suffix={<EyeToggle show={showConfirm} toggle={() => setShowConfirm((v) => !v)} label="confirm password" />}
                />

                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <AlertTriangle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                        <p className="text-xs text-destructive">{error}</p>
                    </div>
                )}

                <div className="flex justify-end pt-1">
                    <Button onClick={handleSave} disabled={saving}
                        className="gap-2 text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground">
                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {saving ? "Updating…" : "Update Password"}
                    </Button>
                </div>
            </Card>

            {/* Security info */}
            <Card className="p-5 sm:p-6 border-border/60 space-y-1">
                <SectionTitle>Security Tips</SectionTitle>
                <ul className="space-y-2">
                    {[
                        "Use at least 8 characters with a mix of letters, numbers, and symbols.",
                        "Do not share your password or agent code with anyone.",
                        "Log out from shared devices after each session.",
                        "Contact your administrator if you suspect unauthorised access.",
                    ].map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-accent" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </Card>
        </motion.div>
    );
};

// ─── Notifications tab ────────────────────────────────────────────────────────

const NotificationsTab = () => {
    const [prefs, setPrefs] = useState({
        matchAssigned: true,
        liveAlerts: true,
        scoreUpdates: false,
        systemUpdates: true,
        performanceReport: true,
        reminders: false,
    });

    const toggle = (key: keyof typeof prefs) =>
        setPrefs((p) => ({ ...p, [key]: !p[key] }));

    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            toast.success("Preferences saved", {
                description: "Your notification settings have been updated.",
            });
        }, 800);
    };

    return (
        <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
        >
            <Card className="p-5 sm:p-6 border-border/60">
                <SectionTitle>Match Notifications</SectionTitle>
                <div className="divide-y divide-border/50">
                    <ToggleRow
                        label="Match Assignments"
                        description="Get notified when a new match is assigned to you"
                        checked={prefs.matchAssigned}
                        onChange={() => toggle("matchAssigned")}
                    />
                    <ToggleRow
                        label="Live Match Alerts"
                        description="Real-time prompts during an active match session"
                        checked={prefs.liveAlerts}
                        onChange={() => toggle("liveAlerts")}
                    />
                    <ToggleRow
                        label="Score Update Reminders"
                        description="Nudge to log the score at regular intervals"
                        checked={prefs.scoreUpdates}
                        onChange={() => toggle("scoreUpdates")}
                    />
                    <ToggleRow
                        label="Pre-Match Reminders"
                        description="30-minute reminder before a scheduled match"
                        checked={prefs.reminders}
                        onChange={() => toggle("reminders")}
                    />
                </div>
            </Card>

            <Card className="p-5 sm:p-6 border-border/60">
                <SectionTitle>System & Reports</SectionTitle>
                <div className="divide-y divide-border/50">
                    <ToggleRow
                        label="System Updates"
                        description="Platform changes, maintenance windows and announcements"
                        checked={prefs.systemUpdates}
                        onChange={() => toggle("systemUpdates")}
                    />
                    <ToggleRow
                        label="Weekly Performance Report"
                        description="Receive a weekly summary of your accuracy and activity"
                        checked={prefs.performanceReport}
                        onChange={() => toggle("performanceReport")}
                    />
                </div>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}
                    className="gap-2 text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? "Saving…" : "Save Preferences"}
                </Button>
            </div>
        </motion.div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { key: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { key: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
];

const AgentSettingsPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>("profile");

    const initials = mockAgentProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <AgentLayout>
            <div className="min-h-screen bg-background">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Manage your profile, security and preferences
                        </p>
                    </motion.div>

                    {/* Profile hero card */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                    >
                        <Card className="p-5 sm:p-6 border-border/60">
                            <div className="flex items-center gap-4 sm:gap-5">
                                {/* Avatar */}
                                <div className="relative group flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xl sm:text-2xl select-none">
                                        {initials}
                                    </div>
                                    <button className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h2 className="text-base sm:text-lg font-bold text-foreground">
                                            {mockAgentProfile.name}
                                        </h2>
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-[11px] font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Active
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-0.5 truncate">
                                        {mockAgentProfile.email}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md font-mono">
                                            {mockAgentProfile.agentCode}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Joined {formatJoinDate(mockAgentProfile.joinDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Tab nav */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-1 p-1 bg-secondary rounded-xl"
                    >
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200",
                                    activeTab === t.key
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {t.icon}
                                <span className="hidden sm:inline">{t.label}</span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Tab content */}
                    <AnimatePresence mode="wait">
                        {activeTab === "profile" && <ProfileTab />}
                        {activeTab === "security" && <SecurityTab />}
                        {activeTab === "notifications" && <NotificationsTab />}
                    </AnimatePresence>

                    {/* Danger zone */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                    >
                        <Card className="p-5 sm:p-6 border-destructive/20 bg-destructive/5">
                            <SectionTitle>Danger Zone</SectionTitle>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Sign Out</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        End your current session on this device
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 text-xs font-semibold flex-shrink-0"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    Sign Out
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </AgentLayout>
    );
};

export default AgentSettingsPage;
