import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/ui/metric-card";
import { TrialCard } from "@/components/dashboard/TrialCard";
import { SiteCoordinationPanel } from "@/components/dashboard/SiteCoordinationPanel";
import { AgentStatusPanel } from "@/components/dashboard/AgentStatusPanel";
import { EnrollmentChart } from "@/components/dashboard/EnrollmentChart";
import { trials } from "@/data/mockData";
import {
  FlaskConical,
  Users,
  Building2,
  TrendingUp,
  Bot,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout
      title="Trial Dashboard"
      description="Monitor clinical trials, site coordination, and agent integrations in real-time."
    >
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Trials"
            value={12}
            change="+2 this quarter"
            changeType="positive"
            icon={FlaskConical}
            className="animate-fade-in"
          />
          <MetricCard
            title="Total Enrolled"
            value="1,284"
            change="+156 this month"
            changeType="positive"
            icon={Users}
            className="animate-fade-in"
            style={{ animationDelay: "50ms" }}
          />
          <MetricCard
            title="Active Sites"
            value={65}
            change="98% uptime"
            changeType="neutral"
            icon={Building2}
            className="animate-fade-in"
            style={{ animationDelay: "100ms" }}
          />
          <MetricCard
            title="Data Quality"
            value="99.2%"
            change="+0.3% improvement"
            changeType="positive"
            icon={TrendingUp}
            className="animate-fade-in"
            style={{ animationDelay: "150ms" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Trials & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trials Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Active Trials
                </h3>
                <a
                  href="/trials"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View All →
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {trials.slice(0, 4).map((trial, index) => (
                  <TrialCard
                    key={trial.id}
                    {...trial}
                    className="animate-fade-in"
                    style={{ animationDelay: `${200 + index * 50}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Enrollment Chart */}
            <EnrollmentChart className="animate-fade-in" style={{ animationDelay: "400ms" }} />
          </div>

          {/* Right Column - Panels */}
          <div className="space-y-6">
            {/* Agent Status */}
            <AgentStatusPanel className="animate-fade-in" style={{ animationDelay: "300ms" }} />

            {/* Site Coordination */}
            <SiteCoordinationPanel className="animate-fade-in" style={{ animationDelay: "350ms" }} />
          </div>
        </div>

        {/* Integration Footer */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-accent text-accent-foreground">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  A2A & MCP Integration Active
                </h4>
                <p className="text-sm text-muted-foreground">
                  4 agents connected • Last sync 2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
                <span className="text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
