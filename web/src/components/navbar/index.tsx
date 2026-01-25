import { ArrowLeftIcon, BellIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "@/components/common/Logo";
import NewDraft from "@/components/common/NewDraft";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useAuthSession } from "@/hooks/useAuthSession";
import { authClient } from "@/lib/authClient";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  sidebarTrigger?: boolean;
}

export default function Navbar({ sidebarTrigger = false }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { session } = useAuthSession();
  const navigate = useNavigate();

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
          <Button variant={"ghost"} size="icon" className="rounded-full" onClick={() => navigate(-1)}>
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
        <NewDraft />

        <Button variant={"ghost"} size="icon" className="rounded-full relative">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-foreground rounded-full border-2 border-background" />
        </Button>

        {/* Profile */}
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer hover:ring-2 ring-foreground/20 transition-all">
              <AvatarImage src={session?.user.image ?? ""} alt="profile" />
              <AvatarFallback className="font-bold">{session?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80 rounded-2xl p-6 shadow-2xl border-border/50" align="end">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={session?.user.image ?? ""} alt="profile" />
                  <AvatarFallback className="text-lg font-bold">{session?.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold leading-none mb-1">{session?.user.name}</h3>
                  <p className="text-sm text-muted-foreground leading-none">{session?.user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant={"outline"} asChild className="rounded-xl font-bold">
                  <Link to={"/dashboard/profile"}>Profile</Link>
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
