import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Bell, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

// ─── Mock admin profile (replace with auth context later) ────────────────────

const ADMIN_PROFILE = {
  name: "Admin User",
  email: "admin@scora.app",
  initials: "AD",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdminHeaderProps {
  onMenuClick: () => void;
  isCollapsed: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AdminHeader = ({ onMenuClick, isCollapsed }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-sm h-16 flex-shrink-0">
        <div className="h-full px-4 md:px-6 flex items-center justify-between">
          {/* Left — hamburger + brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            {/* Brand shown in header only when sidebar is collapsed */}
            {isCollapsed && (
              <div className="hidden lg:flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    S
                  </span>
                </div>
                <span className="text-base font-bold text-foreground">
                  Scora
                </span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </div>
            )}
          </div>

          {/* Right — bell + profile */}
          <div className="flex items-center gap-1">
            {/* Bell (no-op placeholder for now) */}
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Profile button */}
            <button
              onClick={() => setShowProfile((v) => !v)}
              className="flex items-center gap-2 p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">
                  {ADMIN_PROFILE.initials}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-4 top-[68px] w-52 bg-card rounded-xl shadow-xl border border-border z-50"
              >
                {/* Identity */}
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">
                    {ADMIN_PROFILE.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ADMIN_PROFILE.email}
                  </p>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 text-sm text-foreground hover:bg-secondary transition-colors">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate(ROUTES.ADMIN.SETTINGS);
                    }}
                    className="w-full px-4 py-2.5 text-left flex items-center gap-3 text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-border p-2">
                  <button
                    onClick={() => navigate("/admin/login")}
                    className="w-full px-4 py-2.5 text-left flex items-center gap-3 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop to close profile dropdown */}
      {showProfile && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfile(false)}
        />
      )}
    </>
  );
};
