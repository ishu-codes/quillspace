import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

import PostCard from "@/components/common/PostCard";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFeed } from "@/fetchers/feed";
import { cn } from "@/lib/utils";

export default function Home() {
    const { open } = useSidebar();
    const { data: blogs, isLoading } = useGetFeed();

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-12">
                <h1 className="text-5xl font-serif font-bold mb-3 tracking-tight">
                    Your Feed
                </h1>
                <p className="text-lg text-muted-foreground">
                    The best stories from the authors you follow.
                </p>
            </div>

            <div
                className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                    !open && "lg:grid-cols-4",
                )}
            >
                {isLoading ? (
                    <>
                        {Array.from({ length: 6 }, (_, i) => i).map((idx) => (
                            <div className="w-full min-h-72" key={idx}>
                                <Skeleton className="w-full h-full rounded-3xl" />
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {blogs && blogs.length > 0 ? (
                            <>
                                {blogs.map((blog) => (
                                    <Link
                                        to={`/posts/${blog.id}`}
                                        key={blog.id}
                                        className="block"
                                    >
                                        <PostCard
                                            blog={blog}
                                            className="h-full"
                                        />
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-2">
                                    Nothing here yet
                                </h3>
                                <p className="text-muted-foreground">
                                    Follow some authors to see their latest
                                    stories in your feed.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
