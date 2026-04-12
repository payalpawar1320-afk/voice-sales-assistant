import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Payment, PaymentStatus, Lead } from "@/lib/types";

interface Props {
  payments: Payment[];
  leads: Lead[];
  onAdd: (payment: Omit<Payment, "id">) => void;
}

export function PaymentsModule({ payments, leads, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ leadId: "", amount: "", status: "Pending" as PaymentStatus, dueDate: "", paymentLink: "" });

  const handleAdd = () => {
    if (!form.leadId || !form.amount) return;
    onAdd({ leadId: form.leadId, amount: Number(form.amount), status: form.status, dueDate: form.dueDate || new Date().toISOString(), paymentLink: form.paymentLink || undefined });
    setForm({ leadId: "", amount: "", status: "Pending", dueDate: "", paymentLink: "" });
    setOpen(false);
  };

  const getLeadName = (id: string) => leads.find(l => l.id === id)?.name ?? "Unknown";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground text-sm">{payments.length} payment records</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary border-0"><Plus className="mr-2 h-4 w-4" />Add Payment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Payment</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Lead</Label>
                <Select value={form.leadId} onValueChange={v => setForm(f => ({ ...f, leadId: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select lead" /></SelectTrigger>
                  <SelectContent>
                    {leads.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Amount (₱)</Label><Input className="mt-1.5" type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0" /></div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as PaymentStatus }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Due Date</Label><Input className="mt-1.5" type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
              <div><Label>Payment Link (optional)</Label><Input className="mt-1.5" value={form.paymentLink} onChange={e => setForm(f => ({ ...f, paymentLink: e.target.value }))} placeholder="https://pay.example.com/..." /></div>
              <Button className="w-full gradient-primary border-0" onClick={handleAdd}>Add Payment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {payments.map(p => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">{getLeadName(p.leadId)}</h3>
              <p className="text-sm font-medium mt-1">₱{p.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Due: {new Date(p.dueDate).toLocaleDateString()}</p>
            </div>
            <Badge className={p.status === "Paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}>
              {p.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
