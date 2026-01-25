import { Router, type Response } from "express";

import { asyncHandler } from "../../config/handler.js";
import { failure, success } from "../../config/response.js";
import { follow, getFollowers, getFollowings, getUserInfo, getUserPosts, unfollow } from "./controller.js";
import { requireAuth, type AuthRequest } from "../../middlewares/auth.js";

const router = Router();

router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession;

    const { userId } = req.params;

    const userInfo = await getUserInfo(userId, session.user.id);
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

router.post(
  "/:userId/follow",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession;
    const originalUserId = session.user.id;

    const { userId } = req.params;

    const result = await follow(originalUserId, userId);
    if (!result) return failure(res, 404, `User not found with id '${userId}'`);

    return success(res, 201, `You're now following ${result.name}`);
  }),
);

router.delete(
  "/:userId/unfollow",
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const session = req.authSession;
    const originalUserId = session.user.id;

    const { userId } = req.params;

    const result = await unfollow(originalUserId, userId);
    if (!result) return failure(res, 404, `User not found with id '${userId}'`);

    return success(res, 200, `You're now not following ${result.name}`);
  }),
);

export default router;
