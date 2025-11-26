import type { BlogPost } from "@/types/blog";
import RenderMarkdown from "@/components/common/RenderMarkdown";

interface Props {
  post: BlogPost;
}

export default function Preview({ post }: Props) {
  return (
    <div className="flex-1 overflow-auto p-4 rounded-lg">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <RenderMarkdown content={post.content} />
      </div>
    </div>
  );
}
