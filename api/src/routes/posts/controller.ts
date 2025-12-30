import { db } from "../../database";

export async function getPost(postId: string) {
  return db.post.findFirst({
    include: {
      author: true,
    },
    where: {
      id: parseInt(postId),
    },
  });
}
