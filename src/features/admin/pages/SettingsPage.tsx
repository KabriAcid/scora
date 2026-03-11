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
  LogOut,
  AlertTriangle,
  Loader2,
  UserPlus,
  Users,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  mockAdminProfile,
  mockAdminStats,
  mockAdminList,
  type AdminRecord,
} from "@/data/adminMockData";
import { cn } from "@/shared/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "profile" | "security" | "notifications" | "admins";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatJoinDate = (d: Date) =>
  d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const relativeTime = (d: Date) => {
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// ─── Shared sub-components ────────────────────────────────────────────────────

const SectionTitle = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) => (
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
    <label
      htmlFor={id}
      className="text-xs font-semibold text-muted-foreground block"
    >
      {label}
      {required && <span className="text-accent ml-0.5">*</span>}
    </label>
    <div
      className={cn(
        "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-colors",
        disabled
          ? "bg-secondary/50 border-border/40 cursor-not-allowed opacity-60"
          : "bg-background border-border hover:border-primary/40 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20",
      )}
    >
      {icon && (
        <span className="text-muted-foreground flex-shrink-0 w-4 h-4">
          {icon}
        </span>
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

interface SelectRowProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
  id?: string;
  disabled?: boolean;
}

const SelectRow = ({
  label,
  value,
  onChange,
  options,
  icon,
  id,
  disabled,
}: SelectRowProps) => (
  <div className="space-y-1.5">
    <label
      htmlFor={id}
      className="text-xs font-semibold text-muted-foreground block"
    >
      {label}
    </label>
    <div
      className={cn(
        "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-colors",
        disabled
          ? "bg-secondary/50 border-border/40 cursor-not-allowed opacity-60"
          : "bg-background border-border hover:border-primary/40 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20",
      )}
    >
      {icon && (
        <span className="text-muted-foreground flex-shrink-0 w-4 h-4">
          {icon}
        </span>
      )}
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-sm bg-transparent outline-none text-foreground min-w-0 disabled:cursor-not-allowed"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
}: ToggleRowProps) => (
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
        checked ? "bg-accent" : "bg-border",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  </div>
);

// ─── Profile Tab ──────────────────────────────────────────────────────────────

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(mockAdminProfile.name);
  const [phone, setPhone] = useState(mockAdminProfile.phone);
  const [region, setRegion] = useState("Kano State, Nigeria");
  const [saving, setSaving] = useState(false);

  const handleCancel = () => {
    setName(mockAdminProfile.name);
    setPhone(mockAdminProfile.phone);
    setRegion("Kano State, Nigeria");
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Full name is required.");
      return;
    }
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
      <Card className="p-5 sm:p-6 border-border/60 space-y-4">
        <SectionTitle
          action={
            isEditing ? (
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )
          }
        >
          Personal Information
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputRow
            id="profile-name"
            name="fullName"
            label="Full Name"
            value={name}
            onChange={setName}
            disabled={!isEditing}
            icon={<User className="w-4 h-4" />}
            placeholder="Enter full name"
            autoComplete="name"
            required
          />
          <InputRow
            id="profile-email"
            name="email"
            label="Email Address"
            value={mockAdminProfile.email}
            disabled
            type="email"
            icon={<Mail className="w-4 h-4" />}
            autoComplete="email"
            hint="Contact support to change your email address"
          />
          <InputRow
            id="profile-phone"
            name="phone"
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            disabled={!isEditing}
            type="tel"
            inputMode="numeric"
            icon={<Phone className="w-4 h-4" />}
            placeholder="+234 800 000 0000"
            autoComplete="tel"
          />
          <InputRow
            id="profile-region"
            name="region"
            label="Region"
            value={region}
            onChange={setRegion}
            disabled={!isEditing}
            icon={<MapPin className="w-4 h-4" />}
            placeholder="State / Region"
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
              <Button
                onClick={handleSave}
                disabled={saving}
                className="gap-2 text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card className="p-5 sm:p-6 border-border/60 space-y-4">
        <SectionTitle>Account Details</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputRow
            id="profile-role"
            name="role"
            label="Role"
            value={mockAdminProfile.role}
            disabled
            icon={<Shield className="w-4 h-4" />}
            hint="Assigned system role — managed by platform owner"
          />
          <InputRow
            id="profile-joindate"
            name="joinDate"
            label="Member Since"
            value={formatJoinDate(mockAdminProfile.joinDate)}
            disabled
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border/40">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              Account Status
            </p>
            <p className="text-sm font-semibold text-foreground capitalize mt-0.5">
              {mockAdminProfile.status}
            </p>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Active
          </span>
        </div>
      </Card>

      <Card className="p-5 sm:p-6 border-border/60">
        <SectionTitle>Platform Snapshot</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Leagues Managed", value: mockAdminStats.leaguesManaged },
            {
              label: "Teams Registered",
              value: mockAdminStats.teamsRegistered,
            },
            {
              label: "Fixtures Created",
              value: mockAdminStats.fixturesCreated,
            },
            {
              label: "Agents Onboarded",
              value: mockAdminStats.agentsOnboarded,
            },
            {
              label: "Actions This Month",
              value: mockAdminStats.actionsThisMonth,
            },
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

// ─── Security Tab ──────────────────────────────────────────────────────────────

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
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-yellow-400",
    "bg-accent",
    "bg-green-500",
  ][strengthScore];

  const handleSave = () => {
    setError("");
    if (!current) {
      setError("Please enter your current password.");
      return;
    }
    if (next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setCurrent("");
      setNext("");
      setConfirm("");
      toast.success("Password updated", {
        description: "Your password has been changed successfully.",
      });
    }, 1100);
  };

  const EyeToggle = ({
    show,
    toggle,
    label,
  }: {
    show: boolean;
    toggle: () => void;
    label: string;
  }) => (
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
          id="pwd-current"
          name="currentPassword"
          label="Current Password"
          value={current}
          onChange={setCurrent}
          type={showCurrent ? "text" : "password"}
          icon={<Lock className="w-4 h-4" />}
          placeholder="Enter current password"
          autoComplete="current-password"
          required
          suffix={
            <EyeToggle
              show={showCurrent}
              toggle={() => setShowCurrent((v) => !v)}
              label="current password"
            />
          }
        />
        <div className="space-y-1.5">
          <InputRow
            id="pwd-new"
            name="newPassword"
            label="New Password"
            value={next}
            onChange={setNext}
            type={showNext ? "text" : "password"}
            icon={<Lock className="w-4 h-4" />}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            required
            minLength={8}
            suffix={
              <EyeToggle
                show={showNext}
                toggle={() => setShowNext((v) => !v)}
                label="new password"
              />
            }
          />
          {next && (
            <div className="flex items-center gap-2 pt-0.5">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300",
                      i <= strengthScore ? strengthColor : "bg-border",
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
          id="pwd-confirm"
          name="confirmPassword"
          label="Confirm New Password"
          value={confirm}
          onChange={setConfirm}
          type={showConfirm ? "text" : "password"}
          icon={<Lock className="w-4 h-4" />}
          placeholder="Re-enter new password"
          autoComplete="new-password"
          required
          suffix={
            <EyeToggle
              show={showConfirm}
              toggle={() => setShowConfirm((v) => !v)}
              label="confirm password"
            />
          }
        />
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}
        <div className="flex justify-end pt-1">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Updating…" : "Update Password"}
          </Button>
        </div>
      </Card>
      <Card className="p-5 sm:p-6 border-border/60 space-y-1">
        <SectionTitle>Security Guidelines</SectionTitle>
        <ul className="space-y-2">
          {[
            "Use at least 8 characters with letters, numbers, and symbols.",
            "Never share admin credentials with anyone, including staff.",
            "Log out from shared or public devices after each session.",
            "Review the Activity Log regularly for unauthorised actions.",
            "Enable two-factor authentication when available.",
          ].map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-accent" />
              {tip}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};

// ─── Notifications Tab ────────────────────────────────────────────────────────

const NotificationsTab = () => {
  const [prefs, setPrefs] = useState({
    agentRegistrations: true,
    agentApprovals: true,
    fixtureUpdates: true,
    liveMatchAlerts: false,
    systemUpdates: true,
    weeklyReport: true,
    playerDisputes: true,
    leagueChanges: false,
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
        <SectionTitle>Agent & User Alerts</SectionTitle>
        <div className="divide-y divide-border/50">
          <ToggleRow
            label="New Agent Registrations"
            description="Notified when a new agent submits a registration request"
            checked={prefs.agentRegistrations}
            onChange={() => toggle("agentRegistrations")}
          />
          <ToggleRow
            label="Agent Approvals & Suspensions"
            description="Alerts when an agent status changes (approved, suspended)"
            checked={prefs.agentApprovals}
            onChange={() => toggle("agentApprovals")}
          />
          <ToggleRow
            label="Player Dispute Reports"
            description="Notify when an agent or team flags a player dispute"
            checked={prefs.playerDisputes}
            onChange={() => toggle("playerDisputes")}
          />
        </div>
      </Card>
      <Card className="p-5 sm:p-6 border-border/60">
        <SectionTitle>Fixtures & Leagues</SectionTitle>
        <div className="divide-y divide-border/50">
          <ToggleRow
            label="Fixture Status Updates"
            description="Alerts when a fixture is postponed, completed, or reassigned"
            checked={prefs.fixtureUpdates}
            onChange={() => toggle("fixtureUpdates")}
          />
          <ToggleRow
            label="Live Match Monitoring Alerts"
            description="Real-time notifications during live match sessions"
            checked={prefs.liveMatchAlerts}
            onChange={() => toggle("liveMatchAlerts")}
          />
          <ToggleRow
            label="League Structure Changes"
            description="Notify when a league is created, edited, or archived"
            checked={prefs.leagueChanges}
            onChange={() => toggle("leagueChanges")}
          />
        </div>
      </Card>
      <Card className="p-5 sm:p-6 border-border/60">
        <SectionTitle>System & Reports</SectionTitle>
        <div className="divide-y divide-border/50">
          <ToggleRow
            label="System Updates & Maintenance"
            description="Platform changes, scheduled downtime and announcements"
            checked={prefs.systemUpdates}
            onChange={() => toggle("systemUpdates")}
          />
          <ToggleRow
            label="Weekly Admin Report"
            description="A weekly digest of platform activity and key metrics"
            checked={prefs.weeklyReport}
            onChange={() => toggle("weeklyReport")}
          />
        </div>
      </Card>
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? "Saving…" : "Save Preferences"}
        </Button>
      </div>
    </motion.div>
  );
};

// ─── Admin Management Tab ─────────────────────────────────────────────────────

const AdminsTab = () => {
  const [admins, setAdmins] = useState<AdminRecord[]>(mockAdminList);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<AdminRecord["role"]>("Admin");
  const [newPassword, setNewPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  const handleCreate = () => {
    setFormError("");
    if (!newName.trim()) {
      setFormError("Full name is required.");
      return;
    }
    if (!newEmail.trim() || !newEmail.includes("@")) {
      setFormError("Valid email is required.");
      return;
    }
    if (newPassword.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    setCreating(true);
    setTimeout(() => {
      const record: AdminRecord = {
        id: `admin-${Date.now()}`,
        name: newName.trim(),
        email: newEmail.trim(),
        role: newRole,
        joinDate: new Date(),
        lastActive: new Date(),
        status: "Active",
      };
      setAdmins((prev) => [record, ...prev]);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewRole("Admin");
      setCreating(false);
      setShowForm(false);
      toast.success("Admin created", {
        description: `${record.name} has been added as ${record.role}.`,
      });
    }, 1000);
  };

  const handleToggleStatus = (id: string) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Suspended" : "Active" }
          : a,
      ),
    );
    const admin = admins.find((a) => a.id === id);
    if (admin) {
      const next = admin.status === "Active" ? "Suspended" : "Active";
      toast.success(
        `${admin.name} ${next === "Suspended" ? "suspended" : "reactivated"}`,
      );
    }
  };

  const handleRemove = (id: string) => {
    if (id === "admin-001") {
      toast.error("Cannot remove the primary Super Admin account.");
      return;
    }
    const admin = admins.find((a) => a.id === id);
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    toast.success("Admin removed", {
      description: `${admin?.name} has been removed.`,
    });
  };

  const roleColor: Record<AdminRecord["role"], string> = {
    "Super Admin": "bg-accent/10 text-accent",
    Admin: "bg-primary/10 text-primary",
    Moderator: "bg-blue-500/10 text-blue-400",
  };

  return (
    <motion.div
      key="admins"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      {/* Create form */}
      <Card className="p-5 sm:p-6 border-border/60 space-y-4">
        <SectionTitle
          action={
            <button
              type="button"
              onClick={() => {
                setShowForm((v) => !v);
                setFormError("");
              }}
              className={cn(
                "flex items-center gap-1 text-xs font-semibold transition-colors",
                showForm
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-accent hover:text-accent/80",
              )}
            >
              {showForm ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  New Admin
                </>
              )}
            </button>
          }
        >
          Create Admin Account
        </SectionTitle>

        <AnimatePresence initial={false}>
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputRow
                    id="new-name"
                    label="Full Name"
                    value={newName}
                    onChange={setNewName}
                    icon={<User className="w-4 h-4" />}
                    placeholder="Admin's full name"
                    required
                  />
                  <InputRow
                    id="new-email"
                    label="Email Address"
                    value={newEmail}
                    onChange={setNewEmail}
                    type="email"
                    icon={<Mail className="w-4 h-4" />}
                    placeholder="admin@scora.ng"
                    autoComplete="off"
                    required
                  />
                  <SelectRow
                    id="new-role"
                    label="Role"
                    value={newRole}
                    onChange={(v) => setNewRole(v as AdminRecord["role"])}
                    icon={<Shield className="w-4 h-4" />}
                    options={[
                      { value: "Admin", label: "Admin" },
                      { value: "Moderator", label: "Moderator" },
                      { value: "Super Admin", label: "Super Admin" },
                    ]}
                  />
                  <InputRow
                    id="new-password"
                    label="Temporary Password"
                    value={newPassword}
                    onChange={setNewPassword}
                    type={showPwd ? "text" : "password"}
                    icon={<Lock className="w-4 h-4" />}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    hint="The new admin will be prompted to change this on first login"
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      >
                        {showPwd ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    }
                  />
                </div>
                {formError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                    <p className="text-xs text-destructive">{formError}</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    onClick={handleCreate}
                    disabled={creating}
                    className="gap-2 text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                    {creating ? "Creating…" : "Create Admin"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-muted-foreground"
            >
              Add a new admin or moderator to help manage the platform.
            </motion.p>
          )}
        </AnimatePresence>
      </Card>

      {/* Admin list */}
      <Card className="border-border/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            All Admins
          </h3>
          <span className="text-xs text-muted-foreground">
            {admins.length} account{admins.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="divide-y divide-border/50">
          <AnimatePresence initial={false}>
            {admins.map((admin) => {
              const initials = admin.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              const isSelf = admin.id === "admin-001";
              return (
                <motion.div
                  key={admin.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xs flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {admin.name}
                        {isSelf && (
                          <span className="ml-1.5 text-[10px] text-muted-foreground font-normal">
                            (you)
                          </span>
                        )}
                      </p>
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                          roleColor[admin.role],
                        )}
                      >
                        {admin.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {admin.email}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Active {relativeTime(admin.lastActive)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                        admin.status === "Active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {admin.status}
                    </span>
                    {!isSelf && (
                      <>
                        <button
                          title={
                            admin.status === "Active" ? "Suspend" : "Reactivate"
                          }
                          onClick={() => handleToggleStatus(admin.id)}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            admin.status === "Active"
                              ? "hover:bg-yellow-500/10 text-muted-foreground hover:text-yellow-500"
                              : "hover:bg-green-500/10 text-muted-foreground hover:text-green-500",
                          )}
                        >
                          {admin.status === "Active" ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          title="Remove admin"
                          onClick={() => handleRemove(admin.id)}
                          className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  { key: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
  {
    key: "notifications",
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  { key: "admins", label: "Admins", icon: <Users className="w-4 h-4" /> },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const initials = mockAdminProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your profile, security, notifications and admin accounts
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
                <div className="relative group flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xl sm:text-2xl select-none">
                    {initials}
                  </div>
                  <button className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-foreground">
                      {mockAdminProfile.name}
                    </h2>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">
                    {mockAdminProfile.email}
                  </p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md font-mono">
                      {mockAdminProfile.role}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Joined {formatJoinDate(mockAdminProfile.joinDate)}
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
                    : "text-muted-foreground hover:text-foreground",
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
            {activeTab === "admins" && <AdminsTab />}
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
                  <p className="text-sm font-semibold text-foreground">
                    Sign Out
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    End your current admin session on this device
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
    </AdminLayout>
  );
};

export default SettingsPage;
