import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import PostCard from "@/components/common/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    useUserFollowers,
    useUserFollowing,
    useUserInfo,
    useUserPosts,
} from "@/fetchers/userInfo";
import type { Follower } from "@/types/userInfo";

import ErrorPage from "./Error";

interface Props {
    userId: string;
}

interface PostsProps {
    userId: string;
}

interface FollowerCardProps {
    user: Follower;
    type: "follower" | "following";
}

export default function ProfileContent({ userId }: Props) {
    const [currentTab, setCurrentTab] = useState("posts");
    const { data: userInfo, isLoading, isError } = useUserInfo(userId);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Skeleton className="w-full h-80 rounded-[2rem]" />
            </div>
        );
    }

    if (!userInfo || isError) {
        return <ErrorPage />;
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                <div className="relative group">
                    <Avatar className="h-40 w-40 ring-4 ring-border/50">
                        <AvatarImage
                            src={userInfo?.user.image!}
                            alt={"profile"}
                        />
                        <AvatarFallback className="text-4xl font-serif font-bold">
                            {userInfo?.user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <h1 className="text-6xl font-serif font-bold tracking-tight mb-2">
                            {userInfo?.user.name}
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium">
                            @{userInfo?.user.username}
                        </p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                        {userInfo?.user.bio ||
                            "No bio yet. This writer prefers to let their stories speak for themselves."}
                    </p>

                    <div className="flex flex-wrap gap-8 pt-4">
                        {[
                            {
                                title: "Posts",
                                value: userInfo.postsCount,
                                action: () => setCurrentTab("posts"),
                            },
                            {
                                title: "Followers",
                                value: userInfo.followersCount,
                                action: () => setCurrentTab("followers"),
                            },
                            {
                                title: "Following",
                                value: userInfo.followingCount,
                                action: () => setCurrentTab("following"),
                            },
                        ].map((item) => (
                            <button
                                key={item.title}
                                onClick={item.action}
                                className="group text-left"
                            >
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 group-hover:text-foreground transition-colors">
                                    {item.title}
                                </p>
                                <h4 className="text-3xl font-serif font-bold">
                                    {item.value}
                                </h4>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs
                className="w-full"
                value={currentTab}
                onValueChange={(val) => setCurrentTab(val)}
            >
                <TabsList className="w-full h-auto p-0 bg-transparent border-b border-border mb-12 flex justify-start gap-8 rounded-none">
                    <TabsTrigger
                        value="posts"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                    >
                        Posts
                    </TabsTrigger>
                    <TabsTrigger
                        value="followers"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                    >
                        Followers
                    </TabsTrigger>
                    <TabsTrigger
                        value="following"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                    >
                        Following
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="posts">
                    <Posts userId={userId} />
                </TabsContent>

                <TabsContent value="followers">
                    <Followers userId={userId} />
                </TabsContent>

                <TabsContent value="following">
                    <Following userId={userId} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function Posts({ userId }: PostsProps) {
    const { data: userPosts, isLoading, isError } = useUserPosts(userId);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }, (_, i) => (
                    <Skeleton className="w-full h-64 rounded-3xl" key={i} />
                ))}
            </div>
        );
    }

    if (!userPosts || userPosts.length === 0 || isError) {
        return (
            <div className="py-20 text-center text-muted-foreground italic">
                No stories published yet.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPosts?.map((post) => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                    <PostCard blog={post} className="h-full" />
                </Link>
            ))}
        </div>
    );
}

function Followers({ userId }: { userId: string }) {
    const { data: followers, isLoading } = useUserFollowers(userId);

    if (isLoading) return <Skeleton className="w-full h-20 rounded-2xl" />;
    if (!followers || followers.length === 0)
        return (
            <div className="py-20 text-center text-muted-foreground italic">
                No followers yet.
            </div>
        );

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {followers.map((item) => (
                <FollowerCard user={item} type="follower" key={item.id} />
            ))}
        </div>
    );
}

function Following({ userId }: { userId: string }) {
    const { data: following, isLoading } = useUserFollowing(userId);

    if (isLoading) return <Skeleton className="w-full h-20 rounded-2xl" />;
    if (!following || following.length === 0)
        return (
            <div className="py-20 text-center text-muted-foreground italic">
                Not following anyone yet.
            </div>
        );

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {following.map((item) => (
                <FollowerCard user={item} type="following" key={item.id} />
            ))}
        </div>
    );
}

function FollowerCard({ user }: FollowerCardProps) {
    return (
        <Link
            to={`/users/${user.id}`}
            className="flex items-center justify-between p-4 rounded-2xl border border-border/50 hover:border-foreground/20 hover:bg-muted/30 transition-all group"
        >
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-background">
                    <AvatarImage src={user.image} alt={"profile"} />
                    <AvatarFallback className="font-bold">
                        {user.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <h3 className="font-bold leading-none mb-1 group-hover:underline">
                        {user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-none">
                        @{user.username}
                    </p>
                </div>
            </div>

            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
        </Link>
    );
}
