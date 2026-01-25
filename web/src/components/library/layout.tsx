import Footer from "@/components/common/Footer";
import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function LibraryLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
