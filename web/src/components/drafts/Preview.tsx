import { useEffect } from "react";
import tocbot from "tocbot";

import RenderMarkdown from "@/components/common/RenderMarkdown";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { BlogPost } from "@/types/blog";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  post: BlogPost;
}

export default function Preview({ post }: Props) {
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
        // headingsOffset: 120,
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

    return () => tocbot.destroy();
  }, [post.content]);

  return (
    <div className="markdown-content markdown-scroll overflow-auto prose prose-sm dark:prose-invert h-screen w-full flex justify-between gap-20 p-4 pt-8">
      <div className="max-w-none w-full md:max-w-4xl flex flex-col gap-8 mx-auto pt-12">
        <div className="flex flex-col gap-2">
          <h4 className="text-4xl font-semibold">{post.title}</h4>
          <p className="text-xl text-muted-foreground">{post.desc}</p>
        </div>

        {/*<div className="flex gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post?.author?.image} alt="author-image" />
            <AvatarFallback className="border-2 text-xl">{post?.author?.name.charAt(0) ?? "A"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="">{post.author?.name}</h4>
            <p className="text-sm text-muted-foreground">{post.author?.id}</p>
          </div>
        </div>*/}

        <picture className="w-full h-120">
          {post?.featuredImg ? (
            <img className="h-full mx-auto rounded-lg" src={post?.featuredImg} alt="featured-image" />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </picture>

        <div className="flex-1 rounded-lg">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <RenderMarkdown content={post.content} />
          </div>
        </div>
      </div>

      <aside className="w-full md:w-80 mb-auto flex flex-col gap-4 pr-4 sticky top-20 overflow-y-auto overflow-x-hidden">
        <h4 className="text-xl font-semibold">Contents</h4>
        <aside className="toc [&_ul_ul]:ml-4 w-80 hidden lg:block" />
      </aside>
    </div>
  );
}
