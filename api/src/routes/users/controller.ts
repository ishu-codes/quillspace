import { db } from "../../database";

export async function getUserInfo(userId: string) {
  const [userInfo, postsCount, followersCount, followingCount] = await Promise.all([
    // User info
    db.userInfo.findUnique({
      where: {
        userId,
      },
      select: {
        username: true,
        userId: true,
        bio: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    }),

    // Published posts count
    db.post.count({
      where: {
        authorId: userId,
        status: "PUBLISHED",
      },
    }),

    // Followers count
    db.follow.count({
      where: {
        followingId: userId,
      },
    }),

    // Following count
    db.follow.count({
      where: {
        followerId: userId,
      },
    }),
  ]);
  if (!userInfo) return false;

  return {
    user: {
      userId,
      username: userInfo?.username,
      bio: userInfo?.bio,
      ...userInfo?.user,
    },
    postsCount,
    followersCount,
    followingCount,
  };
}

export async function getUserPosts(userId: string) {
  return await db.post.findMany({
    select: {
      id: true,
      title: true,
      featuredImg: true,
      slug: true,
      publishedAt: true,
      viewsCount: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    where: {
      authorId: userId,
      status: "PUBLISHED",
    },
  });
}

export async function getFollowers(userId: string) {
  const followers = await db.follow.findMany({
    where: {
      followingId: userId,
    },
    select: {
      follower: {
        select: {
          id: true,
          name: true,
          image: true,
          userInfo: {
            select: {
              username: true,
            },
          },
          // followedByYou?: boolean;
        },
      },
    },
  });
  return followers.map((f) => ({
    id: f.follower.id,
    name: f.follower.name,
    image: f.follower.image,
    username: f.follower.userInfo?.username,
  }));
}
export async function getFollowings(userId: string) {
  const followings = await db.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      following: {
        select: {
          id: true,
          name: true,
          image: true,
          userInfo: {
            select: {
              username: true,
            },
          },
          // followedByYou?: boolean;
        },
      },
    },
  });
  return followings.map((f) => ({
    id: f.following.id,
    name: f.following.name,
    image: f.following.image,
    username: f.following.userInfo?.username,
  }));
}
