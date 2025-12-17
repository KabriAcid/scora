import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
    item: {
        id: string;
        label: string;
        icon: React.ReactNode;
        path: string;
    };
    isActive: boolean;
    isCollapsed: boolean;
    onNavClick?: () => void;
}

const NavItem = ({
    item,
    isActive,
    isCollapsed,
    onNavClick,
}: NavItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(item.path);
        onNavClick?.();
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-accent text-white shadow-md"
                    : "text-foreground hover:bg-secondary"
                } ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? item.label : ""}
        >
            <span className="flex-shrink-0">{item.icon}</span>

            {!isCollapsed && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm md:text-base font-medium flex-1 text-left"
                >
                    {item.label}
                </motion.span>
            )}

            {isActive && !isCollapsed && (
                <motion.div
                    layoutId="activeIndicator"
                    className="w-1 h-6 bg-white rounded-r-full"
                />
            )}
        </motion.button>
    );
};

export default NavItem;
