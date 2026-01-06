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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Sites", href: "/sites", icon: Building2 },
  { name: "Trials", href: "/trials", icon: FlaskConical },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
];

const secondaryNav = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isMobile = false, isOpen = false, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // On mobile, sidebar is either fully open or closed
  const sidebarWidth = isMobile ? (isOpen ? "w-64" : "w-0") : (collapsed ? "w-16" : "w-64");
  const sidebarTransform = isMobile && !isOpen ? "-translate-x-full" : "translate-x-0";

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 flex flex-col",
        sidebarWidth,
        sidebarTransform,
        isMobile && "shadow-xl"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className={cn("flex items-center gap-3", collapsed && !isMobile && "justify-center w-full")}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-glow shrink-0">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          {(!collapsed || isMobile) && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                ClinicalCoord
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">A2A & MCP Platform</p>
            </div>
          )}
        </div>
        
        {/* Mobile close button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={isMobile ? onClose : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                collapsed && !isMobile && "justify-center px-2"
              )}
              activeClassName="bg-primary/10 text-primary hover:bg-primary/15"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!collapsed || isMobile) && <span className="animate-fade-in">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* A2A & MCP Status */}
        {(!collapsed || isMobile) && (
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
            onClick={isMobile ? onClose : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "text-muted-foreground hover:text-foreground hover:bg-muted",
              collapsed && !isMobile && "justify-center px-2"
            )}
            activeClassName="bg-primary/10 text-primary hover:bg-primary/15"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {(!collapsed || isMobile) && <span className="animate-fade-in">{item.name}</span>}
          </NavLink>
        ))}

        {/* Collapse Toggle - Hide on mobile */}
        {!isMobile && (
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
        )}
      </div>
    </aside>
  );
}
