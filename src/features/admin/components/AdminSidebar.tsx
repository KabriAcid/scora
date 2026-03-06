import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Trophy,
  Shield,
  Users,
  Building2,
  Calendar,
  UserCheck,
  Settings,
  X,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import NavItem from "@/components/layout/NavItem";
import { ROUTES } from "@/shared/config/routes";

// ─── Nav Config ───────────────────────────────────────────────────────────────

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: ROUTES.ADMIN.DASHBOARD,
  },
  {
    id: "leagues",
    label: "Leagues",
    icon: <Trophy className="w-5 h-5" />,
    path: ROUTES.ADMIN.LEAGUES,
  },
  {
    id: "teams",
    label: "Teams",
    icon: <Shield className="w-5 h-5" />,
    path: ROUTES.ADMIN.TEAMS,
  },
  {
    id: "players",
    label: "Players",
    icon: <Users className="w-5 h-5" />,
    path: ROUTES.ADMIN.PLAYERS,
  },
  {
    id: "stadiums",
    label: "Stadiums",
    icon: <Building2 className="w-5 h-5" />,
    path: ROUTES.ADMIN.STADIUMS,
  },
  {
    id: "fixtures",
    label: "Fixtures",
    icon: <Calendar className="w-5 h-5" />,
    path: ROUTES.ADMIN.FIXTURES,
  },
  {
    id: "agents",
    label: "Agents",
    icon: <UserCheck className="w-5 h-5" />,
    path: ROUTES.ADMIN.AGENTS,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    path: ROUTES.ADMIN.SETTINGS,
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AdminSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onCollapsedChange,
}: AdminSidebarProps) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile && isOpen) onClose();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <motion.aside
        initial={isMobile ? { x: "-100%" } : { x: 0 }}
        animate={isMobile ? { x: isOpen ? 0 : "-100%" } : { x: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`fixed lg:static top-0 left-0 h-screen ${sidebarWidth} bg-card text-foreground transition-[width] duration-200 flex flex-col z-50 overflow-hidden border-r border-border`}
      >
        {/* Logo + role badge */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-border flex-shrink-0">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Logo size="md" showText={true} />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </motion.div>
          ) : (
            <Logo size="sm" showText={false} />
          )}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-hide">
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

        {/* Collapse toggle (desktop only) */}
        {!isMobile && (
          <div className="p-4 border-t border-border flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCollapsedChange(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 hover:bg-secondary rounded-md transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight
                className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isCollapsed ? "rotate-0" : "rotate-180"
                  }`}
              />
            </motion.button>
          </div>
        )}
      </motion.aside>
    </>
  );
};
