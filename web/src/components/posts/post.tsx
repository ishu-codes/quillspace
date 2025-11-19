import { useParams } from "react-router-dom";

import { useGetPost } from "@/fetchers/post";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Post() {
	const { postId } = useParams();
	const { data: post, isLoading } = useGetPost(postId);
	return (
		<div className="w-full flex flex-col p-4">
			<div className="w-full md:max-w-6xl flex flex-col gap-4 mx-auto">
				{isLoading ? (
					<>
						<Skeleton className="w-full h-80 rounded-lg" />
						<Skeleton className="w-4/5 h-20" />
						<Skeleton className="w-full h-18" />
					</>
				) : (
					<>
						{post ? (
							<>
								<picture className="w-full h-80 bg-muted rounded-lg overflow-hidden">
									<img className="w-full h-full" src={post?.img} alt="featured-image" />
								</picture>

								<h2 className="text-2xl font-semibold">{post.title}</h2>
								<p>{post.desc}</p>

								<div className="flex gap-4">
									<Avatar className="w-12 h-12">
										<AvatarImage src={post?.author?.img} alt="author-image" />
										<AvatarFallback className="border-2 text-xl">{post?.author?.name.charAt(0) ?? "A"}</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<h4 className="text-xl">{post.author?.name}</h4>
										<p className="text-sm text-muted-foreground">{post.author?.id}</p>
									</div>
								</div>
							</>
						) : (
							<div>No data</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
