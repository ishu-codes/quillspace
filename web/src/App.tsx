import { Route, Routes } from "react-router-dom";

import Index from "@/components";
// import Layout from "@/components/layout";
import { AuthLayout, Logout, Register, SignIn } from "@/components/auth";
import { Home, Library, Profile, Settings } from "@/components/dashboard";
import DashboardLayout from "@/components/dashboard/layout";
import NotFound from "@/components/NotFound";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />

            {/* Auth routes */}
            <Route path="/auth/" element={<AuthLayout title="Auth" subtitle="subtitle" />}>
                <Route path="sign-in" element={<SignIn />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<DashboardLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="library" element={<Library />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="logout" element={<Logout />} />
            </Route>

            {/* Not-found route */}
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}
