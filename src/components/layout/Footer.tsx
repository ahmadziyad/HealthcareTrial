import { Mail, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card backdrop-blur-sm">
      <div className="px-3 md:px-6 py-2 md:py-4">
        <div className="flex flex-col gap-2">
          {/* Main Content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="text-left">
              <p className="text-xs md:text-sm font-medium text-foreground">
                ClinicalCoord - A2A & MCP Clinical Trial Platform
              </p>
              <p className="text-xs text-muted-foreground">
                Feel free to contact me for a full demo and backend overview.
              </p>
            </div>
            
            <div className="flex items-center gap-1 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 flex-1 sm:flex-none text-xs"
                onClick={() => window.open('https://www.linkedin.com/in/ahmadziyad/', '_blank')}
              >
                <Linkedin className="h-3 w-3 mr-1" />
                LinkedIn
                <ExternalLink className="h-2 w-2 ml-1" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 flex-1 sm:flex-none text-xs"
                onClick={() => window.open('mailto:ah.ziyad@gmail.com', '_blank')}
              >
                <Mail className="h-3 w-3 mr-1" />
                Email
                <ExternalLink className="h-2 w-2 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}