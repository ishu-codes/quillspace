import path from "path";
import { type Router, route } from "@better-upload/server";
import { putObject } from "@better-upload/server/helpers";
import { Session } from "@supabase/supabase-js";
import { STORAGE_BUCKET, s3 } from "./supabase";

const extractFileName = (fileName: string) => {
  return path.parse(fileName).name;
};

export const imageRouter: Router = {
  client: s3,
  bucketName: STORAGE_BUCKET,
  routes: {
    images: route({
      fileTypes: ["image/*"],
      multipleFiles: true,
      maxFiles: 10,
      onBeforeUpload: async ({ req }) => {
        const url = new URL(req.url);
        const parts = url.pathname.split("/");
        const draftsIdx = parts.indexOf("drafts");
        const postId = draftsIdx !== -1 && parts[draftsIdx + 1] ? parts[draftsIdx + 1] : "unknown";

        const userId = req.headers.get("x-user-id") || "unknown-user";

        return {
          generateObjectInfo: ({ file }) => {
            const name = extractFileName(file.name);
            // const key = `${userId}/${postId}/${crypto.randomUUID()}_${name}`;
            const key = `${crypto.randomUUID()}_${name}`;
            return {
              key,
              contentType: file.type,
            };
          },
        };
      },
      onAfterSignedUrl: async ({ files }) => {
        const urls = files.map(
          (file) =>
            `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${STORAGE_BUCKET}/${file.objectInfo.key}`,
        );
        return {
          metadata: {
            urls,
          },
        };
      },
    }),
  },
};

const projectId = process.env.SUPABASE_PROJECT_ID ?? "";

// Kept for reference or backward compatibility if needed
const success = (urls: string[], message = "") => {
  return { success: true, message, urls };
};
const failure = (message = "", urls = []) => {
  return { success: false, message, urls };
};

// @ts-ignore
const uploadImages = async (userId: string, postId: string, files: any[]) => {
  try {
    const uploads = files.map((file) => {
      const path = `${userId}/${postId}`;
      const key = `${crypto.randomUUID()}_${extractFileName(file.name)}`;
      return {
        key,
        promise: putObject(s3, {
          bucket: STORAGE_BUCKET,
          key: `${path}/${key}`,
          body: new Uint8Array(file.buffer),
          contentType: file.type || file.mimetype,
        }),
      };
    });

    const results = await Promise.allSettled(uploads.map((u) => u.promise));
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length) {
      return failure(`Some uploads failed\n${failed}`);
    }

    const urls = uploads.map(
      (u) =>
        `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${STORAGE_BUCKET}/${u.key}`,
    );
    return success(urls as string[], "Uploaded succesfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { uploadImages };
