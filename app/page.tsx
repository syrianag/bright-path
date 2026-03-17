import { GraduationCap } from "lucide-react";
import SystemHealthDashboard from "../src/components/SystemHealthDashboard";
import TroubleshootTool from "../src/components/TroubleshootTool"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">BrightPath</h1>
            <p className="text-sm text-muted-foreground">System Support Center</p>
          </div>
        </div>
      </header>
      {/* Main */}
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <SystemHealthDashboard />
        <TroubleshootTool />
      </main>
    </div>
  );
}
