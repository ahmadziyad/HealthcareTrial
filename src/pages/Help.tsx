import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Book,
  MessageCircle,
  Video,
  FileText,
  ExternalLink,
  Search,
  Mail,
} from "lucide-react";

const helpResources = [
  {
    title: "Documentation",
    description: "Comprehensive guides for using ClinicalCoord",
    icon: Book,
    action: "View Docs",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    icon: Video,
    action: "Watch Videos",
  },
  {
    title: "API Reference",
    description: "Technical documentation for integrations",
    icon: FileText,
    action: "View API Docs",
  },
  {
    title: "Contact Support",
    description: "Get help from our support team",
    icon: Mail,
    action: "Contact Us",
  },
];

const faqs = [
  {
    question: "How do I add a new trial site?",
    answer: "Navigate to the Sites page and click 'Add Site'. Fill in the required information including location, principal investigator, and trial assignments.",
  },
  {
    question: "What is the difference between A2A and MCP agents?",
    answer: "A2A (Agent-to-Agent) agents handle direct communication between systems, while MCP (Model Context Protocol) agents provide contextual AI assistance for clinical decisions.",
  },
  {
    question: "How often does data sync occur?",
    answer: "By default, data syncs every 5 minutes. You can adjust this in Settings > Integrations or trigger manual syncs from any page.",
  },
  {
    question: "How do I generate custom reports?",
    answer: "Go to the Reports page and click 'Custom Report'. Select your data sources, date range, and metrics to generate tailored analytics.",
  },
];

const Help = () => {
  return (
    <AppLayout title="Help Center" description="Find answers and get support for ClinicalCoord.">
      <div className="space-y-8 pb-8">
        {/* Search */}
        <div className="max-w-xl mx-auto animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpResources.map((resource, index) => (
            <div
              key={resource.title}
              className="group rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <resource.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
              <Button variant="link" className="p-0 h-auto text-primary">
                {resource.action}
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div
          className="rounded-lg border border-border bg-card p-6 shadow-sm animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Need more help?</h3>
              <p className="text-sm text-muted-foreground">
                Our support team is available 24/7 to assist you with any questions.
              </p>
            </div>
            <Button className="gradient-primary text-primary-foreground">
              Start Chat
            </Button>
          </div>
        </div>

        {/* Extra spacing to ensure footer doesn't overlap */}
        <div className="h-8"></div>
      </div>
    </AppLayout>
  );
};

export default Help;
