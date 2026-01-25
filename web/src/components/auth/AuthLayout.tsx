import { motion } from "framer-motion";

import Logo from "@/components/common/Logo";
import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";

export default function AuthLayout() {
    const { session } = useLoaderData();
    const location = useLocation();

    if (session) return <Navigate to={"/dashboard/home"} replace />;

    const isLogin = location.pathname.includes("login");
    const title = isLogin ? "Welcome back" : "Create account";
    const subtitle = isLogin
        ? "Enter your credentials to access your writing space."
        : "Join a community of deep thinkers and quality writers.";

    return (
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.05),transparent)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <Logo to="/" className="justify-center mb-8" />
                    <h1 className="text-5xl font-serif font-bold tracking-tight mb-3">
                        {title}
                    </h1>
                    <p className="text-muted-foreground text-lg">{subtitle}</p>
                </div>

                <div className="bg-card rounded-[2rem] border border-border/50 p-10 shadow-2xl shadow-foreground/5 relative overflow-hidden">
                    <Outlet />
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; 2026 QuillSpace. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
