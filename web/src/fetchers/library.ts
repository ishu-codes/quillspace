import { useQuery } from "@tanstack/react-query";

import type { BlogListItem, BlogPost } from "@/types/blog";
import { makeRequest } from "./request";

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
    queryFn: async () => await makeRequest("GET", `library/your-lists`),
  });
}

export function usePosts(postType: "draft" | "published" | "archived" | "bookmarked") {
  return useQuery<BlogPost[]>({
    queryKey: ["posts", postType],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () =>
      await makeRequest(
        "GET",
        `library/posts/${postType}`,
        {},
        {
          consoleMsg: `Library posts: ${postType}`,
        },
      ),
  });
}
