import { db } from "../database";

function generateSlug(title: string) {
  return title.replace(" ", "-");
}

export async function createDraft(userId: string, title: string, desc: string | null = null) {
  return await db.post.create({
    data: {
      authorId: userId,
      title,
      desc: desc ?? "",
      content: "",
      featuredImg: "",
      slug: generateSlug(title),
    },
  });
}

export async function updateDraft(
  userId: string,
  postId: string,
  title: string | null,
  desc: string | null = null,
  featuredImg: string | null = null,
  // slug: string | null = null,
  content: string | null,
) {
  const defaultPost = await db.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });
  return await db.post.update({
    data: {
      title: title ?? defaultPost?.title ?? "",
      desc: desc ?? defaultPost?.desc ?? "",
      content: content ?? defaultPost?.content ?? "",
      featuredImg: featuredImg ?? defaultPost?.featuredImg ?? "",
      // slug: slug ?? defaultPost?.slug ?? generateSlug(title ?? "no-slug"),
    },
    where: {
      id: parseInt(postId),
      authorId: userId,
    },
  });
}
