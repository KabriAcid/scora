import { Home, TrendingUp, Calendar, User } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    {
      id: "standings",
      icon: TrendingUp,
      label: "Standings",
      path: "/standings",
    },
    { id: "calendar", icon: Calendar, label: "Calendar", path: "/calendar" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (onTabChange) {
      onTabChange(tab.id);
    }
    navigate(tab.path);
  };

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const matchedTab = tabs.find((tab) => tab.path === currentPath);
    return matchedTab?.id || activeTab || "home";
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 z-50"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const currentTab = getCurrentTab();
          const isActive = currentTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 w-8 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive && "text-primary"
                )}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
