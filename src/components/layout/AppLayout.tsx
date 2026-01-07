import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AppLayout({ children, title, description }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isMobile) {
    // Mobile layout - completely different approach
    return (
      <div className="min-h-screen bg-background">
        <Sidebar 
          isMobile={isMobile} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Mobile Layout - No header, just floating menu button */}
        <div className="min-h-screen flex flex-col">
          {/* Floating Menu Button */}
          <div className="fixed top-4 left-4 z-40">
            <button
              onClick={() => setSidebarOpen(true)}
              className="h-10 w-10 rounded-lg bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Page Title - Inline with content */}
          <div className="px-4 pt-16 pb-4">
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          </div>
          
          {/* Main Content */}
          <main className="flex-1 px-4 pb-4">
            <div className="w-full">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <div className="shrink-0 mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout - unchanged
  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="min-h-screen flex flex-col transition-all duration-300 ml-64">
        {/* TopBar - Desktop only */}
        <div className="sticky top-0 z-20 shrink-0">
          <TopBar 
            title={title} 
            description={description}
            isMobile={isMobile}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="w-full">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <div className="shrink-0 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
