import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Database, Palette, Globe } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout title="Settings" description="Manage your account and application preferences.">
      <div className="max-w-3xl space-y-8">
        {/* Profile Section */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Profile</h3>
              <p className="text-sm text-muted-foreground">Manage your account information</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Dr. Jane Smith" defaultValue="Dr. Jane Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane@clinicalcoord.com" defaultValue="jane@clinicalcoord.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Clinical Trial Manager" defaultValue="Clinical Trial Manager" disabled />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notifications Section */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure notification preferences</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Enrollment Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when enrollment milestones are reached</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Site Issues</p>
                <p className="text-sm text-muted-foreground">Receive alerts for site connectivity issues</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Agent Status Changes</p>
                <p className="text-sm text-muted-foreground">Get notified when agents go offline</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Digest</p>
                <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <Separator />

        {/* Integration Section */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Integrations</h3>
              <p className="text-sm text-muted-foreground">Configure A2A and MCP connections</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">A2A Protocol</p>
                <p className="text-sm text-muted-foreground">Agent-to-Agent communication</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">MCP Integration</p>
                <p className="text-sm text-muted-foreground">Model Context Protocol support</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Auto-Sync</p>
                <p className="text-sm text-muted-foreground">Automatically sync data every 5 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        {/* Security Section */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">Manage security settings</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Enable Two-Factor Authentication</Button>
            <Button variant="outline">View Audit Log</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
