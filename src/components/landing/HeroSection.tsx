import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, ArrowRight, MessageCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(239_84%_67%_/_0.08),transparent_50%)]" />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-6 animate-fade-in">
            <MessageCircle className="h-4 w-4 text-primary" />
            Built for WhatsApp-first sales teams
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your CRM that works on{" "}
            <span className="bg-clip-text text-transparent gradient-primary">voice, not forms</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Close deals from anywhere — log interactions, track leads, and collect payments with just your voice. No apps, no laptops. Built for field sales in Southeast Asia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="gradient-primary border-0 text-lg px-8 h-12 shadow-glow" asChild>
              <Link to="/auth?mode=signup">
                <Mic className="mr-2 h-5 w-5" />
                Start Free
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 h-12" asChild>
              <a href="#how-it-works">
                See How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
