import { db } from "../../database";

export async function getPost(userId: string, postId: string) {
  const bookmarked = await db.bookmark.findFirst({
    where: {
      userId,
      postId,
    },
  });

  const post = await db.post.findUnique({
    include: {
      author: true,
    },
    where: {
      id: postId,
    },
  });

  return { ...post, bookmarked: bookmarked !== null };
}
