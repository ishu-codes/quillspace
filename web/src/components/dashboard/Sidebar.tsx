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
import { Link } from "react-router-dom";

const ITEMS = [
    {
        title: "Home",
        url: "/home",
        icon: HomeIcon,
    },
    {
        title: "Library",
        url: "/library",
        icon: LibraryIcon,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: UserIcon,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: SettingsIcon,
    },
];

export default function AppSidebar() {
    return (
        <Sidebar variant={"inset"} className="border-r p-0">
            <SidebarContent>
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="h-16! p-4 rounded-none border-b">
                        <Logo />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="p-4">
                            {ITEMS.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url} className="text-md!">
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
