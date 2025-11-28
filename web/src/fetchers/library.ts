import { useQuery } from "@tanstack/react-query";
import type { Blog, BlogListItem } from "@/types/blog";
// import { wait } from "@/lib/utils";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

type YourList = {
  postsCount: number;
  draftsCount: number;
  bookmarkedCount: number;
  list: BlogListItem[];
};

export function useYourLists() {
  return useQuery<YourList>({
    queryKey: ["your-lists"],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/library/your-lists`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated!");

      const data = await res.json();

      console.log("Your lists: ", data);
      return data;
    },
  });
}

export function usePosts(postType: "draft" | "published" | "archived" | "bookmarked") {
  return useQuery<Blog[]>({
    queryKey: ["posts", postType],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/library/posts/${postType}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated!");

      // await wait(2000);
      return await res.json();
    },
  });
}
