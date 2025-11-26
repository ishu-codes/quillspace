import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, BellIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthSession } from "@/hooks/useAuthSession";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateDraft } from "@/fetchers/drafts";
import Logo from "@/components/common/Logo";
import { authClient } from "@/lib/authClient";

interface Props {
  sidebarTrigger?: boolean;
}

export default function Navbar({ sidebarTrigger = false }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newDraftData, setNewDraftData] = useState<{ title: string; desc: string }>({ title: "", desc: "" });
  const { session } = useAuthSession();
  const navigate = useNavigate();
  const { mutateAsync: createDraft } = useCreateDraft();

  // const [isCreatingDraft, setIsCreatingDraft] = useState<boolean>(false);
  const handleCreateNewDraft = async () => {
    console.log(newDraftData);
    if (newDraftData.title.trim() === "") {
      toast.warning("Title cannot be empty!");
      return;
    }

    try {
      const createdDraft = await createDraft({
        title: newDraftData.title,
        desc: newDraftData.desc,
      });

      navigate(`/drafts/${createdDraft.id}`);
    } catch (err: any) {
      toast.error("Failed to create new draft!", {
        description: err.message,
      });
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    navigate("/auth/login");
  };

  return (
    <div className="w-full h-16 flex items-center justify-between p-4 border-b sticky top-0 backdrop-blur-lg z-50">
      {sidebarTrigger ? (
        <SidebarTrigger variant={"ghost"} />
      ) : (
        <div className="flex gap-2">
          <Button variant={"ghost"} onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </Button>

          <Link to="/">
            <Logo />
          </Link>
        </div>
      )}
      {/* <Link to="/">QullSpace</Link> */}

      <form className="hidden md:block">
        <Input
          type="search"
          name="search"
          className=""
          placeholder="Search here.."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
        />
      </form>

      <div className="flex items-center gap-2">
        <ThemeToggle className="hidden md:flex" />
        <Button variant={"ghost"} className="md:hidden">
          <SearchIcon />
        </Button>

        {/* Create new draft */}
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant={"ghost"}>
              {/*<Link to="/drafts/new">*/}
              <PlusIcon />
              <span className="hidden md:inline-block">Create</span>
              {/*</Link>*/}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create new draft</DialogTitle>
              <DialogDescription>Drafts can be published as posts for others to view.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateNewDraft}>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="new-draft-title">Title</Label>
                  <Input
                    id="new-draft-title"
                    name="title"
                    value={newDraftData.title}
                    onChange={(e) => setNewDraftData((state) => ({ ...state, title: e.target.value }))}
                    placeholder="My very first post"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="new-draft-desc">Description</Label>
                  <Input
                    id="new-draft-desc"
                    name="description"
                    value={newDraftData.desc}
                    onChange={(e) => setNewDraftData((state) => ({ ...state, desc: e.target.value }))}
                    placeholder="It should display my potential"
                    autoComplete="off"
                  />
                </div>
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleCreateNewDraft}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notifications */}
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant={"ghost"}>
              <BellIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex-row items-center justify-between">
              <div>
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>No new notifications</DrawerDescription>
              </div>

              <DrawerClose>
                <XIcon />
              </DrawerClose>
            </DrawerHeader>
            <div className="flex flex-col"></div>
            <DrawerFooter>
              <Button variant={"outline"}>Mark all as read</Button>
              <Button
                variant={"outline"}
                className="border-destructive text-destructive hover:text-destructive hover:bg-destructive/5"
              >
                Clear all
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Profile */}
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={session?.user.image ?? ""} alt="profile" />
              <AvatarFallback className="border-2">{session?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={session?.user.image ?? ""} alt="profile" />
                  <AvatarFallback className="">{session?.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <h3>{session?.user.name}</h3>
                  <p className="text-sm text-muted-foreground -mt-1">{session?.user.email}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <Button variant={"outline"} asChild>
                  <Link to={"/auth/logout"}>View Profile</Link>
                </Button>
                <Button variant={"outline"} className="text-destructive hover:text-destructive" onClick={handleLogout}>
                  {/*<a href={"/auth/logout"}>*/}
                  Logout
                  {/*</a>*/}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
