import { AppLayout } from "@/components/layout/AppLayout";
import { TrialCard } from "@/components/dashboard/TrialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddTrialModal } from "@/components/forms/AddTrialModal";
import { trials, Trial } from "@/data/mockData";
import { Search, Plus, Filter, Grid3X3, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Trials = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [trialsList, setTrialsList] = useState<Trial[]>(trials);

  const filteredTrials = trialsList.filter(
    (trial) =>
      trial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTrial = (newTrialData: Omit<Trial, "id">) => {
    const newTrial: Trial = {
      ...newTrialData,
      id: `TRIAL-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
    };
    
    setTrialsList([newTrial, ...trialsList]);
  };

  return (
    <AppLayout
      title="Trials"
      description="Manage and monitor all clinical trials across your organization."
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trials..."
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
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              size="sm" 
              className="gradient-primary text-primary-foreground flex-1 sm:flex-none"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden xs:inline">New Trial</span>
              <span className="xs:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Trials Grid/List */}
        <div
          className={cn(
            "gap-4",
            viewMode === "grid"
              ? "grid sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col"
          )}
        >
          {filteredTrials.map((trial, index) => (
            <TrialCard
              key={trial.id}
              {...trial}
              className={cn(
                "animate-fade-in",
                viewMode === "list" && "sm:flex-row"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>

        {filteredTrials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No trials found matching your search.</p>
          </div>
        )}
      </div>

      <AddTrialModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddTrial}
      />
    </AppLayout>
  );
};

export default Trials;
