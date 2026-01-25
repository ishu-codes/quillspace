import { useUploadFiles } from "@better-upload/client";
import type { ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/components/ui/upload-dropzone";
import type { BlogPost } from "@/types/blog";

interface Props {
    post: BlogPost;
    handlePostChange: (field: keyof BlogPost, value: string) => void;
    handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Info({ post, handlePostChange }: Props) {
    const { control } = useUploadFiles({
        route: "images",
        api: `${import.meta.env.VITE_API_URL}/api/drafts/${post.id}/upload`,
        credentials: "include",
        onUploadComplete: (result) => {
            if (
                result.metadata &&
                result.metadata.urls &&
                Array.isArray(result.metadata.urls) &&
                result.metadata.urls.length > 0
            ) {
                handlePostChange(
                    "featuredImg",
                    result.metadata.urls[0] as string,
                );
            }
        },
    });
    return (
        <div className="pt-8 px-2">
            <div className="mb-4 relative">
                {post?.featuredImg ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                        <img
                            src={post.featuredImg}
                            alt="Blog header"
                            className="w-full h-full object-cover"
                        />
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => handlePostChange("featuredImg", "")}
                        >
                            Remove
                        </Button>
                    </div>
                ) : (
                    // <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                    //   <div className="flex flex-col items-center">
                    //     <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    //     <span className="text-sm text-muted-foreground">Click to upload header image</span>
                    //   </div>
                    //   <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    // </label>
                    <UploadDropzone
                        control={control}
                        accept="image/*"
                        description={{
                            maxFiles: 4,
                            maxFileSize: "5MB",
                            fileTypes: "JPEG, PNG, GIF",
                        }}
                    />
                )}
            </div>
            <div className="space-y-3 mb-4">
                <Input
                    placeholder="Blog Title"
                    value={post?.title}
                    onChange={(e) => handlePostChange("title", e.target.value)}
                    className="text-lg font-semibold"
                />
                <Input
                    placeholder="Short description (SEO meta)"
                    value={post?.desc}
                    onChange={(e) => handlePostChange("desc", e.target.value)}
                    className="text-sm"
                />
            </div>
        </div>
    );
}
