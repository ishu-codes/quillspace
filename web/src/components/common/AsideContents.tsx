import { useEffect, useState } from "react";
import type { HeadingItem } from "@/lib/contents";

interface SidebarProps {
  headings: HeadingItem[];
}

export function AsideContents({ headings }: SidebarProps) {
  const [_, setActiveId] = useState<string>("");

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
    <aside className="w-full md:w-80 h-full flex flex-col gap-4 pr-4 sticky top-30 overflow-auto">
      <h4 className="text-xl font-semibold">Contents</h4>
      <aside className="toc w-80 sticky top-24 hidden lg:block" />
    </aside>
  );
}
