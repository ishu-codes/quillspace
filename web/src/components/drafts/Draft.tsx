import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import type { BlogPost } from "@/types/blog";
import Info from "./Info";
import Editor from "./Editor";
import Preview from "./Preview";
import Titlebar from "./Titlebar";

export default function Draft() {
  const { draftId } = useParams();

  const [post, setPost] = useState<BlogPost>({
    id: parseInt(draftId ?? "1"),
    title: "Untitled",
    desc: "",
    featuredImg: "",
    content: "## Sample content",
    authorId: "1",
    slug: "",
    status: "draft",
    viewsCount: 0,
    createdAt: "2025-12-2 5:43:23",
    updatedAt: "2025-12-2 5:43:23",
  });
  const [currentPage, setCurrentPage] = useState<string>("info");
  const [previewMode, setPreviewMode] = useState(false);

  const handlePostChange = useCallback(
    (field: keyof BlogPost, value: string) => setPost({ ...post, [field]: value }),
    [post],
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePostChange("featuredImg", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-screen flex-col gap-4 mx-auto">
      <Titlebar {...{ currentPage, setCurrentPage, setPreviewMode }} />

      <div className="h-full w-full max-w-full md:w-4xl lg:w-6xl mx-auto pt-14">
        {previewMode ? (
          <Preview {...{ post }} />
        ) : (
          <>
            {currentPage === "info" ? (
              <Info {...{ post, handlePostChange, handleImageUpload }} />
            ) : (
              <Editor
                value={post.content}
                onChange={(newContent) => handlePostChange("content", newContent)}
                placeholder="Write here..."
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
