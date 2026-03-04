import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-start justify-between gap-4"
  >
    <div>
      <h1 className="text-2xl font-bold text-foreground tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </motion.div>
);
