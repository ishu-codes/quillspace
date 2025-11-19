import { useMutation } from "@tanstack/react-query";
import type { Blog as BlogType } from "@/types/blog";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

export function useCreateDraft() {
	return useMutation<BlogType, Error, { title: string; desc?: string | null }>({
		retry: 2,
		mutationFn: async ({ title, desc }: { title: string; desc?: string | null }) => {
			const res = await fetch(`${BASE_URL}/api/drafts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					title,
					desc,
				}),
			});
			if (!res.ok) throw new Error("Not authenticated!");

			const data = await res.json();
			console.log("New Draft:", data);
			return data;
		},
	});
}
