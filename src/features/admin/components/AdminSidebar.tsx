import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
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
  ChevronDown,
  ListOrdered,
  Layers,
  CalendarDays,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/utils/cn";

//  Types 

interface SubNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: SubNavItem[];
}

//  Nav Config 

const navItems: NavItemConfig[] = [
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
    children: [
      {
        id: "leagues-all",
        label: "All Leagues",
        icon: <Trophy className="w-4 h-4" />,
        path: ROUTES.ADMIN.LEAGUES,
      },
      {
        id: "leagues-standings",
        label: "Standings",
        icon: <ListOrdered className="w-4 h-4" />,
        path: ROUTES.ADMIN.LEAGUES_STANDINGS,
      },
      {
        id: "leagues-seasons",
        label: "Seasons",
        icon: <Layers className="w-4 h-4" />,
        path: ROUTES.ADMIN.LEAGUES_SEASONS,
      },
      {
        id: "leagues-fixtures",
        label: "Fixtures",
        icon: <CalendarDays className="w-4 h-4" />,
        path: ROUTES.ADMIN.LEAGUES_FIXTURES,
      },
    ],
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

//  Sub-nav slide variant 

const subMenuVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

//  Props 

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

//  NavItemRow 

interface NavItemRowProps {
  item: NavItemConfig;
  isCollapsed: boolean;
  onMobileClose?: () => void;
}

const NavItemRow = ({ item, isCollapsed, onMobileClose }: NavItemRowProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const hasChildren = !!item.children?.length;

  const isChildActive = hasChildren
    ? item.children!.some((c) => location.pathname === c.path)
    : false;
  const isActive = item.path ? location.pathname === item.path : isChildActive;

  // Persist open state per item
  const storageKey = `scora:adminNav:${item.id}:open`;
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) return JSON.parse(stored);
    } catch { /* empty */ }
    return isChildActive; // auto-open if a child is active on load
  });

  // Popout ref for collapsed sidebar
  const [showPopout, setShowPopout] = useState(false);
  const popoutRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (hasChildren) {
      if (isCollapsed) {
        setShowPopout((v) => !v);
      } else {
        const next = !isOpen;
        setIsOpen(next);
        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* empty */ }
      }
    } else if (item.path) {
      navigate(item.path);
      onMobileClose?.();
    }
  };

  const handleSubClick = (path: string) => {
    navigate(path);
    setShowPopout(false);
    onMobileClose?.();
  };

  // Close popout on outside click
  useEffect(() => {
    if (!showPopout) return;
    const handler = (e: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(e.target as Node) &&
          itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setShowPopout(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPopout]);

  return (
    <div className="relative" ref={itemRef}>
      {/* Main row */}
      <button
        onClick={handleToggle}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
          isCollapsed && "justify-center px-2"
        )}
        title={isCollapsed ? item.label : undefined}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            {hasChildren && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-transform duration-200",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
              />
            )}
            {!hasChildren && isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            )}
          </>
        )}
        {/* Collapsed: active dot */}
        {isCollapsed && isActive && (
          <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
        )}
        {/* Collapsed: child-active indicator */}
        {isCollapsed && isChildActive && !isActive && (
          <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
        )}
      </button>

      {/* Expanded sub-items (visible sidebar) */}
      {hasChildren && !isCollapsed && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              variants={subMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-3 pb-1">
                {item.children!.map((child) => {
                  const childActive = location.pathname === child.path;
                  return (
                    <button
                      key={child.id}
                      onClick={() => handleSubClick(child.path)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors",
                        childActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <span className="flex-shrink-0">{child.icon}</span>
                      <span className="truncate">{child.label}</span>
                      {childActive && (
                        <span className="ml-auto w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Collapsed popout sub-menu */}
      {hasChildren && isCollapsed && showPopout && (
        <motion.div
          ref={popoutRef}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.15 }}
          className="absolute left-full top-0 ml-2 z-50 bg-card border border-border rounded-xl shadow-xl min-w-[160px] p-1.5"
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
            {item.label}
          </p>
          {item.children!.map((child) => {
            const childActive = location.pathname === child.path;
            return (
              <button
                key={child.id}
                onClick={() => handleSubClick(child.path)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors",
                  childActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <span className="flex-shrink-0">{child.icon}</span>
                <span>{child.label}</span>
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

//  Component 

export const AdminSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onCollapsedChange,
}: AdminSidebarProps) => {
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

  const sidebarWidth = isCollapsed ? "w-[72px]" : "w-64";

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
              transition={{ delay: 0.05 }}
              className="flex items-center gap-2"
            >
              <Logo size="sm" showText={true} />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </motion.div>
          ) : (
            <div className="mx-auto">
              <Logo size="sm" showText={false} />
            </div>
          )}
          {isMobile && !isCollapsed && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <NavItemRow
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              onMobileClose={isMobile ? onClose : undefined}
            />
          ))}
        </nav>

        {/* Collapse toggle (desktop only) */}
        {!isMobile && (
          <div className="p-3 border-t border-border flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCollapsedChange(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 hover:bg-secondary rounded-md transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform duration-200",
                  isCollapsed ? "rotate-0" : "rotate-180"
                )}
              />
            </motion.button>
          </div>
        )}
      </motion.aside>
    </>
  );
};
