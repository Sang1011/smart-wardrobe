"use client";

import { ArrowLeft, HelpCircle, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TopAppBarProps {
    title?: string;
    showBack?: boolean;
    className?: string;
}

export function TopAppBar({
    title = "Atelier",
    showBack = false,
    className,
}: TopAppBarProps) {
    const router = useRouter();

    return (
        <header
            className={cn(
                "bg-[var(--surface)]/90 backdrop-blur-xl",
                "border-b border-[var(--outline-variant)]/30",
                "fixed w-full top-0 z-50",
                "flex justify-between items-center px-6 py-4",
                "h-[72px]",
                className
            )}
        >
            <div className="flex items-center gap-4">
                {showBack && (
                    <button
                        onClick={() => router.back()}
                        className={cn(
                            "flex items-center justify-center p-2 rounded-full",
                            "text-[var(--on-surface-variant)]",
                            "hover:bg-[var(--surface-container-high)] transition-colors",
                            "active:scale-95 duration-150"
                        )}
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}
                <h1
                    className={cn(
                        "text-xl font-bold tracking-tight",
                        "text-[var(--primary)]",
                        "font-[var(--font-heading)] uppercase"
                    )}
                >
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-1">
                <button
                    className={cn(
                        "flex items-center justify-center p-2 rounded-full",
                        "text-[var(--on-surface-variant)]",
                        "hover:bg-[var(--surface-container-high)] transition-colors",
                        "active:scale-95 duration-150"
                    )}
                >
                    <HelpCircle size={20} />
                </button>
                <button
                    className={cn(
                        "flex items-center justify-center p-2 rounded-full",
                        "text-[var(--on-surface-variant)]",
                        "hover:bg-[var(--surface-container-high)] transition-colors",
                        "active:scale-95 duration-150"
                    )}
                >
                    <UserCircle size={20} />
                </button>
            </div>
        </header>
    );
}