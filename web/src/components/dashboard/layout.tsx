import { Outlet } from "react-router-dom";

import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider className="bg-background!">
      <AppSidebar />
      <div className="w-full min-h-screen">
        <Navbar sidebarTrigger={true} />

        <main className="w-full p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
