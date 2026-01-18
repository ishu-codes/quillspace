export type User = {
  id: string;
  name: string;
  image: string;
};

export type Blog = {
  id: string;
  author: User;
  title: string;
  desc: string;
  featuredImg: string;
  likes: number;
  comments: number;
  published: string;
};

export type BlogListItem = {
  id: string;
  creator: User;
  title: string;
  desc: string;
  isPublic: boolean;
  itemsCount: number;
};

// export type BlogPost = {
// 	title: string;
// 	description: string;
// 	headerImage: string;
// 	content: string;
// };

export type BlogPost = {
  id: number;
  authorId: string;
  author?: User;
  title: string;
  desc: string;
  content: string;
  featuredImg: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  // lists       PostList[]
  publishedAt?: string;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  bookmarked: boolean;
};

export type MenuItem = {
  id?: string;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  action?: () => void;
  type?: string;
};

export type ContextMenu = {
  x: number;
  y: number;
  visible: boolean;
};
