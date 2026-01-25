import { BookOpen, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import NewDraft from "@/components/common/NewDraft";
import PostCard from "@/components/common/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/fetchers/library";
import { cn } from "@/lib/utils";

export default function Posts({
  postType,
  prefixUrl = "/posts",
}: {
  postType: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "BOOKMARKED";
  prefixUrl?: string;
}) {
  const { data: blogs, isLoading } = usePosts(postType);
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-8")}>
      {isLoading ? (
        <>
          {Array.from({ length: 8 }, (_, i) => i).map((idx) => (
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
                <Link to={`${prefixUrl}/${blog.id}`} key={blog.id} className="h-full">
                  <PostCard blog={blog} className="h-full" type={postType === "DRAFT" ? "DRAFT" : "POST"} />
                </Link>
              ))}
            </>
          ) : (
            <div className="col-span-full py-32 text-center flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-muted rounded-[2rem] flex items-center justify-center text-muted-foreground rotate-12">
                <BookOpen className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-serif font-bold">Your {postType.toLowerCase()} shelf is empty</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  {postType === "BOOKMARKED"
                    ? "Save stories that inspire you to read them later."
                    : "Start writing your next masterpiece and it will appear here."}
                </p>
              </div>
              {postType !== "BOOKMARKED" && (
                <NewDraft title="New Story" className="h-12 text-lg px-8" iconClassName="w-5 h-5" />
                // <Button className="rounded-full px-8 gap-2 h-12 text-lg">

                //     <Plus className="w-5 h-5" />
                //     New Story
                // </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
