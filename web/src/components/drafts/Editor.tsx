import { cn } from "@/lib/utils";

import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import {
    EditorContent,
    type Editor as TiptapEditor,
    useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
    Bold,
    Code,
    HighlighterIcon,
    Italic,
    Link2Icon,
    List,
    ListOrdered,
    Quote,
    TypeIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const TEXT_OPTIONS = [
    {
        label: "Normal text",
        value: "paragraph",
        icon: <TypeIcon className="w-4 h-4" />,
    },
    {
        label: "Heading 1",
        value: "h1",
        icon: <span className="text-sm font-bold">H1</span>,
    },
    {
        label: "Heading 2",
        value: "h2",
        icon: <span className="text-sm font-bold">H2</span>,
    },
];

export default function Editor({
    value,
    onChange,
    placeholder = "Write something...",
}: EditorProps) {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "h-full flex-1 focus:outline-none",
            },
        },
        parseOptions: {
            preserveWhitespace: "full",
        },
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: "block rounded-2xl bg-muted p-6 font-mono text-sm my-8",
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: "text-muted-foreground italic border-l-4 border-foreground/20 py-2 pl-6 my-8",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal pl-6 my-6",
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc pl-6 my-6",
                    },
                },
                link: false,
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: "https",
                HTMLAttributes: {
                    class: "text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-all cursor-pointer",
                },
            }),
            Highlight.configure({
                HTMLAttributes: {
                    class: "bg-foreground/10 rounded-sm px-1",
                },
            }),
            TaskList.configure({
                HTMLAttributes: {
                    class: "not-prose pl-2",
                },
            }),
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: "flex gap-2 items-start",
                },
            }),
            Markdown.configure({
                html: true,
                tightLists: true,
                linkify: true,
                breaks: true,
                transformPastedText: true,
                transformCopiedText: true,
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        onUpdate: ({ editor }: { editor: TiptapEditor }) => {
            // @ts-ignore
            const markdown = editor.storage.markdown.getMarkdown();
            onChange(markdown);
        },
    });

    useEffect(() => {
        // @ts-ignore
        if (editor && value !== editor.storage.markdown.getMarkdown()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    const getCurrentTextStyle = () => {
        if (!editor) return TEXT_OPTIONS[0];
        if (editor.isActive("heading", { level: 1 })) return TEXT_OPTIONS[1];
        if (editor.isActive("heading", { level: 2 })) return TEXT_OPTIONS[2];
        return TEXT_OPTIONS[0];
    };

    const handleSetText = (value: string) => {
        if (!editor) return;
        switch (value) {
            case "paragraph":
                editor.chain().focus().setParagraph().run();
                break;

            case "h1":
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                break;

            case "h2":
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full h-full flex flex-col bg-background">
            <div className="w-full flex items-center justify-between px-6 py-3 border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-20">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    <HoverCard openDelay={0} closeDelay={0}>
                        <HoverCardTrigger asChild>
                            <button
                                type="button"
                                className="h-10 px-4 rounded-xl flex items-center gap-2 hover:bg-muted transition-colors text-sm font-bold uppercase tracking-widest"
                            >
                                {getCurrentTextStyle().label}
                            </button>
                        </HoverCardTrigger>
                        <HoverCardContent
                            className="w-48 p-2 flex flex-col gap-1 rounded-2xl shadow-2xl border-border/50 bg-background"
                            align="start"
                        >
                            {TEXT_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSetText(option.value)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors",
                                        editor.isActive(
                                            option.value === "paragraph"
                                                ? "paragraph"
                                                : "heading",
                                            option.value !== "paragraph"
                                                ? {
                                                      level: Number(
                                                          option.value.slice(1),
                                                      ),
                                                  }
                                                : {},
                                        )
                                            ? "bg-foreground text-background"
                                            : "hover:bg-muted",
                                    )}
                                >
                                    {option.icon}
                                    {option.label}
                                </button>
                            ))}
                        </HoverCardContent>
                    </HoverCard>

                    <div className="w-px h-6 bg-border mx-2" />

                    <div className="flex items-center gap-0.5">
                        {[
                            {
                                icon: Bold,
                                action: () =>
                                    editor.chain().focus().toggleBold().run(),
                                active: "bold",
                            },
                            {
                                icon: Italic,
                                action: () =>
                                    editor.chain().focus().toggleItalic().run(),
                                active: "italic",
                            },
                            // @ts-ignore
                            {
                                icon: HighlighterIcon,
                                action: () =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight()
                                        .run(),
                                active: "highlight",
                            },
                        ].map((tool, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={tool.action}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center rounded-xl transition-all",
                                    editor.isActive(tool.active)
                                        ? "bg-foreground text-background scale-95 shadow-lg shadow-foreground/10"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                                )}
                            >
                                <tool.icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-border mx-2" />

                    <div className="flex items-center gap-0.5">
                        {[
                            {
                                icon: List,
                                action: () =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleBulletList()
                                        .run(),
                                active: "bulletList",
                            },
                            {
                                icon: ListOrdered,
                                action: () =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleOrderedList()
                                        .run(),
                                active: "orderedList",
                            },
                            {
                                icon: Quote,
                                action: () =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleBlockquote()
                                        .run(),
                                active: "blockquote",
                            },
                            {
                                icon: Code,
                                action: () =>
                                    editor.chain().focus().toggleCode().run(),
                                active: "code",
                            },
                        ].map((tool, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={tool.action}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center rounded-xl transition-all",
                                    editor.isActive(tool.active)
                                        ? "bg-foreground text-background scale-95 shadow-lg shadow-foreground/10"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                                )}
                            >
                                <tool.icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-border mx-2" />

                    <button
                        type="button"
                        onClick={() => {
                            const url = window.prompt("Enter URL:");
                            if (url)
                                editor
                                    .chain()
                                    .focus()
                                    .setLink({ href: url })
                                    .run();
                        }}
                        className={cn(
                            "w-10 h-10 flex items-center justify-center rounded-xl transition-all",
                            editor.isActive("link")
                                ? "bg-foreground text-background"
                                : "hover:bg-muted text-muted-foreground",
                        )}
                    >
                        <Link2Icon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div
                className="flex-1 overflow-y-auto cursor-text selection:bg-foreground selection:text-background"
                onClick={() => editor.chain().focus().run()}
            >
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <EditorContent
                        editor={editor}
                        className="prose prose-xl prose-stone dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/90 [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:text-muted-foreground/50 [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
}
