import { Router } from "express";
import { createDraft } from "./controller";
import authConfig from "../auth";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const session = await authConfig.api.getSession({ headers: req.headers });
		if (!session) return res.status(401).json({ error: "Unauthorized" });

		const userId = session.user.id;

		const { title, desc } = req.body;
		const feed = await createDraft(userId, title, desc);

		console.log(`[${new Date().toLocaleTimeString()}]: User name: ${session.user.name}`);
		return res.json(feed).sendStatus(201);
	} catch (e) {
		return res.send({
			message: `Error to find user! ${e}`,
		});
	}
});

export default router;
