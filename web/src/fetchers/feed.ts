import { useQuery } from "@tanstack/react-query";

import type { BlogPost } from "@/types/blog";
import { makeRequest } from "./request";

export function useGetFeed() {
  return useQuery<BlogPost[]>({
    queryKey: ["feed"],
    staleTime: 1000 * 60, // 1 min
    retry: 2,
    queryFn: async () => await makeRequest("GET", "feed", {}, { ensureArray: true }),
  });
}
