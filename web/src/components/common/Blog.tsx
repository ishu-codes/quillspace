// import { BookmarkIcon, CalendarIcon, HeartIcon, MessageCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/dateTime";
import { cn } from "@/lib/utils";
import type { Blog as BlogType } from "@/types/blog";

interface Props {
	blog: BlogType;
	className?: string;
}

export default function Blog({ blog, className = "" }: Props) {
	const handleToggleLike = () => {};
	const handleToggleBookmark = () => {};

	return (
		<Card className={cn("flex flex-col gap-4 pt-0 pb-4 overflow-hidden", className)}>
			{/* Thumbnail */}
			<picture className="w-full h-40 relative">
				<div className="absolute w-full h-full bg-black opacity-0 dark:opacity-35" />
				<img className="w-full h-full" src={blog?.img} alt={blog?.title} />
			</picture>

			{/* Author + Core info */}
			<div className="flex flex-col gap-2 px-4">
				<h3 className="">{blog?.title}</h3>

				<div className="flex items-center gap-2">
					<Avatar className="w-9 h-9">
						<AvatarImage src={blog?.author?.img} alt={blog?.author?.name} />
						<AvatarFallback>{blog?.author?.name.charAt(0)}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col text-sm text-muted-foreground">
						<p className="">{blog?.author?.name}</p>
						<p className="flex gap-2">
							<span>{blog?.likes} likes</span>
							<span>&bull;</span>
							<span>{getRelativeTime(blog?.published)}</span>
						</p>
					</div>
				</div>
			</div>

			{/* Author */}
			{/* <div className="flex items-center gap-2">

                <p className="text-sm">{blog?.author?.name}</p>
            </div> */}

			{/* Stats & Actions */}
			{/* <div className="flex justify-between text-sm">
                <div className="flex gap-4">
                    {[
                        {
                            name: "Published",
                            icon: CalendarIcon,
                            value: new Date(blog?.published).toDateString(),
                        },
                        { name: "Likes", icon: HeartIcon, value: blog?.likes },
                        { name: "Comments", icon: MessageCircleIcon, value: blog?.comments },
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
            </div> */}
		</Card>
	);
}
