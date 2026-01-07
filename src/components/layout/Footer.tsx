import { Mail, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Mail, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function Footer() {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Ultra-compact mobile footer
    return (
      <footer className="border-t border-border bg-card">
        <div className="px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            ClinicalCoord - Contact for demo
          </p>
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => window.open('https://www.linkedin.com/in/ahmadziyad/', '_blank')}
            >
              <Linkedin className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => window.open('mailto:ah.ziyad@gmail.com', '_blank')}
            >
              <Mail className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </footer>
    );
  }

  // Desktop footer
  return (
    <footer className="border-t border-border bg-card backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">
                ClinicalCoord - A2A & MCP Clinical Trial Platform
              </p>
              <p className="text-xs text-muted-foreground">
                Feel free to contact me for a full demo and backend overview.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={() => window.open('https://www.linkedin.com/in/ahmadziyad/', '_blank')}
              >
                <Linkedin className="h-3 w-3 mr-1" />
                LinkedIn
                <ExternalLink className="h-2 w-2 ml-1" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
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