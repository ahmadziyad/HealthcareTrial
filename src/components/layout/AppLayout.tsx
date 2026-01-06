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
    <div className="min-h-screen bg-background flex flex-col">
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
      
      <div className={`transition-all duration-300 flex flex-col flex-1 ${isMobile ? 'pl-0' : 'pl-64'}`}>
        <TopBar 
          title={title} 
          description={description}
          isMobile={isMobile}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className={`flex-1 p-4 ${isMobile ? 'px-4' : 'p-6'}`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
