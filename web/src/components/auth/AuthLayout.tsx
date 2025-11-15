import { motion } from "framer-motion";

import Logo from "@/components/common/Logo";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    title: string;
    subtitle: string;
    // children: ReactNode;
}

export default function AuthLayout({ title, subtitle }: Props) {
    const isAuthenticated = true;
    if (isAuthenticated) return <Navigate to={"/dashboard/home"} />;

    return (
        <div className="min-h-screen w-full bg-linear-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <Logo className="mx-auto mb-6 w-full flex items-end justify-center" />

                <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 shadow-xl shadow-zinc-200/20 dark:shadow-zinc-950/20">
                    <h1 className="text-xl text-center font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        {title}
                    </h1>
                    <p className="text-center text-zinc-600 dark:text-zinc-400 text-sm">
                        {subtitle}
                    </p>

                    <Outlet />
                </div>
            </motion.div>
        </div>
    );
}
