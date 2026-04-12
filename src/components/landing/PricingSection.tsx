import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₱0",
    period: "/month",
    description: "For solo reps getting started",
    features: ["Up to 25 leads", "Voice input logging", "Basic interaction tracking", "Mobile-first dashboard"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "₱999",
    period: "/month",
    description: "For growing sales teams",
    features: ["Unlimited leads", "Payment tracking", "Follow-up reminders", "Team collaboration", "Priority support"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SSO & compliance", "API access"],
    cta: "Contact Sales",
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-2">PRICING</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple pricing, no surprises</h2>
          <p className="text-muted-foreground">Start free, upgrade when you're ready.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 flex flex-col ${
                plan.featured
                  ? "border-primary shadow-glow bg-card relative"
                  : "border-border bg-card shadow-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary rounded-full px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="font-semibold text-lg">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={plan.featured ? "gradient-primary border-0" : ""}
                variant={plan.featured ? "default" : "outline"}
                asChild
              >
                <Link to="/auth?mode=signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
