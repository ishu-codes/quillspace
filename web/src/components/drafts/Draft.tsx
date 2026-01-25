import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import {
    useDeleteDraftImage,
    useGetDraft,
    usePublishDraft,
    useUpdateDraft,
    useUploadDraftImage,
} from "@/fetchers/drafts";
import type { BlogPost } from "@/types/blog";

import { toast } from "sonner";
import Editor from "./Editor";
import Info from "./Info";
import DraftNotFound from "./NotFound";
import Preview from "./Preview";
import Titlebar from "./Titlebar";

export default function DraftPage() {
    const { draftId } = useParams();

    if (!draftId) return <DraftNotFound message="Invalid Draft Id!" />;
    return <Draft {...{ draftId }} />;
}

export function Draft({ draftId }: { draftId: string }) {
    const { data: initialPost, isLoading, refetch } = useGetDraft(draftId);
    const { mutateAsync: updateDraft } = useUpdateDraft();
    const { mutateAsync: publishDraft } = usePublishDraft();
    const { mutateAsync: uploadImage, isPending: isUploading } =
        useUploadDraftImage();
    const { mutateAsync: deleteImage, isPending: isDeleting } =
        useDeleteDraftImage();

    const [post, setPost] = useState<BlogPost | null>(null);
    const [changedFields, setChangedFields] = useState<(keyof BlogPost)[]>([]);
    const [currentPage, setCurrentPage] = useState<string>("info");
    const [previewMode, setPreviewMode] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // sync fetched data into state
    useEffect(() => {
        if (initialPost) {
            setPost(initialPost);
        }
    }, [initialPost]);

    const handlePostChange = useCallback(
        (field: keyof BlogPost, value: string) => {
            const fieldAlreadyChanged = changedFields.find((f) => f === field);
            if (!fieldAlreadyChanged)
                setChangedFields((prev) => [...prev, field]);

            setPost((prev) => (prev ? { ...prev, [field]: value } : prev));
        },
        [changedFields],
    );

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file || !post) return;

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image too large", {
                description: "Maximum file size is 5MB",
            });
            return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type", {
                description: "Please upload an image file",
            });
            return;
        }

        try {
            setUploadProgress(0);
            const result = await uploadImage({
                postId: post.id,
                file,
                onProgress: (progress) => setUploadProgress(progress),
            });

            if (result.success && result.data?.url) {
                setPost((prev) =>
                    prev ? { ...prev, featuredImg: result.data!.url } : prev,
                );
                toast.success("Image uploaded successfully!");
                // Refetch to sync with server
                refetch();
            } else {
                toast.error("Upload failed", { description: result.error });
            }
        } catch (err) {
            toast.error("Upload failed", {
                description:
                    err instanceof Error ? err.message : "Unknown error",
            });
        } finally {
            setUploadProgress(0);
            // Reset the input so the same file can be selected again
            e.target.value = "";
        }
    };

    const handleImageDelete = async () => {
        if (!post) return;

        try {
            const result = await deleteImage({ postId: post.id });

            if (result.success) {
                setPost((prev) => (prev ? { ...prev, featuredImg: "" } : prev));
                toast.success("Image removed successfully!");
                refetch();
            } else {
                toast.error("Failed to remove image", {
                    description: result.error,
                });
            }
        } catch (err) {
            toast.error("Failed to remove image", {
                description:
                    err instanceof Error ? err.message : "Unknown error",
            });
        }
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
        } else
            toast.error("Failed to saved the changes!", {
                description: result?.error,
            });
    };

    const handlePublishDraft = async () => {
        const result = await publishDraft({ postId: draftId });

        if (result.success) toast.success(result.data);
        else toast.error(result.error);
    };

    if (isLoading) {
        return <Skeleton className="w-full h-100"></Skeleton>;
    }

    if (!post) {
        return <DraftNotFound />;
    }

    return (
        <div className="w-full h-screen flex-col gap-4 mx-auto">
            <Titlebar
                {...{
                    post,
                    currentPage,
                    setCurrentPage,
                    setPreviewMode,
                    handleSaveChanges,
                    handlePublishDraft,
                }}
            />

            {previewMode ? (
                <Preview {...{ post }} />
            ) : (
                <>
                    <div className="h-full w-full max-w-full md:w-4xl lg:w-6xl mx-auto pt-14">
                        {currentPage === "info" ? (
                            <Info
                                post={post}
                                handlePostChange={handlePostChange}
                                handleImageUpload={handleImageUpload}
                                handleImageDelete={handleImageDelete}
                                isUploading={isUploading}
                                isDeleting={isDeleting}
                                uploadProgress={uploadProgress}
                            />
                        ) : (
                            <Editor
                                value={post?.content}
                                onChange={(newContent) =>
                                    handlePostChange("content", newContent)
                                }
                                placeholder="Write here..."
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
