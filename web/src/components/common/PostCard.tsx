// import { BookmarkIcon, CalendarIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { getRelativeTime } from "@/lib/dateTime";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface Props {
    blog: BlogPost;
    className?: string;
    type?: "POST" | "DRAFT";
}

export default function PostCard({
    blog,
    className = "",
    type: postType = "POST",
}: Props) {
    const likes = 50 + Math.round(Math.random() * 100);

    return (
        <div
            className={cn(
                "group flex flex-col gap-4 p-4 rounded-3xl bg-card border border-border/50 hover:border-foreground/20 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-300 overflow-hidden cursor-pointer",
                className,
            )}
        >
            {/* Thumbnail */}
            <div className="w-full h-48 relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                {blog?.featuredImg ? (
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={blog?.featuredImg}
                        alt={blog?.title}
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Skeleton className="w-full h-full" />
                    </div>
                )}
                <div className="absolute top-3 left-3 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {postType === "POST" ? "Published" : "Draft"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-3">
                <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-muted-foreground transition-colors line-clamp-2">
                    {blog?.title}
                </h3>

                {postType === "POST" ? (
                    <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center gap-2.5">
                            <Avatar className="w-8 h-8 ring-2 ring-background">
                                <AvatarImage
                                    src={blog?.author?.img}
                                    alt={blog?.author?.name}
                                />
                                <AvatarFallback className="text-[10px] font-bold">
                                    {blog?.author?.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold leading-none">
                                    {blog?.author?.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-1">
                                    {dayjs(blog?.publishedAt ?? "").fromNow()}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <HeartIcon className="w-3.5 h-3.5 fill-muted-foreground/20" />
                            <span className="text-[10px] font-bold">
                                {likes}
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">
                        {blog.desc || "No description provided..."}
                    </p>
                )}
            </div>
        </div>
    );
}

function HeartIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}
