// import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

// import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  content: string;
}

// function createIdGenerator() {
//   const map: Record<string, number> = {};

//   return (raw: string) => {
//     const base = raw
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//     map[base] = (map[base] || 0) + 1;
//     return map[base] > 1 ? `${base}-${map[base]}` : base;
//   };
// }

export default function RenderMarkdown({ content }: Props) {
  // const generateId = useMemo(() => createIdGenerator(), [content]);

  return (
    // <ScrollArea className="overflow-y-auto scroll-smooth">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-6 pt-8 mb-1 border-b scroll-mt-20" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-5 pt-8 mb-0 border-b scroll-mt-20" {...props} />
        ),
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 pt-8 mb-0 border-b-2" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-3 pt-8 mb-0" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-base font-bold mt-2" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-sm font-bold mt-2" {...props} />,
        p: ({ node, ...props }) => <p className="my-3 leading-7 text-foreground/70" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-3 text-muted-foreground" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside my-3 space-y-1 text-foreground/70" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside my-3 space-y-1 text-foreground/70" {...props} />
        ),
        code: (props: { children?: React.ReactNode }) => {
          const { children } = props;
          const isInline = typeof children === "string" && !children.includes("\n");
          return isInline ? (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
          ) : (
            <code className="block bg-muted p-3 rounded-lg my-3 overflow-x-auto font-mono text-sm">{children}</code>
          );
        },
        mark: (props: { children?: React.ReactNode }) => (
          <code className="bg-primary/15 text-primary dark:bg-primary/20 rounded-sm px-1">{props.children}</code>
        ),
        table: ({ node, ...props }) => <table className="w-full border-collapse my-3" {...props} />,
        th: ({ node, ...props }) => <th className="border bg-muted px-3 py-2 font-semibold text-left" {...props} />,
        td: ({ node, ...props }) => <td className="border px-3 py-2" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-6 border-border" {...props} />,
        img: ({ alt, src, title }: { alt?: string; src?: string; title?: string }) => {
          const altText = alt || "Blog content image";
          return <img alt={altText} src={src} title={title} className="max-w-full h-auto rounded-lg my-3" />;
        },
        a: ({ node, ...props }) => (
          <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    // </ScrollArea>
  );
}
