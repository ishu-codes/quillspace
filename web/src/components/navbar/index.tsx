import { ArrowLeftIcon, BellIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Logo from "@/components/common/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useCreateDraft } from "@/fetchers/drafts";
import { useAuthSession } from "@/hooks/useAuthSession";
import { authClient } from "@/lib/authClient";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
    sidebarTrigger?: boolean;
}

export default function Navbar({ sidebarTrigger = false }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [newDraftData, setNewDraftData] = useState<{
        title: string;
        desc: string;
    }>({ title: "", desc: "" });
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
        <div className="w-full h-20 flex items-center justify-between px-6 border-b border-border/50 sticky top-0 backdrop-blur-xl bg-background/80 z-50">
            {sidebarTrigger ? (
                <SidebarTriggerWithLogo />
            ) : (
                <div className="flex gap-4">
                    <Button
                        variant={"ghost"}
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Button>

                    <Logo />
                </div>
            )}

            <form className="hidden md:block flex-1 max-w-md mx-8">
                <div className="relative group">
                    <Input
                        type="search"
                        name="search"
                        className="pl-10 h-11 rounded-full border-border bg-muted/30 focus:bg-background transition-all"
                        placeholder="Search stories, authors..."
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    />
                    <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                </div>
            </form>

            <div className="flex items-center gap-3">
                <ThemeToggle className="hidden md:flex" />

                {/* Create new draft */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            variant={"default"}
                            className="rounded-full px-5 gap-2 font-bold shadow-sm"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span className="hidden md:inline-block">
                                Write
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-3xl p-8">
                        <DialogHeader className="space-y-3">
                            <DialogTitle className="text-3xl font-serif">
                                A new story begins
                            </DialogTitle>
                            <DialogDescription className="text-lg">
                                Capture your thoughts in a minimal, focused
                                environment.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-6 space-y-6">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="new-draft-title"
                                    className="text-sm font-bold uppercase tracking-widest text-muted-foreground"
                                >
                                    Title
                                </Label>
                                <Input
                                    id="new-draft-title"
                                    className="h-12 text-xl font-serif border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                                    value={newDraftData.title}
                                    onChange={(e) =>
                                        setNewDraftData((state) => ({
                                            ...state,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="The title of your piece..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="new-draft-desc"
                                    className="text-sm font-bold uppercase tracking-widest text-muted-foreground"
                                >
                                    Short description
                                </Label>
                                <Input
                                    id="new-draft-desc"
                                    className="h-12 border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                                    value={newDraftData.desc}
                                    onChange={(e) =>
                                        setNewDraftData((state) => ({
                                            ...state,
                                            desc: e.target.value,
                                        }))
                                    }
                                    placeholder="What is this story about?"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleCreateNewDraft}
                                className="w-full h-12 rounded-full font-bold text-lg"
                            >
                                Create Draft
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Button
                    variant={"ghost"}
                    size="icon"
                    className="rounded-full relative"
                >
                    <BellIcon className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-foreground rounded-full border-2 border-background" />
                </Button>

                {/* Profile */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer hover:ring-2 ring-foreground/20 transition-all">
                            <AvatarImage
                                src={session?.user.image ?? ""}
                                alt="profile"
                            />
                            <AvatarFallback className="font-bold">
                                {session?.user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-80 rounded-2xl p-6 shadow-2xl border-border/50"
                        align="end"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage
                                        src={session?.user.image ?? ""}
                                        alt="profile"
                                    />
                                    <AvatarFallback className="text-lg font-bold">
                                        {session?.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold leading-none mb-1">
                                        {session?.user.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-none">
                                        {session?.user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant={"outline"}
                                    asChild
                                    className="rounded-xl font-bold"
                                >
                                    <Link to={"/dashboard/profile"}>
                                        Profile
                                    </Link>
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className="rounded-xl font-bold text-destructive hover:bg-destructive/5 hover:text-destructive"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

function SidebarTriggerWithLogo() {
    const { open: isSidebarOpen } = useSidebar();

    return (
        <div className="flex gap-2">
            <SidebarTrigger variant={"ghost"} />
            {!isSidebarOpen && (
                <div className="hidden md:block">
                    <Logo />
                </div>
            )}
        </div>
    );
}
