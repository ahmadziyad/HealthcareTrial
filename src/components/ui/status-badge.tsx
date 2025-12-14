import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        destructive: "bg-destructive/10 text-destructive",
        info: "bg-info/10 text-info",
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/10 text-primary",
        accent: "bg-accent/10 text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  pulse?: boolean;
}

export function StatusBadge({
  className,
  variant,
  pulse,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {pulse && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full animate-pulse-soft",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "destructive" && "bg-destructive",
            variant === "info" && "bg-info",
            variant === "primary" && "bg-primary",
            variant === "accent" && "bg-accent",
            (!variant || variant === "default") && "bg-muted-foreground"
          )}
        />
      )}
      {children}
    </div>
  );
}
