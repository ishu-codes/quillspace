import { useQuery } from "@tanstack/react-query";

import type { Follower, UserProfileInfo } from "@/types/userInfo";
import type { BlogPost } from "@/types/blog";
import { makeRequest } from "./request";

export function useUserInfo(userId: string) {
  return useQuery<UserProfileInfo>({
    queryKey: ["users", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => await makeRequest("GET", `users/${userId}`, {}),
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
