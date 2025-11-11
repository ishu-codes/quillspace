import { BookmarkIcon, CalendarIcon, HeartIcon, MessageCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Blog as BlogType } from "@/types/blog";
import { Button } from "../ui/button";

interface Props {
    blog: BlogType;
    className?: string;
}

export default function Blog({ blog, className = "" }: Props) {
    const handleToggleLike = () => {};
    const handleToggleBookmark = () => {};

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {/* Author */}
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={blog.author.img} alt={blog.author.name} />
                    <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <p className="text-sm">{blog.author.name}</p>
            </div>

            {/* Core info */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-2xl font-semibold">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">{blog.desc}</p>
                </div>
                <img className="w-40" src={blog.img} alt={blog.title} />
            </div>

            {/* Stats & Actions */}
            <div className="flex justify-between text-sm">
                <div className="flex gap-4">
                    {[
                        {
                            name: "Published",
                            icon: CalendarIcon,
                            value: new Date(blog.published).toDateString(),
                        },
                        { name: "Likes", icon: HeartIcon, value: blog.likes },
                        { name: "Comments", icon: MessageCircleIcon, value: blog.comments },
                    ].map((stat) => (
                        <p className="flex items-center gap-2" key={stat.name}>
                            <stat.icon size={16} />
                            {stat.value}
                        </p>
                    ))}
                </div>

                <div className="flex gap-4">
                    {[
                        { name: "Like", icon: HeartIcon, action: handleToggleLike },
                        { name: "Bookmark", icon: BookmarkIcon, action: handleToggleBookmark },
                    ].map((action) => (
                        <Button
                            variant={"ghost"}
                            className="flex gap-2"
                            key={action.name}
                            onClick={action.action}
                        >
                            <action.icon />
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
