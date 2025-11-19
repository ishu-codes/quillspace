import { Navigate } from "react-router-dom";
import { authClient } from "@/lib/authClient";

export default async function Logout() {
	await authClient.signOut();
	return <Navigate to={"/auth/login"} replace />;
}
