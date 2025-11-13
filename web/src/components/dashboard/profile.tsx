import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Link as LinkIcon, MessageCircle } from "lucide-react";

interface UserProfile {
    id: string;
    name: string;
    handle: string;
    bio: string;
    avatar: string;
    coverImage?: string;
    location?: string;
    website?: string;
    joinDate: string;
    followers: number;
    following: number;
    blogs: number;
}

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    publishedAt: string;
}

const mockUser: UserProfile = {
    id: "1",
    name: "Sarah Anderson",
    handle: "@sarahdev",
    bio: "Full-stack developer, writer, and coffee enthusiast. Sharing thoughts on web development, design, and tech.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1557672172-298e090d0f80?w=1200&h=300&fit=crop",
    location: "San Francisco, CA",
    website: "https://sarahdev.com",
    joinDate: "January 2023",
    followers: 2345,
    following: 543,
    blogs: 28,
};

const mockBlogs: Blog[] = [
    {
        id: "1",
        title: "Getting Started with React Hooks",
        excerpt:
            "Learn how to use React Hooks to manage state and side effects in your functional components...",
        publishedAt: "2 days ago",
    },
    {
        id: "2",
        title: "TypeScript Best Practices",
        excerpt:
            "Explore the best practices for writing type-safe code with TypeScript in production applications...",
        publishedAt: "1 week ago",
    },
    {
        id: "3",
        title: "Building Scalable APIs",
        excerpt:
            "Deep dive into architectural patterns for building APIs that can scale with your growing user base...",
        publishedAt: "2 weeks ago",
    },
];

export default function Profile() {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Cover Image */}
            {mockUser.coverImage && (
                <div className="h-48 w-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500">
                    <img
                        src={mockUser.coverImage}
                        alt="Cover"
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            {/* Profile Header */}
            <div className="px-6 pb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
                    {/* Avatar */}
                    <div className="-mt-20 flex items-end gap-4">
                        <Avatar className="h-32 w-32 border-4 border-background">
                            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Profile Info Header */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">{mockUser.name}</h1>
                        <p className="text-muted-foreground">{mockUser.handle}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                        </Button>
                        <Button
                            size="sm"
                            variant={isFollowing ? "outline" : "default"}
                            onClick={handleFollowClick}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </Button>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mt-6 space-y-4">
                    <p className="text-base text-foreground">{mockUser.bio}</p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {mockUser.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{mockUser.location}</span>
                            </div>
                        )}
                        {mockUser.website && (
                            <div className="flex items-center gap-1">
                                <LinkIcon className="h-4 w-4" />
                                <a
                                    href={mockUser.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {mockUser.website.replace("https://", "")}
                                </a>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Joined {mockUser.joinDate}</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 pt-4">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{mockUser.following}</span>
                            <span className="text-muted-foreground">Following</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{mockUser.followers}</span>
                            <span className="text-muted-foreground">Followers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{mockUser.blogs}</span>
                            <span className="text-muted-foreground">Blogs</span>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Tabs Section */}
                <Tabs defaultValue="blogs" className="w-full">
                    <TabsList>
                        <TabsTrigger value="blogs">Blogs</TabsTrigger>
                        <TabsTrigger value="followers">Followers</TabsTrigger>
                        <TabsTrigger value="following">Following</TabsTrigger>
                    </TabsList>

                    {/* Blogs Tab */}
                    <TabsContent value="blogs" className="mt-6 space-y-4">
                        {mockBlogs.map((blog) => (
                            <Card
                                key={blog.id}
                                className="cursor-pointer transition-colors hover:bg-accent"
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg">{blog.title}</CardTitle>
                                    <CardDescription>{blog.publishedAt}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    {/* Followers Tab */}
                    <TabsContent value="followers" className="mt-6">
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((item) => (
                                <Card key={item}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`https://images.unsplash.com/photo-1${
                                                            500000000 + item
                                                        }?w=100&h=100&fit=crop`}
                                                    />
                                                    <AvatarFallback>U{item}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">Follower {item}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        @follower{item}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Follow Back
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Following Tab */}
                    <TabsContent value="following" className="mt-6">
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <Card key={item}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`https://images.unsplash.com/photo-1${
                                                            600000000 + item
                                                        }?w=100&h=100&fit=crop`}
                                                    />
                                                    <AvatarFallback>U{item}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">
                                                        User Following {item}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        @user{item}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Unfollow
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
