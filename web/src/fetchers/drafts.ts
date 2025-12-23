import { useMutation, useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@/types/blog";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

export function useCreateDraft() {
  return useMutation<BlogPost, Error, { title: string; desc?: string | null }>({
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
      console.log("New Created Draft:", data);
      return data;
    },
  });
}

export function useGetDraft(draftId: string) {
  return useQuery<BlogPost | null>({
    queryKey: ["draft", draftId],
    staleTime: 1000 * 60, // 1 min
    retry: 2,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/drafts/${draftId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated!");

      const response = await res.json();
      return response.data;
    },
  });
}

export function useUpdateDraft() {
  return useMutation<
    { success: boolean; data?: string; error?: string },
    Error,
    { postId: number; title?: string; desc?: string | null; featuredImg?: string | null; content?: string | null }
  >({
    retry: 2,
    mutationFn: async ({
      postId,
      title,
      desc,
      featuredImg,
      content,
    }: {
      postId: number;
      title?: string;
      desc?: string | null;
      featuredImg?: string | null;
      content?: string | null;
    }) => {
      const res = await fetch(`${BASE_URL}/api/drafts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          desc,
          featuredImg,
          content,
        }),
      });
      if (!res.ok) throw new Error("Not authenticated!");
      return res.json();
    },
  });
}
