import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlogListItem } from "@/types/blog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GlobeIcon, LockIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Blog from "../common/Blog";

const LISTS = {
    yourLists: [
        {
            id: "0",
            creator: {
                id: "1",
                name: "John",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "Drafts",
            desc: "All the unpublished work will appear here",
            isPublic: false,
            itemsCount: 2,
        },
        {
            id: "1",
            creator: {
                id: "1",
                name: "John",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "Reading list",
            desc: "",
            isPublic: false,
            itemsCount: 2,
        },
        {
            id: "2",
            creator: {
                id: "1",
                name: "John",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "Must read",
            desc: "",
            isPublic: false,
            itemsCount: 34,
        },
        {
            id: "3",
            creator: {
                id: "1",
                name: "John",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "Read later",
            desc: "",
            isPublic: false,
            itemsCount: 56,
        },
    ],
    savedLists: [
        {
            id: "1",
            creator: {
                id: "2",
                name: "Alice",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "Best novels",
            desc: "",
            isPublic: true,
            itemsCount: 69,
        },
    ],
    readingHistory: [
        {
            id: "1",
            author: {
                id: "2",
                name: "Alice",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "What we are?",
            desc: "A study on our own existence!",
            img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
            likes: 1992,
            comments: 496,
            published: "2023-03-27 04:25:04",
        },
        {
            id: "2",
            author: {
                id: "2",
                name: "Alice",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "Where we are?",
            desc: "A study on our own persistence!",
            img: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EDbVqA4K8sMd9NQCFipr_g.png",
            likes: 1992,
            comments: 496,
            published: "2023-05-27 04:25:04",
        },
    ],
};

export default function Library() {
    return (
        <Tabs defaultValue="yourLists">
            <TabsList>
                <TabsTrigger value="yourLists">Your lists</TabsTrigger>
                <TabsTrigger value="savedLists">Saved lists</TabsTrigger>
                <TabsTrigger value="readingHistory">Reading history</TabsTrigger>
            </TabsList>
            <TabsContent value="yourLists">
                <BlogsList list={LISTS.yourLists} />
            </TabsContent>
            <TabsContent value="savedLists">
                <BlogsList list={LISTS.savedLists} />
            </TabsContent>
            <TabsContent value="readingHistory">
                <div className="grid grid-cols-4 gap-4 p-4">
                    {LISTS.readingHistory.map((blog) => (
                        <Link to={`/blogs/${blog.id}`} key={blog.id}>
                            <Blog blog={blog} className="w-full" />
                        </Link>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}

function BlogsList({ list }: { list: BlogListItem[] }) {
    return (
        <div className="w-full grid grid-cols-3 gap-4">
            {list.map((item) => (
                <Link to={`/library/lists/${item.id}`} key={item.id}>
                    <Card className="flex flex-col gap-2 p-4">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>

                        <div className="flex gap-2">
                            <Avatar className="w-9 h-9">
                                <AvatarImage src={item.creator.img} alt={item.creator.name} />
                                <AvatarFallback>{item.creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <p>{item.creator.name}</p>
                                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{item.itemsCount} blogs</span>
                                    <span>&bull;</span>
                                    <span>
                                        {item.isPublic ? (
                                            <GlobeIcon size={16} />
                                        ) : (
                                            <LockIcon size={16} />
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
