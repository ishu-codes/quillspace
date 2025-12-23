import { Link } from "react-router-dom";

import PostCard from "@/components/common/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/fetchers/library";
import { cn } from "@/lib/utils";

export default function Posts({
  postType,
  prefixUrl = "/posts",
}: {
  postType: "draft" | "published" | "archived" | "bookmarked";
  prefixUrl?: string;
}) {
  const { data: blogs, isLoading } = usePosts(postType);
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-3 p-4",
        !open && "md:grid-cols-3 lg:grid-cols-5",
      )}
    >
      {isLoading ? (
        <>
          {Array.from({ length: 10 }, (_, i) => i).map((idx) => (
            <div className="w-full min-h-72">
              <Skeleton className="w-[calc(100%-2rem)] h-[calc(100%-1rem)] m-auto" key={idx} />
            </div>
          ))}
        </>
      ) : (
        <>
          {blogs && blogs.length > 0 ? (
            <>
              {blogs.map((blog) => (
                <Link to={`${prefixUrl}/${blog.id}`} key={blog.id}>
                  <PostCard blog={blog} className="w-full" type={postType === "draft" ? "draft" : "post"} />
                </Link>
              ))}
            </>
          ) : (
            <div className="flex">Empty</div>
          )}
        </>
      )}
    </div>
  );
}
