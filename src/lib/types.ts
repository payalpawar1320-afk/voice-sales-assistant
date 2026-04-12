export type LeadStatus = "New" | "Contacted" | "Negotiation" | "Closed";
export type InteractionType = "call" | "message" | "note";
export type PaymentStatus = "Pending" | "Paid";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  dealValue: number;
  status: LeadStatus;
  createdAt: string;
}

export interface Interaction {
  id: string;
  leadId: string;
  type: InteractionType;
  content: string;
  timestamp: string;
  followUpDate?: string;
}

export interface Payment {
  id: string;
  leadId: string;
  amount: number;
  status: PaymentStatus;
  dueDate: string;
  paymentLink?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}
