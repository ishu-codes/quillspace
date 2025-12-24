import { useEffect } from "react";
import tocbot from "tocbot";
import { useParams } from "react-router-dom";

import { useGetPost } from "@/fetchers/post";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RenderMarkdown from "@/components/common/RenderMarkdown";
import DraftNotFound from "@/components/drafts/NotFound";
// import { AsideContents } from "../common/AsideContents";
// import { extractHeadings } from "@/lib/contents";

export default function PostPage() {
  const { postId } = useParams();
  const { data: post, isLoading } = useGetPost(postId);

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
  }, [post]);

  if (isLoading) {
    return <Skeleton className="w-full h-100"></Skeleton>;
  }

  if (!post) {
    return <DraftNotFound />;
  }

  return (
    <div className="markdown-content markdown-scroll overflow-auto prose prose-sm dark:prose-invert h-[calc(100vh-4rem)] w-full flex justify-between gap-20 p-4">
      <div className="w-full md:max-w-4xl flex flex-col gap-8 mx-auto pt-4">
        {isLoading ? (
          <>
            <Skeleton className="w-4/5 h-20" />
            <Skeleton className="w-full h-18" />
            <Skeleton className="w-full h-80 rounded-lg" />
          </>
        ) : (
          <>
            {!post ? (
              <div>No data</div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <h4 className="text-4xl font-semibold">{post.title}</h4>
                  <p className="text-xl text-muted-foreground">{post.desc}</p>
                </div>

                <div className="flex gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post?.author?.image} alt="author-image" />
                    <AvatarFallback className="border-2 text-xl">{post?.author?.name.charAt(0) ?? "A"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h4 className="">{post.author?.name}</h4>
                    <p className="text-sm text-muted-foreground">{post.author?.id}</p>
                  </div>
                </div>

                <picture className="w-full h-120">
                  {post?.featuredImg ? (
                    <img className="h-full mx-auto rounded-lg" src={post?.featuredImg} alt="featured-image" />
                  ) : (
                    <Skeleton className="w-full h-full" />
                  )}
                </picture>

                <div className="flex-1  rounded-lg">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <RenderMarkdown content={post.content} />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {/*<div className="w-80 bg-amber-400">
        <div className="flex flex-col sticky top-20">
          <h4 className="text-2xl">Contents</h4>
          {[
            { title: "Title 1", url: "#title-1" },
            { title: "Title 2", url: "#title-2" },
            { title: "Title 3", url: "#title-4" },
          ].map((content) => (
            <a href={content.url} key={content.title}>
              {content.title}
            </a>
          ))}
        </div>
      </div>*/}
      <aside className="w-full md:w-60 mb-auto flex flex-col gap-4 pr-4 sticky top-20 overflow-y-auto overflow-x-hidden">
        <h4 className="text-xl font-semibold">Contents</h4>
        <aside className="toc [&_ul_ul]:ml-4 max-w-full hidden lg:block overflow-x-hidden" />
      </aside>
      {/*<AsideContents headings={extractHeadings(post?.content ?? "")} />*/}
    </div>
  );
}
