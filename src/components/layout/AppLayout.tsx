import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AppLayout({ children, title, description }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <TopBar title={title} description={description} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
