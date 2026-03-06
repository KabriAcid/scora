import { cn } from "@/shared/utils/cn";

interface EmptyStateAction {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
}

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    action?: EmptyStateAction;
    className?: string;
}

export const EmptyState = ({
    icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
                className
            )}
        >
            {/* Icon bubble */}
            <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
                {icon}
            </div>

            {/* Text */}
            <div className="space-y-1.5 max-w-xs">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                {description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Action */}
            {action && (
                <button
                    onClick={action.onClick}
                    className={cn(
                        "mt-1 px-4 py-2 rounded-lg text-xs font-semibold transition-colors",
                        action.variant === "secondary"
                            ? "bg-secondary text-foreground hover:bg-muted"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};
