import { useMutation, useQuery } from "@tanstack/react-query";

import type { BlogPost } from "@/types/blog";
import type { MessageResponse } from "@/types/response";
import { makeRequest } from "./request";

export function useCreateDraft() {
  return useMutation<BlogPost, Error, { title: string; desc?: string | null }>({
    retry: 2,
    mutationFn: async ({ title, desc }: { title: string; desc?: string | null }) =>
      await makeRequest("POST", "drafts", { title, desc }, { consoleMsg: "New created draft" }),
  });
}

export function useGetDraft(draftId: string) {
  return useQuery<BlogPost | null>({
    queryKey: ["draft", draftId],
    staleTime: 1000 * 60, // 1 min
    retry: 2,
    queryFn: async () => await makeRequest("GET", `drafts/${draftId}`),
  });
}

export function useUpdateDraft() {
  return useMutation<
    MessageResponse,
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
    }) => await makeRequest("PUT", `drafts/${postId}`, { title, desc, featuredImg, content }, { rawResponse: true }),
  });
}

export function usePublishDraft() {
  return useMutation<MessageResponse, Error, { postId: string }>({
    retry: 2,
    mutationFn: async ({ postId }: { postId: string }) =>
      await makeRequest("GET", `drafts/${postId}/publish`, {}, { rawResponse: true }),
  });
}
