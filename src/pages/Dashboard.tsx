import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { LeadsModule } from "@/components/dashboard/LeadsModule";
import { InteractionsModule } from "@/components/dashboard/InteractionsModule";
import { PaymentsModule } from "@/components/dashboard/PaymentsModule";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const { session, loading, signOut } = useAuth();
  const store = useStore();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }
  if (!session) return <Navigate to="/auth" replace />;

  const handleVoiceSubmit = (content: string) => {
    if (!store.leads[0]) return;
    store.addInteraction({ leadId: store.leads[0].id, type: "note", content });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border px-4">
            <SidebarTrigger />
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
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
