import { useState } from "react";
import { Link } from "react-router-dom";
import { GlobeIcon, LockIcon } from "lucide-react";

import Blog from "@/components/common/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useYourLists } from "@/fetchers/library";
import { useAuthSession } from "@/hooks/useAuthSession";
import type { BlogListItem } from "@/types/blog";

const LISTS = {
  yourLists: [
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
  const [activeTab, setActiveTab] = useState<string>("yourLists");
  const { data: yourLists } = useYourLists();

  const predefinedLists = [
    {
      id: "posts",
      title: "Posts",
      desc: "All the published posts will appear here",
      isPublic: true,
      itemsCount: yourLists?.postsCount ?? 0,
    },
    {
      id: "drafts",
      title: "Drafts",
      desc: "All the unpublished work will appear here",
      isPublic: false,
      itemsCount: yourLists?.draftsCount ?? 0,
    },
    {
      id: "bookmarked",
      title: "Bookmarked",
      desc: "All the bookmarked posts will appear here.",
      isPublic: false,
      itemsCount: yourLists?.bookmarkedCount ?? 0,
    },
  ];

  return (
    <div className="h-full md:py-8">
      <div className="max-w-4xl mx-auto md:px-4">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-3xl font-bold">Library</h1>
          <p className="text-muted-foreground mt-2">
            Manage your drafts, posts, saved and created lists, and much more.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-between md:grid md:grid-cols-2">
            <TabsTrigger value="yourLists">Your lists</TabsTrigger>
            <TabsTrigger value="savedLists">Saved lists</TabsTrigger>
            {/*<TabsTrigger value="readingHistory">Reading history</TabsTrigger>*/}
          </TabsList>

          <TabsContent value="yourLists">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <BlogsList list={predefinedLists} routeSuffix="/library" currentUser={true} />
              <BlogsList list={yourLists?.list ?? []} currentUser={true} />
            </div>
          </TabsContent>
          <TabsContent value="savedLists">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <BlogsList list={LISTS.savedLists} />
            </div>
          </TabsContent>
          {/*<TabsContent value="readingHistory">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {LISTS.readingHistory.map((blog) => (
                <Link to={`/posts/${blog.id}`} key={blog.id}>
                  <Blog blog={blog} className="w-full" />
                </Link>
              ))}
            </div>
          </TabsContent>*/}
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
        <Link to={`${routeSuffix}/${item.id}`} key={item.id}>
          <Card className="flex flex-col gap-2 p-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>

            <div className="flex gap-2">
              <Avatar className="w-9 h-9">
                {currentUser ? (
                  <>
                    <AvatarImage src={session?.user.image ?? ""} alt={session?.user.name} />
                    <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src={item.creator?.img ?? ""} alt={item.creator?.name} />
                    <AvatarFallback>{item.creator?.name.charAt(0)}</AvatarFallback>
                  </>
                )}
              </Avatar>

              <div className="flex flex-col">
                <h4 className="min-h-6">{currentUser ? session?.user.name : item.creator?.name}</h4>
                <p className="flex items-center gap-2 -mt-1 text-sm text-muted-foreground">
                  <span>{item.itemsCount} contents</span>
                  <span>&bull;</span>
                  <span>{item.isPublic ? <GlobeIcon size={16} /> : <LockIcon size={16} />}</span>
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
}
