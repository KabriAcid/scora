import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    CheckCheck,
    CalendarClock,
    Siren,
    ShieldAlert,
    ArrowLeftRight,
    Flag,
    AlertCircle,
} from "lucide-react";
import { mockNotifications, Notification } from "@/data/agentMockData";
import { cn } from "@/shared/utils/cn";
import AgentLayout from "@/components/layout/AgentLayout";

// ─── helpers ─────────────────────────────────────────────────────────────────

type FilterTab = "all" | "unread" | "match_assigned" | "events";

const TABS: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "match_assigned", label: "Match Assigned" },
    { id: "events", label: "Events" },
];

const EVENT_TYPES: Notification["type"][] = [
    "goal",
    "card",
    "substitution",
    "foul",
    "corner",
];

function filterNotifications(
    notifications: Notification[],
    tab: FilterTab
): Notification[] {
    switch (tab) {
        case "unread":
            return notifications.filter((n) => !n.isRead);
        case "match_assigned":
            return notifications.filter((n) => n.type === "match_assigned");
        case "events":
            return notifications.filter((n) => EVENT_TYPES.includes(n.type));
        default:
            return notifications;
    }
}

function formatRelativeTime(date: Date): string {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60_000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    return `${days}d ago`;
}

function NotificationIcon({ type }: { type: Notification["type"] }) {
    const base = "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0";
    switch (type) {
        case "match_assigned":
            return (
                <div className={cn(base, "bg-primary/10 text-primary")}>
                    <CalendarClock className="w-4 h-4" />
                </div>
            );
        case "goal":
            return (
                <div className={cn(base, "bg-green-500/10 text-green-600")}>
                    <Siren className="w-4 h-4" />
                </div>
            );
        case "card":
            return (
                <div className={cn(base, "bg-yellow-400/15 text-yellow-600")}>
                    <ShieldAlert className="w-4 h-4" />
                </div>
            );
        case "substitution":
            return (
                <div className={cn(base, "bg-blue-500/10 text-blue-600")}>
                    <ArrowLeftRight className="w-4 h-4" />
                </div>
            );
        case "foul":
            return (
                <div className={cn(base, "bg-orange-500/10 text-orange-600")}>
                    <AlertCircle className="w-4 h-4" />
                </div>
            );
        case "corner":
            return (
                <div className={cn(base, "bg-accent/15 text-accent")}>
                    <Flag className="w-4 h-4" />
                </div>
            );
    }
}

// ─── main component ───────────────────────────────────────────────────────────

export default function AgentNotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [activeTab, setActiveTab] = useState<FilterTab>("all");

    const unreadCount = notifications.filter((n) => !n.isRead).length;
    const filtered = filterNotifications(notifications, activeTab);

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    const markOneRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    };

    return (
        <AgentLayout>
            <div className="min-h-screen bg-background">
                {/* ── page header ── */}
                <div className="border-b border-border bg-background sticky top-0 z-10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bell className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-foreground leading-tight">
                                    Notifications
                                </h1>
                                <p className="text-xs text-muted-foreground">
                                    {unreadCount > 0
                                        ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                                        : "You're all caught up"}
                                </p>
                            </div>
                        </div>

                        {unreadCount > 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={markAllRead}
                                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 border border-primary/30 hover:border-primary/60 rounded-lg px-3 py-1.5 transition-colors"
                            >
                                <CheckCheck className="w-3.5 h-3.5" />
                                Mark all read
                            </motion.button>
                        )}
                    </div>

                    {/* ── filter tabs ── */}
                    <div className="max-w-3xl mx-auto px-4 sm:px-6">
                        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0.5">
                            {TABS.map((tab) => {
                                const count =
                                    tab.id === "unread"
                                        ? unreadCount
                                        : tab.id === "all"
                                            ? notifications.length
                                            : filterNotifications(notifications, tab.id).length;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                                            isActive
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {tab.label}
                                        {count > 0 && (
                                            <span
                                                className={cn(
                                                    "text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-accent text-accent-foreground"
                                                )}
                                            >
                                                {count}
                                            </span>
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="notif-tab-indicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── list ── */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-2">
                    <AnimatePresence mode="popLayout">
                        {filtered.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20 text-center gap-3"
                            >
                                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                                    <Bell className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <p className="font-semibold text-foreground">No notifications here</p>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    {activeTab === "unread"
                                        ? "You've read everything — great job staying on top of things."
                                        : "Nothing in this category yet."}
                                </p>
                            </motion.div>
                        ) : (
                            filtered.map((notif, i) => (
                                <motion.div
                                    key={notif.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: i * 0.04 }}
                                    onClick={() => markOneRead(notif.id)}
                                    className={cn(
                                        "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors group",
                                        notif.isRead
                                            ? "bg-background border-border hover:bg-secondary/50"
                                            : "bg-accent/5 border-accent/20 hover:bg-accent/10"
                                    )}
                                >
                                    <NotificationIcon type={notif.type} />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <p
                                                className={cn(
                                                    "text-sm leading-snug",
                                                    notif.isRead
                                                        ? "font-medium text-foreground"
                                                        : "font-semibold text-foreground"
                                                )}
                                            >
                                                {notif.title}
                                            </p>
                                            <span className="text-[11px] text-muted-foreground whitespace-nowrap flex-shrink-0">
                                                {formatRelativeTime(notif.timestamp)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                            {notif.description}
                                        </p>
                                        {notif.matchId && (
                                            <span className="inline-block mt-1.5 text-[10px] font-medium text-muted-foreground bg-muted rounded px-1.5 py-0.5">
                                                {notif.matchId}
                                            </span>
                                        )}
                                    </div>

                                    {!notif.isRead && (
                                        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                                    )}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AgentLayout>
    );
}
