import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Building2, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

interface Site {
  id: string;
  name: string;
  location: string;
  status: "active" | "pending" | "issue" | "inactive";
  lastSync: string;
  enrolled: number;
}

const sites: Site[] = [
  {
    id: "SITE-001",
    name: "Mayo Clinic",
    location: "Rochester, MN",
    status: "active",
    lastSync: "2 min ago",
    enrolled: 45,
  },
  {
    id: "SITE-002",
    name: "Johns Hopkins",
    location: "Baltimore, MD",
    status: "active",
    lastSync: "5 min ago",
    enrolled: 38,
  },
  {
    id: "SITE-003",
    name: "Mass General",
    location: "Boston, MA",
    status: "pending",
    lastSync: "15 min ago",
    enrolled: 22,
  },
  {
    id: "SITE-004",
    name: "Cleveland Clinic",
    location: "Cleveland, OH",
    status: "issue",
    lastSync: "1 hour ago",
    enrolled: 28,
  },
  {
    id: "SITE-005",
    name: "Stanford Health",
    location: "Palo Alto, CA",
    status: "active",
    lastSync: "3 min ago",
    enrolled: 52,
  },
];

const statusConfig = {
  active: { label: "Connected", variant: "success" as const, icon: CheckCircle2 },
  pending: { label: "Syncing", variant: "warning" as const, icon: Clock },
  issue: { label: "Issue", variant: "destructive" as const, icon: AlertCircle },
  inactive: { label: "Offline", variant: "default" as const, icon: Building2 },
};

interface SiteCoordinationPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SiteCoordinationPanel({ className }: SiteCoordinationPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">Site Coordination</h3>
            <p className="text-sm text-muted-foreground">
              Real-time status across all trial sites
            </p>
          </div>
          <StatusBadge variant="success" pulse>
            {sites.filter((s) => s.status === "active").length} Active
          </StatusBadge>
        </div>
      </div>

      <div className="divide-y divide-border">
        {sites.map((site, index) => {
          const config = statusConfig[site.status];
          const Icon = config.icon;
          
          return (
            <div
              key={site.id}
              className="group p-4 hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground truncate">
                      {site.name}
                    </span>
                    <Icon className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      site.status === "active" && "text-success",
                      site.status === "pending" && "text-warning",
                      site.status === "issue" && "text-destructive"
                    )} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{site.location}</span>
                    <span>•</span>
                    <span>{site.enrolled} enrolled</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <StatusBadge variant={config.variant} className="mb-1">
                    {config.label}
                  </StatusBadge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    <Clock className="h-3 w-3" />
                    {site.lastSync}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
