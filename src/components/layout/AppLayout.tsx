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
        {/* Fixed TopBar */}
        <div className="sticky top-0 z-20">
          <TopBar 
            title={title} 
            description={description}
            isMobile={isMobile}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>
        
        {/* Main Content with proper spacing */}
        <main className={`flex-1 ${isMobile ? 'px-4 py-6' : 'px-6 py-8'} pb-24`}>
          {children}
        </main>
        
        {/* Fixed Footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
