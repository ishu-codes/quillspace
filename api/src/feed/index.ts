import { Router } from "express";
import getFeed from "./controllers/get-feed";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // const userId = req.body.userId;
    const feed = await getFeed("");
    return res.json(feed);
  } catch (e) {
    return res.send({
      message: `Error to find user! ${e}`,
    });
  }
});

export default router;
