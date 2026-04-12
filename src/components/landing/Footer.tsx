import { Mic } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-muted/30">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="gradient-primary rounded-lg p-1.5">
            <Mic className="h-4 w-4 text-primary-foreground" />
          </div>
          VoxaFlow
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 VoxaFlow. Built for field sales teams in Southeast Asia.
        </p>
      </div>
    </footer>
  );
}
