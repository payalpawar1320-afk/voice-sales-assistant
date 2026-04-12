import { useState, useCallback } from "react";
import type { Lead, Interaction, Payment, User } from "./types";

const DEMO_LEADS: Lead[] = [
  { id: "1", name: "Maria Santos", phone: "+63 912 345 6789", dealValue: 25000, status: "New", createdAt: new Date().toISOString() },
  { id: "2", name: "Ahmad Rahman", phone: "+60 11 2345 6789", dealValue: 48000, status: "Contacted", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "3", name: "Nguyen Thi", phone: "+84 90 123 4567", dealValue: 120000, status: "Negotiation", createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const DEMO_INTERACTIONS: Interaction[] = [
  { id: "1", leadId: "1", type: "call", content: "Initial discovery call, interested in premium plan", timestamp: new Date().toISOString() },
  { id: "2", leadId: "2", type: "message", content: "Sent pricing proposal via WhatsApp", timestamp: new Date(Date.now() - 3600000).toISOString(), followUpDate: new Date(Date.now() + 86400000).toISOString() },
];

const DEMO_PAYMENTS: Payment[] = [
  { id: "1", leadId: "3", amount: 60000, status: "Paid", dueDate: new Date().toISOString() },
  { id: "2", leadId: "2", amount: 48000, status: "Pending", dueDate: new Date(Date.now() + 604800000).toISOString() },
];

export function useStore() {
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [interactions, setInteractions] = useState<Interaction[]>(DEMO_INTERACTIONS);
  const [payments, setPayments] = useState<Payment[]>(DEMO_PAYMENTS);
  const [user, setUser] = useState<User | null>(null);

  const addLead = useCallback((lead: Omit<Lead, "id" | "createdAt">) => {
    setLeads(prev => [...prev, { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
  }, []);

  const updateLeadStatus = useCallback((id: string, status: Lead["status"]) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }, []);

  const addInteraction = useCallback((interaction: Omit<Interaction, "id" | "timestamp">) => {
    setInteractions(prev => [...prev, { ...interaction, id: crypto.randomUUID(), timestamp: new Date().toISOString() }]);
  }, []);

  const addPayment = useCallback((payment: Omit<Payment, "id">) => {
    setPayments(prev => [...prev, { ...payment, id: crypto.randomUUID() }]);
  }, []);

  return { leads, interactions, payments, user, setUser, addLead, updateLeadStatus, addInteraction, addPayment };
}
