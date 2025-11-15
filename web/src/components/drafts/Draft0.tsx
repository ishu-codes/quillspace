import { useParams } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    List,
    ListOrdered,
    Table2,
    Image,
    Undo2,
    Redo2,
    Eye,
    Code,
    SeparatorHorizontalIcon,
    Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContextMenu {
    x: number;
    y: number;
    visible: boolean;
}

interface BlogPost {
    title: string;
    description: string;
    headerImage: string;
    content: string;
}

interface MenuItem {
    id?: string;
    icon?: React.ComponentType<{ className?: string }>;
    label?: string;
    action?: () => void;
    type?: string;
}

export default function Draft() {
    const { draftId } = useParams();
    const [post, setPost] = useState<BlogPost>({
        title: "",
        description: "",
        headerImage: "",
        content: "",
    });

    const [previewMode, setPreviewMode] = useState(false);
    const [contextMenu, setContextMenu] = useState<ContextMenu>({
        x: 0,
        y: 0,
        visible: false,
    });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [history, setHistory] = useState<BlogPost[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const saveToHistory = useCallback(
        (newPost: BlogPost) => {
            setHistory((prev) => [...prev.slice(0, historyIndex + 1), newPost]);
            setHistoryIndex((prev) => prev + 1);
        },
        [historyIndex]
    );

    const handlePostChange = useCallback(
        (field: keyof BlogPost, value: string) => {
            const newPost = { ...post, [field]: value };
            setPost(newPost);
            saveToHistory(newPost);
        },
        [post, saveToHistory]
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handlePostChange("headerImage", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const insertMarkdown = useCallback(
        (before: string, after = "", placeholder = "") => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = post.content.substring(start, end) || placeholder;
            const before_text = post.content.substring(0, start);
            const after_text = post.content.substring(end);
            const newContent = before_text + before + selectedText + after + after_text;

            setPost((prev) => ({ ...prev, content: newContent }));

            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + before.length + selectedText.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        },
        [post.content]
    );

    const handleContextMenu = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            visible: true,
        });
    };

    const closeContextMenu = useCallback(() => {
        setContextMenu((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        document.addEventListener("click", closeContextMenu);
        return () => document.removeEventListener("click", closeContextMenu);
    }, [closeContextMenu]);

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setPost(history[newIndex]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setPost(history[newIndex]);
        }
    };

    const menuItems: MenuItem[] = [
        {
            id: "bold",
            icon: Bold,
            label: "Bold",
            action: () => insertMarkdown("**", "**", "bold text"),
        },
        {
            id: "italic",
            icon: Italic,
            label: "Italic",
            action: () => insertMarkdown("*", "*", "italic text"),
        },
        {
            id: "underline",
            icon: Underline,
            label: "Underline",
            action: () => insertMarkdown("<u>", "</u>", "underlined text"),
        },
        { id: "code", icon: Code, label: "Code", action: () => insertMarkdown("`", "`", "code") },
        { id: "divider", type: "divider" },
        {
            id: "h1",
            icon: Heading1,
            label: "H1",
            action: () => insertMarkdown("# ", "", "Heading 1"),
        },
        {
            id: "h2",
            icon: Heading2,
            label: "H2",
            action: () => insertMarkdown("## ", "", "Heading 2"),
        },
        {
            id: "h3",
            icon: Heading3,
            label: "H3",
            action: () => insertMarkdown("### ", "", "Heading 3"),
        },
        {
            id: "h4",
            icon: Heading4,
            label: "H4",
            action: () => insertMarkdown("#### ", "", "Heading 4"),
        },
        {
            id: "h5",
            icon: Heading5,
            label: "H5",
            action: () => insertMarkdown("##### ", "", "Heading 5"),
        },
        {
            id: "h6",
            icon: Heading6,
            label: "H6",
            action: () => insertMarkdown("###### ", "", "Heading 6"),
        },
        { type: "divider" },
        {
            id: "quote",
            icon: Quote,
            label: "Quote",
            action: () => insertMarkdown("> ", "", "Quote text"),
        },
        {
            id: "bullet",
            icon: List,
            label: "Bullet List",
            action: () => insertMarkdown("- ", "", "List item"),
        },
        {
            id: "numbered",
            icon: ListOrdered,
            label: "Numbered List",
            action: () => insertMarkdown("1. ", "", "List item"),
        },
        { type: "divider" },
        {
            id: "table",
            icon: Table2,
            label: "Table",
            action: () =>
                insertMarkdown(
                    "| Column 1 | Column 2 |\\n|----------|----------|\\n| Cell 1   | Cell 2   |\\n",
                    "",
                    ""
                ),
        },
        {
            id: "separator",
            icon: SeparatorHorizontalIcon,
            label: "Horizontal Line",
            action: () => insertMarkdown("---", "", ""),
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="sticky top-0 z-40 border-b bg-background">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">
                            {draftId ? `Edit Draft #${draftId}` : "New Draft"}
                        </h1>
                        <div className="flex gap-2">
                            <Button
                                variant={previewMode ? "default" : "outline"}
                                size="sm"
                                onClick={() => setPreviewMode(!previewMode)}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                {previewMode ? "Edit" : "Preview"}
                            </Button>
                            <Button variant="outline" size="sm">
                                Save Draft
                            </Button>
                            <Button size="sm">Publish</Button>
                        </div>
                    </div>

                    <div className="space-y-3 mb-4">
                        <Input
                            placeholder="Blog Title"
                            value={post.title}
                            onChange={(e) => handlePostChange("title", e.target.value)}
                            className="text-lg font-semibold"
                        />
                        <Input
                            placeholder="Short description (SEO meta)"
                            value={post.description}
                            onChange={(e) => handlePostChange("description", e.target.value)}
                            className="text-sm"
                        />
                    </div>

                    <div className="mb-4 relative">
                        {post.headerImage ? (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                                <img
                                    src={post.headerImage}
                                    alt="Blog header"
                                    className="w-full h-full object-cover"
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => handlePostChange("headerImage", "")}
                                >
                                    Remove
                                </Button>
                            </div>
                        ) : (
                            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="flex flex-col items-center">
                                    <Image className="h-8 w-8 text-muted-foreground mb-2" />
                                    <span className="text-sm text-muted-foreground">
                                        Click to upload header image
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                <div className="border-t bg-muted/30 px-4 py-3">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-2 items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={undo}
                                disabled={historyIndex <= 0}
                                title="Undo"
                            >
                                <Undo2 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={redo}
                                disabled={historyIndex >= history.length - 1}
                                title="Redo"
                            >
                                <Redo2 className="h-4 w-4" />
                            </Button>

                            <div className="w-px h-6 bg-border mx-1" />

                            {menuItems.map((item, idx) => {
                                if (item.type === "divider") {
                                    return (
                                        <div
                                            key={`divider-${idx}`}
                                            className="w-px h-6 bg-border mx-1"
                                        />
                                    );
                                }
                                const Icon = item.icon;
                                return (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        size="sm"
                                        onClick={item.action}
                                        title={item.label}
                                        className="px-2"
                                    >
                                        {Icon && <Icon className="h-4 w-4" />}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
                    <div className={cn("flex flex-col", previewMode && "hidden lg:flex")}>
                        <textarea
                            ref={textareaRef}
                            value={post.content}
                            onChange={(e) => handlePostChange("content", e.target.value)}
                            onContextMenu={handleContextMenu}
                            placeholder="Write your blog content here in markdown... Type or use the toolbar buttons to format your text."
                            className="flex-1 w-full p-4 rounded-lg border bg-background text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className={cn("flex flex-col", !previewMode && "hidden lg:flex")}>
                        <div className="flex-1 overflow-auto p-4 rounded-lg border bg-muted/30">
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ node, ...props }) => (
                                            <h1
                                                className="text-3xl font-bold mt-6 mb-3"
                                                {...props}
                                            />
                                        ),
                                        h2: ({ node, ...props }) => (
                                            <h2
                                                className="text-2xl font-bold mt-5 mb-2"
                                                {...props}
                                            />
                                        ),
                                        h3: ({ node, ...props }) => (
                                            <h3
                                                className="text-xl font-bold mt-4 mb-2"
                                                {...props}
                                            />
                                        ),
                                        h4: ({ node, ...props }) => (
                                            <h4
                                                className="text-lg font-bold mt-3 mb-1"
                                                {...props}
                                            />
                                        ),
                                        h5: ({ node, ...props }) => (
                                            <h5 className="text-base font-bold mt-2" {...props} />
                                        ),
                                        h6: ({ node, ...props }) => (
                                            <h6 className="text-sm font-bold mt-2" {...props} />
                                        ),
                                        p: ({ node, ...props }) => (
                                            <p className="my-3 leading-7" {...props} />
                                        ),
                                        blockquote: ({ node, ...props }) => (
                                            <blockquote
                                                className="border-l-4 border-primary pl-4 italic my-3 text-muted-foreground"
                                                {...props}
                                            />
                                        ),
                                        ul: ({ node, ...props }) => (
                                            <ul
                                                className="list-disc list-inside my-3 space-y-1"
                                                {...props}
                                            />
                                        ),
                                        ol: ({ node, ...props }) => (
                                            <ol
                                                className="list-decimal list-inside my-3 space-y-1"
                                                {...props}
                                            />
                                        ),
                                        code: (props: { children?: React.ReactNode }) => {
                                            const { children } = props;
                                            const isInline =
                                                typeof children === "string" &&
                                                !children.includes("\n");
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
                                        table: ({ node, ...props }) => (
                                            <table
                                                className="w-full border-collapse my-3"
                                                {...props}
                                            />
                                        ),
                                        th: ({ node, ...props }) => (
                                            <th
                                                className="border bg-muted px-3 py-2 font-semibold text-left"
                                                {...props}
                                            />
                                        ),
                                        td: ({ node, ...props }) => (
                                            <td className="border px-3 py-2" {...props} />
                                        ),
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
                    </div>
                </div>
            </div>

            {contextMenu.visible && (
                <div
                    className="fixed bg-background border rounded-lg shadow-lg z-50 py-1"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <div className="w-48 max-h-96 overflow-y-auto">
                        {menuItems.map((item) => {
                            if (item.type === "divider") {
                                return <div key={item.id} className="h-px bg-border my-1" />;
                            }
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        item.action?.();
                                        closeContextMenu();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
                                >
                                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
