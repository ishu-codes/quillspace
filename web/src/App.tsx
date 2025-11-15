import { Navigate, Route, Routes } from "react-router-dom";

import Index from "@/components";
import { AuthLayout, Login, Logout, Register, ProtectedLayout } from "@/components/auth";
import { Home, Library, Profile, Settings, DashboardLayout } from "@/components/dashboard";
import { Draft, DraftLayout, Drafts } from "@/components/drafts";
import NotFound from "@/components/NotFound";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />

            {/* Auth routes */}
            <Route path="/auth/" element={<AuthLayout title="Auth" subtitle="subtitle" />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedLayout />}>
                {/* Dashboard */}
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route path="" element={<Navigate to={"/dashboard/home"} />} index />
                    <Route path="home" element={<Home />} />
                    <Route path="library">
                        <Route path="" element={<Library />} index />
                        <Route path="drafts" element={<Drafts />} />
                    </Route>
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="logout" element={<Logout />} />
                </Route>

                {/* Drafts */}
                <Route path="drafts" element={<DraftLayout />}>
                    <Route path="" element={<Navigate to="/dashboard/library/drafts" />} index />
                    <Route path=":draftId" element={<Draft />} />
                </Route>
            </Route>

            {/* Not-found route */}
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}
