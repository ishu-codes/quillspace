import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    className?: string;
    to?: string;
}

export default function Logo({ className, to = "/dashboard/home" }: Props) {
    const handleClick = () => {
        // Handle workspace resets if needed
    };

    return (
        <Link
            onClick={handleClick}
            to={to}
            className={`flex items-center gap-2.5 ${className}`}
        >
            <div className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center transition-transform hover:rotate-12">
                <BookOpen className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-foreground">
                QuillSpace
            </span>
        </Link>
    );
}
