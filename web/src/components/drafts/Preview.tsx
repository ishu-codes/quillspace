import PostViewer from "@/components/posts/PostViewer";
import type { BlogPost } from "@/types/blog";

interface Props {
    post: BlogPost;
}

export default function Preview({ post }: Props) {
    return <PostViewer post={post} showActions={false} />;
}
