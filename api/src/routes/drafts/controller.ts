import type { Post } from "@prisma/client";

import { db } from "../../database";

function generateSlug(title: string) {
  return title.replace(" ", "-");
}

export async function getPostById(postId: string, userId: string) {
  return await db.post.findUnique({
    where: {
      id: postId,
      authorId: userId,
    },
  });
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
): Promise<Post | false> {
  // const id = Number(postId);
  // if (!Number.isInteger(id)) return false;

  try {
    return await db.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        ...(title !== null && { title }),
        ...(desc !== null && { desc }),
        ...(content !== null && { content }),
        ...(featuredImg !== null && { featuredImg }),
        // ...(slug !== null && { slug },
        // slug: slug ?? defaultPost?.slug ?? generateSlug(title ?? "no-slug"),
      },
    });
  } catch {
    return false;
  }
}

export async function publishDraft(userId: string, postId: string): Promise<Post | false> {
  try {
    return await db.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
  } catch {
    return false;
  }
}
