import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";

interface TopBarProps {
  title: string;
  description?: string;
}

export function TopBar({ title, description }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        {/* Page Title */}
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-foreground truncate">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground truncate">{description}</p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden lg:block w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-secondary/50 border-transparent focus:border-primary focus:bg-card"
              />
            </div>
          </div>

          <StatusBadge variant="success" pulse className="hidden sm:flex">
            System Online
          </StatusBadge>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
              3
            </span>
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
