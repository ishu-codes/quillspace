import Logo from "@/components/common/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { HomeIcon, LibraryIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ITEMS = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: HomeIcon,
  },
  {
    title: "Library",
    url: "/dashboard/library",
    icon: LibraryIcon,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserIcon,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export default function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar variant={"inset"} className="border-r-0 bg-background">
      <SidebarContent className="bg-background!">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="h-20! px-6 rounded-none border-b-0">
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="p-4 space-y-1">
              {ITEMS.map((item) => {
                const isActive = location.pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-4 py-6 rounded-xl transition-all duration-200",
                          isActive
                            ? "active bg-foreground text-background font-bold shadow-lg shadow-foreground/10"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", isActive ? "text-background" : "text-muted-foreground")} />
                        <span className="text-sm tracking-tight">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
