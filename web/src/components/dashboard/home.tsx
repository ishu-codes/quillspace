import type { Blog as BlogType } from "@/types/blog";
import Blog from "@/components/common/Blog";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

const BLOGS: BlogType[] = [
	{
		id: "1",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2023-10-2 20:32:43",
	},
	{
		id: "2",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
	{
		id: "3",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
	{
		id: "4",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
	{
		id: "5",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
	{
		id: "6",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
	{
		id: "7",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
	{
		id: "8",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
	{
		id: "9",
		title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
		desc: "My production system crashed at 2 AM because I underestimated vector databases.",
		// img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
		img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
		author: {
			id: "1",
			name: "CodeOrbit",
			img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
		},
		likes: 373,
		comments: 12,
		published: "2025-11-2 20:32:43",
	},
];

export default function Home() {
	const { open } = useSidebar();

	return (
		<div
			className={cn(
				"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4",
				!open && "md:grid-cols-3 lg:grid-cols-5",
			)}
		>
			{BLOGS.map((blog) => (
				<Link to={`/blogs/${blog.id}`} key={blog.id}>
					<Blog blog={blog} className="w-full" />
				</Link>
			))}
		</div>
	);
}
