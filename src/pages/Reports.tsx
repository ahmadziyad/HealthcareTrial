import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from "lucide-react";

const reports = [
  {
    id: 1,
    name: "Monthly Enrollment Summary",
    type: "Enrollment",
    lastGenerated: "Dec 10, 2024",
    icon: BarChart3,
  },
  {
    id: 2,
    name: "Site Performance Report",
    type: "Operations",
    lastGenerated: "Dec 8, 2024",
    icon: TrendingUp,
  },
  {
    id: 3,
    name: "Data Quality Metrics",
    type: "Quality",
    lastGenerated: "Dec 12, 2024",
    icon: PieChart,
  },
  {
    id: 4,
    name: "Adverse Events Summary",
    type: "Safety",
    lastGenerated: "Dec 11, 2024",
    icon: FileText,
  },
  {
    id: 5,
    name: "Protocol Deviation Log",
    type: "Compliance",
    lastGenerated: "Dec 9, 2024",
    icon: FileText,
  },
  {
    id: 6,
    name: "Agent Activity Report",
    type: "Integration",
    lastGenerated: "Dec 13, 2024",
    icon: BarChart3,
  },
];

const Reports = () => {
  return (
    <AppLayout
      title="Reports"
      description="Generate and download clinical trial reports and analytics."
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium">Enrollment Report</p>
              <p className="text-sm text-muted-foreground">Generate enrollment analytics</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium">Performance Report</p>
              <p className="text-sm text-muted-foreground">Site and trial performance</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium">Quality Report</p>
              <p className="text-sm text-muted-foreground">Data quality metrics</p>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium">Custom Report</p>
              <p className="text-sm text-muted-foreground">Build custom reports</p>
            </div>
          </Button>
        </div>

        {/* Recent Reports */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, index) => (
              <div
                key={report.id}
                className="group rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <report.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">{report.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Last generated: {report.lastGenerated}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
