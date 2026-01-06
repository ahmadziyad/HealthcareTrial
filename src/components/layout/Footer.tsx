import { Mail, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">ClinicalCoord</span> - A2A & MCP Clinical Trial Platform
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Feel free to contact me for a full demo and backend overview.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => window.open('https://www.linkedin.com/in/ahmadziyad/', '_blank')}
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => window.open('mailto:ah.ziyad@gmail.com', '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}