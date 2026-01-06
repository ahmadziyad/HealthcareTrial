import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Settings, Bot, Zap, Save, RotateCcw } from "lucide-react";
import { Agent } from "@/data/mockData";

interface ConfigureAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: Agent | null;
  onSave: (agentId: string, updates: Partial<Agent>) => void;
}

const availableCapabilities = [
  "CRF Validation",
  "Data Quality Checks",
  "Anomaly Detection",
  "Site Sync",
  "Enrollment Tracking",
  "Status Updates",
  "Protocol Context",
  "Medical Knowledge",
  "Decision Support",
  "ICH-GCP Compliance",
  "FDA Guidelines",
  "Audit Support",
  "AE Detection",
  "Safety Signals",
  "Alert Generation",
  "Document Parsing",
  "OCR",
  "Content Extraction",
  "Real-time Monitoring",
  "Regulatory Reporting",
];

const configurationTemplates = {
  "A2A": {
    "Data Validation": {
      timeout: "30000",
      retryAttempts: "3",
      batchSize: "100",
      validationRules: "strict"
    },
    "Site Coordination": {
      syncInterval: "300000",
      maxConcurrentSites: "10",
      notificationThreshold: "5",
      autoRetry: "true"
    }
  },
  "MCP": {
    "Context Provider": {
      contextWindow: "8192",
      maxTokens: "4096",
      temperature: "0.1",
      modelVersion: "latest"
    },
    "Knowledge Base": {
      indexSize: "1000000",
      searchDepth: "10",
      relevanceThreshold: "0.8",
      updateFrequency: "daily"
    }
  }
};

export function ConfigureAgentModal({ open, onOpenChange, agent, onSave }: ConfigureAgentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capabilities: [] as string[],
    status: "offline" as Agent['status'],
    configuration: {} as Record<string, string>,
  });

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name,
        description: agent.description,
        capabilities: [...agent.capabilities],
        status: agent.status,
        configuration: {
          timeout: "30000",
          retryAttempts: "3",
          batchSize: "100",
          syncInterval: "300000",
          maxConcurrentConnections: "10",
          logLevel: "info",
          ...((agent as any).configuration || {}),
        },
      });
    }
  }, [agent]);

  const handleSave = () => {
    if (!agent) return;

    const updates: Partial<Agent> = {
      name: formData.name,
      description: formData.description,
      capabilities: formData.capabilities,
      status: formData.status,
    };

    if (formData.configuration && Object.keys(formData.configuration).length > 0) {
      (updates as any).configuration = formData.configuration;
    }

    onSave(agent.id, updates);
    onOpenChange(false);
  };

  const handleCapabilityChange = (capability: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        capabilities: [...formData.capabilities, capability],
      });
    } else {
      setFormData({
        ...formData,
        capabilities: formData.capabilities.filter((c) => c !== capability),
      });
    }
  };

  const handleConfigChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      configuration: {
        ...formData.configuration,
        [key]: value,
      },
    });
  };

  const loadTemplate = (templateType: string) => {
    if (!agent) return;
    
    const templates = configurationTemplates[agent.type as keyof typeof configurationTemplates];
    const template = templates?.[templateType as keyof typeof templates] as Record<string, string> | undefined;
    
    if (template) {
      setFormData({
        ...formData,
        configuration: {
          ...formData.configuration,
          ...template,
        },
      });
    }
  };

  if (!agent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configure Agent: {agent.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="type">Agent Type</Label>
                <Input
                  id="type"
                  value={agent.type}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: Agent['status']) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Messages Processed</Label>
                <p className="font-medium">{agent.messagesProcessed.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Uptime</Label>
                <p className="font-medium">{agent.uptime}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Agent ID</Label>
                <p className="font-medium font-mono text-xs">{agent.id}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Message</Label>
                <p className="font-medium text-xs truncate">{agent.lastMessage}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Agent Capabilities</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select the capabilities this agent will provide
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto border rounded-lg p-4">
                {availableCapabilities.map((capability) => (
                  <div key={capability} className="flex items-center space-x-2">
                    <Checkbox
                      id={capability}
                      checked={formData.capabilities.includes(capability)}
                      onCheckedChange={(checked) => handleCapabilityChange(capability, !!checked)}
                    />
                    <Label
                      htmlFor={capability}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {capability}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Agent Configuration</Label>
                <p className="text-sm text-muted-foreground">
                  Configure agent-specific parameters and settings
                </p>
              </div>
              <div className="flex gap-2">
                {agent.type === "A2A" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadTemplate("Data Validation")}
                    >
                      Load Data Template
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadTemplate("Site Coordination")}
                    >
                      Load Site Template
                    </Button>
                  </>
                )}
                {agent.type === "MCP" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadTemplate("Context Provider")}
                    >
                      Load Context Template
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadTemplate("Knowledge Base")}
                    >
                      Load KB Template
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeout">Timeout (ms)</Label>
                <Input
                  id="timeout"
                  value={formData.configuration.timeout || ""}
                  onChange={(e) => handleConfigChange("timeout", e.target.value)}
                  placeholder="30000"
                />
              </div>
              
              <div>
                <Label htmlFor="retryAttempts">Retry Attempts</Label>
                <Input
                  id="retryAttempts"
                  value={formData.configuration.retryAttempts || ""}
                  onChange={(e) => handleConfigChange("retryAttempts", e.target.value)}
                  placeholder="3"
                />
              </div>
              
              <div>
                <Label htmlFor="batchSize">Batch Size</Label>
                <Input
                  id="batchSize"
                  value={formData.configuration.batchSize || ""}
                  onChange={(e) => handleConfigChange("batchSize", e.target.value)}
                  placeholder="100"
                />
              </div>
              
              <div>
                <Label htmlFor="syncInterval">Sync Interval (ms)</Label>
                <Input
                  id="syncInterval"
                  value={formData.configuration.syncInterval || ""}
                  onChange={(e) => handleConfigChange("syncInterval", e.target.value)}
                  placeholder="300000"
                />
              </div>
              
              <div>
                <Label htmlFor="maxConnections">Max Connections</Label>
                <Input
                  id="maxConnections"
                  value={formData.configuration.maxConcurrentConnections || ""}
                  onChange={(e) => handleConfigChange("maxConcurrentConnections", e.target.value)}
                  placeholder="10"
                />
              </div>
              
              <div>
                <Label htmlFor="logLevel">Log Level</Label>
                <Select 
                  value={formData.configuration.logLevel || "info"} 
                  onValueChange={(value) => handleConfigChange("logLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {agent.type === "MCP" && (
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contextWindow">Context Window</Label>
                    <Input
                      id="contextWindow"
                      value={formData.configuration.contextWindow || ""}
                      onChange={(e) => handleConfigChange("contextWindow", e.target.value)}
                      placeholder="8192"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      id="maxTokens"
                      value={formData.configuration.maxTokens || ""}
                      onChange={(e) => handleConfigChange("maxTokens", e.target.value)}
                      placeholder="4096"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      value={formData.configuration.temperature || ""}
                      onChange={(e) => handleConfigChange("temperature", e.target.value)}
                      placeholder="0.1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="modelVersion">Model Version</Label>
                    <Select 
                      value={formData.configuration.modelVersion || "latest"} 
                      onValueChange={(value) => handleConfigChange("modelVersion", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="beta">Beta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              if (agent) {
                setFormData({
                  name: agent.name,
                  description: agent.description,
                  capabilities: [...agent.capabilities],
                  status: agent.status,
                  configuration: {},
                });
              }
            }}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} className="gradient-primary text-primary-foreground">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}