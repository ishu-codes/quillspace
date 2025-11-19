import { useQuery } from "@tanstack/react-query";
import type { Blog as BlogType } from "@/types/blog";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

export function useGetFeed() {
	return useQuery<BlogType[]>({
		queryKey: ["feed"],
		staleTime: 1000 * 60, // 1 min
		retry: 2,
		queryFn: async () => {
			const res = await fetch(`${BASE_URL}/api/feed`, {
				method: "GET",
				credentials: "include",
			});
			if (!res.ok) throw new Error("Not authenticated!");

			const data = await res.json();
			if (!Array.isArray(data)) {
				console.warn("Invalid feed response");
				return [];
			}

			console.log("FEED RESPONSE:", data);
			return data;
		},
	});
}
