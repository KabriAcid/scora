import { useState } from "react";
import { motion } from "framer-motion";
import {
    Menu,
    Bell,
    LogOut,
    User,
    Settings,
    ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockAgentProfile, mockNotifications } from "@/data/agentMockData";

interface HeaderProps {
    onMenuClick: () => void;
    isSidebarOpen: boolean;
    isCollapsed: boolean;
}

const Header = ({ onMenuClick, isSidebarOpen, isCollapsed }: HeaderProps) => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

    const getNotificationIcon = (type: string) => {
        const icons: Record<string, string> = {
            goal: "⚽",
            card: "🟨",
            substitution: "🔄",
            foul: "⚠️",
            corner: "🚩",
            match_assigned: "📌",
        };
        return icons[type] || "📢";
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        const hours = Math.floor(diffMins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    return (
        <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
            <div className="h-16 md:h-20 lg:h-20 px-4 md:px-6 lg:px-8 flex items-center justify-between">
                {/* Left Section - Menu & Brand */}
                <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </button>

                    {/* Logo/Brand - Show on desktop or when sidebar is collapsed */}
                    <div className="hidden lg:flex items-center gap-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm md:text-base">
                                S
                            </span>
                        </div>
                        {!isCollapsed && (
                            <span className="text-lg md:text-xl font-bold text-foreground">
                                Scora
                            </span>
                        )}
                    </div>
                </div>

                {/* Right Section - Notifications & Profile */}
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                            <Bell className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                            {unreadCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-accent text-white text-xs md:text-sm font-bold rounded-full flex items-center justify-center"
                                >
                                    {unreadCount}
                                </motion.span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-border z-50"
                            >
                                <div className="p-4 border-b border-border">
                                    <h3 className="text-sm md:text-base font-semibold text-foreground">
                                        Notifications
                                    </h3>
                                </div>

                                <div className="max-h-96 overflow-y-auto scrollbar-hide">
                                    {mockNotifications.length === 0 ? (
                                        <div className="p-8 text-center text-muted-foreground text-sm">
                                            No notifications
                                        </div>
                                    ) : (
                                        mockNotifications.map((notif) => (
                                            <motion.div
                                                key={notif.id}
                                                whileHover={{ backgroundColor: "hsl(240 20% 98%)" }}
                                                className={`p-4 border-b border-border/50 cursor-pointer transition-colors ${!notif.isRead ? "bg-accent/5" : ""
                                                    }`}
                                            >
                                                <div className="flex gap-3">
                                                    <span className="text-xl flex-shrink-0">
                                                        {getNotificationIcon(notif.type)}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs md:text-sm font-semibold text-foreground line-clamp-1">
                                                            {notif.title}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                                            {notif.description}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {formatTime(notif.timestamp)}
                                                        </p>
                                                    </div>
                                                    {!notif.isRead && (
                                                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1" />
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                <div className="p-3 border-t border-border text-center">
                                    <button className="text-xs md:text-sm text-accent hover:text-accent/80 font-semibold transition-colors">
                                        View All Notifications
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-foreground font-bold text-xs md:text-sm">
                                    SA
                                </span>
                            </div>
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground hidden md:block" />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-border z-50"
                            >
                                {/* User Info */}
                                <div className="p-4 border-b border-border">
                                    <p className="text-xs md:text-sm font-semibold text-foreground">
                                        {mockAgentProfile.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {mockAgentProfile.email}
                                    </p>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <motion.button
                                        whileHover={{ backgroundColor: "hsl(240 20% 98%)" }}
                                        className="w-full px-4 py-2.5 md:py-3 text-left flex items-center gap-3 text-sm text-foreground hover:bg-secondary transition-colors"
                                    >
                                        <User className="w-4 h-4 md:w-5 md:h-5" />
                                        <span>Profile</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ backgroundColor: "hsl(240 20% 98%)" }}
                                        className="w-full px-4 py-2.5 md:py-3 text-left flex items-center gap-3 text-sm text-foreground hover:bg-secondary transition-colors"
                                    >
                                        <Settings className="w-4 h-4 md:w-5 md:h-5" />
                                        <span>Settings</span>
                                    </motion.button>
                                </div>

                                {/* Logout */}
                                <div className="border-t border-border p-2">
                                    <motion.button
                                        whileHover={{ backgroundColor: "hsl(0 84.2% 60.2% / 0.1)" }}
                                        onClick={() => navigate("/agent/login")}
                                        className="w-full px-4 py-2.5 md:py-3 text-left flex items-center gap-3 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-md"
                                    >
                                        <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                                        <span>Logout</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Close dropdowns when clicking outside */}
            {(showNotifications || showProfile) && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    onClick={() => {
                        setShowNotifications(false);
                        setShowProfile(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;
