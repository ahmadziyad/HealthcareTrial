import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, Calendar, ChevronRight } from "lucide-react";

interface TrialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  phase: string;
  status: "active" | "enrolling" | "completed" | "paused";
  progress: number;
  sites: number;
  enrolled: number;
  target: number;
  startDate: string;
}

const statusConfig = {
  active: { label: "Active", variant: "success" as const },
  enrolling: { label: "Enrolling", variant: "info" as const },
  completed: { label: "Completed", variant: "primary" as const },
  paused: { label: "Paused", variant: "warning" as const },
};

export function TrialCard({
  id,
  name,
  phase,
  status,
  progress,
  sites,
  enrolled,
  target,
  startDate,
  className,
}: TrialCardProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {id}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs font-medium text-primary">{phase}</span>
            </div>
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
          </div>
          <StatusBadge variant={config.variant} pulse={status === "active" || status === "enrolling"}>
            {config.label}
          </StatusBadge>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Enrollment Progress</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{sites} sites</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{enrolled}/{target}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{startDate}</span>
          </div>
        </div>

        {/* Hover Action */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
