import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BookmarkMinus, BookmarkPlusIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import tocbot from "tocbot";
dayjs.extend(relativeTime);

import RenderMarkdown from "@/components/common/RenderMarkdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/hooks/useAuthSession";
import type { BlogPost } from "@/types/blog";

interface PostViewerProps {
  post: BlogPost;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  showActions?: boolean;
}

export default function PostViewer({ post, isBookmarked, onToggleBookmark, showActions = true }: PostViewerProps) {
  const { session } = useAuthSession();
  useEffect(() => {
    requestAnimationFrame(() => {
      tocbot.init({
        tocSelector: ".toc",
        contentSelector: ".js-toc-content",
        headingSelector: "h1, h2, h3",
        hasInnerContainers: true,
        scrollSmooth: true,
        headingsOffset: 100,
        scrollSmoothOffset: -100,
        collapseDepth: 6,
        orderedList: false,
      });
    });

    return () => tocbot.destroy();
  }, [post.content]);

  return (
    <div className="w-full flex justify-between gap-20 px-6 py-12 relative">
      <article className="js-toc-content w-full max-w-4xl mx-auto">
        <header className="mb-16 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest">
                {post.status === "DRAFT" ? "Draft" : "Story"}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {post.publishedAt
                  ? `Published ${dayjs(post.publishedAt).fromNow()}`
                  : `Created ${dayjs(post.createdAt).fromNow()}`}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9]">{post.title}</h1>
            <p className="text-2xl text-muted-foreground leading-relaxed font-medium italic">{post.desc}</p>
          </div>

          <div className="flex items-center justify-between py-8 border-y border-border/50">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 ring-4 ring-border/20">
                <AvatarImage src={post?.author?.img || session?.user.image || undefined} alt="author-image" />
                <AvatarFallback className="text-2xl font-serif font-bold">
                  {(post?.author?.name?.charAt(0) || session?.user.name?.charAt(0)) ?? "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h4 className="text-xl font-serif font-bold leading-none mb-1">
                  {post.authorId ? (
                    <Link to={`/users/${post.authorId}`}>{post.author?.name ?? session?.user.name}</Link>
                  ) : (
                    <>{session?.user.name}</>
                  )}
                </h4>
                <p className="text-sm text-muted-foreground">Writer at QuillSpace</p>
                {/*<p className="text-sm text-muted-foreground">{ post. }</p>*/}
              </div>
            </div>

            {showActions && onToggleBookmark && (
              <div className="flex gap-4">
                <Button
                  variant={"outline"}
                  size="icon"
                  className="rounded-full w-12 h-12 shadow-sm transition-transform hover:scale-110"
                  onClick={onToggleBookmark}
                >
                  {isBookmarked ? (
                    <BookmarkMinus className="w-5 h-5 text-destructive" />
                  ) : (
                    <BookmarkPlusIcon className="w-5 h-5" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </header>

        {post?.featuredImg && (
          <div className="w-full aspect-[16/10] mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img className="w-full h-full object-cover" src={post?.featuredImg} alt="featured" />
          </div>
        )}

        <div className="prose prose-xl prose-stone dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/90 selection:bg-foreground selection:text-background">
          <RenderMarkdown content={post.content} />
        </div>
      </article>

      <aside className="hidden xl:flex w-64 flex-col gap-10 sticky top-28 h-fit pr-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">In this story</h4>
          <div className="toc font-medium text-sm text-muted-foreground space-y-1" />
        </div>

        {post.authorId && (
          <div className="p-6 bg-muted/50 rounded-3xl border border-border/50">
            <h5 className="font-serif font-bold mb-2">Enjoying this?</h5>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Share this story with your network or follow the author for more.
            </p>
            <Button className="w-full rounded-xl text-xs font-bold py-2" asChild>
              <Link to={`/users/${post.authorId}`}>Follow Author</Link>
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}
