const steps = [
  { step: "01", title: "Speak or Type", description: "Record a voice note or type your update after a call or meeting." },
  { step: "02", title: "Auto-Log", description: "VoxaFlow creates structured entries — lead info, interaction notes, follow-ups." },
  { step: "03", title: "Track & Close", description: "View your pipeline, set reminders, track payments, and close deals faster." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-2">HOW IT WORKS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Three steps to close more deals</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-primary-foreground font-bold text-lg">
                {s.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
