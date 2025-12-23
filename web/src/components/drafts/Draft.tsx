import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetDraft, useUpdateDraft } from "@/fetchers/drafts";
import type { BlogPost } from "@/types/blog";

import Editor from "./Editor";
import Info from "./Info";
import DraftNotFound from "./NotFound";
import Preview from "./Preview";
import Titlebar from "./Titlebar";
import { toast } from "sonner";

export default function Draft() {
  const { draftId } = useParams();
  const { data: initialPost, isLoading } = useGetDraft(draftId!);
  const { mutateAsync: updateDraft } = useUpdateDraft();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [changedFields, setChangedFields] = useState<(keyof BlogPost)[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("info");
  const [previewMode, setPreviewMode] = useState(false);

  // sync fetched data into state
  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
    }
  }, [initialPost]);

  const handlePostChange = useCallback((field: keyof BlogPost, value: string) => {
    const fieldAlreadyChanged = changedFields.find((f) => f === field);
    if (!fieldAlreadyChanged) setChangedFields((prev) => [...prev, field]);

    setPost((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handlePostChange("featuredImg", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async () => {
    if (!post || !changedFields) return;

    const contentChanged = changedFields.find((f) => f === "content");
    const result = await updateDraft({
      postId: post.id,
      title: post.title,
      desc: post.desc,
      featuredImg: post.featuredImg,
      content: contentChanged ? post.content : null,
    });

    if (result.success) {
      toast.success("Changes saved successfully!");
      setChangedFields([]);
    } else toast.error("Failed to saved the changes!", { description: result?.error });
  };

  if (isLoading) {
    return <Skeleton className="w-full h-100"></Skeleton>;
  }

  if (!post) {
    return <DraftNotFound />;
  }

  return (
    <div className="w-full h-screen flex-col gap-4 mx-auto">
      <Titlebar {...{ currentPage, setCurrentPage, setPreviewMode, handleSaveChanges }} />

      {previewMode ? (
        <Preview {...{ post }} />
      ) : (
        <>
          <div className="h-full w-full max-w-full md:w-4xl lg:w-6xl mx-auto pt-14">
            {currentPage === "info" ? (
              <Info {...{ post, handlePostChange, handleImageUpload }} />
            ) : (
              <Editor
                value={post?.content}
                onChange={(newContent) => handlePostChange("content", newContent)}
                placeholder="Write here..."
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
