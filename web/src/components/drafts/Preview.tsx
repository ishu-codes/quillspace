import type { BlogPost } from "@/types/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
    post: BlogPost;
}

export default function Preview({ post }: Props) {
    return (
        <div className="flex-1 overflow-auto p-4 rounded-lg bg-muted/30">
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1: ({ node, children, ...props }) => (
                            <h1
                                id={children?.toString()}
                                className="text-3xl font-bold mt-6 mb-3"
                                {...props}
                            >
                                {children}
                            </h1>
                        ),
                        h2: ({ node, children, ...props }) => (
                            <h2
                                id={children?.toString()}
                                className="text-2xl font-bold mt-5 mb-2"
                                {...props}
                            >
                                {children}
                            </h2>
                        ),
                        h3: ({ node, ...props }) => (
                            <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
                        ),
                        h4: ({ node, ...props }) => (
                            <h4 className="text-lg font-bold mt-3 mb-1" {...props} />
                        ),
                        h5: ({ node, ...props }) => (
                            <h5 className="text-base font-bold mt-2" {...props} />
                        ),
                        h6: ({ node, ...props }) => (
                            <h6 className="text-sm font-bold mt-2" {...props} />
                        ),
                        p: ({ node, ...props }) => <p className="my-3 leading-7" {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                className="border-l-4 border-primary pl-4 italic my-3 text-muted-foreground"
                                {...props}
                            />
                        ),
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc list-inside my-3 space-y-1" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-inside my-3 space-y-1" {...props} />
                        ),
                        code: (props: { children?: React.ReactNode }) => {
                            const { children } = props;
                            const isInline =
                                typeof children === "string" && !children.includes("\n");
                            return isInline ? (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                                    {children}
                                </code>
                            ) : (
                                <code className="block bg-muted p-3 rounded-lg my-3 overflow-x-auto font-mono text-sm">
                                    {children}
                                </code>
                            );
                        },
                        mark: (props: { children?: React.ReactNode }) => (
                            <code className="bg-primary/15 text-primary dark:bg-primary/20 rounded-sm px-1">
                                {props.children}
                            </code>
                        ),
                        table: ({ node, ...props }) => (
                            <table className="w-full border-collapse my-3" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                            <th
                                className="border bg-muted px-3 py-2 font-semibold text-left"
                                {...props}
                            />
                        ),
                        td: ({ node, ...props }) => <td className="border px-3 py-2" {...props} />,
                        hr: ({ node, ...props }) => (
                            <hr className="my-6 border-border" {...props} />
                        ),
                        img: ({
                            alt,
                            src,
                            title,
                        }: {
                            alt?: string;
                            src?: string;
                            title?: string;
                        }) => {
                            const altText = alt || "Blog content image";
                            return (
                                <img
                                    alt={altText}
                                    src={src}
                                    title={title}
                                    className="max-w-full h-auto rounded-lg my-3"
                                />
                            );
                        },
                        a: ({ node, ...props }) => (
                            <a
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            />
                        ),
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
