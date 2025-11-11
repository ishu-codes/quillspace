export type Author = {
    id: string;
    name: string;
    img: string;
};

export type Blog = {
    id: string;
    author: Author;
    title: string;
    desc: string;
    img: string;
    likes: number;
    comments: number;
    published: string;
};
