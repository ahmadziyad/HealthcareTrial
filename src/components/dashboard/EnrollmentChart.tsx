import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { month: "Jan", enrolled: 45, target: 50 },
  { month: "Feb", enrolled: 92, target: 100 },
  { month: "Mar", enrolled: 156, target: 150 },
  { month: "Apr", enrolled: 210, target: 200 },
  { month: "May", enrolled: 278, target: 250 },
  { month: "Jun", enrolled: 342, target: 300 },
  { month: "Jul", enrolled: 398, target: 350 },
  { month: "Aug", enrolled: 456, target: 400 },
];

interface EnrollmentChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EnrollmentChart({ className }: EnrollmentChartProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Enrollment Trend</h3>
            <p className="text-sm text-muted-foreground">
              Cumulative patient enrollment vs target
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Target</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="enrolledGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174, 62%, 32%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(174, 62%, 32%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-md)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="enrolled"
                stroke="hsl(174, 62%, 32%)"
                strokeWidth={2}
                fill="url(#enrolledGradient)"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(32, 95%, 55%)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
