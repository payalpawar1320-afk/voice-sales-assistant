import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center rounded-2xl gradient-primary p-12 md:p-16 shadow-glow">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to close deals with your voice?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Join thousands of field sales agents in Southeast Asia who are already using VoxaFlow.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 h-12 font-semibold" asChild>
            <Link to="/auth?mode=signup">
              <Mic className="mr-2 h-5 w-5" />
              Start Free Today
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
