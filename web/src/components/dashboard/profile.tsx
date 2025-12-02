import { useState } from "react";
// import { MapPin, Calendar, Link as LinkIcon, MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthSession } from "@/hooks/useAuthSession";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/blog";

export default function Profile() {
  const { session } = useAuthSession();
  const [currentTab, setCurrentTab] = useState("profile");

  const navigate = useNavigate();

  return (
    <div className="h-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-2">View your profile status.</p>
        </div>

        {/* Tabs */}
        <Tabs className="w-full" value={currentTab} onValueChange={(val) => setCurrentTab(val)}>
          <TabsList className="w-full flex justify-between md:grid md:grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              {/*<CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile details and personal information</CardDescription>
              </CardHeader>*/}
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session?.user.image || ""} alt={"profile"} />
                      <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-semibold">{session?.user.name}</h3>
                        <p className="text-muted-foreground text-sm">@Username</p>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="text-muted-foreground">
                    <p>Bio</p>
                    <p>Bio2</p>
                    <p>Bio3</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { title: "Posts", value: 2, action: () => navigate("/library/posts") },
                    { title: "Followers", value: 8, action: () => setCurrentTab("followers") },
                    { title: "Following", value: 10, action: () => setCurrentTab("following") },
                  ].map((item) => (
                    <Button
                      variant={"ghost"}
                      className="h-20! flex flex-col gap-1"
                      onClick={item.action}
                      key={item.title}
                    >
                      <p className="text-muted-foreground">{item.title}</p>
                      <h4 className="text-xl font-semibold">{item.value}</h4>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Followers Tab */}
          <TabsContent value="followers" className="space-y-4">
            <Card>
              {/*<CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Choose your preferred theme appearance</CardDescription>
              </CardHeader>*/}
              <CardContent className="flex flex-col gap-4">
                {[
                  { id: "1", name: "ABC", image: "" },
                  { id: "2", name: "DEF", image: "" },
                ].map((item) => (
                  <FollowerCard user={item} type="follower" key={item.id} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-4">
            <Card>
              {/*<CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Choose your preferred theme appearance</CardDescription>
              </CardHeader>*/}
              <CardContent className="flex flex-col gap-4">
                {[
                  { id: "1", name: "ABC", image: "" },
                  { id: "2", name: "DEF", image: "" },
                ].map((item) => (
                  <FollowerCard user={item} type="following" key={item.id} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface FollowerCardProps {
  user: User;
  type: "follower" | "following";
}
function FollowerCard({ user, type }: FollowerCardProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image || ""} alt={"profile"} />
          <AvatarFallback className="border-1">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-muted-foreground text-sm -mt-1">@Username</p>
          </div>
        </div>
      </div>

      {type === "follower" ? (
        <Button size={"sm"}>Follow</Button>
      ) : (
        <Button size={"sm"} variant={"outline"}>
          Unfollow
        </Button>
      )}
    </div>
  );
}
