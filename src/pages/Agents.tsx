import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { AddAgentModal } from "@/components/forms/AddAgentModal";
import { ConfigureAgentModal } from "@/components/forms/ConfigureAgentModal";
import { agents, Agent } from "@/data/mockData";
import {
  Bot,
  Zap,
  MessageSquare,
  Activity,
  RefreshCw,
  Plus,
  Settings,
  Play,
  Pause,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const statusConfig = {
  online: { label: "Online", variant: "success" as const },
  processing: { label: "Processing", variant: "info" as const },
  offline: { label: "Offline", variant: "default" as const },
  error: { label: "Error", variant: "destructive" as const },
};

const Agents = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentsList, setAgentsList] = useState<Agent[]>(agents);

  const handleAddAgent = (newAgentData: Omit<Agent, "id" | "messagesProcessed" | "uptime" | "lastMessage">) => {
    const newAgent: Agent = {
      ...newAgentData,
      id: `agent-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      messagesProcessed: 0,
      uptime: "0%",
      lastMessage: "Agent initialized and ready for deployment",
    };
    
    setAgentsList([newAgent, ...agentsList]);
  };

  const handleConfigureAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowConfigureModal(true);
  };

  const handleSaveAgentConfig = (agentId: string, updates: Partial<Agent>) => {
    setAgentsList(agentsList.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ));
  };

  const handleToggleAgentStatus = (agentId: string) => {
    setAgentsList(agentsList.map(agent => {
      if (agent.id === agentId) {
        let newStatus: Agent['status'];
        let newMessage: string;
        
        if (agent.status === 'offline') {
          newStatus = 'online';
          newMessage = `Agent started and is now online`;
        } else if (agent.status === 'online' || agent.status === 'processing') {
          newStatus = 'offline';
          newMessage = `Agent paused and is now offline`;
        } else {
          newStatus = 'offline';
          newMessage = `Agent stopped from error state`;
        }
        
        return {
          ...agent,
          status: newStatus,
          lastMessage: newMessage,
        };
      }
      return agent;
    }));
  };

  const handleStopAgent = (agentId: string) => {
    setAgentsList(agentsList.map(agent => 
      agent.id === agentId 
        ? { 
            ...agent, 
            status: 'offline' as const,
            lastMessage: 'Agent stopped by user'
          } 
        : agent
    ));
  };

  const handleSyncAllAgents = () => {
    setAgentsList(agentsList.map(agent => ({
      ...agent,
      lastMessage: 'Sync completed successfully',
      messagesProcessed: agent.messagesProcessed + Math.floor(Math.random() * 10) + 1,
    })));
  };

  return (
    <AppLayout
      title="Agent Network"
      description="Manage A2A and MCP agent integrations for clinical trial coordination."
    >
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {agentsList.filter((a) => a.type === "A2A").length}
                </p>
                <p className="text-sm text-muted-foreground">A2A Agents</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {agentsList.filter((a) => a.type === "MCP").length}
                </p>
                <p className="text-sm text-muted-foreground">MCP Agents</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {agentsList.filter((a) => a.status === "online" || a.status === "processing").length}
                </p>
                <p className="text-sm text-muted-foreground">Active Now</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {agentsList.reduce((acc, a) => acc + a.messagesProcessed, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Messages Processed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">All Agents</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSyncAllAgents}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
            <Button 
              size="sm" 
              className="gradient-primary text-primary-foreground"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {agentsList.map((agent, index) => {
            const config = statusConfig[agent.status];

            return (
              <div
                key={agent.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header with gradient */}
                <div
                  className={cn(
                    "relative p-4 border-b border-border",
                    agent.type === "A2A" ? "bg-accent/5" : "bg-primary/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg",
                          agent.type === "A2A"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        {agent.type === "A2A" ? (
                          <Zap className="h-6 w-6" />
                        ) : (
                          <Bot className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{agent.name}</h3>
                          <StatusBadge
                            variant={agent.type === "A2A" ? "accent" : "primary"}
                          >
                            {agent.type}
                          </StatusBadge>
                        </div>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                      </div>
                    </div>
                    <StatusBadge
                      variant={config.variant}
                      pulse={agent.status === "processing"}
                    >
                      {config.label}
                    </StatusBadge>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-4 space-y-4">
                  {/* Last Message */}
                  <div className="flex items-start gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{agent.lastMessage}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Messages: </span>
                      <span className="font-medium text-foreground">
                        {agent.messagesProcessed.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Uptime: </span>
                      <span className="font-medium text-foreground">{agent.uptime}</span>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.slice(0, 3).map((cap) => (
                      <span
                        key={cap}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                      >
                        {cap}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleConfigureAgent(agent)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    
                    {agent.status === "offline" || agent.status === "error" ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleToggleAgentStatus(agent.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleToggleAgentStatus(agent.id)}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    
                    {(agent.status === "online" || agent.status === "processing") && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStopAgent(agent.id)}
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AddAgentModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddAgent}
      />

      <ConfigureAgentModal
        open={showConfigureModal}
        onOpenChange={setShowConfigureModal}
        agent={selectedAgent}
        onSave={handleSaveAgentConfig}
      />
    </AppLayout>
  );
};

export default Agents;
