import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { LeadsModule } from "@/components/dashboard/LeadsModule";
import { InteractionsModule } from "@/components/dashboard/InteractionsModule";
import { PaymentsModule } from "@/components/dashboard/PaymentsModule";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export default function Dashboard() {
  const store = useStore();

  const handleVoiceSubmit = (content: string) => {
    store.addInteraction({ leadId: store.leads[0]?.id ?? "", type: "note", content });
    toast.success("Interaction logged!");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl">
            <Routes>
              <Route index element={<DashboardOverview leads={store.leads} interactions={store.interactions} payments={store.payments} onVoiceSubmit={handleVoiceSubmit} />} />
              <Route path="leads" element={<LeadsModule leads={store.leads} onAdd={store.addLead} onUpdateStatus={store.updateLeadStatus} />} />
              <Route path="interactions" element={<InteractionsModule interactions={store.interactions} leads={store.leads} onAdd={store.addInteraction} />} />
              <Route path="payments" element={<PaymentsModule payments={store.payments} leads={store.leads} onAdd={store.addPayment} />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
