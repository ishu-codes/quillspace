import { Router, type Response } from "express";

import { asyncHandler } from "../config/handler";
import { failure, success } from "../config/response";
import { getFollowers, getFollowings, getUserInfo, getUserPosts } from "./controller";
import { requireAuth, type AuthRequest } from "../middlewares/auth";

const router = Router();

router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    // const session = req.authSession!;

    const { userId } = req.params;

    const userInfo = await getUserInfo(userId);
    if (!userInfo) return failure(res, 404, "Error to fetch info");

    console.log(`/users/${userId} userInfo`);
    return success(res, 200, userInfo);
  }),
);

router.get(
  "/:userId/posts",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    // const session = req.authSession!;

    const { userId } = req.params;

    const userPosts = await getUserPosts(userId);
    if (!userPosts) return failure(res, 404, "Error to fetch posts");

    console.log(`/users/${userId} userPosts`);
    return success(res, 200, userPosts);
  }),
);

router.get(
  "/:userId/followers",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    // const session = req.authSession!;

    const { userId } = req.params;

    const followers = await getFollowers(userId);
    if (!followers) return failure(res, 404, "Error to fetch followers");

    console.log(`/users/${userId} userPosts`);
    return success(res, 200, followers);
  }),
);
router.get(
  "/:userId/following",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    // const session = req.authSession!;

    const { userId } = req.params;

    const followings = await getFollowings(userId);
    if (!followings) return failure(res, 404, "Error to fetch following");

    console.log(`/users/${userId} userPosts`);
    return success(res, 200, followings);
  }),
);

export default router;
