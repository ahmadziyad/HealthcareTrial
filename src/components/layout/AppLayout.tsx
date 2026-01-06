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
      
      <div className={`min-h-screen transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        {/* Fixed TopBar */}
        <TopBar 
          title={title} 
          description={description}
          isMobile={isMobile}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        {/* Main Content with proper spacing to prevent footer overlap */}
        <main className={`${isMobile ? 'px-4 pt-6' : 'px-6 pt-8'} pb-32 min-h-[calc(100vh-12rem)]`}>
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
