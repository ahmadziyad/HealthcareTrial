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

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`min-h-screen flex flex-col transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        {/* TopBar - Non-sticky on mobile to prevent overlap */}
        <div className={isMobile ? 'relative z-20 shrink-0' : 'sticky top-0 z-20 shrink-0'}>
          <TopBar 
            title={title} 
            description={description}
            isMobile={isMobile}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>
        
        {/* Main Content - Flex grow to fill space */}
        <main className={`flex-1 overflow-y-auto ${isMobile ? 'px-3 py-3' : 'px-6 py-6'}`}>
          <div className="w-full">
            {children}
          </div>
        </main>
        
        {/* Footer - At bottom */}
        <div className="shrink-0 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
