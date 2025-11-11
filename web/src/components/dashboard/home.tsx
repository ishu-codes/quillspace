import type { Blog as BlogType } from "@/types/blog";
import Blog from "@/components/common/Blog";

const BLOGS: BlogType[] = [
    {
        id: "1",
        title: "I Built a RAG System for 100,000 Documents — Here’s the Architecture",
        desc: "My production system crashed at 2 AM because I underestimated vector databases.",
        img: "https://miro.medium.com/v2/resize:fill:200:134/1*EDbVqA4K8sMd9NQCFipr_g.png",
        author: {
            id: "1",
            name: "CodeOrbit",
            img: "https://miro.medium.com/v2/resize:fill:25:25/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
        },
        likes: 373,
        comments: 12,
        published: "2025-11-2 20:32:43",
    },
];

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-4 p-4">
            {BLOGS.map((blog) => (
                <Blog blog={blog} key={blog.id} className="w-full md:w-3/5" />
            ))}
        </div>
    );
}
