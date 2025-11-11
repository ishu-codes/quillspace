import { Outlet } from "react-router-dom";

import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <Navbar />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
