import { db } from "../database";

export async function getYourLists(userId: string) {
  const [publishedPostsCount, draftsCount, bookmarkedCount, yourLists] = await Promise.all([
    db.post.count({
      where: {
        authorId: userId,
        status: "published",
      },
    }),

    db.post.count({
      where: {
        authorId: userId,
        status: "draft",
      },
    }),

    db.bookmark.count({
      where: {
        userId,
      },
    }),

    db.list.findMany({
      where: {
        authorId: userId,
      },
    }),
  ]);

  return {
    postsCount: publishedPostsCount,
    draftsCount,
    bookmarkedCount,
    list: yourLists,
  };
}

export async function getPosts(userId: string, postType: "draft" | "published" | "archived") {
  return await db.post.findMany({
    where: {
      authorId: userId,
      status: postType,
    },
  });
}
