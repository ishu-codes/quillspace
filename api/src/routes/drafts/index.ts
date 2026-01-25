// import multer from "multer";
import { handleRequest } from "@better-upload/server";
import { type Response, Router } from "express";

import { asyncHandler } from "../../config/handler.js";
import { failure, success } from "../../config/response.js";
import { imageRouter } from "../../config/upload.js";
import { type AuthRequest, requireAuth } from "../../middlewares/auth.js";
import { createDraft, deleteDraftImage, getPostById, publishDraft, updateDraft } from "./controller.js";

const router = Router();

// Configure multer for memory storage
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: (_req, file, cb) => {
//     // Accept only image files
//     if (file.mimetype.startsWith("image/*")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed"));
//     }
//   },
// });

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession!;
    const userId = session.user.id;

    const { title, desc } = req.body;
    const draftCreated = await createDraft(userId, title, desc);
    return success(res, 201, draftCreated);
  }),
);

router.get(
  "/:postId",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession!;
    const userId = session.user.id;

    const { postId } = req.params;

    const postFound = await getPostById(postId, userId);
    if (!postFound) {
      return failure(res, 404, "Draft not found with given id");
    }

    return success(res, 200, postFound);
  }),
);

router.put(
  "/:postId",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession!;
    const userId = session.user.id;

    const { postId } = req.params;
    const { title, desc, featuredImg, content } = req.body;

    const postUpdated = await updateDraft(userId, postId, title, desc, featuredImg, content);
    if (!postUpdated) {
      return failure(res, 404, "Draft not found with given id");
    }

    return success(res, 200, "Draft updated successfully!");
  }),
);

// Upload featured image for a draft
router.post(
  "/:postId/upload",
  requireAuth,
  // upload.array("image", 10),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession!;
    const userId = session.user.id;
    // const { postId } = req.params;

    // Construct Web Request
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const webReq = new Request(fullUrl, {
      method: req.method,
      headers: new Headers(req.headers as any),
      body: JSON.stringify(req.body),
    });
    webReq.headers.set("x-user-id", userId);

    const response = await handleRequest(webReq, imageRouter);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return success(res, response.status, jsonResponse, response.headers);
  }),
);

// Delete featured image for a draft
router.delete(
  "/:postId/upload",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession!;
    const userId = session.user.id;
    const { postId } = req.params;

    const result = await deleteDraftImage(userId, postId);

    if (!result.success) {
      return failure(res, 400, result.error || "Delete failed");
    }

    return success(res, 200, "Image deleted successfully");
  }),
);

router.get(
  "/:postId/publish",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession!;
    const userId = session.user.id;

    const { postId } = req.params;

    const draftPublished = await publishDraft(userId, postId);
    if (!draftPublished) return failure(res, 404, "Draft not found with given id");

    return success(res, 200, "Draft published successfully!");
  }),
);

export default router;
