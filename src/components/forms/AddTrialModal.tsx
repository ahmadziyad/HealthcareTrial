import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Trial } from "@/data/mockData";

interface AddTrialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (trial: Omit<Trial, "id">) => void;
}

export function AddTrialModal({ open, onOpenChange, onSubmit }: AddTrialModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phase: "",
    status: "enrolling" as const,
    sites: 0,
    enrolled: 0,
    target: 0,
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    sponsor: "",
    indication: "",
    protocol: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phase || !formData.sponsor || !formData.indication || !formData.protocol || !formData.startDate) {
      return;
    }

    const newTrial: Omit<Trial, "id"> = {
      name: formData.name,
      phase: formData.phase,
      status: formData.status,
      progress: 0,
      sites: formData.sites,
      enrolled: formData.enrolled,
      target: formData.target,
      startDate: format(formData.startDate, "MMM yyyy"),
      endDate: formData.endDate ? format(formData.endDate, "MMM yyyy") : undefined,
      sponsor: formData.sponsor,
      indication: formData.indication,
      protocol: formData.protocol,
    };

    onSubmit(newTrial);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: "",
      phase: "",
      status: "enrolling",
      sites: 0,
      enrolled: 0,
      target: 0,
      startDate: undefined,
      endDate: undefined,
      sponsor: "",
      indication: "",
      protocol: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Trial
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Trial Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Oncology Phase III - Immunotherapy"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phase">Phase *</Label>
              <Select value={formData.phase} onValueChange={(value) => setFormData({ ...formData, phase: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phase I">Phase I</SelectItem>
                  <SelectItem value="Phase II">Phase II</SelectItem>
                  <SelectItem value="Phase III">Phase III</SelectItem>
                  <SelectItem value="Phase IV">Phase IV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enrolling">Enrolling</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="sponsor">Sponsor *</Label>
              <Input
                id="sponsor"
                value={formData.sponsor}
                onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                placeholder="e.g., Novartis"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="protocol">Protocol ID *</Label>
              <Input
                id="protocol"
                value={formData.protocol}
                onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                placeholder="e.g., PROTO-042-NSCLC"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="indication">Indication *</Label>
              <Input
                id="indication"
                value={formData.indication}
                onChange={(e) => setFormData({ ...formData, indication: e.target.value })}
                placeholder="e.g., Non-Small Cell Lung Cancer"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="target">Target Enrollment</Label>
              <Input
                id="target"
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
            
            <div>
              <Label htmlFor="sites">Number of Sites</Label>
              <Input
                id="sites"
                type="number"
                value={formData.sites}
                onChange={(e) => setFormData({ ...formData, sites: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
            
            <div>
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>End Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData({ ...formData, endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-primary-foreground">
              Create Trial
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}