import { useMutation, useQuery } from "@tanstack/react-query";

import type { BlogPost } from "@/types/blog";
import type { MessageResponse } from "@/types/response";
import { makeRequest } from "./request";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

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
    {
      postId: string;
      title?: string;
      desc?: string | null;
      featuredImg?: string | null;
      content?: string | null;
    }
  >({
    retry: 2,
    mutationFn: async ({
      postId,
      title,
      desc,
      featuredImg,
      content,
    }: {
      postId: string;
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

export interface UploadImageResponse {
  success: boolean;
  data?: { urls: string[] };
  error?: string;
}

export function useUploadDraftImage() {
  return useMutation<UploadImageResponse, Error, { postId: string; file: File }>({
    retry: 0, // Don't retry uploads
    mutationFn: async ({ postId, file }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("featuredImg", "true");

      const response = await fetch(`${BASE_URL}/api/drafts/${postId}/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        let errorMessage = "Upload failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Ignore if parsing fails
        }
        throw new Error(errorMessage);
      }

      return response.json() as Promise<UploadImageResponse>;
    },
  });
}

export function useDeleteDraftImage() {
  return useMutation<MessageResponse, Error, { postId: string }>({
    retry: 2,
    mutationFn: async ({ postId }: { postId: string }) =>
      await makeRequest("DELETE", `drafts/${postId}/upload`, {}, { rawResponse: true }),
  });
}
