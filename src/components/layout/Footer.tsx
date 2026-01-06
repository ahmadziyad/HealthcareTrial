import { Mail, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/95 backdrop-blur-sm mt-8">
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col gap-4">
          {/* Main Content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">
                ClinicalCoord - A2A & MCP Clinical Trial Platform
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Feel free to contact me for a full demo and backend overview.
              </p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 flex-1 sm:flex-none text-xs"
                onClick={() => window.open('https://www.linkedin.com/in/ahmadziyad/', '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 flex-1 sm:flex-none text-xs"
                onClick={() => window.open('mailto:ah.ziyad@gmail.com', '_blank')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
          
          {/* Mobile-specific additional spacing */}
          <div className="block sm:hidden h-2"></div>
        </div>
      </div>
    </footer>
  );
}