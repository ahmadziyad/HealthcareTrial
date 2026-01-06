import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AddSiteModal } from "@/components/forms/AddSiteModal";
import { sites, Site, trials } from "@/data/mockData";
import {
  Search,
  Plus,
  Filter,
  Building2,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const statusConfig = {
  active: { label: "Connected", variant: "success" as const, icon: CheckCircle2 },
  pending: { label: "Syncing", variant: "warning" as const, icon: Clock },
  issue: { label: "Issue", variant: "destructive" as const, icon: AlertCircle },
  inactive: { label: "Offline", variant: "default" as const, icon: Building2 },
};

const Sites = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [sitesList, setSitesList] = useState<Site[]>(sites);

  const filteredSites = sitesList.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableTrials = trials.map(trial => ({
    id: trial.id,
    name: trial.name
  }));

  const handleAddSite = (newSiteData: Omit<Site, "id" | "lastSync" | "enrolled">) => {
    const newSite: Site = {
      ...newSiteData,
      id: `SITE-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      lastSync: "Just now",
      enrolled: 0,
    };
    
    setSitesList([newSite, ...sitesList]);
  };

  return (
    <AppLayout
      title="Sites"
      description="Manage trial sites and monitor their coordination status."
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
            <Button 
              size="sm" 
              className="gradient-primary text-primary-foreground"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Site
            </Button>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSites.map((site, index) => {
            const config = statusConfig[site.status];
            const Icon = config.icon;
            const capacityPercent = Math.round((site.enrolled / site.capacity) * 100);

            return (
              <div
                key={site.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {site.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{site.location}</span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge
                      variant={config.variant}
                      pulse={site.status === "active" || site.status === "pending"}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </StatusBadge>
                  </div>

                  {/* PI Info */}
                  <div className="text-sm">
                    <span className="text-muted-foreground">PI: </span>
                    <span className="font-medium text-foreground">
                      {site.principalInvestigator}
                    </span>
                  </div>

                  {/* Capacity */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        Enrollment Capacity
                      </span>
                      <span className="font-medium text-foreground">
                        {site.enrolled}/{site.capacity}
                      </span>
                    </div>
                    <Progress value={capacityPercent} className="h-2" />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {site.trials.length} active trial{site.trials.length !== 1 ? "s" : ""}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {site.lastSync}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sites found matching your search.</p>
          </div>
        )}
      </div>

      <AddSiteModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddSite}
        availableTrials={availableTrials}
      />
    </AppLayout>
  );
};

export default Sites;
