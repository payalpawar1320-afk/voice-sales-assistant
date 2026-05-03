import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth";
import type { Lead, Interaction, Payment, LeadStatus } from "./types";
import { toast } from "sonner";

// Row mappers (DB snake_case <-> UI camelCase)
const mapLead = (r: any): Lead => ({
  id: r.id, name: r.name, phone: r.phone,
  dealValue: Number(r.deal_value), status: r.status, createdAt: r.created_at,
});
const mapInteraction = (r: any): Interaction => ({
  id: r.id, leadId: r.lead_id, type: r.type, content: r.content,
  timestamp: r.created_at, followUpDate: r.follow_up_date ?? undefined,
});
const mapPayment = (r: any): Payment => ({
  id: r.id, leadId: r.lead_id, amount: Number(r.amount), status: r.status,
  dueDate: r.due_date, paymentLink: r.payment_link ?? undefined,
});

export function useStore() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) return;
    const [l, i, p] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("interactions").select("*").order("created_at", { ascending: false }),
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
    ]);
    if (l.data) setLeads(l.data.map(mapLead));
    if (i.data) setInteractions(i.data.map(mapInteraction));
    if (p.data) setPayments(p.data.map(mapPayment));
    setLoading(false);
  }, [user]);

  useEffect(() => { if (user) refresh(); }, [user, refresh]);

  const addLead = useCallback(async (lead: Omit<Lead, "id" | "createdAt">) => {
    if (!user) return;
    const { data, error } = await supabase.from("leads").insert({
      user_id: user.id, name: lead.name, phone: lead.phone,
      deal_value: lead.dealValue, status: lead.status,
    }).select().single();
    if (error) return toast.error(error.message);
    setLeads(prev => [mapLead(data), ...prev]);
    toast.success("Lead added");
  }, [user]);

  const updateLeadStatus = useCallback(async (id: string, status: LeadStatus) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }, []);

  const addInteraction = useCallback(async (it: Omit<Interaction, "id" | "timestamp">) => {
    if (!user || !it.leadId) return;
    const { data, error } = await supabase.from("interactions").insert({
      user_id: user.id, lead_id: it.leadId, type: it.type, content: it.content,
      follow_up_date: it.followUpDate || null,
    }).select().single();
    if (error) return toast.error(error.message);
    setInteractions(prev => [mapInteraction(data), ...prev]);
    toast.success("Interaction logged");
  }, [user]);

  const addPayment = useCallback(async (pay: Omit<Payment, "id">) => {
    if (!user) return;
    const { data, error } = await supabase.from("payments").insert({
      user_id: user.id, lead_id: pay.leadId, amount: pay.amount, status: pay.status,
      due_date: pay.dueDate.slice(0, 10), payment_link: pay.paymentLink || null,
    }).select().single();
    if (error) return toast.error(error.message);
    setPayments(prev => [mapPayment(data), ...prev]);
    toast.success("Payment added");
  }, [user]);

  return { leads, interactions, payments, loading, addLead, updateLeadStatus, addInteraction, addPayment, refresh };
}
