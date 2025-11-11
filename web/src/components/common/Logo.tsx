import { Link } from "react-router-dom";
import { LayoutGridIcon } from "lucide-react";

interface Props {
    className?: string;
}

export default function Logo({ className }: Props) {
    const handleClick = () => {
        console.log("setWorkspace(undefined)");
        console.log("setProject(undefined)");
    };

    return (
        <Link onClick={handleClick} to="/home" className={`flex items-center gap-2 ${className}`}>
            <div className="p-1.5">
                <LayoutGridIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-lg text-zinc-900 dark:text-white font-semibold">QuillSpace</span>
        </Link>
    );
}
