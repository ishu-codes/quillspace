import { Router } from "express";
import { getMyLists, createMyList } from "./controllers/my-lists";

const router = Router();

router.get("/my-lists", async (_, res) => {
    try {
        // const userId = req.body.userId;
        const myLists = await getMyLists("");
        return myLists;
    } catch (err) {
        return res.send({
            message: `Error while fetching your lists! ${err}`,
        });
    }
});

router.post("/my-lists", async (req, res) => {
    try {
        const { userId, title, desc } = req.body;
        const createdList = await createMyList(userId, title, desc ?? null);
        return res.sendStatus(201).send(createdList);
    } catch (err) {
        return res.send({
            message: `Error while parsing request body! ${err}`,
        });
    }
});

export default router;
