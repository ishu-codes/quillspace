import { GlobeIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useYourLists } from "@/fetchers/library";
import { useAuthSession } from "@/hooks/useAuthSession";
import type { BlogListItem } from "@/types/blog";

const LISTS = {
    savedLists: [
        {
            id: "1",
            creator: {
                id: "2",
                name: "Alice",
                img: "https://miro.medium.com/v2/resize:fill:110:110/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
            },
            title: "Best novels",
            desc: "A timeless collection of literary masterpieces.",
            isPublic: true,
            itemsCount: 69,
        },
    ],
};

export default function Library() {
    const [activeTab, setActiveTab] = useState<string>("yourLists");
    const { data: yourLists } = useYourLists();

    const predefinedLists = [
        {
            id: "posts",
            title: "Published Stories",
            desc: "Insights and stories shared with the world.",
            isPublic: true,
            itemsCount: yourLists?.postsCount ?? 0,
        },
        {
            id: "drafts",
            title: "Drafts",
            desc: "Works in progress, waiting for their moment.",
            isPublic: false,
            itemsCount: yourLists?.draftsCount ?? 0,
        },
        {
            id: "bookmarked",
            title: "Reading List",
            desc: "Stories that sparked curiosity and inspiration.",
            isPublic: false,
            itemsCount: yourLists?.bookmarkedCount ?? 0,
        },
    ];

    return (
        <div className="h-full py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-bold tracking-tight">
                        Your Library
                    </h1>
                    <p className="text-lg text-muted-foreground mt-2 font-medium">
                        A curated space for your thoughts and discoveries.
                    </p>
                </div>

                {/* Tabs */}
                <Tabs
                    defaultValue={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="w-full h-auto p-0 bg-transparent border-b border-border mb-12 flex justify-start gap-8 rounded-none">
                        <TabsTrigger
                            value="yourLists"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                        >
                            Personal
                        </TabsTrigger>
                        <TabsTrigger
                            value="savedLists"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                        >
                            Curations
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="yourLists"
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <BlogsList
                                list={predefinedLists}
                                routeSuffix="/library"
                                currentUser={true}
                            />
                            <BlogsList
                                list={yourLists?.list ?? []}
                                currentUser={true}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent
                        value="savedLists"
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <BlogsList list={LISTS.savedLists} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function BlogsList({
    list,
    routeSuffix = "/lists",
    currentUser = false,
}: {
    list: BlogListItem[];
    routeSuffix?: string;
    currentUser?: boolean;
}) {
    const { session } = useAuthSession();
    return (
        <>
            {list.map((item) => (
                <Link
                    to={`${routeSuffix}/${item.id}`}
                    key={item.id}
                    className="group"
                >
                    <Card className="h-full flex flex-col gap-6 p-8 rounded-[2rem] border border-border/50 hover:border-foreground/20 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-300">
                        <div className="space-y-3 flex-1">
                            <h3 className="text-3xl font-serif font-bold group-hover:italic transition-all">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground font-medium leading-relaxed">
                                {item.desc ||
                                    "A collection of carefully selected pieces."}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-border/50">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10 ring-2 ring-background">
                                    {currentUser ? (
                                        <>
                                            <AvatarImage
                                                src={session?.user.image ?? ""}
                                                alt={session?.user.name}
                                            />
                                            <AvatarFallback className="font-bold">
                                                {session?.user.name.charAt(0)}
                                            </AvatarFallback>
                                        </>
                                    ) : (
                                        <>
                                            <AvatarImage
                                                src={item.creator?.img ?? ""}
                                                alt={item.creator?.name}
                                            />
                                            <AvatarFallback className="font-bold">
                                                {item.creator?.name?.charAt(0)}
                                            </AvatarFallback>
                                        </>
                                    )}
                                </Avatar>
                                <div>
                                    <span className="text-sm font-bold block leading-none">
                                        {currentUser
                                            ? session?.user.name
                                            : item.creator?.name}
                                    </span>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                                        Curator
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-wider">
                                    {item.itemsCount} pieces
                                </div>
                                {item.isPublic ? (
                                    <GlobeIcon
                                        size={14}
                                        className="opacity-50"
                                    />
                                ) : (
                                    <LockIcon
                                        size={14}
                                        className="opacity-50"
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </>
    );
}
