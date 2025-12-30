import { db } from "../../database";

export async function createBookmark(userId: string, postId: string) {
  return await db.bookmark.create({
    data: {
      userId,
      postId: Number(postId),
    },
  });
}
export async function getBookmarks(userId: string) {
  return await db.bookmark.findMany({
    where: {
      userId,
    },
  });
}
export async function deleteBookmark(userId: string, postId: string, bookmarkId: string) {
  return await db.bookmark.delete({
    where: {
      id: Number(bookmarkId),
      userId,
      postId: Number(postId),
    },
  });
}
