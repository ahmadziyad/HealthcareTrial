import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  FlaskConical,
  Building2,
  Bot,
  Users,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Trials", href: "/trials", icon: FlaskConical },
  { name: "Sites", href: "/sites", icon: Building2 },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
];

const secondaryNav = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-glow shrink-0">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                ClinicalCoord
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">A2A & MCP Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-primary/10 text-primary hover:bg-primary/15"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="animate-fade-in">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* A2A & MCP Status */}
        {!collapsed && (
          <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                  <Zap className="h-3 w-3" />
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  <Bot className="h-3 w-3" />
                </div>
              </div>
              <span className="text-xs font-medium text-foreground">Agent Network</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-xs text-muted-foreground">4 agents online</span>
            </div>
          </div>
        )}
      </nav>

      {/* Secondary Navigation */}
      <div className="p-3 border-t border-border space-y-1">
        {secondaryNav.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "text-muted-foreground hover:text-foreground hover:bg-muted",
              collapsed && "justify-center px-2"
            )}
            activeClassName="bg-primary/10 text-primary hover:bg-primary/15"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="animate-fade-in">{item.name}</span>}
          </NavLink>
        ))}

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full mt-2 text-muted-foreground hover:text-foreground",
            collapsed && "px-2"
          )}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
