import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { EnrollPatientModal } from "@/components/forms/EnrollPatientModal";
import { patients, Patient, trials, sites } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Search,
  Plus,
  Filter,
  User,
  Calendar,
  Building2,
  FlaskConical,
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusConfig = {
  screening: { label: "Screening", variant: "info" as const },
  enrolled: { label: "Enrolled", variant: "primary" as const },
  active: { label: "Active", variant: "success" as const },
  completed: { label: "Completed", variant: "default" as const },
  withdrawn: { label: "Withdrawn", variant: "destructive" as const },
};

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [patientsList, setPatientsList] = useState<Patient[]>(patients);
  const isMobile = useIsMobile();

  const filteredPatients = patientsList.filter(
    (patient) =>
      patient.subjectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.trial.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableTrials = trials.map(trial => ({
    id: trial.id,
    name: trial.name
  }));

  const availableSites = sites.map(site => ({
    id: site.id,
    name: site.name
  }));

  const handleEnrollPatient = (newPatientData: Omit<Patient, "id" | "completionRate">) => {
    const newPatient: Patient = {
      ...newPatientData,
      id: `PAT-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      completionRate: newPatientData.status === "screening" ? 5 : 
                     newPatientData.status === "enrolled" ? 15 : 25,
    };
    
    setPatientsList([newPatient, ...patientsList]);
  };

  const PatientCard = ({ patient, index }: { patient: any; index: number }) => {
    const config = statusConfig[patient.status];
    
    return (
      <div 
        className="p-4 border border-border rounded-lg bg-card space-y-3 animate-fade-in"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>
            <span className="font-medium">{patient.subjectId}</span>
          </div>
          <StatusBadge variant={config.variant}>{config.label}</StatusBadge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Site:</span>
            <span>{patient.site}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Trial:</span>
            <span>{patient.trial}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Enrolled:</span>
            <span>{patient.enrollmentDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Last Visit:</span>
            <span>{patient.lastVisit}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Next Visit:</span>
            <span>{patient.nextVisit}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Progress:</span>
          <Progress value={patient.completionRate} className="h-2 flex-1" />
          <span className="text-sm text-muted-foreground">
            {patient.completionRate}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <AppLayout
      title="Patients"
      description="Track patient enrollment and visit completion across all trials."
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              size="sm" 
              className="gradient-primary text-primary-foreground flex-1 sm:flex-none"
              onClick={() => setShowEnrollModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Enroll Patient
            </Button>
          </div>
        </div>

        {/* Mobile Card View */}
        {isMobile ? (
          <div className="space-y-4">
            {filteredPatients.map((patient, index) => (
              <PatientCard key={patient.id} patient={patient} index={index} />
            ))}
          </div>
        ) : (
          /* Desktop Table View */
          <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject ID</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Trial</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrollment Date</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Visit</TableHead>
                    <TableHead>Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient, index) => {
                    const config = statusConfig[patient.status];

                    return (
                      <TableRow
                        key={patient.id}
                        className="cursor-pointer hover:bg-muted/50 animate-fade-in"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{patient.subjectId}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                            {patient.site}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
                            {patient.trial}
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge variant={config.variant}>{config.label}</StatusBadge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {patient.enrollmentDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {patient.lastVisit}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {patient.nextVisit}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={patient.completionRate} className="h-2 w-16" />
                            <span className="text-sm text-muted-foreground">
                              {patient.completionRate}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </div>
        )}
      </div>

      <EnrollPatientModal
        open={showEnrollModal}
        onOpenChange={setShowEnrollModal}
        onSubmit={handleEnrollPatient}
        availableTrials={availableTrials}
        availableSites={availableSites}
      />
    </AppLayout>
  );
};

export default Patients;
