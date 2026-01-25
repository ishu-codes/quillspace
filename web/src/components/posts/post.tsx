import { BookmarkMinus, BookmarkPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import tocbot from "tocbot";

import ErrorPage from "@/components/common/ErrorPage";
import RenderMarkdown from "@/components/common/RenderMarkdown";
import DraftNotFound from "@/components/drafts/NotFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmarkDelete, useBookmarkPost } from "@/fetchers/bookmarks";
import { useGetPost } from "@/fetchers/post";
// import { AsideContents } from "../common/AsideContents";
// import { extractHeadings } from "@/lib/contents";

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

    useEffect(() => {
        requestAnimationFrame(() => {
            tocbot.init({
                tocSelector: ".toc",
                contentSelector: ".markdown-content",
                headingSelector: "h1, h2, h3",
                scrollContainer: ".markdown-scroll",
                hasInnerContainers: true,
                scrollSmooth: true,
                headingsOffset: 96,
                scrollSmoothOffset: -96,
                collapseDepth: 6,

                onClick: (e) => {
                    e.preventDefault();

                    const target = e.target;
                    if (!(target instanceof HTMLAnchorElement)) return;

                    const id = target.getAttribute("href")?.slice(1);
                    if (!id) return;

                    document.getElementById(id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                },
            });
        });

        setIsBookmarked(post?.bookmarked ?? false);

        return () => tocbot.destroy();
    }, [post]);

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
        <div className="markdown-content markdown-scroll overflow-auto h-[calc(100vh-5rem)] w-full flex justify-between gap-20 px-6 py-12">
            <article className="w-full max-w-4xl mx-auto">
                <header className="mb-16 space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest">
                                Story
                            </span>
                            <span className="text-sm text-muted-foreground font-medium">
                                Published 2 days ago
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9]">
                            {post.title}
                        </h1>
                        <p className="text-2xl text-muted-foreground leading-relaxed font-medium italic">
                            {post.desc}
                        </p>
                    </div>

                    <div className="flex items-center justify-between py-8 border-y border-border/50">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-14 h-14 ring-4 ring-border/20">
                                <AvatarImage
                                    src={post?.author?.img}
                                    alt="author-image"
                                />
                                <AvatarFallback className="text-2xl font-serif font-bold">
                                    {post?.author?.name.charAt(0) ?? "A"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <h4 className="text-xl font-serif font-bold leading-none mb-1">
                                    {post.author?.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Writer at QuillSpace
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant={"outline"}
                                size="icon"
                                className="rounded-full w-12 h-12 shadow-sm transition-transform hover:scale-110"
                                onClick={handleToggleBookmark}
                            >
                                {isBookmarked ? (
                                    <BookmarkMinus className="w-5 h-5 text-destructive" />
                                ) : (
                                    <BookmarkPlusIcon className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </header>

                {post?.featuredImg && (
                    <div className="w-full aspect-[16/10] mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img
                            className="w-full h-full object-cover"
                            src={post?.featuredImg}
                            alt="featured"
                        />
                    </div>
                )}

                <div className="prose prose-xl prose-stone dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/90 selection:bg-foreground selection:text-background">
                    <RenderMarkdown content={post.content} />
                </div>
            </article>

            <aside className="hidden xl:flex w-64 flex-col gap-10 sticky top-0 h-fit pr-6">
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                        In this story
                    </h4>
                    <div className="toc font-medium text-sm text-muted-foreground space-y-1" />
                </div>

                <div className="p-6 bg-muted/50 rounded-3xl border border-border/50">
                    <h5 className="font-serif font-bold mb-2">
                        Enjoying this?
                    </h5>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        Share this story with your network or follow the author
                        for more.
                    </p>
                    <Button className="w-full rounded-xl text-xs font-bold py-2">
                        Follow Author
                    </Button>
                </div>
            </aside>
        </div>
    );
}
