import { db } from "../database";

async function getFeed(userId: string) {
	// const followingIds = (await db.follow.findMany({ where: { followerId: userId } })).map((f) => f.followingId);

	// return await db.post.findMany({
	// 	where: { authorId: { in: followingIds } },
	// 	orderBy: { createdAt: "desc" },
	// });
	return db.post.findMany({
		include: {
			author: true,
		},
	});
}

export { getFeed };
