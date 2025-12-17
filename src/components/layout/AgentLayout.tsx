import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AgentLayoutProps {
    children: React.ReactNode;
}

const AgentLayout = ({ children }: AgentLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Load sidebar state from localStorage
    useEffect(() => {
        const savedState = localStorage.getItem("scora:sidebarCollapsed");
        if (savedState !== null) {
            setSidebarCollapsed(JSON.parse(savedState));
        }
    }, []);

    // Save sidebar state to localStorage
    const handleCollapsedChange = (collapsed: boolean) => {
        setSidebarCollapsed(collapsed);
        localStorage.setItem("scora:sidebarCollapsed", JSON.stringify(collapsed));
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isCollapsed={sidebarCollapsed}
                onCollapsedChange={handleCollapsedChange}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                    isCollapsed={sidebarCollapsed}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AgentLayout;

