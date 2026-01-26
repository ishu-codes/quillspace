import { useDeleteDraftImage, useUploadDraftImage } from "@/fetchers/drafts";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UseImageUploadProps {
  postId: string;
  onSuccess?: (url: string) => void;
  onDeleteSuccess?: () => void;
  maxSizeMB?: number;
}

export function useImageUpload({ postId, onSuccess, onDeleteSuccess, maxSizeMB = 5 }: UseImageUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadDraftImage();
  const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteDraftImage();

  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error("Image too large", {
          description: `Maximum file size is ${maxSizeMB}MB`,
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
          postId,
          file,
          // onProgress: (progress) => setUploadProgress(progress),
        });

        if (result.success && result.data?.urls) {
          toast.success("Image uploaded successfully!");
          onSuccess?.(result.data.urls[0]);
        } else {
          toast.error("Upload failed", { description: result.error });
        }
      } catch (err) {
        toast.error("Upload failed", {
          description: err instanceof Error ? err.message : "Unknown error",
        });
      } finally {
        setUploadProgress(0);
        e.target.value = ""; // Reset input
      }
    },
    [postId, uploadImage, onSuccess, maxSizeMB],
  );

  const remove = useCallback(async () => {
    try {
      const result = await deleteImage({ postId });

      if (result.success) {
        toast.success("Image removed successfully!");
        onDeleteSuccess?.();
      } else {
        toast.error("Failed to remove image", {
          description: result.error,
        });
      }
    } catch (err) {
      toast.error("Failed to remove image", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }, [postId, deleteImage, onDeleteSuccess]);

  return {
    upload,
    remove,
    isUploading,
    isDeleting,
    uploadProgress,
  };
}
