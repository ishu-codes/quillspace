import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EllipsisVerticalIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";

interface Props {
    currentPage: string;
    setCurrentPage: Dispatch<SetStateAction<string>>;
    setPreviewMode: Dispatch<SetStateAction<boolean>>;
}

export default function Titlebar({ currentPage, setCurrentPage, setPreviewMode }: Props) {
    const navigate = useNavigate();
    return (
        <div className="w-full flex items-center justify-between px-2 md:px-3 py-3 bg-background border-b fixed top-0 z-40">
            <div className="w-full flex gap-2 item-center justify-between md:justify-start">
                <Button variant={"ghost"} onClick={() => navigate(-1)}>
                    <ArrowLeftIcon />
                </Button>
                <ButtonGroup className="grid grid-cols-3">
                    {[
                        { key: "info", title: "Info" },
                        { key: "editor", title: "Editor" },
                        { key: "preview", title: "Preview" },
                    ].map((item) => (
                        <Button
                            key={item.key}
                            variant={currentPage === item.key ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                setCurrentPage(item.key);
                                setPreviewMode(item.key === "preview");
                            }}
                        >
                            {/* <Eye className="mr-2 h-4 w-4" /> */}
                            {item.title}
                        </Button>
                    ))}
                </ButtonGroup>

                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"}>
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuItem>Save Draft</DropdownMenuItem>
                            <DropdownMenuItem>Publish</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="hidden md:flex gap-2">
                <ThemeToggle />
                <Button variant="outline" size="sm">
                    Save Draft
                </Button>
                <Button size="sm">Publish</Button>
            </div>
        </div>
    );
}
