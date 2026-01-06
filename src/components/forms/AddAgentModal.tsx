import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Bot } from "lucide-react";
import { Agent } from "@/data/mockData";

interface AddAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (agent: Omit<Agent, "id" | "messagesProcessed" | "uptime" | "lastMessage">) => void;
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

export function AddAgentModal({ open, onOpenChange, onSubmit }: AddAgentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "A2A" as const,
    status: "offline" as const,
    description: "",
    capabilities: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || formData.capabilities.length === 0) {
      return;
    }

    const newAgent: Omit<Agent, "id" | "messagesProcessed" | "uptime" | "lastMessage"> = {
      name: formData.name,
      type: formData.type,
      status: formData.status,
      description: formData.description,
      capabilities: formData.capabilities,
    };

    onSubmit(newAgent);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: "",
      type: "A2A",
      status: "offline",
      description: "",
      capabilities: [],
    });
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Add New Agent
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Agent Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Data Validation Agent"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Agent Type *</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A2A">A2A (Agent-to-Agent)</SelectItem>
                  <SelectItem value="MCP">MCP (Model Context Protocol)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Initial Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this agent does and its purpose..."
                rows={3}
                required
              />
            </div>
          </div>
          
          <div>
            <Label className="text-base font-medium">Capabilities *</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Select the capabilities this agent will provide
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
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
            {formData.capabilities.length === 0 && (
              <p className="text-sm text-destructive mt-1">
                Please select at least one capability
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-primary-foreground">
              Create Agent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}