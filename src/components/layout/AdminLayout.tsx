import { useState, useEffect } from "react";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminHeader } from "@/features/admin/components/AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Persist collapsed state
  useEffect(() => {
    const saved = localStorage.getItem("scora:adminSidebarCollapsed");
    if (saved !== null) setSidebarCollapsed(JSON.parse(saved));
  }, []);

  const handleCollapsedChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem(
      "scora:adminSidebarCollapsed",
      JSON.stringify(collapsed),
    );
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onCollapsedChange={handleCollapsedChange}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          onMenuClick={() => setSidebarOpen((v) => !v)}
          isCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
