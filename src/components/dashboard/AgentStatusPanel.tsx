import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Bot, Zap, MessageSquare, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Agent {
  id: string;
  name: string;
  type: "A2A" | "MCP";
  status: "online" | "processing" | "offline";
  lastMessage: string;
  messagesProcessed: number;
}

const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Data Validation Agent",
    type: "A2A",
    status: "online",
    lastMessage: "All CRF data validated for TRIAL-042",
    messagesProcessed: 1247,
  },
  {
    id: "agent-002",
    name: "Site Coordinator Agent",
    type: "A2A",
    status: "processing",
    lastMessage: "Processing enrollment update from SITE-003",
    messagesProcessed: 892,
  },
  {
    id: "agent-003",
    name: "Clinical Context Agent",
    type: "MCP",
    status: "online",
    lastMessage: "Protocol context loaded for Phase II trials",
    messagesProcessed: 456,
  },
  {
    id: "agent-004",
    name: "Regulatory Compliance Agent",
    type: "MCP",
    status: "online",
    lastMessage: "ICH-GCP guidelines updated in context",
    messagesProcessed: 328,
  },
];

const statusConfig = {
  online: { label: "Online", variant: "success" as const },
  processing: { label: "Processing", variant: "info" as const },
  offline: { label: "Offline", variant: "default" as const },
};

interface AgentStatusPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AgentStatusPanel({ className }: AgentStatusPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="p-5 border-b border-border gradient-hero text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Agent Network</h3>
              <p className="text-sm text-primary-foreground/70">
                A2A & MCP Integration Status
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="secondary"
            className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {agents.map((agent, index) => {
          const config = statusConfig[agent.status];
          
          return (
            <div
              key={agent.id}
              className="group p-4 hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                  agent.type === "A2A" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                )}>
                  {agent.type === "A2A" ? (
                    <Zap className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground truncate">
                      {agent.name}
                    </span>
                    <StatusBadge variant={agent.type === "A2A" ? "accent" : "primary"}>
                      {agent.type}
                    </StatusBadge>
                    <StatusBadge variant={config.variant} pulse={agent.status === "processing"}>
                      {config.label}
                    </StatusBadge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground flex items-center gap-2 truncate">
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    {agent.lastMessage}
                  </p>
                  
                  <div className="text-xs text-muted-foreground">
                    {agent.messagesProcessed.toLocaleString()} messages processed
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
