import { useEffect, useState } from "react";
import type { HeadingItem } from "@/lib/contents";

interface SidebarProps {
  headings: HeadingItem[];
}

export function AsideContents({ headings }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="w-64 pr-4 sticky top-30 h-screen overflow-auto">
      <h4 className="text-xl font-semibold">Contents</h4>
      <nav className="space-y-2">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block transition-all duration-200 ${
              activeId === h.id ? "font-bold text-primary translate-x-1" : "text-muted-foreground hover:text-primary"
            } ${h.level === 2 ? "ml-4" : ""}`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
