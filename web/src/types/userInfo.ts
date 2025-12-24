export type UserProfileInfo = {
  user: {
    name: string;
    email: string;
    image: string | null;
    userId: string;
    username: string;
    bio: string | null;
  };
  postsCount: number;
  followersCount: number;
  followingCount: number;
};

export type Follower = {
  id: string;
  name: string;
  image: string;
  username: string;
  followedByYou?: boolean;
};
