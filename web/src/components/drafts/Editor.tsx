import { useCallback, useEffect } from "react";
import type { MouseEvent, RefObject } from "react";
// import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import type { BlogPost, ContextMenu, MenuItem } from "@/types/blog";

interface Props {
    textareaRef: RefObject<HTMLParagraphElement | null>;
    historyIndex: number;
    post: BlogPost;
    menuItems: MenuItem[];
    contextMenu: ContextMenu;
    undo: () => void;
    redo: () => void;
    handlePostChange: (field: keyof BlogPost, value: string) => void;
    handleContextMenu: (e: MouseEvent<HTMLParagraphElement>) => void;
    closeContextMenu: () => void;
}

export default function Editor({
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
}: Props) {
    const scrollBelow = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    };

    return (
        <div className="h-full flex flex-col-reverse md:flex-col">
            <div className="w-full md:w-full flex flex-col mx-auto bg-background border-y md:sticky bottom-0 md:top-14 overflow-x-auto whitespace-nowrap">
                <div className="w-full flex gap-2 items-center px-4 py-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={undo}
                        disabled={historyIndex <= 0}
                        title="Undo"
                    >
                        <Undo2Icon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={redo}
                        disabled={historyIndex >= history.length - 1}
                        title="Redo"
                    >
                        <Redo2Icon className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-6 bg-border mx-1" />

                    {menuItems.map((item, idx) => {
                        if (item.type === "divider") {
                            return (
                                <div key={`divider-${idx}`} className="w-px h-6 bg-border mx-1" />
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

                    {/* <div className="w-4" /> */}
                    {/* <div className="w-[3px] h-6 bg-border mx-2" /> */}
                </div>
            </div>
            {/* <div className={cn("flex-1 flex flex-col")}> */}
            <p
                suppressContentEditableWarning={true}
                contentEditable={true}
                ref={textareaRef}
                onInput={scrollBelow}
                onBlur={() =>
                    handlePostChange(
                        "content",
                        textareaRef.current?.innerText ?? "unable to capture text"
                    )
                }
                onContextMenu={handleContextMenu}
                // placeholder="Write your blog content here in markdown... Type or use the toolbar buttons to format your text."
                className="flex-1 w-full p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-0 overflow-y-auto"
            >
                {post.content}
            </p>
            {/* </div> */}

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
