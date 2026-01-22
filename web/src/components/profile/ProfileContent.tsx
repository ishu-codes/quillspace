import { useState } from "react";

import PostCard from "@/components/common/PostCard";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserFollowers, useUserFollowing, useUserInfo, useUserPosts } from "@/fetchers/userInfo";

import ErrorPage from "./Error";
import { Link } from "react-router-dom";
import type { Follower } from "@/types/userInfo";

interface Props {
  userId: string;
}

export default function ProfileContent({ userId }: Props) {
  const [currentTab, setCurrentTab] = useState("posts");
  const { data: userInfo, isLoading, isError } = useUserInfo(userId);

  if (isLoading) {
    return (
      <div className="w-full">
        <Skeleton className="w-full h-60" />
      </div>
    );
  }

  if (!userInfo || isError) {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-4xl flex flex-col gap-8 mx-auto px-4 pt-4">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userInfo?.user.image!} alt={"profile"} />
                <AvatarFallback>{userInfo?.user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{userInfo?.user.name}</h3>
                  <p className="text-muted-foreground text-sm">{userInfo?.user.username}</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="text-muted-foreground">{userInfo?.user.bio}</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { title: "Posts", value: userInfo.postsCount, action: () => setCurrentTab("posts") },
              { title: "Followers", value: userInfo.followersCount, action: () => setCurrentTab("followers") },
              { title: "Following", value: userInfo.followingCount, action: () => setCurrentTab("following") },
            ].map((item) => (
              <Button variant={"ghost"} className="h-20! flex flex-col gap-1" onClick={item.action} key={item.title}>
                <p className="text-muted-foreground">{item.title}</p>
                <h4 className="text-xl font-semibold">{item.value}</h4>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs className="w-full sticky top-8" value={currentTab} onValueChange={(val) => setCurrentTab(val)}>
        <TabsList className="w-full flex justify-between md:grid md:grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-4">
          <Posts userId={userId} />
        </TabsContent>

        {/* Followers Tab */}
        <TabsContent value="followers" className="space-y-4">
          <Followers {...{ userId }} />
        </TabsContent>

        {/* Following Tab */}
        <TabsContent value="following" className="space-y-4">
          <Following {...{ userId }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PostsProps {
  userId: string;
}
function Posts({ userId }: PostsProps) {
  const { data: userPosts, isLoading, isError } = useUserPosts(userId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 9 }, (_, i) => (
          <Skeleton className="w-full h-40" key={i} />
        ))}
      </div>
    );
  }

  if (!userPosts || userPosts.length == 0 || isError) {
    return <ErrorPage message="No posts found" />;
  }
  if (!Array.isArray(userPosts)) {
    console.error("Expected array, got:", userPosts);
    return <ErrorPage message="Invalid posts response" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {userPosts?.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <PostCard blog={post} className="w-full" />
        </Link>
      ))}
    </div>
  );
}

function Followers({ userId }: { userId: string }) {
  const { data: followers, isLoading } = useUserFollowers(userId);

  if (!followers || followers.length == 0) return <ErrorPage message="No followers" />;
  if (isLoading) return <Skeleton className="w-full h-20" />;

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        {followers.map((item) => (
          <FollowerCard user={item} type="follower" key={item.id} />
        ))}
      </CardContent>
    </Card>
  );
}

function Following({ userId }: { userId: string }) {
  const { data: following, isLoading } = useUserFollowing(userId);

  if (!following || following.length == 0) return <ErrorPage message="No following" />;
  if (isLoading) return <Skeleton className="w-full h-20" />;

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        {following.map((item) => (
          <FollowerCard user={item} type="following" key={item.id} />
        ))}
      </CardContent>
    </Card>
  );
}

interface FollowerCardProps {
  user: Follower;
  type: "follower" | "following";
}
function FollowerCard({ user, type }: FollowerCardProps) {
  return (
    <div className="flex justify-between items-center">
      <Link to={`/users/${user.id}`} className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image} alt={"profile"} />
          <AvatarFallback className="border-1">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-muted-foreground text-sm -mt-1">{user.username}</p>
          </div>
        </div>
      </Link>

      {/*{type === "follower" ? (
        <Button size={"sm"}>Follow</Button>
      ) : (
        <Button size={"sm"} variant={"outline"}>
          Unfollow
        </Button>
      )}*/}
    </div>
  );
}
