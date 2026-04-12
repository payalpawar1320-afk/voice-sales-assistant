import { Users, MessageSquare, CreditCard, TrendingUp } from "lucide-react";
import type { Lead, Interaction, Payment } from "@/lib/types";
import { VoiceInput } from "./VoiceInput";

interface Props {
  leads: Lead[];
  interactions: Interaction[];
  payments: Payment[];
  onVoiceSubmit: (content: string) => void;
}

export function DashboardOverview({ leads, interactions, payments, onVoiceSubmit }: Props) {
  const totalDealValue = leads.reduce((sum, l) => sum + l.dealValue, 0);
  const paidAmount = payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: "Total Leads", value: leads.length, icon: Users, color: "text-primary" },
    { label: "Interactions", value: interactions.length, icon: MessageSquare, color: "text-accent-foreground" },
    { label: "Pipeline Value", value: `₱${totalDealValue.toLocaleString()}`, icon: TrendingUp, color: "text-success" },
    { label: "Collected", value: `₱${paidAmount.toLocaleString()}`, icon: CreditCard, color: "text-warning" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Your sales overview at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <VoiceInput onSubmit={onVoiceSubmit} />

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {interactions.slice(0, 5).map((i) => (
            <div key={i.id} className="flex items-start gap-3 text-sm">
              <div className="mt-1 h-2 w-2 rounded-full gradient-primary flex-shrink-0" />
              <div>
                <p>{i.content}</p>
                <p className="text-xs text-muted-foreground">{new Date(i.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
