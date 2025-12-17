import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Home,
    Target,
    TrendingUp,
    ClipboardList,
    Settings,
    X,
    ChevronRight,
} from "lucide-react";
import NavItem from "./NavItem.tsx";
import { Logo } from "@/components/common/Logo";

interface NavItemType {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isCollapsed: boolean;
    onCollapsedChange: (collapsed: boolean) => void;
}

const navItems: NavItemType[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home className="w-6 h-6" />,
        path: "/agent/dashboard",
    },
    {
        id: "assigned",
        label: "Assigned Matches",
        icon: <Target className="w-6 h-6" />,
        path: "/agent/assigned-matches",
    },
    {
        id: "stats",
        label: "Stats",
        icon: <TrendingUp className="w-6 h-6" />,
        path: "/agent/stats",
    },
    {
        id: "events",
        label: "Event Log",
        icon: <ClipboardList className="w-6 h-6" />,
        path: "/agent/event-log",
    },
    {
        id: "settings",
        label: "Settings",
        icon: <Settings className="w-6 h-6" />,
        path: "/agent/settings",
    },
];

const Sidebar = ({
    isOpen,
    onClose,
    isCollapsed,
    onCollapsedChange,
}: SidebarProps) => {
    const location = useLocation();
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        setMounted(true);

        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Auto-close sidebar on mobile
            if (mobile && isOpen) {
                onClose();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen, onClose]);

    const sidebarWidth = isCollapsed ? "w-20" : "w-64";
    const sidebarVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: "-100%", opacity: 0 },
    };

    if (!mounted) return null;

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={isMobile ? "closed" : "open"}
                animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed lg:static top-0 left-0 h-screen ${sidebarWidth} bg-white text-foreground transition-all duration-300 flex flex-col z-50 overflow-hidden border-r border-border`}
            >
                {/* Header with close button */}
                <div className="p-4 flex items-center justify-between border-b border-border">
                    {!isCollapsed ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <Logo size="md" showText={true} />
                            <span className="text-xs text-muted-foreground">Agent</span>
                        </motion.div>
                    ) : (
                        <Logo size="sm" showText={false} />
                    )}
                    {isMobile && (
                        <button
                            onClick={onClose}
                            className="lg:hidden p-1 hover:bg-secondary rounded-md transition-colors"
                        >
                            <X className="w-5 h-5 text-foreground" />
                        </button>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 px-2 space-y-2 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            item={item}
                            isActive={location.pathname === item.path}
                            isCollapsed={isCollapsed}
                            onNavClick={isMobile ? onClose : undefined}
                        />
                    ))}
                </nav>

                {/* Collapse Toggle (Desktop Only) */}
                {!isMobile && (
                    <div className="p-4 border-t border-border">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onCollapsedChange(!isCollapsed)}
                            className="w-full flex items-center justify-center p-2 hover:bg-secondary rounded-md transition-colors"
                            title={isCollapsed ? "Expand" : "Collapse"}
                        >
                            <ChevronRight
                                className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? "rotate-0" : "rotate-180"
                                    }`}
                            />
                        </motion.button>
                    </div>
                )}
            </motion.aside>
        </>
    );
};

export default Sidebar;
