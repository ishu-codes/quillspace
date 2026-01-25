import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import ErrorPage from "@/components/common/ErrorPage";
import DraftNotFound from "@/components/drafts/NotFound";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmarkDelete, useBookmarkPost } from "@/fetchers/bookmarks";
import { useGetPost } from "@/fetchers/post";
import PostViewer from "./PostViewer";

export default function PostPage() {
    const { postId } = useParams();
    if (!postId) return <ErrorPage message="Post not found!" />;
    return <PostContent {...{ postId }} />;
}

function PostContent({ postId }: { postId: string }) {
    const { data: post, isLoading } = useGetPost(postId);

    const { mutateAsync: addToBookmarks } = useBookmarkPost();
    const { mutateAsync: removeFromBookmarks } = useBookmarkDelete();

    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        setIsBookmarked(post?.bookmarked ?? false);
    }, [post]);

    const handleToggleBookmark = async () => {
        const func = isBookmarked ? removeFromBookmarks : addToBookmarks;
        const status = await func({ postId });

        if (status) {
            toast.success(
                `Successfully ${isBookmarked ? "removed from" : "added to"} bookmarks`,
            );
            setIsBookmarked((prev) => !prev);
        } else
            toast.error(
                `Failed to ${isBookmarked ? "remove from" : "add to"} bookmarks`,
            );
    };

    if (isLoading)
        return (
            <div className="max-w-4xl mx-auto py-20 px-6 space-y-12">
                <Skeleton className="w-4/5 h-24 rounded-2xl" />
                <Skeleton className="w-full h-80 rounded-[2rem]" />
                <div className="space-y-4">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-3/4 h-4" />
                </div>
            </div>
        );
    if (!post) return <DraftNotFound />;

    return (
        <PostViewer
            post={post}
            isBookmarked={isBookmarked}
            onToggleBookmark={handleToggleBookmark}
        />
    );
}
