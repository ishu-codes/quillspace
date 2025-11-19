import { useEffect, useState } from "react";
import { authClient } from "@/lib/authClient";

type SessionType = {
	user: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		emailVerified: boolean;
		name: string;
		image?: string | null;
	};
	session: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string | null;
		userAgent?: string | null;
	};
} | null;

export function useAuthSession() {
	const [session, setSession] = useState<SessionType>(null);

	useEffect(() => {
		async function load() {
			const { data } = await authClient.getSession();
			setSession(data ?? null);
		}

		load();
	}, []);

	return { session };
}
