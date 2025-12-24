import { useQuery } from "@tanstack/react-query";
import type { Follower, UserProfileInfo } from "@/types/userInfo";
import type { BlogPost } from "@/types/blog";
// import { wait } from "@/lib/utils";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

export function useUserInfo(userId: string) {
  return useQuery<UserProfileInfo>({
    queryKey: ["users", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated!");

      const response = await res.json();
      return response.data;
    },
  });
}

export function useUserPosts(userId: string) {
  return useQuery<BlogPost[]>({
    queryKey: ["users", "posts", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/posts`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated!");

      const response = await res.json();
      const data = response.data;
      if (!Array.isArray(data)) {
        console.warn("Invalid feed response");
        return [];
      }
      console.log(data);
      return data;
    },
  });
}

export function useUserFollowers(userId: string) {
  return useQuery<Follower[]>({
    queryKey: ["users", "followers", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/followers`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated!");

      const response = await res.json();
      const data = response.data;
      if (!Array.isArray(data)) {
        console.warn("Invalid feed response");
        return [];
      }
      console.log(data);
      return data;
    },
  });
}

export function useUserFollowing(userId: string) {
  return useQuery<Follower[]>({
    queryKey: ["users", "following", userId],
    staleTime: 1000 * 60 * 60, // 1 hr
    retry: 2,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/following`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated!");

      const response = await res.json();
      const data = response.data;
      if (!Array.isArray(data)) {
        console.warn("Invalid feed response");
        return [];
      }
      console.log(data);
      return data;
    },
  });
}
