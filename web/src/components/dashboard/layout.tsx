import { Outlet } from "react-router-dom";

import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full h-screen">
                <Navbar />

                <main className="w-full p-4">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}
