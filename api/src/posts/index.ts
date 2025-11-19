import { Router } from "express";
import { getPost } from "./controller";

const router = Router();

router.get("/:postId", async (req, res) => {
	try {
		const { postId } = req.params;
		const postFound = await getPost(postId);
		return res.json(postFound);
	} catch (e) {
		return res.send({
			message: `Error while retrieving post! ${e}`,
		});
	}
});

export default router;
