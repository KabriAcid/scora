import { cn } from "@/shared/utils/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
  variant?: "default" | "white";
}

const sizeConfig = {
  sm: { image: "h-6 w-6", text: "text-sm" },
  md: { image: "h-8 w-8", text: "text-base" },
  lg: { image: "h-10 w-10", text: "text-lg" },
  xl: { image: "h-12 w-12", text: "text-xl" },
};

export const Logo = ({
  size = "md",
  className,
  showText = true,
  variant = "default",
}: LogoProps) => {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src="/favicon.png"
        alt="Scora Logo"
        className={cn("object-contain", config.image)}
      />
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight",
            config.text,
            variant === "white" ? "text-white" : "text-foreground"
          )}
        >
          Scora
        </span>
      )}
    </div>
  );
};
