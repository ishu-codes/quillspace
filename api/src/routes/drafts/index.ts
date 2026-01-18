import { Router, type Response } from "express";

import { asyncHandler } from "../../config/handler";
import { failure, success } from "../../config/response";
import { createDraft, getPostById, publishDraft, updateDraft } from "./controller";
import { requireAuth, type AuthRequest } from "../../middlewares/auth";

const router = Router();

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

router.get(
  "/:postId/publish",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession!;
    const userId = session.user.id;

    const { postId } = req.params;

    const draftPublished = await publishDraft(userId, postId);
    if (!draftPublished)
      return failure(res, 404, "Draft not found with given id");

    return success(res, 200, "Draft published successfully!");
  }),
);

export default router;
