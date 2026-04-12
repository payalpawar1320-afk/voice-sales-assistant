import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Lead, LeadStatus } from "@/lib/types";

const statusColors: Record<LeadStatus, string> = {
  New: "bg-accent text-accent-foreground",
  Contacted: "bg-primary/10 text-primary",
  Negotiation: "bg-warning/10 text-warning",
  Closed: "bg-success/10 text-success",
};

interface Props {
  leads: Lead[];
  onAdd: (lead: Omit<Lead, "id" | "createdAt">) => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
}

export function LeadsModule({ leads, onAdd, onUpdateStatus }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", dealValue: "", status: "New" as LeadStatus });

  const handleAdd = () => {
    if (!form.name || !form.phone) return;
    onAdd({ name: form.name, phone: form.phone, dealValue: Number(form.dealValue) || 0, status: form.status });
    setForm({ name: "", phone: "", dealValue: "", status: "New" });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-muted-foreground text-sm">{leads.length} total leads</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary border-0"><Plus className="mr-2 h-4 w-4" />Add Lead</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Lead</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Name</Label><Input className="mt-1.5" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Lead name" /></div>
              <div><Label>Phone Number</Label><Input className="mt-1.5" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+63 912 345 6789" /></div>
              <div><Label>Deal Value (₱)</Label><Input className="mt-1.5" type="number" value={form.dealValue} onChange={e => setForm(f => ({ ...f, dealValue: e.target.value }))} placeholder="0" /></div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as LeadStatus }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["New", "Contacted", "Negotiation", "Closed"] as LeadStatus[]).map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full gradient-primary border-0" onClick={handleAdd}>Add Lead</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {leads.map(lead => (
          <div key={lead.id} className="rounded-xl border border-border bg-card p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">{lead.name}</h3>
              <p className="text-sm text-muted-foreground">{lead.phone}</p>
              <p className="text-sm font-medium mt-1">₱{lead.dealValue.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
              <Select value={lead.status} onValueChange={v => onUpdateStatus(lead.id, v as LeadStatus)}>
                <SelectTrigger className="w-[140px] h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["New", "Contacted", "Negotiation", "Closed"] as LeadStatus[]).map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
