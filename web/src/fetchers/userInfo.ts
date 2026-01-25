import { useMutation, useQuery } from "@tanstack/react-query";

import type { Follower, UserProfileInfo } from "@/types/userInfo";
import type { BlogPost } from "@/types/blog";
import { makeRequest } from "./request";
import type { MessageResponse } from "@/types/response";

export function useUserInfo(userId: string) {
  return useQuery<UserProfileInfo>({
    queryKey: ["users", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => await makeRequest("GET", `users/${userId}`, {}, { consoleMsg: "User info" }),
  });
}

export function useUserPosts(userId: string) {
  return useQuery<BlogPost[]>({
    queryKey: ["users", "posts", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () =>
      await makeRequest(
        "GET",
        `users/${userId}/posts`,
        {},
        {
          consoleMsg: "Posts",
          ensureArray: true,
        },
      ),
  });
}

export function useUserFollowers(userId: string) {
  return useQuery<Follower[]>({
    queryKey: ["users", "followers", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => await makeRequest("GET", `users/${userId}/followers`, {}, { ensureArray: true }),
  });
}

export function useUserFollowing(userId: string) {
  return useQuery<Follower[]>({
    queryKey: ["users", "following", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => await makeRequest("GET", `users/${userId}/following`, {}, { ensureArray: true }),
  });
}

export function useFollowUser() {
  return useMutation<MessageResponse, Error, { userId: string }>({
    retry: 2,
    mutationFn: async ({ userId }: { userId: string }) =>
      await makeRequest("POST", `users/${userId}/follow`, {}, { rawResponse: true }),
  });
}
export function useUnfollowUser() {
  return useMutation<MessageResponse, Error, { userId: string }>({
    retry: 2,
    mutationFn: async ({ userId }: { userId: string }) =>
      await makeRequest("DELETE", `users/${userId}/unfollow`, {}, { rawResponse: true }),
  });
}
