import { Mic, Users, CreditCard, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice-to-CRM Logging",
    description: "Speak your updates, and VoxaFlow turns them into structured lead entries. No typing, no forms.",
  },
  {
    icon: Users,
    title: "Lead Management",
    description: "Track every deal from New to Closed. View your pipeline at a glance with status-based tracking.",
  },
  {
    icon: MessageSquare,
    title: "Interaction Tracking",
    description: "Log calls, messages, and notes with timestamps. Set follow-up dates so you never miss a deal.",
  },
  {
    icon: CreditCard,
    title: "Payment Tracking",
    description: "Track payments per deal with status updates. Share payment links directly via WhatsApp.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-2">FEATURES</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to close deals faster</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Purpose-built for mobile sales teams who sell over WhatsApp and phone calls.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-4 inline-flex rounded-lg bg-accent p-3 text-accent-foreground group-hover:gradient-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
