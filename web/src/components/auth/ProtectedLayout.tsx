import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
    const authenticated = true;

    if (!authenticated) return <Navigate to="/auth/sign-in" />;
    return <Outlet />;
}
