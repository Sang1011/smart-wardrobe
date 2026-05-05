"use client";

import { Ruler, Shirt, Wand2, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/setup", icon: Ruler, label: "Measure" },
    { href: "/design", icon: Wand2, label: "Design" },
    { href: "/wardrobe", icon: Shirt, label: "Wardrobe" },
    { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNavBar() {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                "md:hidden",
                "bg-[var(--surface-container-low)]/95 backdrop-blur-md",
                "border-t border-[var(--outline-variant)]/20",
                "shadow-[0_-4px_20px_rgba(0,70,67,0.05)]",
                "fixed bottom-0 w-full z-50",
                "flex justify-around items-center px-4 pt-2 pb-6",
                "rounded-t-xl"
            )}
        >
            {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                const isActive = pathname.startsWith(href);
                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex flex-col items-center justify-center px-5 py-2 rounded-lg",
                            "transition-all duration-200 active:scale-90",
                            isActive
                                ? "bg-[var(--primary-container)] text-[var(--on-primary-container)]"
                                : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
                        )}
                    >
                        <Icon size={22} />
                        <span className="text-[11px] font-medium mt-1 font-[var(--font-sans)]">
                            {label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}