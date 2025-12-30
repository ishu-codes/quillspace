import { Router } from "express";

import { getYourLists, getPosts } from "./controller";
import authConfig from "../../auth";
import { PostType } from "../../types/post";

const router = Router();

router.get("/your-lists", async (req, res) => {
  try {
    const session = await authConfig.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });
    const userId = session.user.id;

    return res.json(await getYourLists(userId));
  } catch (e) {
    return res.send({
      message: `Error to find user! ${e}`,
    });
  }
});

router.get("/posts/:postType", async (req, res) => {
  try {
    const session = await authConfig.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });
    const userId = session.user.id;
    const { postType } = req.params;

    return res.json(await getPosts(userId, postType as PostType));
  } catch (e) {
    return res.send({
      message: `Error to find user! ${e}`,
    });
  }
});

export default router;
