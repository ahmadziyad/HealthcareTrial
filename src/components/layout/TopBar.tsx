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
    <header className="w-full border-b border-border bg-card backdrop-blur-md shadow-sm">
      <div className={`flex items-center justify-between gap-2 ${isMobile ? 'h-10 px-3' : 'h-16 px-6'}`}>
        {/* Left Section */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="shrink-0 h-7 w-7"
            >
              <Menu className="h-3.5 w-3.5" />
            </Button>
          )}
          
          {/* Page Title */}
          <div className="min-w-0 flex-1">
            <h1 className={`font-bold text-foreground truncate ${isMobile ? 'text-xs' : 'text-xl'}`}>
              {title}
            </h1>
            {/* Hide description completely on mobile */}
            {description && !isMobile && (
              <p className="text-sm text-muted-foreground truncate">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1">
          {/* Mobile Search Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="shrink-0 h-8 w-8"
            >
              <Search className="h-3 w-3" />
            </Button>
          )}

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

          {/* Hide status badge on mobile to save space */}
          <StatusBadge variant="success" pulse className="hidden md:flex text-xs">
            Online
          </StatusBadge>

          <Button variant="ghost" size="icon" className={`relative shrink-0 ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`}>
            <Bell className="h-3 w-3" />
            <span className={`absolute -top-0.5 -right-0.5 rounded-full bg-accent text-[8px] font-bold text-accent-foreground flex items-center justify-center ${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`}>
              3
            </span>
          </Button>

          <Button variant="ghost" size="icon" className={`rounded-full shrink-0 ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`}>
            <div className={`rounded-full gradient-primary flex items-center justify-center ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}>
              <User className="h-3 w-3 text-primary-foreground" />
            </div>
          </Button>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {isMobile && showMobileSearch && (
        <div className="px-4 pb-2 border-b border-border bg-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-secondary/50 border-transparent focus:border-primary focus:bg-card h-8 text-sm"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
