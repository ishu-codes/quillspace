// import { useParams } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
// import { Button } from "@/components/ui/button";
import type { BlogPost, ContextMenu, MenuItem } from "@/types/blog";
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
    // Eye,
    Code,
    SeparatorHorizontalIcon,
    Quote,
} from "lucide-react";
// import { ButtonGroup } from "../ui/button-group";
import Info from "./Info";
import Editor from "./Editor";
import Preview from "./Preview";
// import { Separator } from "../ui/separator";
import Titlebar from "./Titlebar";

// interface BlogPost {
//     title: string;
//     description: string;
//     headerImage: string;
//     content: string;
// }

export default function Draft() {
    // const { draftId } = useParams();
    const [post, setPost] = useState<BlogPost>({
        title: "",
        description: "",
        headerImage: "",
        content: "## Sample content",
    });

    const [currentPage, setCurrentPage] = useState<string>("info");

    const [previewMode, setPreviewMode] = useState(false);
    const [contextMenu, setContextMenu] = useState<ContextMenu>({
        x: 0,
        y: 0,
        visible: false,
    });
    const textareaRef = useRef<HTMLParagraphElement>(null);
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
            console.log("Handing post change!");
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
            // const textarea = textareaRef.current;
            // if (!textarea) return;
            // const start = textarea.onselectstart;
            // const end = textarea.selectionEnd;
            // const selectedText = post.content.substring(start, end) || placeholder;
            // const before_text = post.content.substring(0, start);
            // const after_text = post.content.substring(end);
            // const newContent = before_text + before + selectedText + after + after_text;
            // setPost((prev) => ({ ...prev, content: newContent }));
            // setTimeout(() => {
            //     textarea.focus();
            //     const newCursorPos = start + before.length + selectedText.length;
            //     textarea.setSelectionRange(newCursorPos, newCursorPos);
            // }, 0);
        },
        [post.content]
    );

    const handleContextMenu = (e: React.MouseEvent<HTMLParagraphElement>) => {
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
        <div className="w-full h-screen flex-col gap-4 mx-auto">
            <Titlebar {...{ currentPage, setCurrentPage, setPreviewMode }} />

            <div className="h-full w-full md:w-6xl mx-auto pt-14">
                {previewMode ? (
                    <Preview {...{ post }} />
                ) : (
                    <>
                        {currentPage === "info" ? (
                            <Info {...{ post, handlePostChange, handleImageUpload }} />
                        ) : (
                            <Editor
                                {...{
                                    textareaRef,
                                    historyIndex,
                                    post,
                                    menuItems,
                                    contextMenu,
                                    undo,
                                    redo,
                                    handlePostChange,
                                    handleContextMenu,
                                    closeContextMenu,
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
