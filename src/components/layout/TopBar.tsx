import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { useState } from "react";

interface TopBarProps {
  title: string;
  description?: string;
  isMobile?: boolean;
  onMenuClick?: () => void;
}

export function TopBar({ title, description, isMobile = false, onMenuClick }: TopBarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-card/95 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="shrink-0 h-10 w-10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          {/* Page Title */}
          <div className="min-w-0 flex-1">
            <h1 className={`font-bold text-foreground truncate ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {title}
            </h1>
            {description && (
              <p className={`text-muted-foreground truncate ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop Search */}
          {!isMobile && (
            <div className="hidden lg:block w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 bg-secondary/50 border-transparent focus:border-primary focus:bg-card"
                />
              </div>
            </div>
          )}

          {/* Mobile Search Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="shrink-0 h-10 w-10"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <StatusBadge variant="success" pulse className="hidden sm:flex text-xs">
            Online
          </StatusBadge>

          <Button variant="ghost" size="icon" className="relative shrink-0 h-10 w-10">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
              3
            </span>
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full shrink-0 h-10 w-10">
            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </Button>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {isMobile && showMobileSearch && (
        <div className="px-4 pb-4 border-b border-border bg-card/95">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-secondary/50 border-transparent focus:border-primary focus:bg-card"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
