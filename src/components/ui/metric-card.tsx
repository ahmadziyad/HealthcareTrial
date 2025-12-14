import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20",
        className
      )}
    >
      <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
