import type { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { ImageIcon } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { Button } from "../ui/button";

interface Props {
    post: BlogPost;
    handlePostChange: (field: keyof BlogPost, value: string) => void;
    handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Info({ post, handlePostChange, handleImageUpload }: Props) {
    return (
        <div className="pt-8 px-2">
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
                            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
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
        </div>
    );
}
