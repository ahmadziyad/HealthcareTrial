import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Patient } from "@/data/mockData";

interface EnrollPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (patient: Omit<Patient, "id" | "completionRate">) => void;
  availableTrials: Array<{ id: string; name: string }>;
  availableSites: Array<{ id: string; name: string }>;
}

export function EnrollPatientModal({ 
  open, 
  onOpenChange, 
  onSubmit, 
  availableTrials, 
  availableSites 
}: EnrollPatientModalProps) {
  const [formData, setFormData] = useState({
    subjectId: "",
    site: "",
    trial: "",
    status: "screening" as const,
    enrollmentDate: undefined as Date | undefined,
    lastVisit: undefined as Date | undefined,
    nextVisit: undefined as Date | undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subjectId || !formData.site || !formData.trial || !formData.enrollmentDate) {
      return;
    }

    const newPatient: Omit<Patient, "id" | "completionRate"> = {
      subjectId: formData.subjectId,
      site: formData.site,
      trial: formData.trial,
      status: formData.status,
      enrollmentDate: format(formData.enrollmentDate, "MMM dd, yyyy"),
      lastVisit: formData.lastVisit ? format(formData.lastVisit, "MMM dd, yyyy") : "-",
      nextVisit: formData.nextVisit ? format(formData.nextVisit, "MMM dd, yyyy") : "-",
    };

    onSubmit(newPatient);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      subjectId: "",
      site: "",
      trial: "",
      status: "screening",
      enrollmentDate: undefined,
      lastVisit: undefined,
      nextVisit: undefined,
    });
  };

  // Generate subject ID based on trial and site selection
  const generateSubjectId = () => {
    if (formData.trial && formData.site) {
      const trialNumber = formData.trial.split('-')[1] || '000';
      const siteNumber = availableSites.findIndex(s => s.name === formData.site) + 1;
      const patientNumber = Math.floor(Math.random() * 9999) + 1;
      const subjectId = `${trialNumber}-${siteNumber.toString().padStart(3, '0')}-${patientNumber.toString().padStart(4, '0')}`;
      setFormData({ ...formData, subjectId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Enroll New Patient
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="trial">Trial *</Label>
              <Select 
                value={formData.trial} 
                onValueChange={(value) => {
                  setFormData({ ...formData, trial: value });
                  // Clear subject ID when trial changes
                  if (formData.subjectId) {
                    setFormData({ ...formData, trial: value, subjectId: "" });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trial" />
                </SelectTrigger>
                <SelectContent>
                  {availableTrials.map((trial) => (
                    <SelectItem key={trial.id} value={trial.id}>
                      {trial.id} - {trial.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="site">Site *</Label>
              <Select 
                value={formData.site} 
                onValueChange={(value) => {
                  setFormData({ ...formData, site: value });
                  // Clear subject ID when site changes
                  if (formData.subjectId) {
                    setFormData({ ...formData, site: value, subjectId: "" });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select site" />
                </SelectTrigger>
                <SelectContent>
                  {availableSites.map((site) => (
                    <SelectItem key={site.id} value={site.name}>
                      {site.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="subjectId">Subject ID *</Label>
              <div className="flex gap-2">
                <Input
                  id="subjectId"
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  placeholder="e.g., 042-001-0001"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateSubjectId}
                  disabled={!formData.trial || !formData.site}
                  className="shrink-0"
                >
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Format: [Trial]-[Site]-[Patient Number]
              </p>
            </div>
            
            <div>
              <Label htmlFor="status">Initial Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Enrollment Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.enrollmentDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.enrollmentDate ? format(formData.enrollmentDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.enrollmentDate}
                    onSelect={(date) => setFormData({ ...formData, enrollmentDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Last Visit (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.lastVisit && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.lastVisit ? format(formData.lastVisit, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.lastVisit}
                    onSelect={(date) => setFormData({ ...formData, lastVisit: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Next Visit (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.nextVisit && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextVisit ? format(formData.nextVisit, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.nextVisit}
                    onSelect={(date) => setFormData({ ...formData, nextVisit: date })}
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
              Enroll Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}