import { useState } from "react";
import { Plus, Phone, MessageCircle, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Interaction, InteractionType, Lead } from "@/lib/types";

const typeIcons: Record<InteractionType, typeof Phone> = { call: Phone, message: MessageCircle, note: StickyNote };

interface Props {
  interactions: Interaction[];
  leads: Lead[];
  onAdd: (interaction: Omit<Interaction, "id" | "timestamp">) => void;
}

export function InteractionsModule({ interactions, leads, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ leadId: "", type: "call" as InteractionType, content: "", followUpDate: "" });

  const handleAdd = () => {
    if (!form.leadId || !form.content) return;
    onAdd({ leadId: form.leadId, type: form.type, content: form.content, followUpDate: form.followUpDate || undefined });
    setForm({ leadId: "", type: "call", content: "", followUpDate: "" });
    setOpen(false);
  };

  const getLeadName = (id: string) => leads.find(l => l.id === id)?.name ?? "Unknown";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Interactions</h1>
          <p className="text-muted-foreground text-sm">{interactions.length} logged interactions</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary border-0"><Plus className="mr-2 h-4 w-4" />Log Interaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Log Interaction</DialogTitle></DialogHeader>
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
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as InteractionType }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="message">Message</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Content</Label>
                <Textarea className="mt-1.5" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="What happened?" />
              </div>
              <div>
                <Label>Follow-up Date (optional)</Label>
                <Input className="mt-1.5" type="date" value={form.followUpDate} onChange={e => setForm(f => ({ ...f, followUpDate: e.target.value }))} />
              </div>
              <Button className="w-full gradient-primary border-0" onClick={handleAdd}>Log Interaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {interactions.map(i => {
          const Icon = typeIcons[i.type];
          return (
            <div key={i.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-accent p-2 text-accent-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{getLeadName(i.leadId)}</h3>
                    <span className="text-xs text-muted-foreground">{new Date(i.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{i.content}</p>
                  {i.followUpDate && (
                    <p className="text-xs text-primary mt-2">Follow-up: {new Date(i.followUpDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
