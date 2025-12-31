import { useQuery } from "@tanstack/react-query";

import type { BlogPost } from "@/types/blog";
import { makeRequest } from "./request";

export function useGetPost(postId: string) {
  return useQuery<BlogPost>({
    queryKey: ["post", postId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () =>
      await makeRequest(
        "GET",
        `posts/${postId}`,
        {},
        {
          consoleMsg: "Post",
        },
      ),
  });
}
