import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Building2 } from "lucide-react";
import { Site } from "@/data/mockData";

interface AddSiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (site: Omit<Site, "id" | "lastSync" | "enrolled">) => void;
  availableTrials: Array<{ id: string; name: string }>;
}

export function AddSiteModal({ open, onOpenChange, onSubmit, availableTrials }: AddSiteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "pending" as const,
    capacity: 0,
    principalInvestigator: "",
    trials: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.principalInvestigator) {
      return;
    }

    const newSite: Omit<Site, "id" | "lastSync" | "enrolled"> = {
      name: formData.name,
      location: formData.location,
      status: formData.status,
      capacity: formData.capacity,
      principalInvestigator: formData.principalInvestigator,
      trials: formData.trials,
    };

    onSubmit(newSite);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: "",
      location: "",
      status: "pending",
      capacity: 0,
      principalInvestigator: "",
      trials: [],
    });
  };

  const handleTrialChange = (trialId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        trials: [...formData.trials, trialId],
      });
    } else {
      setFormData({
        ...formData,
        trials: formData.trials.filter((t) => t !== trialId),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Add New Site
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Site Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Mayo Clinic"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Rochester, MN"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="principalInvestigator">Principal Investigator *</Label>
              <Input
                id="principalInvestigator"
                value={formData.principalInvestigator}
                onChange={(e) => setFormData({ ...formData, principalInvestigator: e.target.value })}
                placeholder="e.g., Dr. Sarah Chen"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="capacity">Patient Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Initial Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="issue">Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {availableTrials.length > 0 && (
            <div>
              <Label className="text-base font-medium">Assigned Trials</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Select which trials this site will participate in
              </p>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                {availableTrials.map((trial) => (
                  <div key={trial.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={trial.id}
                      checked={formData.trials.includes(trial.id)}
                      onCheckedChange={(checked) => handleTrialChange(trial.id, !!checked)}
                    />
                    <Label
                      htmlFor={trial.id}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      <span className="font-medium">{trial.id}</span> - {trial.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-primary-foreground">
              Create Site
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}