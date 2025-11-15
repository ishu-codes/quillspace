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

export type BlogPost = {
    title: string;
    description: string;
    headerImage: string;
    content: string;
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
