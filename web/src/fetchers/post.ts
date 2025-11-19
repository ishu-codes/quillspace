import { useQuery } from "@tanstack/react-query";
import type { Blog as BlogType } from "@/types/blog";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

export function useGetPost(postId?: string) {
	return useQuery<BlogType>({
		queryKey: ["post", postId],
		staleTime: 1000 * 60 * 60, // 1 hr
		retry: 2,
		queryFn: async () => {
			if (!postId) return;
			const res = await fetch(`${BASE_URL}/api/posts/${postId}`, {
				method: "GET",
				credentials: "include",
			});
			if (!res.ok) throw new Error("Not authenticated!");

			const data = await res.json();

			console.log("Post: ", data);
			return data;
		},
	});
}
