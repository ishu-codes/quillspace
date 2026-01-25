import { ArrowLeftIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface Props {
    post: BlogPost;
    currentPage: string;
    setCurrentPage: Dispatch<SetStateAction<string>>;
    setPreviewMode: Dispatch<SetStateAction<boolean>>;
    handleSaveChanges: () => Promise<void>;
    handlePublishDraft: () => Promise<void>;
}

export default function Titlebar({
    post,
    currentPage,
    setCurrentPage,
    setPreviewMode,
    handleSaveChanges,
    handlePublishDraft,
}: Props) {
    const navigate = useNavigate();
    return (
        <div className="w-full h-20 flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl border-b border-border/50 fixed top-0 z-40">
            <div className="flex items-center gap-6">
                <Button
                    variant={"ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </Button>

                <div className="flex bg-muted/50 p-1 rounded-2xl border border-border/50">
                    {[
                        { key: "info", title: "Details" },
                        { key: "editor", title: "Write" },
                        { key: "preview", title: "Preview" },
                    ].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => {
                                setCurrentPage(item.key);
                                setPreviewMode(item.key === "preview");
                            }}
                            className={cn(
                                "px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all",
                                currentPage === item.key
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />
                <div className="h-6 w-px bg-border mx-2" />
                <Button
                    variant="outline"
                    className="rounded-full px-6 font-bold"
                    onClick={handleSaveChanges}
                >
                    Save
                </Button>

                {post?.status === "PUBLISHED" ? (
                    <Button
                        className="rounded-full px-6 font-bold shadow-lg shadow-foreground/10"
                        asChild
                    >
                        <Link to={`/posts/${post.id}`}>View live</Link>
                    </Button>
                ) : (
                    <Button
                        className="rounded-full px-6 font-bold shadow-lg shadow-foreground/10"
                        onClick={handlePublishDraft}
                    >
                        Publish
                    </Button>
                )}
            </div>
        </div>
    );
}
