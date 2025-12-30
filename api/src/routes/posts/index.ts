import { Router } from "express";
import type { Request, Response } from "express";

import { asyncHandler } from "../../config/handler";
import { failure, success } from "../../config/response";
import { getPost } from "./controller";

const router = Router();

router.get(
  "/:postId",
  asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    const postFound = await getPost(postId);
    if (!postFound) return failure(res, 404, "Post not found!");

    return success(res, 200, postFound);
  }),
);

export default router;
