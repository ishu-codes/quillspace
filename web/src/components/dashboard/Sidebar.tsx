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
import { HomeIcon, LibraryIcon, SettingsIcon, UserIcon } from "lucide-react";
import Logo from "@/components/common/Logo";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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
        <Sidebar variant={"inset"} className="border-r p-0">
            <SidebarContent className="bg-background!">
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="h-16! p-4 rounded-none border-b">
                        <Logo />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="p-4">
                            {ITEMS.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.url}
                                            className={cn(
                                                "text-md",
                                                location.pathname.includes(item.url)
                                                    ? "active bg-primary text-white"
                                                    : ""
                                            )}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
