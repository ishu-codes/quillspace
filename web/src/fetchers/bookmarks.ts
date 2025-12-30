import { useMutation, useQuery } from "@tanstack/react-query";

import type { Bookmark } from "@/types/bookmark";
import { makeRequest } from "./request";

export function useBookmarkPost() {
  return useMutation<Bookmark, Error, { postId: string }>({
    retry: 2,
    mutationFn: async ({ postId }: { postId: string }) =>
      await makeRequest("POST", "bookmarks", { postId }, { consoleMsg: "Post bookmarked" }),
  });
}

export function useGetBookmarks() {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks"],
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 2,
    queryFn: async () => await makeRequest("GET", "bookmarks", {}, { consoleMsg: "Bookmarks fetched" }),
  });
}

export function useBookmarkDelete() {
  return useMutation<Bookmark, Error, { postId: string; bookmarkId: number }>({
    retry: 2,
    mutationFn: async ({ postId, bookmarkId }: { postId: string; bookmarkId: number }) =>
      await makeRequest("DELETE", "bookmarks", { postId, bookmarkId }, { consoleMsg: "Bookmark deleted" }),
  });
}
