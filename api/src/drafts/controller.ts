import { db } from "../database";

function generateSlug(title: string) {
	return title.replace(" ", "-");
}

export async function createDraft(
	userId: string,
	title: string,
	desc: string | null = null,
	featuredImg: string | null = null,
	slug: string | null = null,
) {
	return await db.post.create({
		data: {
			authorId: userId,
			title,
			desc: desc ?? "",
			content: "",
			featuredImg: featuredImg ?? "",
			slug: slug ?? generateSlug(title),
		},
	});
}
