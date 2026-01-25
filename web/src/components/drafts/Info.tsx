import { ImageIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadDraftImage } from "@/fetchers/drafts";
import type { BlogPost } from "@/types/blog";
import { toast } from "sonner";

interface Props {
  post: BlogPost;
  handlePostChange: (field: keyof BlogPost, value: string) => void;
}

export default function Info({ post, handlePostChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync: uploadImage } = useUploadDraftImage();

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max size is 5MB.");
      return;
    }

    setIsUploading(true);

    uploadImage(
      { postId: post.id, file },
      {
        onSuccess: (result) => {
          if (result.success && result.data && result.data.urls && result.data.urls.length > 0) {
            handlePostChange("featuredImg", result.data.urls[0]);
            toast.success("Image uploaded successfully!");
          } else {
            toast.error("Upload failed: No URL returned");
          }
          setIsUploading(false);
        },
        onError: (error) => {
          console.error("Upload error:", error);
          toast.error(error.message || "Failed to upload image");
          setIsUploading(false);
        },
      },
    );
  };

  return (
    <div className="pt-8 px-2">
      <div className="mb-4 relative">
        {post?.featuredImg ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
            <img src={post.featuredImg} alt="Blog header" className="w-full h-full object-cover" />
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
          <label
            className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex flex-col items-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {isUploading ? "Uploading..." : "Click to upload header image"}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
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
