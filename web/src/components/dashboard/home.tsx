import { Link } from "react-router-dom";

import Blog from "@/components/common/PostCard";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFeed } from "@/fetchers/feed";
import { cn } from "@/lib/utils";

export default function Home() {
  const { open } = useSidebar();
  const { data: blogs, isLoading } = useGetFeed();

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 md:p-4",
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
                <Link to={`/posts/${blog.id}`} key={blog.id}>
                  <Blog blog={blog} className="w-full" />
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
