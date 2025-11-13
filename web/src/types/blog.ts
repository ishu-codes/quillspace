export type User = {
    id: string;
    name: string;
    img: string;
};

export type Blog = {
    id: string;
    author: User;
    title: string;
    desc: string;
    img: string;
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
