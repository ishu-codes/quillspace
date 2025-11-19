import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BellIcon, PlusIcon, SearchIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="w-full h-16 flex items-center justify-between p-4 border-b sticky top-0 backdrop-blur-lg z-50">
			<div className="flex gap-2">
				<SidebarTrigger variant={"ghost"} />
				{/* <Link to="/">QullSpace</Link> */}
			</div>

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
				<Button variant={"ghost"}>
					<PlusIcon />
					<span className="hidden md:inline-block">Create</span>
				</Button>
				<Button variant={"ghost"}>
					<BellIcon />
				</Button>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="profile" />
					<AvatarFallback>P</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}
