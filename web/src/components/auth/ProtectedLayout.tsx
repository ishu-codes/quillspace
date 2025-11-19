import { Navigate, Outlet, useLoaderData } from "react-router-dom";

export default function ProtectedLayout() {
  const { session } = useLoaderData();

  if (!session) return <Navigate to={"/auth/login"} replace />;
  return <Outlet />;
}
